import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCurrentBets } from "../../../hooks/currentBets";
import useSBCashOut from "../../../hooks/sb_cashout";
import { useGetEventDetailsQuery } from "../../../redux/features/events/events";
import toast from "react-hot-toast";
import { useRef } from "react";
import useCloseModalClickOutside from "../../../hooks/closeModal";

const OpenBets = ({ setShowOpenBets }) => {
  const ref = useRef();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { eventId, eventTypeId } = useParams();
  const {
    data: myBets,
    refetch: refetchCurrentBets,
    isSuccess,
  } = useCurrentBets(eventId);

  const { mutate: cashOut } = useSBCashOut();
  const { data: eventData } = useGetEventDetailsQuery(
    { eventTypeId, eventId },

    {
      pollingInterval: 1000,
      skip: !pathname.includes("/game-details"),
    },
  );

  const orderedBets = [
    ...myBets.filter((bet) => bet.betType === "Back"),
    ...myBets.filter((bet) => bet.betType === "Lay"),
  ];
  const navigateGameList = (item) => {
    navigate(`/event-details/${item?.eventTypeId}/${item?.eventId}`);
  };

  const sportsBook = eventData?.sportsbook?.Result;

  const sports =
    sportsBook &&
    sportsBook?.MarketGroups?.filter(
      (group) =>
        group?.Name !== "Bet Builder" &&
        group?.Name !== "Fast Markets" &&
        group?.Name !== "Player Specials",
    );

  const handleCashOut = ({ betHistory, sportsBook, price, cashout_value }) => {
    let item;
    sports?.forEach((group) => {
      group?.Items?.forEach((data) => {
        if (betHistory?.marketId == data?.Id) {
          item = data;
        }
      });
    });

    const column = item?.Items?.find(
      (col) => col?.Id === betHistory?.selectionId,
    );

    const payload = {
      price,
      cashout_value,
      back: true,
      side: 0,
      selectionId: column?.Id,
      btype: "SPORTSBOOK",
      placeName: column?.Name,
      eventTypeId: sportsBook?.EventTypeId,
      betDelay: sportsBook?.betDelay,
      marketId: item?.Id,
      maxLiabilityPerMarket: item?.maxLiabilityPerMarket,
      maxLiabilityPerBet: item?.maxLiabilityPerBet,
      isBettable: sportsBook?.isBettable,
      isWeak: sportsBook?.isWeak,
      marketName: item?.Name,
      eventId: sportsBook?.eventId,
      betId: betHistory?.betId,
    };

    cashOut(payload, {
      onSuccess: (data) => {
        if (data?.success) {
          refetchCurrentBets();
          toast.success(data?.result?.message);
        } else {
          toast.error(data?.error);
        }
      },
    });
  };

  useCloseModalClickOutside(ref, () => setShowOpenBets(false));

  return (
    <div
      data-v-01cb3fd9
      className="modal show"
      id="exampleModalTogglebets"
      aria-modal="true"
      role="dialog"
      style={{ display: "block", paddingLeft: "0px" }}
    >
      <div className="modal-dialog openbets-modal-list">
        <div className="modal-content" ref={ref}>
          <div className="modal-header headerTheme">
            <h4>Open Bets</h4>
            <button
              onClick={() => setShowOpenBets(false)}
              className="btn-close"
              type="button"
              data-bs-dismiss="modal"
            >
              <i className="fa fa-close" />
            </button>
          </div>
          <div className="modal-body">
            <div className="openBetsTabs">
              <div className="placed-bet-container" />

              <div className="tab-container">
                <div className="tab-content" id="pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="matched1"
                    role="tabpanel"
                    aria-labelledby="matched1-tab"
                  >
                    <div className="acc-tabs-sec">
                      <div className="table-responsive">
                        <table className="table text-light">
                          {/* <thead>
                            <tr>
                              <th>
                                <b>Nation</b>
                              </th>
                              <th>
                                <b>User Rate</b>
                              </th>
                              <th>
                                <b>Amount</b>
                              </th>
                            </tr>
                          </thead> */}
                          <tbody>
                            {myBets?.length === 0 &&
                              orderedBets?.length === 0 &&
                              isSuccess && (
                                <tr>
                                  <td className="p-0" colSpan={4}>
                                    <section className="noData-sec">
                                      <div className="noData-icon">
                                        <svg
                                          width={104}
                                          height={92}
                                          viewBox="0 0 104 92"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M46.8039 3C49.1133 -0.999997 54.8868 -1 57.1962 3L103.096 82.5C105.405 86.5 102.518 91.5 97.8994 91.5H6.10075C1.48195 91.5 -1.40481 86.5 0.904595 82.5L46.8039 3Z"
                                            fill="url(#paint0_linear_1_699)"
                                          />
                                          <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M33 41C32.4477 41 32 41.4477 32 42V79C32 79.5523 32.4477 80 33 80H60C60.5523 80 61 79.5523 61 79V46.5705C61 46.2512 60.8475 45.9511 60.5897 45.7628L54.3316 41.194C54.1604 41.069 53.9539 41.0016 53.742 41.0016L33 41ZM35.1443 43.1721C34.592 43.1721 34.1443 43.6198 34.1443 44.1721V76.8295C34.1443 77.3818 34.592 77.8295 35.1443 77.8295H57.8573C58.4096 77.8295 58.8573 77.3818 58.8573 76.8295V49.0311C58.8573 48.4788 58.4096 48.0311 57.8573 48.0311H53.1375C52.5853 48.0311 52.1375 47.5834 52.1375 47.0311V44.1721C52.1375 43.6198 51.6898 43.1721 51.1375 43.1721H35.1443Z"
                                            fill="white"
                                          />
                                          <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M37.25 52.4836C37.25 52.0694 37.5858 51.7336 38 51.7336H39C39.4142 51.7336 39.75 52.0694 39.75 52.4836C39.75 52.8979 39.4142 53.2336 39 53.2336H38C37.5858 53.2336 37.25 52.8979 37.25 52.4836ZM41.25 52.4836C41.25 52.0694 41.5858 51.7336 42 51.7336H54C54.4142 51.7336 54.75 52.0694 54.75 52.4836C54.75 52.8979 54.4142 53.2336 54 53.2336H42C41.5858 53.2336 41.25 52.8979 41.25 52.4836ZM37.25 57.4836C37.25 57.0694 37.5858 56.7336 38 56.7336H39C39.4142 56.7336 39.75 57.0694 39.75 57.4836C39.75 57.8979 39.4142 58.2336 39 58.2336H38C37.5858 58.2336 37.25 57.8979 37.25 57.4836ZM41.25 57.4836C41.25 57.0694 41.5858 56.7336 42 56.7336H54C54.4142 56.7336 54.75 57.0694 54.75 57.4836C54.75 57.8979 54.4142 58.2336 54 58.2336H42C41.5858 58.2336 41.25 57.8979 41.25 57.4836ZM37.25 62.4836C37.25 62.0694 37.5858 61.7336 38 61.7336H39C39.4142 61.7336 39.75 62.0694 39.75 62.4836C39.75 62.8979 39.4142 63.2336 39 63.2336H38C37.5858 63.2336 37.25 62.8979 37.25 62.4836ZM41.25 62.4836C41.25 62.0694 41.5858 61.7336 42 61.7336H54C54.4142 61.7336 54.75 62.0694 54.75 62.4836C54.75 62.8979 54.4142 63.2336 54 63.2336H42C41.5858 63.2336 41.25 62.8979 41.25 62.4836ZM37.25 67.4836C37.25 67.0694 37.5858 66.7336 38 66.7336H39C39.4142 66.7336 39.75 67.0694 39.75 67.4836C39.75 67.8979 39.4142 68.2336 39 68.2336H38C37.5858 68.2336 37.25 67.8979 37.25 67.4836ZM41.25 67.4836C41.25 67.0694 41.5858 66.7336 42 66.7336H54C54.4142 66.7336 54.75 67.0694 54.75 67.4836C54.75 67.8979 54.4142 68.2336 54 68.2336H42C41.5858 68.2336 41.25 67.8979 41.25 67.4836ZM37.25 72.4836C37.25 72.0694 37.5858 71.7336 38 71.7336H39C39.4142 71.7336 39.75 72.0694 39.75 72.4836C39.75 72.8979 39.4142 73.2336 39 73.2336H38C37.5858 73.2336 37.25 72.8979 37.25 72.4836ZM41.25 72.4836C41.25 72.0694 41.5858 71.7336 42 71.7336H54C54.4142 71.7336 54.75 72.0694 54.75 72.4836C54.75 72.8979 54.4142 73.2336 54 73.2336H42C41.5858 73.2336 41.25 72.8979 41.25 72.4836Z"
                                            fill="white"
                                          />
                                          <path
                                            d="M71.1875 44.5972L70.8395 70.2108H66.8026L66.4546 44.5972H71.1875ZM68.8211 80.5119C67.9626 80.5119 67.226 80.2045 66.6112 79.5897C65.9964 78.9749 65.689 78.2383 65.689 77.3798C65.689 76.5214 65.9964 75.7848 66.6112 75.17C67.226 74.5551 67.9626 74.2477 68.8211 74.2477C69.6795 74.2477 70.4161 74.5551 71.0309 75.17C71.6458 75.7848 71.9532 76.5214 71.9532 77.3798C71.9532 77.9483 71.8082 78.4703 71.5182 78.9459C71.2397 79.4215 70.8627 79.8043 70.3871 80.0943C69.9231 80.3727 69.4011 80.5119 68.8211 80.5119Z"
                                            fill="white"
                                          />
                                          <linearGradient
                                            id="paint0_linear_1_699"
                                            x1="52.0001"
                                            y1={0}
                                            x2="52.0001"
                                            y2="91.5"
                                            gradientUnits="userSpaceOnUse"
                                          >
                                            <stop stopColor="var(--secondary-color)" />
                                            <stop
                                              offset={1}
                                              stopColor="var(--secondary-color)"
                                            />
                                          </linearGradient>
                                        </svg>
                                      </div>
                                      <div className="noData-content">
                                        <h3>No Records Found!</h3>
                                      </div>
                                    </section>
                                  </td>
                                </tr>
                              )}
                            {myBets?.length > 0 &&
                              orderedBets?.length > 0 &&
                              orderedBets?.map((bet, i) => {
                                let column;
                                sports?.forEach((group) => {
                                  group?.Items?.forEach((data) => {
                                    if (bet?.marketId == data?.Id) {
                                      column = data?.Items?.find(
                                        (col) => col?.Id === bet?.selectionId,
                                      );
                                    }
                                  });
                                });

                                const price = (
                                  0.92 *
                                    bet?.amount *
                                    (bet?.userRate / column?.Price) -
                                  bet?.amount
                                )?.toFixed(2);

                                return (
                                  <tr
                                    style={{
                                      borderTop: "none",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => navigateGameList(bet)}
                                    key={i}
                                  >
                                    <td
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "start",
                                        marginBottom: "5px",
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                        }}
                                      >
                                        {" "}
                                        <span
                                          style={{
                                            color: bet?.isBack
                                              ? "#72bbef"
                                              : "#faa9ba",
                                            textDecoration: "underline",
                                          }}
                                        >
                                          {" "}
                                          {bet?.title}
                                        </span>
                                        {bet?.cashout &&
                                          eventId &&
                                          eventTypeId &&
                                          column && (
                                            <button
                                              onClick={() =>
                                                handleCashOut({
                                                  betHistory: bet,
                                                  sportsBook,
                                                  price: column?.Price,
                                                  cashout_value: price,
                                                })
                                              }
                                              type="button"
                                              className="btn_box "
                                              style={{
                                                width: "auto",
                                                backgroundColor: "#f3f3f3ff",
                                                display: "flex",
                                                alignItems: "center",
                                                cursor: `pointer`,
                                                justifyContent: "center",
                                                gap: "0px 2px",
                                                borderRadius: "2px",
                                                padding: "3px 5px",
                                              }}
                                            >
                                              <span
                                                style={{
                                                  fontSize: "10px",
                                                  color: "black",
                                                }}
                                              >
                                                Cashout
                                              </span>
                                              {price && (
                                                <span
                                                  style={{
                                                    color: "black",
                                                    fontSize: "10px",
                                                  }}
                                                >
                                                  :
                                                </span>
                                              )}

                                              {price && (
                                                <span
                                                  style={{
                                                    color: `${price > 0 ? "green" : "red"}`,
                                                    fontSize: "10px",
                                                  }}
                                                >
                                                  {price}
                                                </span>
                                              )}
                                            </button>
                                          )}
                                      </div>
                                      <div style={{ textAlign: "start" }}>
                                        {" "}
                                        {bet?.marketName}: {bet?.nation}
                                      </div>
                                      <div style={{ textAlign: "start" }}>
                                        Placed : {bet?.placeDate}
                                      </div>
                                    </td>
                                    {/* <td> {bet?.userRate}</td>
                                    <td> {bet?.amount}</td> */}
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
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
  );
};

export default OpenBets;
