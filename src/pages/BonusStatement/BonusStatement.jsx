import { API } from "../../api";
import toast from "react-hot-toast";
import moment from "moment/moment";
import { AxiosSecure } from "../../lib/AxiosSecure";
import { useBonusQuery } from "../../hooks/bonus";

const BonusStatement = () => {
  const { data, refetch } = useBonusQuery({
    type: "viewStatement",
  });

  const handleShowMessage = (item) => {
    if (item?.is_claimed == 1) {
      return <span style={{ color: "green" }}>Bonus Claimed</span>;
    } else if (item?.is_claimed == 2) {
      return <span style={{ color: "orange" }}>Claim Pending</span>;
    } else if (item?.is_claimed == 3) {
      return <span style={{ color: "red" }}>Rejected</span>;
    } else if (item?.is_claimed == 0) {
      if (item?.is_wagering_complete == 1) {
        return (
          <button
            style={{
              background: "var(--theme-secondary-color)",
              paddingTop: "6px",
              paddingBottom: "6px",
              paddingLeft: "10px",
              paddingRight: "10px",
              color: "white",
            }}
            onClick={() => handleClaimBonus(item)}
          >
            Claim
          </button>
        );
      } else if (item?.is_wagering_complete == 0) {
        return <span style={{ color: "red" }}>Wagering Incomplete</span>;
      }
    }
  };

  const handleClaimBonus = async (item) => {
    const payload = {
      type: "claimBonus",
      bonus_statement_id: item?.bonus_statement_id,
    };

    const result = await AxiosSecure.post(API.bonus, payload);
    if (result?.data?.success) {
      refetch();
      toast.success(result?.data?.result);
    } else {
      toast.error(result?.data?.result || "Something went wrong");
    }
  };

  const formateDate = (date) => {
    if (date) {
      const formateDate = moment(date).format("DD-MM-YYYY, h:mm a");
      return formateDate;
    }
  };

  return (
    <main id="main" className="main a23_css">
      <div className="main-content" style={{ marginTop: "0px" }}>
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          {data?.result?.length > 0 ? (
            data.result?.map((item, i) => (
              <div
                key={i}
                title="Profit & Loss Statement"
                style={{
                  width: "100%",
                  padding: "0.25rem",
                  margin: "0.375rem 0",
                }}
              >
                {item?.bonus_type === "wagering" ? (
                  <div
                    title="Cricket - 1.232257782-3066645.FY"
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      gap: "0.25rem",
                      backgroundColor: "#f2f2f2",
                      padding: "0.5rem",
                      borderRadius: "4px",
                      boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)",
                      transition: "all 0.2s ease-in-out",
                      margin: "0.375rem 0",
                    }}
                  >
                    {/* Bonus Amount and Wagering Required */}
                    <div
                      style={{
                        width: "100%",
                        backgroundColor: "#e6e6e6",
                        padding: "0.625rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontSize: "0.75rem",
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          width: "50%",
                          borderRight: "1px solid #ccc",
                          gap: "0.25rem",
                        }}
                      >
                        <span>Bonus Amount:</span>
                        <span style={{ fontWeight: 600, color: "green" }}>
                          ₹ {item.amount}
                        </span>
                      </span>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                          width: "50%",
                          gap: "0.25rem",
                        }}
                      >
                        <span>Wagering Required:</span>
                        <span
                          style={{
                            fontWeight: 600,
                            color: item.wagering_amount > 0 ? "green" : "red",
                          }}
                        >
                          ₹ {item.wagering_amount}
                        </span>
                      </span>
                    </div>

                    {/* Wagering Complete Amount and Date Added */}
                    <div
                      style={{
                        width: "100%",
                        backgroundColor: "#e6e6e6",
                        padding: "0.625rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontSize: "0.75rem",
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          width: "50%",
                          borderRight: "1px solid #ccc",
                          gap: "0.25rem",
                        }}
                      >
                        <span>Wagering Complete Amount:</span>
                        <span
                          style={{
                            fontWeight: 600,
                            color:
                              item.is_wagering_complete == 0
                                ? "orange"
                                : item.is_wagering_complete == 1
                                  ? "green"
                                  : "inherit",
                          }}
                        >
                          ₹ {item.wagering_complete_amount}
                        </span>
                      </span>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                          width: "50%",
                          gap: "0.25rem",
                        }}
                      >
                        <span>Date Added:</span>
                        <span style={{ fontWeight: 600 }}>
                          {" "}
                          {formateDate(item?.date_added)}
                        </span>
                      </span>
                    </div>

                    {/* Expiry Date */}
                    <div
                      style={{
                        width: "100%",
                        backgroundColor: "#e6e6e6",
                        padding: "0.625rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontSize: "0.75rem",
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          width: "50%",
                          borderRight: "1px solid #ccc",
                          gap: "0.25rem",
                        }}
                      >
                        <span>Expiry Date:</span>
                        <span style={{ fontWeight: 600 }}>
                          {formateDate(item?.expiry_date)}
                        </span>
                      </span>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                          width: "50%",
                          gap: "0.25rem",
                        }}
                      >
                        <span></span>
                        <span style={{ fontWeight: 600 }}>
                          {handleShowMessage(item)}
                        </span>
                      </span>
                    </div>
                  </div>
                ) : (
                  <div
                    title="Cricket - 1.232257782-3066645.FY"
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      gap: "0.25rem",
                      backgroundColor: "#f2f2f2",
                      padding: "0.5rem",
                      borderRadius: "4px",
                      boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)",
                      transition: "all 0.2s ease-in-out",
                      margin: "0.375rem 0",
                    }}
                  >
                    {/* Bonus Amount and Wagering Required */}
                    <div
                      style={{
                        width: "100%",
                        backgroundColor: "#e6e6e6",
                        padding: "0.625rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontSize: "0.75rem",
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          width: "50%",
                          borderRight: "1px solid #ccc",
                          gap: "0.25rem",
                        }}
                      >
                        <span>Bonus Amount:</span>
                        <span style={{ fontWeight: 600, color: "green" }}>
                          ₹ {item.amount}
                        </span>
                      </span>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                          width: "50%",
                          gap: "0.25rem",
                        }}
                      >
                        <span>Date Added:</span>
                        <span style={{ fontWeight: 600 }}>
                          {" "}
                          {formateDate(item?.date_added)}
                        </span>
                      </span>
                    </div>

                    {/* Expiry Date */}
                    <div
                      style={{
                        width: "100%",
                        backgroundColor: "#e6e6e6",
                        padding: "0.625rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "end",
                        fontSize: "0.75rem",
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                          width: "50%",
                          gap: "0.25rem",
                        }}
                      >
                        <span></span>
                        <span style={{ fontWeight: 600 }}>
                          {handleShowMessage(item)}
                        </span>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                paddingTop: "5rem",
              }}
            >
              <h2 style={{ fontSize: "1rem" }}>No bonus statement yet!</h2>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default BonusStatement;
