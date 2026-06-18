import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment-timezone";
const HorseGreyhound = ({ data }) => {
  const { eventTypeId } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(
    data?.[0]?.childs?.[0]?.countryCode,
  );

  useEffect(() => {
    if (data) {
      setSelectedCategory(data?.[0]?.childs?.[0]?.countryCode);
    }
  }, [data]);

  const findChildByCountryCode =
    selectedCategory &&
    data &&
    data?.[0]?.childs?.find((child) => child?.countryCode === selectedCategory);

  const convertToIST = (utc) => {
    return moment(utc).tz("Asia/Kolkata").format("HH:mm");
  };
  return (
    <div className="tab-content">
      <div role="tabpanel" aria-labelledby className="tab-pane active">
        <div>
          <div>
            <div className="card-body card-content p-0">
              <div className="title-header">
                <div className="row align-items-center">
                  <div className="col-md-12">
                    <span
                      className="list-sport-title"
                      style={{ color: "black" }}
                    >
                      <img
                        className="img-fluid game-icon-img"
                        src={`/assets/icon-${eventTypeId}.svg`}
                      />{" "}
                      {eventTypeId === "4339"
                        ? "Greyhound Racing"
                        : "Horse Racing"}{" "}
                    </span>
                  </div>
                </div>
              </div>
              <div className="bet-table-body fancy-tab">
                <div type="tab fancy-subtabs" className="tab-container">
                  <ul
                    role="tablist"
                    className="nav nav-tab fancy-subtabs"
                    aria-label="Tabs"
                  >
                    {data?.map((item) =>
                      item?.childs?.map((child) => {
                        return (
                          <li
                            onClick={() =>
                              setSelectedCategory(child?.countryCode)
                            }
                            key={child?.countryCode}
                            className={` nav-item ${
                              child?.countryCode === selectedCategory
                                ? "active"
                                : ""
                            }`}
                          >
                            <a
                              role="tab"
                              className={`nav-link ${
                                child?.countryCode === selectedCategory
                                  ? "active"
                                  : ""
                              }`}
                              aria-controls
                              aria-selected="true"
                              id
                            >
                              <span>{child?.countryCode}</span>
                            </a>
                          </li>
                        );
                      }),
                    )}
                  </ul>
                  <div className="tab-content">
                    {findChildByCountryCode?.childs?.map((child) => {
                      return (
                        <div
                          key={child?.trackName}
                          role="tabpanel"
                          aria-labelledby
                          className="tab-pane active"
                        >
                          <div className="bet-table-row">
                            <div className="row align-items-center">
                              <div className="col-md-3 col-12">
                                <div className="game-box">
                                  <div className="game-left-col">
                                    <div className="game-name">
                                      <a>
                                        <p className="m-0">
                                          {child?.trackName}
                                        </p>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-9 col-12 text-left">
                                <div className="racing_listing">
                                  {child?.childs?.map((children) => {
                                    return (
                                      <a
                                        key={children?.eventId}
                                        onClick={() =>
                                          navigate(
                                            `/event-details/${eventTypeId}/${children?.eventId}`,
                                          )
                                        }
                                        className="rl_div"
                                      >
                                        <span className="d-block bet-button-price">
                                          {" "}
                                          {convertToIST(children?.startTime)}
                                        </span>
                                      </a>
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
        </div>
      </div>
    </div>
  );
};

export default HorseGreyhound;
