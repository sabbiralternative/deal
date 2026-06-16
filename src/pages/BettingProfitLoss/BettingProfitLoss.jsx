import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { userToken } from "../../redux/features/auth/authSlice";
import moment from "moment";
import { useAccountStatement } from "../../hooks/accountStatement";
import { from_date, to_date } from "../../utils/default-date";

const BettingProfitLoss = () => {
  const { data: passbook } = useAccountStatement({
    from: from_date,
    to: to_date,
    type: "GR",
  });
  const navigate = useNavigate();
  const token = useSelector(userToken);
  const handleNavigateSinglePassbook = (item) => {
    if (item?.plDetails) {
      navigate(`/betting-profit-loss/${item?.marketId}`);
    }
  };

  const getUniqueDate = Array.from(
    new Set(passbook?.result?.map((item) => item?.settledTime)),
  );

  return (
    <main id="main" className="main">
      <div className="ng-star-inserted">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            transition: "all 100ms ease-in-out",
            paddingTop: "5px",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: "100%",
              }}
            >
              {token && getUniqueDate?.length > 0 ? (
                getUniqueDate?.map((date) => {
                  const filterByDate = passbook?.result?.filter(
                    (item) => item?.settledTime === date,
                  );
                  const totalPnl = filterByDate?.reduce((acc, curr) => {
                    return acc + curr.memberWin;
                  }, 0);
                  return (
                    <div
                      key={date}
                      title="Profit & Loss Statement"
                      style={{
                        width: "100%",
                        paddingLeft: "4px",
                        paddingRight: "4px",
                        marginTop: "6px",
                        marginBottom: "6px",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          borderRadius: "4px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "9px 10px",
                          background: "#1e1e1e", // replace with your bg-headerBg
                          color: "#aaa", // replace with text-text_Quaternary
                          fontWeight: 600,
                          fontSize: "12px",
                          lineHeight: "140%",
                        }}
                      >
                        <div>{moment(date).format("Do-MMM-YYYY")}</div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <span>Total PL</span>
                          <span
                            style={{ marginTop: "-2px", marginLeft: "4px" }}
                          >
                            :
                          </span>
                          <span
                            style={{
                              marginLeft: "4px",
                              textShadow: "1px 1px #000000",
                              color:
                                totalPnl > 0
                                  ? "#00FF00"
                                  : totalPnl < 0
                                    ? "#FF4C4C"
                                    : "#FFFFFF",
                            }}
                          >
                            {totalPnl}
                          </span>
                        </div>
                      </div>

                      {filterByDate?.map((item, i) => (
                        <div
                          onClick={() => handleNavigateSinglePassbook(item)}
                          key={i}
                        >
                          <div
                            title={item?.narration}
                            style={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "flex-start",
                              gap: "4px",
                              background: "#f5f5f5", // replace with bg-bg_Quaternary
                              margin: "8px 0",
                              borderRadius: "4px",
                              transition: "transform 200ms ease-in-out",
                              boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
                              cursor: "pointer",
                            }}
                          >
                            <div
                              style={{
                                width: "100%",
                                textAlign: "left",
                                color: "#333", // replace with text-text_Primary
                                padding: "8px 10px",
                                fontSize: "12px",
                                fontWeight: 550,
                                textTransform: "capitalize",
                              }}
                            >
                              <span>{item?.narration}</span>
                            </div>

                            <div
                              style={{
                                width: "100%",
                                background: "#f0f0f0", // replace with bg-bg_Quaternary1
                                padding: "8px 10px",
                                display: "flex",
                                justifyContent: "space-between",
                                fontSize: "12px",
                              }}
                            >
                              <span
                                style={{
                                  color: "#666", // replace with text-text_Ternary
                                  width: "50%",
                                  borderRight: "1px solid #ccc", // replace with oddInputColor
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "4px",
                                }}
                              >
                                <span>PL:</span>
                                <span
                                  style={{
                                    fontWeight: "600",
                                    color:
                                      item?.memberWin > 0
                                        ? "#00FF00"
                                        : item?.memberWin < 0
                                          ? "#FF0000"
                                          : "#000",
                                  }}
                                >
                                  ₹ {item?.memberWin}
                                </span>
                              </span>

                              <span
                                style={{
                                  color: "#666",
                                  width: "50%",
                                  display: "flex",
                                  justifyContent: "flex-end",
                                  gap: "4px",
                                  alignItems: "center",
                                }}
                              >
                                <span>Balance:</span>
                                <span style={{ fontWeight: "600" }}>
                                  ₹ {item?.balance}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    paddingTop: "80px",
                  }}
                >
                  <h2 style={{ fontSize: "16px" }}>
                    No betting profit and loss yet!
                  </h2>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BettingProfitLoss;
