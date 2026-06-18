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
      {data?.map((game, i) => {
        return (
          <div key={i} className="accordion-item">
            <div className="accordion-button">
              <img src="/assets/fav-unfill.png" className="img-fluid" />
              {game?.name?.toUpperCase()}

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
                      return (
                        <div key={runner?.id + i}>
                          <div className="details_market_div">
                            <div className="dmd_left">
                              <span className="marketEventName">
                                {runner?.horse_name}
                              </span>
                              <span className="mrkt-volume">
                                {" "}
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

export default HorseGreyhoundEventDetails;
