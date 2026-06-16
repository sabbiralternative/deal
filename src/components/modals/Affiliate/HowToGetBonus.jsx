import { useRef } from "react";
import useCloseModalClickOutside from "../../../hooks/closeModal";

const HowToGetBonus = ({ setOpenGetBonusModal }) => {
  const ref = useRef();
  useCloseModalClickOutside(ref, () => {
    setOpenGetBonusModal(false);
  });

  return (
    <div className="a23_css">
      {" "}
      <div className="Modal-Background">
        <div className="card-add-bank" ref={ref} style={{ maxHeight: "60vh" }}>
          <div className="card-header">
            <h2 style={{ color: "black" }}>How to get bonus?</h2>
            <div className="close-btn">
              <svg
                onClick={() => setOpenGetBonusModal(false)}
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
                className="affi-how-bonus-list affi-how-to-get-bonus"
                data-v-4c49d924
              >
                <h5 data-v-4c49d924>🧾 Affiliate Program – How It Works</h5>
                <li data-v-4c49d924>
                  Earn daily bonus by inviting users to play!
                </li>
                <h5 data-v-4c49d924>🎯 How to Add Users</h5>
                <p data-v-4c49d924>You can add users in two easy ways:</p>
                <h6 data-v-4c49d924> 1️⃣ Referral Link</h6>
                <li data-v-4c49d924>
                  Your unique invitation link is shown on your dashboard.
                </li>
                <li data-v-4c49d924>
                  Anyone who signs up using this link will be automatically
                  added to your team.
                </li>
                <li data-v-4c49d924>
                  You can copy, share, or download a QR code.
                </li>
                <h6 data-v-4c49d924> 2️⃣ Add New User (Manual)</h6>
                <li data-v-4c49d924>
                  Tap on Add New User and fill in the user&apos;s info.
                </li>
                <li data-v-4c49d924>
                  The user will instantly be created under your downline.
                </li>
                <h5 data-v-4c49d924>📊 Your Affiliate Panel Features</h5>
                <h6 data-v-4c49d924>🔹Dashboard</h6>
                <li data-v-4c49d924>Total users added</li>
                <li data-v-4c49d924>Total users who deposited</li>
                <li data-v-4c49d924>Total commission earned</li>
                <li data-v-4c49d924>Today’s top 5 losing users</li>
                <li data-v-4c49d924>Referral link &amp; QR code</li>
                <li data-v-4c49d924>Add user button</li>
                <h6 data-v-4c49d924>🔹User List</h6>
                <li data-v-4c49d924>See all your downline users</li>
                <li data-v-4c49d924>
                  View their balance and registration date
                </li>
                <li data-v-4c49d924>Tap Add New User to add more</li>
                <li data-v-4c49d924>Filter users by registration date</li>
                <h6 data-v-4c49d924>🔹Profit &amp; Loss</h6>
                <li data-v-4c49d924>See user profit/loss by date range</li>
                <li data-v-4c49d924>
                  Breakdown by event (casino, sports, etc.)
                </li>
                <li data-v-4c49d924>
                  Total profit, total loss, and net P&amp;L
                </li>
                <li data-v-4c49d924>
                  This is used to calculate your daily bonus
                </li>
                <h6 data-v-4c49d924>🔹Reports</h6>
                <li data-v-4c49d924>View daily commission report</li>
                <li data-v-4c49d924>
                  Check how much bonus you earned each day
                </li>
                <li data-v-4c49d924>Filter by date range</li>
                <h6 data-v-4c49d924>📌 Important Rules</h6>
                <p data-v-4c49d924>
                  ✅ You earn commission only if your users lost money overall
                  for that day.
                </p>
                <p data-v-4c49d924>
                  ✅ Bonus is added daily after 2:00 AM automatically.
                </p>
                <p data-v-4c49d924>
                  ✅ No commission if user total P&amp;L is positive (i.e.,
                  users made profit).
                </p>
                <p data-v-4c49d924>
                  ✅ You can use both link and manual user addition — both work
                  the same.
                </p>
                <p data-v-4c49d924>
                  🚫 Don&apos;t misuse the system or create fake users — this
                  may result in suspension.
                </p>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToGetBonus;
