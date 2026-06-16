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
import Loader from "../../shared/Loader/Loader";
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

  console.log(placeBetValues);
  return (
    <div
      data-v-01cb3fd9
      className={`bettingTable  ${placeBetValues?.back ? "blue-back" : "pink-lay"}`}
      style={{}}
    >
      {loading && <Loader />}
      {/* <div data-v-a3bfde67 className="betslip-outer-div">
        <div data-v-a3bfde67 className="bet-any-odds-sec">
          <div data-v-a3bfde67 className="other-settings-switch">
            <div data-v-a3bfde67 className="toggle">
              <input data-v-a3bfde67 type="checkbox" id="acceptOddsToggle" />
              <label data-v-a3bfde67 htmlFor="acceptOddsToggle" />
            </div>
          </div>
          <span data-v-a3bfde67>Accept any odds</span>
        </div>
        
        <p data-v-a3bfde67 className="fancy-minMax-bet">
          Aval Bal : &nbsp;
          <span data-v-a3bfde67 className="text-green">
            0.21
          </span>
        </p>
      </div> */}
      <div data-v-a3bfde67 className="bet-left-side" />
      <div data-v-a3bfde67 className="bets-right-side">
        <div data-v-a3bfde67 className="card-bet select-value-btn">
          <div data-v-a3bfde67 className="bets-btn">
            <div data-v-a3bfde67 className="increment-decrement-sec">
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
                  data-v-a3bfde67
                  className="value-button v-left"
                  id="decrease"
                  value="Decrease Value"
                >
                  <img
                    data-v-a3bfde67
                    loading="lazy"
                    src="/assets/betButtonMinus-D2IIXrqQ.svg"
                  />
                </div>
              )}

              <div data-v-a3bfde67 className="select-digit">
                <input
                  onChange={(e) => {
                    dispatch(setPrice(e.target.value));
                    setIsCashOut(false);
                  }}
                  value={price}
                  data-v-a3bfde67
                  type="number"
                  className="form-control"
                  id="number"
                />
              </div>
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
                  data-v-a3bfde67
                  className="value-button"
                  id="increase"
                  value="Increase Value"
                >
                  <img
                    data-v-a3bfde67
                    loading="lazy"
                    src="/assets/betButtonPlus-BQuXQGw7.svg"
                  />
                </div>
              )}
            </div>
            <div
              data-v-a3bfde67
              className="increment-decrement-sec bet-mobile-show"
            >
              {/* <div
                data-v-a3bfde67
                className="value-button v-left"
                id="decrease"
                value="Decrease Value"
              >
                <img
                  data-v-a3bfde67
                  loading="lazy"
                  src="/assets/betButtonMinus-D2IIXrqQ.svg"
                />
              </div> */}
              <div data-v-a3bfde67 className="select-digit">
                <input
                  data-v-a3bfde67
                  onChange={(e) => {
                    dispatch(setStake(e.target.value));
                    setIsCashOut(false);
                  }}
                  placeholder={`Max bet: ${placeBetValues?.maxLiabilityPerBet}`}
                  value={stake || ""}
                  className="form-control mbetting-table-none"
                />
              </div>
              {/* <div
                data-v-a3bfde67
                className="value-button"
                id="increase"
                value="Increase Value"
              >
                <img
                  data-v-a3bfde67
                  loading="lazy"
                  src="/assets/betButtonPlus-BQuXQGw7.svg"
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div data-v-a3bfde67 className="place-bet">
        <ul
          data-v-a3bfde67
          className="stakesBtns mbetting-table-none"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {parseButtonValues?.map((button, i) => (
            <li
              style={{ maxWidth: "100px" }}
              key={i}
              onClick={() => handleButtonValue(button?.value)}
              data-v-a3bfde67
            >
              <button data-v-a3bfde67 className="btn">
                {button?.value}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div data-v-a3bfde67 className="m_stakesBtns">
        <button
          onClick={() => dispatch(setStake(parseButtonValues[0]?.value))}
          data-v-a3bfde67
          className="btn min-btn"
        >
          Min
        </button>
        <button
          onClick={() =>
            dispatch(
              setStake(
                Number(
                  placeBetValues?.maxLiabilityPerBet?.replace(/k$/i, "000"),
                ),
              ),
            )
          }
          data-v-a3bfde67
          className="btn max-btn"
        >
          Max
        </button>

        <button
          onClick={() => {
            dispatch(setStake(null));
          }}
          data-v-a3bfde67
          className="btn clear-btn"
        >
          Clear
        </button>
      </div>
      <div data-v-a3bfde67 className="mobilebet-btn">
        <button
          style={{ color: "black" }}
          onClick={handleCancelBet}
          data-v-a3bfde67
          className="btn btn-cancel"
        >
          Cancel
        </button>
        <button
          onClick={handleOrderBets}
          data-v-a3bfde67
          className="btn btn-betplace filled-stake"
        >
          Place Bet
        </button>
      </div>
    </div>
  );
};

export default BetSLip;
