import { useRef } from "react";
import useCloseModalClickOutside from "../../../hooks/closeModal";

const CommissionInfo = ({ setOpenCommissionModal }) => {
  const ref = useRef();
  useCloseModalClickOutside(ref, () => {
    setOpenCommissionModal(false);
  });

  return (
    <div className="a23_css">
      <div className="Modal-Background">
        <div className="card-add-bank" ref={ref} style={{ maxHeight: "60vh" }}>
          <div className="card-header">
            <h2 style={{ color: "black" }}>How to get commission?</h2>
            <div className="close-btn">
              <svg
                onClick={() => setOpenCommissionModal(false)}
                width="1rem"
                height="1rem"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.91703 10.7588C2.68924 10.9867 2.68928 11.356 2.9171 11.5838C3.14493 11.8116 3.51427 11.8116 3.74206 11.5837L7.00012 8.32511L10.2584 11.5834C10.4862 11.8112 10.8556 11.8112 11.0834 11.5834C11.3112 11.3556 11.3112 10.9863 11.0834 10.7585L7.82501 7.5001L11.0832 4.24138C11.3109 4.01356 11.3109 3.64421 11.083 3.41643C10.8552 3.18864 10.4859 3.18867 10.2581 3.4165L7 6.67516L3.74166 3.41678C3.51386 3.18897 3.14451 3.18897 2.91671 3.41678C2.6889 3.64459 2.6889 4.01393 2.91671 4.24174L6.17517 7.50016L2.91703 10.7588Z"
                  fill="#111827"
                ></path>
              </svg>
            </div>
          </div>
          <div className="card-body" style={{ overflow: "auto" }}>
            <div className="bank-popup">
              <ul
                style={{ paddingLeft: "0px" }}
                data-v-4c49d924
                className="affi-how-bonus-list affi-how-to-get-bonus"
              >
                <h5 data-v-4c49d924>💸 How You Earn Commission</h5>
                <li data-v-4c49d924>
                  You get bonus of the total amount your users lose every day
                  based on below slabs.
                </li>
                <li data-v-4c49d924>The system checks daily at 2:00 AM.</li>
                <li data-v-4c49d924>
                  If your users lost money overall, you get paid.
                </li>
                <li data-v-4c49d924>
                  If your users made profit, no bonus is given for that day.
                </li>
                <li data-v-4c49d924>✅ Example:</li>
                <div data-v-4c49d924 className="table-responsive">
                  <table data-v-4c49d924 className="tablecontant">
                    <thead data-v-4c49d924 className="cmn-head thead-mainn">
                      <tr data-v-4c49d924>
                        <th data-v-4c49d924>User Range</th>
                        <th data-v-4c49d924>Bonus (%)</th>
                      </tr>
                    </thead>
                    <tbody data-v-4c49d924 className="datastabl">
                      <tr data-v-4c49d924>
                        <td data-v-4c49d924>1 - 10</td>
                        <td data-v-4c49d924>1</td>
                      </tr>
                      <tr data-v-4c49d924>
                        <td data-v-4c49d924>11 - 50</td>
                        <td data-v-4c49d924>1</td>
                      </tr>
                      <tr data-v-4c49d924>
                        <td data-v-4c49d924>51 - 100</td>
                        <td data-v-4c49d924>1</td>
                      </tr>
                      <tr data-v-4c49d924>
                        <td data-v-4c49d924>101 - 500</td>
                        <td data-v-4c49d924>1</td>
                      </tr>
                      <tr data-v-4c49d924>
                        <td data-v-4c49d924>501 - 100000</td>
                        <td data-v-4c49d924>1</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommissionInfo;
