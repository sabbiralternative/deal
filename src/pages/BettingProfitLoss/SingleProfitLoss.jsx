import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { useSingleProfitLoss } from "../../hooks/settledBets";

const SingleProfitLoss = () => {
  const [backTotal, setBackTotal] = useState(0);
  const [layTotal, setLayTotal] = useState(0);
  const { marketId } = useParams();
  const { data: singlePassbook } = useSingleProfitLoss(marketId);

  useEffect(() => {
    if (singlePassbook?.result?.length > 0) {
      const back = singlePassbook?.result?.filter(
        (item) => item?.betType === "Back",
      );
      let backTotal = 0;
      for (const item of back) {
        backTotal = backTotal + item.win;
      }
      const lay = singlePassbook?.result?.filter(
        (item) => item?.betType === "Lay",
      );
      let layTotal = 0;
      for (const item of lay) {
        layTotal = layTotal + item.win;
      }

      setBackTotal(backTotal);
      setLayTotal(layTotal);
    }
  }, [singlePassbook]);

  // if (!singlePassbook || singlePassbook?.result?.length === 0) {
  //   return;
  // }

  let total = 0;
  if (singlePassbook && singlePassbook?.result?.length > 0) {
    for (const item of singlePassbook.result) {
      total = total + item.win;
    }
  }

  return (
    <main id="main" className="main">
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          width: "100%",

          fontSize: "12px",
        }}
      >
        <div style={{ width: "100%" }}>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              padding: "0.5rem",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#F3F4F6", // bg-bg_Quaternary
                borderRadius: "0.375rem",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  backgroundColor: "#E5E7EB", // bg-headerBg
                  padding: "0.5rem 1rem",

                  fontWeight: 600,
                }}
              >
                {singlePassbook?.result?.[0]?.eventName}
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  borderTop: "1px solid #E5E7EB",
                }}
              >
                {singlePassbook?.result?.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      width: "100%",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                      paddingTop: "0.5rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "0 1rem",
                      }}
                    >
                      <span>Selection</span>
                      <span style={{ textTransform: "capitalize" }}>
                        {item?.nation}
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "0.5rem 1rem",
                        border: "1px solid #E5E7EB",
                        margin: "0 1rem",
                        borderRadius: "0.375rem",
                        backgroundColor:
                          item?.win > 0
                            ? "#E6FFFA" // bg-bg_AccountStatementBg1
                            : "#FFF5F5", // bg-bg_AccountStatementBg2
                      }}
                    >
                      <div>
                        P&amp;L:{" "}
                        <span
                          style={{
                            fontWeight: 600,
                            color: item?.win > 0 ? "#22C55E" : "#EF4444", // text-text_Profit / text-text_Loss
                          }}
                        >
                          ₹ {item?.win}
                        </span>
                      </div>
                      <div>
                        <span
                          style={{
                            fontWeight: 600,
                            textTransform: "capitalize",
                            color: item?.win > 0 ? "#22C55E" : "#EF4444",
                          }}
                        >
                          {item?.win > 0 ? "WON" : "LOSS"}
                        </span>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "0 1rem",
                      }}
                    >
                      <div>Bet ID</div>
                      <div>{item?.betId}</div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "0 1rem",
                      }}
                    >
                      <div>Placed Date</div>
                      <div>{item?.placeDate}</div>
                    </div>

                    <div
                      style={{
                        padding: "1rem",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          overflow: "hidden",
                          borderRadius: "0.5rem",
                          border: "1px solid #E5E7EB",
                        }}
                      >
                        <table
                          style={{
                            width: "100%",
                            borderCollapse: "collapse",
                          }}
                        >
                          <thead>
                            <tr
                              style={{
                                backgroundColor: "#F3F4F6", // bg-bg_TableHeaderBg
                              }}
                            >
                              <th
                                style={{
                                  padding: "0.25rem 0.75rem",
                                  borderRight: "1px solid #E5E7EB",
                                  borderTopLeftRadius: "0.5rem",
                                }}
                              >
                                Type
                              </th>
                              <th
                                style={{
                                  padding: "0.25rem 0.75rem",
                                  borderRight: "1px solid #E5E7EB",
                                }}
                              >
                                Odds
                              </th>
                              <th
                                style={{
                                  padding: "0.25rem 0.75rem",
                                  borderBottom: "1px solid #E5E7EB",
                                  borderTopRightRadius: "0.5rem",
                                }}
                              >
                                Stake
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  padding: "0.25rem 0.75rem",
                                  borderTop: "1px solid #E5E7EB",
                                  borderRight: "1px solid #E5E7EB",
                                }}
                              >
                                {item?.betType}
                              </td>
                              <td
                                style={{
                                  padding: "0.25rem 0.75rem",
                                  borderTop: "1px solid #E5E7EB",
                                }}
                              >
                                {item?.userRate}
                              </td>
                              <td style={{ padding: "0.25rem 0.75rem" }}>
                                {item?.amount}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subtotals Section */}
            <div
              style={{
                backgroundColor: "#F3F4F6",
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "1px dashed #ccc",
                }}
              >
                <div>Back Subtotal</div>
                <div
                  style={{
                    fontWeight: 700,
                    color: backTotal > 0 ? "#22C55E" : "#EF4444",
                  }}
                >
                  ₹ {backTotal}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "1px dashed #ccc",
                }}
              >
                <div>Lay subtotal</div>
                <div
                  style={{
                    fontWeight: 700,
                    color: layTotal > 0 ? "#22C55E" : "#EF4444",
                  }}
                >
                  ₹ {layTotal}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "1px dashed #ccc",
                }}
              >
                <div>Market Subtotal</div>
                <div
                  style={{
                    fontWeight: 700,
                    color: backTotal + layTotal > 0 ? "#22C55E" : "#EF4444",
                  }}
                >
                  ₹ {backTotal + layTotal}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "1px dashed #ccc",
                }}
              >
                <div>Commission</div>
                <div style={{ fontWeight: 700 }}>₹ 0.0</div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderTop: "1px dashed #ccc",
                }}
              >
                <div style={{ position: "relative", top: "3px" }}>
                  Net Market Total
                </div>
                <div
                  style={{
                    position: "relative",
                    top: "3px",
                    fontWeight: 700,
                    color: total > 0 ? "#22C55E" : "#EF4444",
                  }}
                >
                  ₹ {total}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SingleProfitLoss;
