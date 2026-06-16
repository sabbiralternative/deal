import images from "../../assets/images";
import { useIndexQuery } from "../../hooks";

const fromDate = new Date(new Date().setDate(new Date().getDate() - 7))
  .toISOString()
  .split("T")[0];
const toDate = new Date().toISOString().split("T")[0];

const TodayStatusSection = () => {
  const payload = {
    type: "get_affiliate_dashboard",
    fromDate,
    toDate,
  };

  const { data } = useIndexQuery(payload);

  return (
    <div data-v-4c49d924 className="nw-affi-how-to-get-bonus">
      <img
        data-v-4c49d924
        src={images.elipBg}
        alt="ellip-bg"
        className="ellip-bg-img"
      />
      <div data-v-4c49d924 className="nw-affi-heading-flex">
        <h3
          style={{ margin: "0px" }}
          data-v-4c49d924
          className="nw-affi-heading-text"
        >
          Today Status
        </h3>
      </div>
      <div data-v-4c49d924 className="nw-affi-how-to-get-bonus-content">
        <div
          data-v-4c49d924
          className="nw-affi-how-to-get-bonus-content-sec nw-affi-status-digit-para"
        >
          <span data-v-4c49d924 className="nw-affi-status-digit">
            {data?.result?.total_deposit}
          </span>
          <p data-v-4c49d924>total deposit</p>
        </div>
        <div
          data-v-4c49d924
          className="nw-affi-how-to-get-bonus-content-sec nw-affi-status-digit-para"
        >
          <span data-v-4c49d924 className="nw-affi-status-digit">
            {data?.result?.total_deposit_count}
          </span>
          <p data-v-4c49d924>total deposit count</p>
        </div>
        <div
          data-v-4c49d924
          className="nw-affi-how-to-get-bonus-content-sec nw-affi-status-digit-para"
        >
          <span data-v-4c49d924 className="nw-affi-status-digit">
            {data?.result?.total_user}
          </span>
          <p data-v-4c49d924>total user</p>
        </div>
        <div
          data-v-4c49d924
          className="nw-affi-how-to-get-bonus-content-sec nw-affi-status-digit-para"
        >
          <span data-v-4c49d924 className="nw-affi-status-digit">
            {data?.result?.total_commision}
          </span>
          <p data-v-4c49d924>total commision</p>
        </div>
      </div>
    </div>
  );
};

export default TodayStatusSection;
