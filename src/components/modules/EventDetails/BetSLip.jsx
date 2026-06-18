import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useCurrentBets } from "../../../hooks/currentBets";
import useBalance from "../../../hooks/balance";
import { useExposure } from "../../../hooks/exposure";
import {
  setPlaceBetValues,
  setPrice,
  setRunnerId,
  setStake,
} from "../../../redux/features/events/eventSlice";
import { API, Settings } from "../../../api";
import { v4 as uuidv4 } from "uuid";
import { isBetDelay, isDelay } from "../../../utils/isBetDelay";
import { AxiosJSEncrypt } from "../../../lib/AxiosJSEncrypt";
import toast from "react-hot-toast";
import {
  handleDecreasePrice,
  handleIncreasePrice,
} from "../../../utils/editBetSlipPrice";

const BetSLip = ({ currentPlaceBetEvent }) => {
  const { closePopupForForever } = useSelector((state) => state.global);
  const [isCashOut, setIsCashOut] = useState(false);
  const [profit, setProfit] = useState(0);
  const { eventTypeId } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { eventId } = useParams();

  const { refetch: refetchCurrentBets } = useCurrentBets(eventId);
  const { refetch: refetchBalance } = useBalance();
  const { refetch: refetchExposure } = useExposure(eventId);
  const { placeBetValues, price, stake } = useSelector((state) => state?.event);

  const buttonValues = localStorage.getItem("buttonValue");
  let parseButtonValues = [];
  if (buttonValues) {
    parseButtonValues = JSON.parse(buttonValues);
  }

  useEffect(() => {
    dispatch(setPrice(parseFloat(placeBetValues?.price)));
    dispatch(
      setStake(
        placeBetValues?.totalSize > 0
          ? placeBetValues?.totalSize?.toFixed(2)
          : null,
      ),
    );
    setIsCashOut(placeBetValues?.cashout || false);
  }, [placeBetValues, dispatch]);

  let payload = {};
  if (price) {
    if (placeBetValues?.btype === "SPORTSBOOK") {
      payload = {
        price: price,
        side: placeBetValues?.side,
        selectionId: placeBetValues?.selectionId,
        btype: placeBetValues?.btype,
        placeName: placeBetValues?.placeName,
        eventTypeId: placeBetValues?.eventTypeId,
        betDelay: currentPlaceBetEvent?.betDelay,
        marketId: placeBetValues?.marketId,
        maxLiabilityPerMarket: placeBetValues?.maxLiabilityPerMarket,
        maxLiabilityPerBet: placeBetValues?.maxLiabilityPerBet,
        totalSize: stake,
        isBettable: placeBetValues?.isBettable,
        eventId: placeBetValues?.eventId,
        cashout: isCashOut,
        b2c: Settings.b2c,
      };
    } else {
      payload = {
        betDelay: currentPlaceBetEvent?.betDelay,
        btype: placeBetValues?.btype,
        eventTypeId: placeBetValues?.eventTypeId,
        marketId: placeBetValues?.marketId,
        price: price,
        selectionId: placeBetValues?.selectionId,
        side: placeBetValues?.side,
        totalSize: stake,
        maxLiabilityPerMarket: placeBetValues?.maxLiabilityPerMarket,
        isBettable: placeBetValues?.isBettable,
        maxLiabilityPerBet: placeBetValues?.maxLiabilityPerBet,
        eventId: placeBetValues?.eventId,
        cashout: isCashOut,
        b2c: Settings.b2c,
      };
    }
  }

  /* Handle bets */

  const handleOrderBets = async () => {
    setLoading(true);
    const payloadData = [
      {
        ...payload,

        nounce: uuidv4(),

        apk: closePopupForForever ? true : false,
        isbetDelay: isBetDelay(placeBetValues),
      },
    ];

    let delay = 0;

    if (isDelay(placeBetValues)) {
      if (
        eventTypeId == 4 &&
        placeBetValues?.btype === "MATCH_ODDS" &&
        price > 3 &&
        placeBetValues?.name?.length === 2
      ) {
        delay = 9000;
      }
      if (
        eventTypeId == 4 &&
        placeBetValues?.btype === "MATCH_ODDS" &&
        price > 7 &&
        placeBetValues?.name?.length === 3
      ) {
        delay = 9000;
      } else {
        delay = Settings?.bet_delay ? currentPlaceBetEvent?.betDelay * 1000 : 0;
      }
    }

    // Introduce a delay before calling the API
    setTimeout(async () => {
      try {
        // const res = await createOrder(payloadData).unwrap();
        const { data } = await AxiosJSEncrypt.post(API.order, payloadData);

        if (data?.success) {
          setLoading(false);
          refetchExposure();
          refetchBalance();
          dispatch(setRunnerId(null));
          dispatch(setPlaceBetValues(null));
          refetchCurrentBets();

          dispatch(setStake(null));
          toast.success(data?.result?.result?.placed?.[0]?.message);
        } else {
          setLoading(false);
          toast.error(
            data?.error?.status?.[0]?.description || data?.error?.errorMessage,
          );
        }
      } catch {
        toast.error("Something went wrong. Please try again.");
      }
    }, delay);
  };

  useEffect(() => {
    if (
      price &&
      stake &&
      placeBetValues?.back &&
      placeBetValues?.btype === "MATCH_ODDS"
    ) {
      const multiply = price * stake;
      setProfit(formatNumber(multiply - stake));
    } else if (
      price &&
      stake &&
      placeBetValues?.back &&
      (placeBetValues?.btype === "BOOKMAKER" ||
        placeBetValues?.btype === "BOOKMAKER2")
    ) {
      const bookmaker = 1 + price / 100;
      const total = bookmaker * stake - stake;

      setProfit(formatNumber(total));
    } else if (price && stake && placeBetValues?.btype === "FANCY") {
      const profit =
        (parseFloat(placeBetValues?.bottomValue) * parseFloat(stake)) /
        parseFloat(stake);
      setProfit(profit);
    }
  }, [price, stake, profit, placeBetValues, setProfit]);

  /* Format number */
  const formatNumber = (value) => {
    const hasDecimal = value % 1 !== 0;
    // value?.toFixed(2)
    return hasDecimal ? parseFloat(value?.toFixed(2)) : value;
  };

  const handleCancelBet = () => {
    dispatch(setRunnerId(null));
    dispatch(setPlaceBetValues(null));
    dispatch(setStake(null));
  };

  const handleButtonValue = (value) => {
    setIsCashOut(false);
    const buttonValue = Number(value);
    const prevStake = !stake ? null : Number(stake);

    if (prevStake === null) {
      dispatch(setStake(buttonValue));
    }
    if (prevStake >= 0) {
      dispatch(setStake(buttonValue + prevStake));
    }
  };

  return (
    <div>
      <div className={`place-bet ${placeBetValues?.back ? "back" : "lay"}`}>
        {loading && (
          <div
            className="full-overlay ng-star-inserted"
            style={{ zIndex: 9999 }}
          >
            <div className="spinner" />
          </div>
        )}
        <div id="goto-1.258995089-10301" />

        <form noValidate className="ng-untouched ng-pristine ng-valid">
          <table className="coupon-table table m-0">
            <tbody>
              <tr className="middlesex-col">
                <td className="bet-odds">
                  <div className="form-group">
                    <div className="input-group">
                      {!placeBetValues?.isWeak && (
                        <div
                          onClick={() => {
                            handleDecreasePrice(
                              price,
                              placeBetValues,
                              dispatch,
                              setPrice,
                            );
                            setIsCashOut(false);
                          }}
                          className="input-group-prepend"
                        >
                          <span className="input-group-text">-</span>
                        </div>
                      )}

                      <input
                        onChange={(e) => {
                          dispatch(setPrice(e.target.value));
                          setIsCashOut(false);
                        }}
                        value={price}
                        type="number"
                        className="ng-untouched ng-pristine ng-valid"
                      />
                      {!placeBetValues?.isWeak && (
                        <div
                          onClick={() => {
                            handleIncreasePrice(
                              price,
                              placeBetValues,
                              dispatch,
                              setPrice,
                            );
                            setIsCashOut(false);
                          }}
                          className="input-group-prepend"
                        >
                          <span className="input-group-text">+</span>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="bet-stakes">
                  <div className="form-group">
                    <input
                      onChange={(e) => {
                        dispatch(setStake(e.target.value));
                        setIsCashOut(false);
                      }}
                      placeholder={`Max bet: ${placeBetValues?.maxLiabilityPerBet}`}
                      value={stake || ""}
                      type="number"
                      className="ng-untouched ng-pristine ng-valid"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan={5} className="value-buttons">
                  {parseButtonValues?.map((button, i) => (
                    <button
                      style={{ minWidth: "calc(25% - 1px)" }}
                      key={i}
                      onClick={() => handleButtonValue(button?.value)}
                      type="button"
                      className="btn btn-secondary m-l-5 m-b-5"
                    >
                      <i data-feather="plus" /> {button?.value}{" "}
                    </button>
                  ))}

                  <button
                    style={{ minWidth: "calc(25% - 1px)" }}
                    onClick={() =>
                      dispatch(setStake(parseButtonValues[0]?.value))
                    }
                    className="btn btn-secondary m-l-5 m-b-5 btn-min-stake"
                  >
                    min stake
                  </button>
                  <button
                    style={{ minWidth: "calc(25% - 1px)" }}
                    onClick={() =>
                      dispatch(
                        setStake(
                          Number(
                            placeBetValues?.maxLiabilityPerBet?.replace(
                              /k$/i,
                              "000",
                            ),
                          ),
                        ),
                      )
                    }
                    className="btn btn-secondary m-l-5 m-b-5 btn-max-stake"
                  >
                    max stake
                  </button>

                  <button
                    style={{ minWidth: "calc(25% - 1px)" }}
                    onClick={() => {
                      dispatch(setStake(null));
                    }}
                    className="btn btn-secondary m-l-5 m-b-5 clear-stake"
                  >
                    clear
                  </button>
                </td>
              </tr>
              <tr>
                <td colSpan={5}>
                  <p className="bet-stakes">
                    Min Bet: {placeBetValues?.minLiabilityPerBet} Max Bet:
                    {placeBetValues?.maxLiabilityPerBet}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="col-md-12 px-0 text-center mt-2">
            <button
              onClick={handleCancelBet}
              type="button"
              className="btn btn-sm btn-danger"
            >
              <i data-feather="trash-2" /> remove
            </button>
            <button
              onClick={handleOrderBets}
              type="button"
              className="btn btn-sm btn-success"
            >
              {" "}
              place bet{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BetSLip;
