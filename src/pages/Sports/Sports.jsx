import { useNavigate, useParams } from "react-router-dom";
import { useGroupQuery } from "../../hooks/group";
import SportsTab from "../../components/modules/Sports/SportsTab";
import { EVENT_NAMES } from "../../const";

const Sports = () => {
  const navigate = useNavigate();
  const { eventTypeId } = useParams();
  const { data } = useGroupQuery({
    sportsType: Number(eventTypeId),
  });

  const groupedData =
    data && data !== null && Object.keys(data).length > 0
      ? Object.entries(data)
          .filter(([, value]) => value.visible === true)
          .sort(([, a], [, b]) => {
            return b.inPlay - a.inPlay;
          })
      : [];

  const navigateGameList = (eventTypeId, keys) => {
    navigate(`/event-details/${eventTypeId}/${keys}`);
  };

  return (
    <main>
      <div className="container" style={{ maxWidth: "100%" }}>
        <div className="sportlist_div">
          <div className="tab-container">
            <SportsTab />
            {eventTypeId != 7 &&
              eventTypeId != 4339 &&
              groupedData?.length > 0 && (
                <div className="tab-content">
                  <div
                    role="tabpanel"
                    aria-labelledby
                    className="tab-pane active"
                  >
                    <div className="sports_accordion">
                      <div
                        id="accordionsports_accordionExample"
                        className="accordion"
                      >
                        <div className="accordion-item">
                          <a
                            data-bs-toggle="collapse"
                            data-bs-target="#sports_accordion-inplay"
                            aria-expanded="true"
                            aria-controls="sports_accordion-inplay"
                            className="accordion-button"
                          >
                            {EVENT_NAMES[Number(eventTypeId)]}
                          </a>
                          <div
                            id="sports_accordion-inplay"
                            className="accordion-collapse collapse show"
                          >
                            <div className="accordion-body">
                              <div>
                                <div>
                                  <div>
                                    <div>
                                      <div className="sports_accordion sports_accordion_sub">
                                        <div
                                          id="accordionsports_accordionExample"
                                          className="accordion"
                                        >
                                          <div className="accordion-item">
                                            <div
                                              className="accordion-collapse collapse show"
                                              id="sports_accordion-ipl-inPlay-0"
                                            >
                                              <div className="accordion-body">
                                                <div className="data_sportlist">
                                                  {groupedData &&
                                                    groupedData.map(
                                                      ([key, value]) => {
                                                        return (
                                                          <div
                                                            onClick={() =>
                                                              navigateGameList(
                                                                value?.eventTypeId,
                                                                key,
                                                              )
                                                            }
                                                            key={key}
                                                            className="ds_tablerow"
                                                          >
                                                            <div className="dsl_col-6">
                                                              <div className="game_left_part">
                                                                <span className="dsl_event">
                                                                  <img
                                                                    src="/assets/fav-unfill.png"
                                                                    className="img-fluid"
                                                                    style={{
                                                                      width:
                                                                        "16px",
                                                                      marginRight:
                                                                        "2px",
                                                                    }}
                                                                  />
                                                                  {value?.inPlay ===
                                                                    1 && (
                                                                    <span className="inplay-dot blink" />
                                                                  )}
                                                                  {
                                                                    value?.eventName
                                                                  }
                                                                </span>
                                                                <div className="d-flex w-100 justify-content-between align-items-center">
                                                                  <span className="dsl_date">
                                                                    {
                                                                      value?.date
                                                                    }
                                                                  </span>
                                                                  <span className="market_highlight">
                                                                    {value?.isBookmaker ===
                                                                      1 && (
                                                                      <a className="fancy">
                                                                        bm
                                                                      </a>
                                                                    )}
                                                                    {value?.isFancy ===
                                                                      1 && (
                                                                      <a className="fancy">
                                                                        f
                                                                      </a>
                                                                    )}
                                                                    {value?.isTv ===
                                                                      1 && (
                                                                      <a className="tv">
                                                                        <img
                                                                          src="/assets/icon-tv.svg"
                                                                          className="img-fluid"
                                                                        />
                                                                      </a>
                                                                    )}
                                                                  </span>
                                                                </div>
                                                              </div>
                                                            </div>
                                                            <div className="dsl_col-6">
                                                              <div className="dsl_bl_div">
                                                                <div className="h_bl">
                                                                  <button className="back">
                                                                    {value?.[0]
                                                                      ?.ex
                                                                      ?.availableToBack?.[0]
                                                                      ?.price ||
                                                                      "-"}
                                                                  </button>
                                                                  <button className="lay">
                                                                    {value?.[0]
                                                                      ?.ex
                                                                      ?.availableToLay?.[0]
                                                                      ?.price ||
                                                                      "-"}
                                                                  </button>
                                                                </div>
                                                                <div className="h_bl mhide">
                                                                  <button className="back">
                                                                    {value?.[2]
                                                                      ?.ex
                                                                      ?.availableToBack?.[0]
                                                                      ?.price ||
                                                                      "-"}
                                                                  </button>
                                                                  <button className="lay">
                                                                    {value?.[2]
                                                                      ?.ex
                                                                      ?.availableToLay?.[0]
                                                                      ?.price ||
                                                                      "-"}
                                                                  </button>
                                                                </div>
                                                                <div className="h_bl mhide">
                                                                  <button className="back">
                                                                    {value?.[1]
                                                                      ?.ex
                                                                      ?.availableToBack?.[0]
                                                                      ?.price ||
                                                                      "-"}
                                                                  </button>
                                                                  <button className="lay">
                                                                    {value?.[1]
                                                                      ?.ex
                                                                      ?.availableToLay?.[0]
                                                                      ?.price ||
                                                                      "-"}
                                                                  </button>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        );
                                                      },
                                                    )}
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
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Sports;
