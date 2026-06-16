import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useExposure } from "../../../hooks/exposure";
import {
  setPlaceBetValues,
  setRunnerId,
} from "../../../redux/features/events/eventSlice";
import toast from "react-hot-toast";
import BetSLip from "./BetSLip";

const HorseGreyhoundEventDetails = ({ data }) => {
  const { runnerId } = useSelector((state) => state.event);
  const { eventId } = useParams();
  const { data: exposure } = useExposure(eventId);
  const { token } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const [timeDiff, setTimeDiff] = useState({
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
  });

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
      toast.error("Please login to place a bet.");
    }
  };

  useEffect(() => {
    if (!data?.[0]?.openDate) return;

    const targetDateStr = data[0].openDate;
    const [date, time] = targetDateStr.split(" ");
    const [day, month, year] = date.split("/");
    const [hour, minute, second] = time.split(":");

    const targetDate = new Date(year, month - 1, day, hour, minute, second);

    const initialTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        const currentDate = new Date();
        const diffInMs = targetDate - currentDate;

        if (diffInMs <= 0) {
          clearInterval(interval);
          setTimeDiff({ day: 0, hour: 0, minute: 0, second: 0 });
          return;
        }

        const day = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        const hour = Math.floor(
          (diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minute = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
        const second = Math.floor((diffInMs % (1000 * 60)) / 1000);

        setTimeDiff({ day, hour, minute, second });
      }, 1000);

      return () => clearInterval(interval);
    }, 1000);

    return () => clearTimeout(initialTimeout);
  }, []);
  return (
    <Fragment>
      <div className="horse-banner">
        <img
          style={{ width: "100%" }}
          src="https://g1ver.sprintstaticdata.com/v42/static/front/img/10.png"
          className="img-fluid"
        />
        <div className="horse-banner-detail">
          <div className="text-success">OPEN</div>
          {timeDiff?.day ||
          timeDiff?.hour ||
          timeDiff?.minute ||
          timeDiff?.second ? (
            <div className="horse-timer">
              <span style={{ display: "flex", gap: "5px" }}>
                {timeDiff?.day > 0 && (
                  <span>
                    {timeDiff?.day} <small>Day</small>
                  </span>
                )}
                {timeDiff?.hour > 0 && (
                  <span>
                    {timeDiff?.hour} <small>Hour</small>
                  </span>
                )}
                {timeDiff?.minute > 0 && (
                  <span>
                    {timeDiff?.minute} <small>Minutes</small>
                  </span>
                )}
                {timeDiff?.hour === 0 && timeDiff?.minute < 60 && (
                  <span>
                    {timeDiff?.second} <small>Seconds</small>
                  </span>
                )}
              </span>
              <span>Remaining</span>
            </div>
          ) : null}

          <div className="time-detail">
            <p>{data?.[0]?.eventName}</p>
            <h5>
              <span>{data?.[0]?.openDate}</span>
              <span>| {data?.[0]?.raceType}</span>
            </h5>
          </div>
        </div>
      </div>
      {data?.map((game) => {
        return (
          <div
            key={game?.id}
            className="matchodds-cashout sat-odds-bk-ly-btn-design"
          >
            <div className="dScreen">
              <div className="odds-menu">
                <div className="row">
                  <div className="col-12 col-md-7">
                    <div className="sat-match-odds-flex">
                      <div className="match-odds-wrap">
                        <p className="match-odds titleMax">
                          {" "}
                          {game?.name?.toUpperCase()}
                        </p>
                        <span>
                          <img
                            loading="lazy"
                            src="/assets/pin-white-rQYS-7hC.svg"
                            className="img-fluid match-odds-pin"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="odds-menu btn-color">
                <div className="row">
                  <div className="col-md-5 col-7">
                    <div className="minmax mm-fi p-1">
                      <dl className="fancy-info m-0">
                        <dt>Min/Max</dt>
                        <dd>
                          {" "}
                          {game?.minLiabilityPerBet}-{game?.maxLiabilityPerBet}
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-7 col-5">
                    <div className="btn-group dOddsBox">
                      <div className="back dOddsBox-wrap">
                        <button className="back back-img">Back</button>
                      </div>
                      <div className="lay dOddsBox-wrap">
                        <button className="lay lay-img">Lay</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {game?.runners?.map((runner) => {
                  return (
                    <div key={runner?.id} className="odds-menu bet-slip-area">
                      <div className="row">
                        <div className="col-md-5 col-7">
                          <p className="team-name">
                            {runner?.horse_name} &nbsp;{" "}
                            <span className="SportEvent__market__title__exposure">
                              <div
                                className="jockey-detail sm-d-none d-md-flex"
                                style={{ display: "flex" }}
                              >
                                {runner?.jocky && (
                                  <span className="jockey-detail-box">
                                    <b>Jockey:</b>
                                    <span style={{ fontWeight: "normal" }}>
                                      {runner?.jocky}
                                    </span>
                                  </span>
                                )}
                                {runner?.trainer && (
                                  <span className="jockey-detail-box">
                                    <b>Trainer:</b>
                                    <span style={{ fontWeight: "normal" }}>
                                      {runner?.trainer}
                                    </span>
                                  </span>
                                )}
                                {runner?.age && (
                                  <span className="jockey-detail-box">
                                    <b>Age:</b>
                                    <span style={{ fontWeight: "normal" }}>
                                      {runner?.age}
                                    </span>
                                  </span>
                                )}
                              </div>
                            </span>
                          </p>
                        </div>
                        <div className="col-md-7 col-5">
                          <div className="btn-group dOddsBox">
                            <div className="back dOddsBox-wrap">
                              <button
                                onClick={() =>
                                  handleBetSlip(
                                    "back",
                                    game,
                                    runner,
                                    runner?.back?.[2]?.price,
                                  )
                                }
                                type="button"
                                className="back back2"
                              >
                                {runner?.back?.[2]?.price}{" "}
                                <span> {runner?.back?.[2]?.size}</span>
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
                                type="button"
                                className="back back1"
                              >
                                {runner?.back?.[1]?.price}{" "}
                                <span>{runner?.back?.[1]?.size}</span>
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
                                type="button"
                                className="back"
                              >
                                {runner?.back?.[0]?.price}{" "}
                                <span>{runner?.back?.[0]?.size}</span>
                              </button>
                            </div>
                            <div className="lay dOddsBox-wrap">
                              <button
                                onClick={() =>
                                  handleBetSlip(
                                    "lay",
                                    game,
                                    runner,
                                    runner?.lay?.[0]?.price,
                                  )
                                }
                                type="button"
                                className="lay"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseExample-one"
                              >
                                {runner?.lay?.[0]?.price}
                                <span> {runner?.lay?.[0]?.size}</span>
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
                                type="button"
                                className="lay lay1"
                              >
                                {runner?.lay?.[1]?.price}{" "}
                                <span>{runner?.lay?.[1]?.size}</span>
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
                                type="button"
                                className="lay lay2"
                              >
                                {runner?.lay?.[2]?.price}{" "}
                                <span> {runner?.lay?.[2]?.size}</span>
                              </button>
                            </div>
                            {runner?.status !== "OPEN" && (
                              <div className="suspended">{runner?.status}</div>
                            )}
                          </div>
                        </div>
                      </div>
                      {runner?.id === runnerId && (
                        <BetSLip currentPlaceBetEvent={game} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};

export default HorseGreyhoundEventDetails;
