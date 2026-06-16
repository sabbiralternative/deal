import { useState } from "react";
import { from_date, to_date } from "../../utils/default-date";

import images from "../../assets/images";
import { useIndexMutation } from "../../hooks";

const Reports = () => {
  const [fromDate, setFromDate] = useState(from_date);
  const [toDate, setToDate] = useState(to_date);
  const { mutate, data, isSuccess } = useIndexMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      type: "get_commission_report",
      from_date: fromDate,
      to_date: toDate,
    });
  };

  return (
    <div data-v-ca1229b4 className="affi-pd-bot">
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
      {isSuccess && (
        <section
          data-v-fd406c30
          className="nw-affi-user-wrapper affi-pd-bot"
          style={{ background: "transparent", padding: "0px" }}
        >
          <div data-v-fd406c30 className>
            <div data-v-fd406c30 className="nw-affi-user-list-wrapper">
              <div
                data-v-fd406c30
                className="table-responsive nw-affi-user-table"
              >
                <table data-v-fd406c30 className="table">
                  <thead data-v-fd406c30>
                    <tr data-v-fd406c30>
                      <th data-v-fd406c30>
                        <img
                          data-v-fd406c30
                          src={images.calendar}
                          alt="affi-calendar"
                        />{" "}
                        Date
                      </th>

                      <th data-v-fd406c30>
                        <img
                          data-v-fd406c30
                          src={images.commission}
                          alt="affi-commision-icon"
                        />{" "}
                        Amount
                      </th>
                      <th data-v-fd406c30>
                        <img
                          data-v-fd406c30
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAZVJREFUWIXtl08rhUEUxn8HO4qVKAtEwsKflSxYyEe4X4PIRkpkK/kcvoIit9ydv0UWtq66K3S3t8finVvX28vMdSdv5NnMvOc9c55nZs6pOZAzLMsoqQeYBzoj8VSBkpm9ej0lDUt6VnyUJQ2l+ToyNKwCfcAV8Njq1h1GgBlgBVj70lPSkVNciESOpIKLeZT+1xaL5LsIEiBpWtJULgIc8QVwWRch6Swg6U6jCEjradLfi6wq+AAzu5E06+a3blz8MQF1EbEI08i9CrwnIKkXKLrPBTOrSFoH5jxLS2Z22LIAYAoYa5gfAxtAv2fdPBBFwAmwR1IBJ862DEx41t0HxA6qghqwnbLdAXchBD78iiRsB3ZJrmDHzGqSJgm4AndSrQkAloAtNy+SJOEx/iR8AgZiCLgGHkhO4NrZ9gkow4DYQUlYAcZTtoOQ4CHIPQn/3HvgRdJoVAFpPU36e/H/Hsi9CrJO4NmNmxF7g3piPnk9lbRm5SZarlCUJQ2m+T5rTrtJHhRdLey6EVXg3MzeIsWLh3fh94EUshpERQAAAABJRU5ErkJggg=="
                          alt="affi-calendar"
                        />{" "}
                        Remark
                      </th>
                    </tr>
                  </thead>
                  <tbody data-v-fd406c30>
                    {data?.result?.length > 0 ? (
                      data?.result?.map((item) => {
                        return (
                          <tr key={item?.punter_id} data-v-fd406c30="">
                            <td data-v-fd406c30="">{item?.date_added}</td>

                            <td data-v-fd406c30="">
                              <span
                                data-v-fd406c30=""
                                className={`${
                                  item?.amount > 0 ? "Won" : "Lost"
                                }`}
                              >
                                {item?.amount}
                              </span>
                            </td>
                            <td data-v-fd406c30="">{item?.remark}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr data-v-fd406c30 className="tabetdat">
                        <td data-v-fd406c30 colSpan={5}>
                          <div
                            data-v-fd406c30
                            className="text-center affiliate-no-recoard-data"
                          >
                            No Records Found
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Reports;
