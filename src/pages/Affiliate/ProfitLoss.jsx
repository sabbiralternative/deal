import { useState } from "react";

import moment from "moment";
import { useIndexMutation } from "../../hooks";

const ProfitLoss = () => {
  const from = new Date(new Date().setDate(new Date().getDate() - 7))
    .toISOString()
    .split("T")[0];
  const to = new Date().toISOString().split("T")[0];
  const [fromDate, setFromDate] = useState(from);
  const [toDate, setToDate] = useState(to);
  const { mutate, data, isSuccess } = useIndexMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      type: "get_affiliate_all_pl",
      from_date: fromDate,
      to_date: toDate,
    });
  };

  const getUniqueDate = Array.from(
    new Set(data?.result?.map((item) => item?.date_added)),
  );

  return (
    <section
      data-v-81c2ddd8
      className="nw-affi-user-wrapper affi-pd-bot"
      style={{ background: "transparent", padding: "0px" }}
    >
      <div data-v-81c2ddd8 className>
        <h3 data-v-81c2ddd8 className="nw-affi-heading-text">
          User Profit / Loss
        </h3>
        <form
          onSubmit={handleSubmit}
          data-v-81c2ddd8
          className="typeslabel openbettss affiliate-pl affiliate-report affi-date-filter-form"
        >
          <ul
            style={{ paddingLeft: "0px" }}
            data-v-81c2ddd8
            className="typelabel-main flex-nowrap"
          >
            <li data-v-81c2ddd8>
              <div data-v-81c2ddd8 className="form-group">
                <label data-v-81c2ddd8 className="label-pl12">
                  From Date
                </label>
                <input
                  onChange={(e) => setFromDate(e.target.value)}
                  data-v-81c2ddd8
                  type="date"
                  id="open-bet-from"
                  className="form-control"
                  value={fromDate}
                />
              </div>
            </li>
            <li data-v-81c2ddd8>
              <div data-v-81c2ddd8 className="form-group">
                <label data-v-81c2ddd8 className="label-pl12">
                  To Date
                </label>
                <input
                  onChange={(e) => setToDate(e.target.value)}
                  data-v-81c2ddd8
                  type="date"
                  id="open-bet-from"
                  className="form-control"
                  value={toDate}
                />
              </div>
            </li>
          </ul>
          <div data-v-81c2ddd8 className="download-main">
            <button
              type="submit"
              className="nw-affi-add-new-user-btn"
              data-bs-target="#AfAddNewUser"
              data-bs-toggle="modal"
              data-v-4c49d924
            >
              <span data-v-4c49d924>Submit</span>
            </button>
          </div>
        </form>
        <div className="mat-accordion bet-history-accordion ">
          {getUniqueDate?.length > 0 && (
            <div>
              {getUniqueDate?.map((date) => {
                const filterByDate = data?.result?.filter(
                  (item) => item?.date_added === date,
                );
                const totalPnl = filterByDate?.reduce((acc, curr) => {
                  return acc + Number(curr.amount);
                }, 0);
                return (
                  <div key={date} style={{ marginBottom: "10px" }}>
                    <div
                      className="mat-expansion-panel   mat-expanded mat-expansion-panel-spacing"
                      style={{
                        marginBottom: "3px",
                        color: "black",
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "9px 10px",
                        background: "var(--theme-primary)",
                        margin: "0px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          lineHeight: "140%",
                        }}
                      >
                        {moment(date).format("Do-MMM-YYYY")}
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          lineHeight: "140%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span>Total PL</span>
                        <span style={{ marginTop: "-2px", marginLeft: "4px" }}>
                          :
                        </span>
                        <span
                          style={{
                            marginLeft: "4px",
                            textShadow: "1px 1px #000000",
                            color:
                              totalPnl > 0
                                ? "#48BB78"
                                : totalPnl < 0
                                  ? "#F56565"
                                  : "#FFFFFF",
                          }}
                        >
                          {totalPnl}
                        </span>
                      </div>
                    </div>

                    {filterByDate?.map((item, i) => {
                      return (
                        <div
                          key={i}
                          style={{
                            margin: "3px 0px",
                          }}
                          className="mat-expansion-panel   mat-expanded mat-expansion-panel-spacing"
                        >
                          <div className="mat-expansion-panel-header mat-focus-indicator   mat-expansion-toggle-indicator-after  mat-expanded">
                            <span className="mat-content  mat-content-hide-toggle">
                              <div className="mat-expansion-panel-header-title ">
                                <h3 style={{ fontSize: "12px" }}>
                                  {" "}
                                  {item?.event_type_id}
                                </h3>
                              </div>
                              <div className="mat-expansion-panel-header-description ">
                                <span> Amount:</span>{" "}
                                <span
                                  className={`${
                                    item?.amount > 0 ? "Won" : "Lost"
                                  }`}
                                >
                                  {item?.amount}
                                </span>
                              </div>
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}

          {isSuccess && getUniqueDate?.length === 0 && (
            <div className="no-data ng-star-inserted">
              <p>Profit loss not found</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfitLoss;
