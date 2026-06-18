import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useExposure } from "../../../hooks/exposure";
import {
  setPlaceBetValues,
  setRunnerId,
} from "../../../redux/features/events/eventSlice";
import { Settings } from "../../../api";
import BetSLip from "./BetSLip";
import { handleCashOutPlaceBet } from "../../../utils/handleCashoutPlaceBet";
import SpeedCashOut from "../../modals/SpeedCashOut/SpeedCashOut";
import { isGameSuspended } from "../../../utils/isOddSuspended";
import { setShowLoginModal } from "../../../redux/features/global/globalSlice";

const Bookmaker = ({ data }) => {
  const [speedCashOut, setSpeedCashOut] = useState(null);
  const { eventId } = useParams();
  const [teamProfit, setTeamProfit] = useState([]);
  const dispatch = useDispatch();
  const { runnerId, stake, predictOdd } = useSelector((state) => state.event);
  const { token } = useSelector((state) => state.auth);
  const { data: exposure } = useExposure(eventId);

  const handleBetSlip = (betType, games, runner, price) => {
    if (token) {
      let selectionId;
      let runnerId;
      let eventTypeId;
      if (!price) {
        return;
      }

      let pnlBySelection;
      const updatedPnl = [];

      if (exposure?.pnlBySelection) {
        const obj = exposure?.pnlBySelection;
        pnlBySelection = Object?.values(obj);
      }

      if (games?.btype == "FANCY") {
        selectionId = games?.id;
        runnerId = games?.id;
        eventTypeId = games?.eventTypeId;
      } else if (games?.btype && games?.btype !== "FANCY") {
        selectionId = runner?.id;
        runnerId = games.runners.map((runner) => runner.id);
        eventTypeId = games?.eventTypeId;
        games?.runners?.forEach((rnr) => {
          const pnl = pnlBySelection?.find((p) => p?.RunnerId === rnr?.id);
          if (pnl) {
            updatedPnl.push({
              exposure: pnl?.pnl,
              id: pnl?.RunnerId,
              isBettingOnThisRunner: rnr?.id === runner?.id,
            });
          } else {
            updatedPnl.push({
              exposure: 0,
              id: rnr?.id,
              isBettingOnThisRunner: rnr?.id === runner?.id,
            });
          }
        });
      }

      const betData = {
        price,
        side: betType === "back" ? 0 : 1,
        selectionId,
        btype: games?.btype,
        eventTypeId,
        betDelay: games?.betDelay,
        marketId: games?.id,
        lay: betType === "lay",
        back: betType === "back",
        selectedBetName: runner?.name,
        name: games.runners.map((runner) => runner.name),
        runnerId,
        isWeak: games?.isWeak,
        maxLiabilityPerMarket: games?.maxLiabilityPerMarket,
        isBettable: games?.isBettable,
        maxLiabilityPerBet: games?.maxLiabilityPerBet,
        exposure: updatedPnl,
        marketName: games?.name,
        eventId: games?.eventId,
        totalSize: 0,
      };
      if (games?.btype == "FANCY") {
        dispatch(setRunnerId(games?.id));
      } else if (games?.btype && games?.btype !== "FANCY") {
        dispatch(setRunnerId(runner?.id));
      } else {
        dispatch(setRunnerId(runner?.selectionId));
      }

      dispatch(setPlaceBetValues(betData));
    } else {
      dispatch(setShowLoginModal(true));
    }
  };

  const computeExposureAndStake = (
    exposureA,
    exposureB,
    runner1,
    runner2,
    gameId,
  ) => {
    let runner,
      largerExposure,
      layValue,
      oppositeLayValue,
      lowerExposure,
      speedCashOut;

    const pnlArr = [exposureA, exposureB];
    const isOnePositiveExposure = onlyOnePositive(pnlArr);

    if (exposureA > exposureB) {
      // Team A has a larger exposure.
      runner = runner1;
      largerExposure = exposureA;
      layValue = 1 + Number(runner1?.lay?.[0]?.price) / 100;
      oppositeLayValue = 1 + Number(runner2?.lay?.[0]?.price) / 100;
      lowerExposure = exposureB;
    } else {
      // Team B has a larger exposure.
      runner = runner2;
      largerExposure = exposureB;
      layValue = 1 + Number(runner2?.lay?.[0]?.price) / 100;
      oppositeLayValue = 1 + Number(runner1?.lay?.[0]?.price) / 100;
      lowerExposure = exposureA;
    }

    if (exposureA > 0 && exposureB > 0) {
      const difference = Math.abs(exposureA - exposureB);
      if (difference <= 10) {
        speedCashOut = true;
      }
    }

    // Compute the absolute value of the lower exposure.
    let absLowerExposure = Math.abs(lowerExposure);

    // Compute the liability for the team with the initially larger exposure.
    let liability = absLowerExposure * (layValue - 1);

    // Compute the new exposure of the team with the initially larger exposure.
    let newExposure = largerExposure - liability;

    // Compute the profit using the new exposure and the lay odds of the opposite team.
    let profit = newExposure / layValue;

    // Calculate the new stake value for the opposite team by adding profit to the absolute value of its exposure.
    let newStakeValue = absLowerExposure + profit;

    // Return the results.
    return {
      runner,
      newExposure,
      profit,
      newStakeValue,
      oppositeLayValue,
      gameId,
      isOnePositiveExposure,
      exposureA,
      exposureB,
      runner1,
      runner2,
      speedCashOut,
    };
  };
  function onlyOnePositive(arr) {
    let positiveCount = arr?.filter((num) => num > 0).length;
    return positiveCount === 1;
  }
  useEffect(() => {
    let results = [];
    if (
      data?.length > 0 &&
      exposure?.pnlBySelection &&
      Object.keys(exposure?.pnlBySelection)?.length > 0
    ) {
      data.forEach((game) => {
        const runners = game?.runners || [];
        if (runners?.length === 2) {
          const runner1 = runners[0];
          const runner2 = runners[1];
          const pnl1 = pnlBySelection?.find(
            (pnl) => pnl?.RunnerId === runner1?.id,
          )?.pnl;
          const pnl2 = pnlBySelection?.find(
            (pnl) => pnl?.RunnerId === runner2?.id,
          )?.pnl;

          if (pnl1 && pnl2 && runner1 && runner2) {
            const result = computeExposureAndStake(
              pnl1,
              pnl2,
              runner1,
              runner2,
              game?.id,
            );
            results.push(result);
          }
        }
      });
      setTeamProfit(results);
    } else {
      setTeamProfit([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId, data]);

  let pnlBySelection;
  if (exposure?.pnlBySelection) {
    const obj = exposure?.pnlBySelection;
    pnlBySelection = Object?.values(obj);
  }

  return (
    <Fragment>
      {speedCashOut && (
        <SpeedCashOut
          speedCashOut={speedCashOut}
          setSpeedCashOut={setSpeedCashOut}
        />
      )}
      {data?.map((game, i) => {
        const teamProfitForGame = teamProfit?.find(
          (profit) =>
            profit?.gameId === game?.id && profit?.isOnePositiveExposure,
        );
        const speedCashOut = teamProfit?.find(
          (profit) => profit?.gameId === game?.id && profit?.speedCashOut,
        );

        return (
          <div key={i} className="accordion-item">
            <div className="accordion-button">
              <img src="/assets/fav-unfill.png" className="img-fluid" />
              {game?.name?.toUpperCase()}
              {Settings.cashout &&
                game?.runners?.length !== 3 &&
                game?.status === "OPEN" &&
                !speedCashOut && (
                  <button
                    onClick={() =>
                      handleCashOutPlaceBet(
                        game,
                        "lay",
                        dispatch,
                        pnlBySelection,
                        token,
                        teamProfitForGame,
                      )
                    }
                    className="btn btn_cashout"
                    disabled
                  >
                    Cashout
                  </button>
                )}
              {Settings.cashout &&
                game?.runners?.length !== 3 &&
                game?.status === "OPEN" &&
                game?.name !== "toss" &&
                speedCashOut && (
                  <button
                    onClick={() =>
                      setSpeedCashOut({
                        ...speedCashOut,
                        market_name: game?.name,
                        event_name: game?.eventName,
                      })
                    }
                    disabled={isGameSuspended(game)}
                    className="btn btn_losscut"
                  >
                    Speed Cashout
                  </button>
                )}

              <button className="marketrulesicon">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/665/665049.png"
                  className="img-fluid"
                />
              </button>
              <a
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseOne"
                aria-expanded="true"
                aria-controls="panelsStayOpen-collapseOne"
                className="on_off_div_btn"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/130/130906.png"
                  className="img-fluid"
                />
              </a>
            </div>
            <div
              id="panelsStayOpen-collapseOne"
              className="accordion-collapse collapse show"
            >
              <div className="accordion-body">
                <div>
                  <div>
                    <div className="details_market_div head_bl">
                      <div className="dmd_left">
                        <b className="min-max">
                          Min: <span>{game?.minLiabilityPerBet}</span> Max:{" "}
                          <span>{game?.maxLiabilityPerBet}</span>
                        </b>
                      </div>
                      <div className="dmd_right">
                        <div className="dmd_odds">
                          <button className="mhide" />
                          <button className="mhide" />
                          <button className="back">back</button>
                          <button className="lay">lay</button>
                          <button className="mhide" />
                          <button className="mhide" />
                        </div>
                      </div>
                    </div>
                    {game?.runners?.map((runner, i) => {
                      const pnl = pnlBySelection?.find(
                        (pnl) => pnl?.RunnerId === runner?.id,
                      );
                      const predictOddValues = predictOdd?.find(
                        (val) => val?.id === runner?.id,
                      );
                      return (
                        <div key={runner?.id + i}>
                          <div className="details_market_div">
                            <div className="dmd_left">
                              <span className="marketEventName">
                                {runner?.name}
                              </span>
                              <span className="mrkt-volume">
                                {" "}
                                {pnl && (
                                  <span
                                    className={`${
                                      pnl?.pnl > 0
                                        ? "text-success"
                                        : "text-danger"
                                    }`}
                                  >
                                    {pnl?.pnl}
                                  </span>
                                )}
                                {stake && runnerId && predictOddValues && (
                                  <span
                                    style={{ marginLeft: "10px" }}
                                    className={` ${
                                      predictOddValues?.exposure > 0
                                        ? "text-success"
                                        : "text-danger"
                                    } `}
                                  >
                                    » &nbsp;({predictOddValues?.exposure})
                                  </span>
                                )}
                              </span>
                            </div>
                            <div className="dmd_right">
                              <div className="dmd_odds">
                                <button
                                  onClick={() =>
                                    handleBetSlip(
                                      "back",
                                      game,
                                      runner,
                                      runner?.back?.[2]?.price,
                                    )
                                  }
                                  className="back_light mhide"
                                >
                                  {runner?.back?.[2]?.price}{" "}
                                  <em>{runner?.back?.[2]?.size}</em>
                                </button>
                                <button
                                  onClick={() =>
                                    handleBetSlip(
                                      "back",
                                      game,
                                      runner,
                                      runner?.back?.[1]?.price,
                                    )
                                  }
                                  className="back_light mhide"
                                >
                                  {runner?.back?.[1]?.price}{" "}
                                  <em>{runner?.back?.[1]?.size}</em>
                                </button>
                                <button
                                  onClick={() =>
                                    handleBetSlip(
                                      "back",
                                      game,
                                      runner,
                                      runner?.back?.[0]?.price,
                                    )
                                  }
                                  className="back"
                                >
                                  {runner?.back?.[0]?.price}{" "}
                                  <em>{runner?.back?.[0]?.size}</em>
                                </button>
                                <button
                                  onClick={() =>
                                    handleBetSlip(
                                      "lay",
                                      game,
                                      runner,
                                      runner?.lay?.[0]?.price,
                                    )
                                  }
                                  className="lay"
                                >
                                  {runner?.lay?.[0]?.price}{" "}
                                  <em> {runner?.lay?.[0]?.size}</em>
                                </button>
                                <button
                                  onClick={() =>
                                    handleBetSlip(
                                      "lay",
                                      game,
                                      runner,
                                      runner?.lay?.[1]?.price,
                                    )
                                  }
                                  className="lay_light mhide"
                                >
                                  {runner?.lay?.[1]?.price}{" "}
                                  <em>{runner?.lay?.[1]?.size}</em>
                                </button>
                                <button
                                  onClick={() =>
                                    handleBetSlip(
                                      "lay",
                                      game,
                                      runner,
                                      runner?.lay?.[2]?.price,
                                    )
                                  }
                                  className="lay_light mhide"
                                >
                                  {runner?.lay?.[2]?.price}{" "}
                                  <em> {runner?.lay?.[2]?.size}</em>
                                </button>
                                {runner?.status === "SUSPENDED" && (
                                  <div className="suspended">suspended</div>
                                )}
                              </div>
                            </div>
                          </div>
                          {runner?.id === runnerId && (
                            <div className="col-lg-12 col-md-12 col-12 px-0 d-lg-none ng-star-inserted">
                              <BetSLip />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};

export default Bookmaker;
