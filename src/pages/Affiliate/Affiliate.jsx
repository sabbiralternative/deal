import { Fragment } from "react";
import "./affiliate.css";
import BonusInformation from "./BonusInformation";
import InviteSection from "./InviteSection";
import TodayProfitLoss from "./TodayProfitLoss";
import TodayStatusSection from "./TodayStatusSection";
// import TopFiveLossUser from "./TopFiveLossUser";
import Reports from "./Reports";
import Footer from "./Footer";
import ProfitLoss from "./ProfitLoss";
import UserList from "./UserList";
import { useLocation } from "react-router-dom";
const Affiliate = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const tab = params.get("tab");

  return (
    <div
      id="main"
      className="main  main-content"
      style={{ padding: "0px 4px" }}
    >
      <Footer />
      <div data-v-4c49d924 className="container">
        {(tab === "dashboard" || !tab) && (
          <Fragment>
            <TodayStatusSection />
            <InviteSection />
            {/* <TopFiveLossUser /> */}
            <BonusInformation />
            <TodayProfitLoss />
          </Fragment>
        )}
        {tab === "user-list" && <UserList />}
        {tab === "pnl" && <ProfitLoss />}
        {tab === "reports" && <Reports />}
      </div>
    </div>
  );
};

export default Affiliate;
