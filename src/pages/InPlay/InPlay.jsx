import moment from "moment";
import { useGroupQuery } from "../../hooks/group";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const InPlay = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { data } = useGroupQuery({ sportsType: 0 });
  const [tab, setTab] = useState("inPlay");
  const eventName = {
    1: "Football",
    2: "Tennis",
    4: "Cricket",
  };

  const todayMoment = moment().startOf("day");
  const groupedData = useMemo(() => {
    if (!data) return { inPlay: {}, today: {}, upcoming: {} };

    return Object.entries(data).reduce(
      (acc, [key, value]) => {
        if (!value.visible) return acc;

        const matchDate = moment(value.date, "DD/MM/YYYY HH:mm");

        if (value.inPlay === 1) {
          acc.inPlay[key] = value;
        } else if (matchDate.isSame(todayMoment, "day")) {
          acc.today[key] = value;
        } else {
          acc.upcoming[key] = value;
        }

        return acc;
      },
      { inPlay: {}, today: {}, upcoming: {} },
    );
  }, [data]);

  const finalData =
    tab === "inPlay"
      ? groupedData.inPlay
      : tab === "today"
        ? groupedData.today
        : groupedData.upcoming;
  const navigateGameList = (keys) => {
    navigate(`/event-details/${data[keys]?.eventTypeId}/${keys}`);
  };

  //   const sortedData = Object.entries(finalData)
  //     .filter(([, value]) => value.visible === true)
  //     .sort(([, a], [, b]) => {
  //       return b.inPlay - a.inPlay;
  //     });

  useEffect(() => {
    if (finalData) {
      const categories = Array.from(
        new Set(
          Object.values(finalData)
            .filter((item) => item.visible)
            .map((item) => item.eventTypeId),
        ),
      );
      const sortedCategories = categories.sort((a, b) => {
        const order = { 4: 0, 1: 1, 2: 2 };
        return order[a] - order[b];
      });
      setCategories(sortedCategories);
    }
  }, [finalData]);

  return (
    <div data-v-2f3cedbb>
      <section
        data-v-2f3cedbb
        className="simplebar-content-wrapper dashbord-p-top"
        loading="lazy"
      >
        <div className="contan">
          <div className="user-box">
            <div className="match-menu">
              <div data-v-1354c224 className="match-days-tab">
                <div data-v-1354c224 className="match-days-head">
                  <ul
                    data-v-1354c224
                    className="nav nav-tabs"
                    id="myTab"
                    role="tablist"
                  >
                    <li
                      data-v-1354c224
                      className="nav-item"
                      role="presentation"
                    >
                      <button
                        onClick={() => setTab("inPlay")}
                        data-v-1354c224
                        className={`nav-link  ${tab === "inPlay" ? "active" : ""}`}
                        id="home-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#home"
                        type="button"
                        role="tab"
                        aria-controls="home"
                        aria-selected="true"
                      >
                        <span data-v-1354c224>In-Play </span>
                      </button>
                    </li>
                    <li
                      data-v-1354c224
                      className="nav-item"
                      role="presentation"
                    >
                      <button
                        onClick={() => setTab("today")}
                        data-v-1354c224
                        className={`nav-link  ${tab === "today" ? "active" : ""}`}
                        id="profile-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#profile"
                        type="button"
                        role="tab"
                        aria-controls="profile"
                        aria-selected="false"
                      >
                        <span data-v-1354c224>Today</span>
                      </button>
                    </li>
                    <li
                      data-v-1354c224
                      className="nav-item"
                      role="presentation"
                    >
                      <button
                        onClick={() => setTab("tomorrow")}
                        data-v-1354c224
                        className={`nav-link  ${tab === "tomorrow" ? "active" : ""}`}
                        id="contact-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#contact"
                        type="button"
                        role="tab"
                        aria-controls="contact"
                        aria-selected="false"
                      >
                        <span data-v-1354c224>Tomorrow</span>
                      </button>
                    </li>
                  </ul>
                </div>
                <div
                  data-v-1354c224
                  className="play-days-match inplayMatch-wrap"
                >
                  {categories?.map((category) => {
                    const filteredData = Object.entries(finalData).filter(
                      ([, value]) =>
                        value.eventTypeId === category &&
                        value.visible === true,
                    );

                    return (
                      <div key={category} data-v-1354c224 className="tab-set">
                        <div data-v-1354c224 className="tab-panel hero-img">
                          <div data-v-1354c224 className="match-play">
                            <div data-v-1354c224 className="ng-star-inserted">
                              <div
                                data-v-1354c224
                                className="competition-head inplay-header-filter"
                              >
                                <h3 data-v-1354c224 className="text-capitalize">
                                  {eventName[category]}
                                </h3>
                              </div>
                              <div className="oneX2" data-v-1354c224>
                                <div
                                  className="container-fluid"
                                  data-v-1354c224
                                >
                                  <div className="row" data-v-1354c224>
                                    <div className="col-md-7" data-v-1354c224 />
                                    <div className="col-md-4" data-v-1354c224>
                                      <div
                                        className="oddsEventlist"
                                        data-v-1354c224
                                      >
                                        <div
                                          className="btn-group"
                                          data-v-1354c224
                                        >
                                          <span data-v-1354c224>1</span>
                                        </div>
                                        <div
                                          className="btn-group"
                                          data-v-1354c224
                                        >
                                          <span data-v-1354c224>X</span>
                                        </div>
                                        <div
                                          className="btn-group"
                                          data-v-1354c224
                                        >
                                          <span data-v-1354c224>2</span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-1" data-v-1354c224 />
                                  </div>
                                </div>
                              </div>
                              <div data-v-1354c224 className="ng-star-inserted">
                                <div
                                  data-v-c9d3df59
                                  className="odds-header-container"
                                ></div>

                                {filteredData.map(([key, value]) => {
                                  return (
                                    <div
                                      onClick={() => navigateGameList(key)}
                                      key={key}
                                      data-v-c9d3df59
                                      className="sportsWrap-list"
                                    >
                                      <div
                                        data-v-c9d3df59
                                        className="matchname match-details-head"
                                      >
                                        <div
                                          data-v-c9d3df59
                                          className="match-name-h"
                                        >
                                          <div
                                            data-v-c9d3df59
                                            className="topLine"
                                          >
                                            <a data-v-c9d3df59>
                                              {value?.eventName}
                                            </a>

                                            {value?.inPlay === 1 ? (
                                              <span
                                                data-v-c9d3df59
                                                className="inplay-animation-text"
                                              >
                                                In-Play
                                              </span>
                                            ) : (
                                              <span
                                                data-v-c9d3df59
                                                className="clock-icon fas fa-clock"
                                              />
                                            )}
                                          </div>
                                          <span
                                            data-v-c9d3df59
                                            className="match-time-and-date"
                                          >
                                            {value?.date}
                                          </span>
                                        </div>
                                        <div
                                          data-v-c9d3df59
                                          className="game-bookmaker-icons"
                                        >
                                          {value?.isBookmaker === 1 && (
                                            <span
                                              data-v-c9d3df59
                                              className="game-bookmakers"
                                            >
                                              BM
                                            </span>
                                          )}
                                          {value?.isFancy === 1 && (
                                            <span
                                              data-v-c9d3df59
                                              className="game-fancy"
                                            >
                                              F
                                            </span>
                                          )}
                                          {value?.isTv === 1 && (
                                            <span
                                              data-v-c9d3df59
                                              className="game-sportbook"
                                            >
                                              TV
                                            </span>
                                          )}
                                        </div>
                                        <div
                                          data-v-c9d3df59
                                          className="oddsEventlist"
                                        >
                                          <div
                                            data-v-c9d3df59
                                            className="btn-group"
                                          >
                                            <button
                                              data-v-c9d3df59
                                              className="back"
                                            >
                                              {value?.[0]?.ex
                                                ?.availableToBack?.[0]?.price ||
                                                "-"}
                                            </button>
                                            <button
                                              data-v-c9d3df59
                                              className="lay"
                                            >
                                              {value?.[0]?.ex
                                                ?.availableToLay?.[0]?.price ||
                                                "-"}
                                            </button>
                                          </div>
                                          <div
                                            data-v-c9d3df59
                                            className="btn-group"
                                          >
                                            <button
                                              data-v-c9d3df59
                                              className="back"
                                            >
                                              {value?.[2]?.ex
                                                ?.availableToBack?.[0]?.price ||
                                                "-"}
                                            </button>
                                            <button
                                              data-v-c9d3df59
                                              className="lay"
                                            >
                                              {value?.[2]?.ex
                                                ?.availableToLay?.[0]?.price ||
                                                "-"}
                                            </button>
                                          </div>
                                          <div
                                            data-v-c9d3df59
                                            className="btn-group"
                                          >
                                            <button
                                              data-v-c9d3df59
                                              className="back"
                                            >
                                              {value?.[1]?.ex
                                                ?.availableToBack?.[0]?.price ||
                                                "-"}
                                            </button>
                                            <button
                                              data-v-c9d3df59
                                              className="lay"
                                            >
                                              {value?.[1]?.ex
                                                ?.availableToLay?.[0]?.price ||
                                                "-"}
                                            </button>
                                          </div>
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
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InPlay;
