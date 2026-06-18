import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useExposure } from "../../../hooks/exposure";
import { useGetLadderMutation } from "../../../redux/features/events/events";
import {
  setPlaceBetValues,
  setRunnerId,
} from "../../../redux/features/events/eventSlice";
import toast from "react-hot-toast";
import BetSLip from "./BetSLip";
import Ladder from "../../modals/Ladder/Ladder";
import images from "../../../assets/images";

const Fancy = ({ data }) => {
  const fancyData = data?.filter(
    (fancy) =>
      fancy.btype === "FANCY" &&
      fancy.tabGroupName === "Normal" &&
      fancy?.visible == true,
  );

  const [ladderData, setLadderData] = useState([]);
  const { eventId } = useParams();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { runnerId } = useSelector((state) => state.event);
  const { data: exposure } = useExposure(eventId);
  const [getLadder] = useGetLadderMutation();

  const handleBetSlip = (betType, games, runner, price, bottomValue) => {
    if (token) {
      let selectionId;
      let runnerId;
      let eventTypeId;
      if (games?.status !== "OPEN") return;
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
        games?.runners?.forEach((runner) => {
          const pnl = pnlBySelection?.find((p) => p?.RunnerId === runner?.id);
          if (pnl) {
            updatedPnl.push(pnl?.pnl);
          }
        });
      } else {
        selectionId = runner?.selectionId;
        eventTypeId = games?.marketId;
        games?.runners?.forEach((runner) => {
          const pnl = pnlBySelection?.find(
            (p) => p?.RunnerId === runner?.selectionId,
          );
          if (pnl) {
            updatedPnl.push(pnl?.pnl);
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
        pnl: updatedPnl,
        marketName: games?.name,
        eventId: games?.eventId,
        totalSize: 0,
        bottomValue,
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
      toast.error("Please login to place a bet.");
    }
  };

  let pnlBySelection;
  if (exposure?.pnlBySelection) {
    const obj = exposure?.pnlBySelection;
    pnlBySelection = Object?.values(obj);
  }

  const handleGetLadder = async (pnl) => {
    if (!pnl?.MarketId) {
      return;
    }

    const res = await getLadder({ marketId: pnl?.MarketId }).unwrap();

    if (res.success) {
      setLadderData(res.result);
    }
  };

  return (
    <Fragment>
      {ladderData?.length > 0 && (
        <Ladder ladderData={ladderData} setLadderData={setLadderData} />
      )}
      {fancyData?.length > 0 && (
        <div className="accordion-item">
          <a
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseFour"
            aria-expanded="false"
            aria-controls="panelsStayOpen-collapseThree"
            className="accordion-button"
          >
            fancy
            <button className="marketrulesicon">
              <img
                src="https://cdn-icons-png.flaticon.com/512/665/665049.png"
                className="img-fluid"
              />
            </button>
          </a>
          <div
            id="panelsStayOpen-collapseFour"
            className="accordion-collapse collapse show"
          >
            <div className="accordion-body p-0">
              <div>
                <div type="tabs fancy-subtabs" className="tab-container">
                  <div className="tab-content">
                    <div
                      role="tabpanel"
                      aria-labelledby
                      className="tab-pane active"
                    >
                      <div>
                        <div>
                          <div>
                            <div className="details_market_div head_bl">
                              <div className="dmd_left" />
                              <div className="dmd_right">
                                <div className="dmd_odds">
                                  <button className="mhide" />
                                  <button className="mhide" />
                                  <button className="bg-light lay">lay</button>
                                  <button className="bg-light back">
                                    back
                                  </button>
                                  <button className="mhide" />
                                  <button className="mhide" />
                                </div>
                              </div>
                            </div>
                            {fancyData?.map((game) => {
                              const pnl = pnlBySelection?.find(
                                (pnl) => pnl?.MarketId === game?.id,
                              );

                              return (
                                <div key={game?.id}>
                                  <div>
                                    <div>
                                      <div className="details_market_div fancy_dmd_div">
                                        <div
                                          className="dmd_left"
                                          style={{
                                            justifyContent: "space-between",
                                          }}
                                        >
                                          {/* <img
                                            src="assets/images/icons/fav-unfill.png"
                                            className="img-fluid"
                                          /> */}

                                          <span className="marketEventName">
                                            {game?.name}
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
                                          </span>
                                          {pnl?.pnl && (
                                            <div
                                              style={{
                                                cursor: "pointer",
                                              }}
                                              onClick={() =>
                                                handleGetLadder(pnl)
                                              }
                                              className="sucess-simbal"
                                            >
                                              <img src={images.ladder} alt="" />
                                            </div>
                                          )}
                                        </div>
                                        <div className="dmd_right">
                                          <div className="dmd_odds">
                                            <div>
                                              <button
                                                onClick={() =>
                                                  handleBetSlip(
                                                    "lay",
                                                    game,
                                                    game?.runners?.[0],
                                                    game?.runners?.[0]?.lay?.[0]
                                                      ?.line,
                                                    game?.runners?.[0]?.lay?.[0]
                                                      ?.price,
                                                  )
                                                }
                                                className="lay"
                                              >
                                                {
                                                  game?.runners?.[0]?.lay?.[0]
                                                    ?.line
                                                }{" "}
                                                <em>
                                                  {" "}
                                                  {
                                                    game?.runners?.[0]?.lay?.[0]
                                                      ?.price
                                                  }{" "}
                                                </em>
                                              </button>
                                              <button
                                                onClick={() =>
                                                  handleBetSlip(
                                                    "back",
                                                    game,
                                                    game?.runners?.[0],
                                                    game?.runners?.[0]
                                                      ?.back?.[0]?.line,
                                                    game?.runners?.[0]
                                                      ?.back?.[0]?.price,
                                                  )
                                                }
                                                className="back"
                                              >
                                                {
                                                  game?.runners?.[0]?.back?.[0]
                                                    ?.line
                                                }{" "}
                                                <em>
                                                  {" "}
                                                  {
                                                    game?.runners?.[0]
                                                      ?.back?.[0]?.price
                                                  }{" "}
                                                </em>
                                              </button>
                                              {game?.status === "SUSPENDED" && (
                                                <div className="suspended">
                                                  suspended
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      {game?.id === runnerId && (
                                        <div className="col-lg-12 col-md-12 col-12 px-0 d-lg-none ng-star-inserted">
                                          <BetSLip />
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Fancy;
