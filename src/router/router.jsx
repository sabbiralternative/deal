import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import APK from "../pages/APK/APK";
import Login from "../pages/Login/Login";
import Settings from "../pages/Settings/Settings";
import Register from "../pages/Register/Register";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import Account from "../pages/Account/Account";
import ChangePassword from "../pages/ChangePassword/ChangePassword";
import InPlay from "../pages/InPlay/InPlay";
import Sports from "../pages/Sports/Sports";
import OpenBets from "../pages/OpenBets/OpenBets";
import Profile from "../pages/Profile/Profile";
import BetHistory from "../pages/BetHistory/BetHistory";
import AccountStatement from "../pages/AccountStatement/AccountStatement";
import ProfitLoss from "../pages/ProfitLoss/ProfitLoss";
import EventDetails from "../pages/EventDetails/EventDetails";
import Deposit from "../pages/Deposit/Deposit";
import Withdraw from "../pages/Withdraw/Withdraw";
import DepositWithdrawReport from "../pages/DepositWithdrawReport/DepositWithdrawReport";
import MyBankDetails from "../pages/MyBankDetails/MyBankDetails";
import SingleProfitLoss from "../pages/BettingProfitLoss/SingleProfitLoss";
import BettingProfitLoss from "../pages/BettingProfitLoss/BettingProfitLoss";
import BonusStatement from "../pages/BonusStatement/BonusStatement";
import Affiliate from "../pages/Affiliate/Affiliate";
import Promotions from "../pages/Promotions/Promotions";
import LossBackBonus from "../pages/LossBackBonus/LossBackBonus";
import AppOnlyBonus from "../pages/AppOnlyBonus/AppOnlyBonus";
import LiveCasino from "../pages/LiveCasino/LiveCasino";
import Slots from "../pages/Slots/Slots";
import CrashGames from "../pages/CrashGames/CrashGames";
import FishingGames from "../pages/FishingGames/FishingGames";
import Mac88 from "../pages/Mac88/Mac88";
import CasinoIFrame from "../pages/CasinoIFrame/CasinoIFrame";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,

      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/event-details/:eventTypeId/:eventId",
          element: <EventDetails />,
        },
        {
          path: "/apk",
          element: <APK />,
        },
        {
          path: "/settings",
          element: <Settings />,
        },
        {
          path: "/account",
          element: <Account />,
        },
        {
          path: "/in-play",
          element: <InPlay />,
        },

        {
          path: "/open-bets",
          element: <OpenBets />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/bet-history",
          element: <BetHistory />,
        },
        {
          path: "/account-statements",
          element: <AccountStatement />,
        },
        {
          path: "/profit-loss",
          element: <ProfitLoss />,
        },
        {
          path: "/deposit",
          element: <Deposit />,
        },
        {
          path: "/withdraw",
          element: <Withdraw />,
        },
        {
          path: "/deposit-withdraw-report",
          element: <DepositWithdrawReport />,
        },
        {
          path: "/my-bank-details",
          element: <MyBankDetails />,
        },
        {
          path: "/betting-profit-loss",
          element: <BettingProfitLoss />,
        },
        {
          path: "/betting-profit-loss/:marketId",
          element: <SingleProfitLoss />,
        },
        {
          path: "/bonus-statement",
          element: <BonusStatement />,
        },
        {
          path: "/affiliate",
          element: <Affiliate />,
        },
        {
          path: "/promotions",
          element: <Promotions />,
        },
        {
          path: "/lossback-bonus",
          element: <LossBackBonus />,
        },
        {
          path: "/app-only-bonus",
          element: <AppOnlyBonus />,
        },
        {
          path: "/live-casino",
          element: <LiveCasino />,
        },
        {
          path: "/slots",
          element: <Slots />,
        },
        {
          path: "/crash-games",
          element: <CrashGames />,
        },
        {
          path: "/fishing-games",
          element: <FishingGames />,
        },
        {
          path: "/mac88",
          element: <Mac88 />,
        },
        {
          path: "/casino/:name/:gameId",
          element: <CasinoIFrame />,
        },
        {
          path: "/sports/:eventTypeId",
          element: <Sports />,
        },
      ],
    },

    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/change-password",
      element: <ChangePassword />,
    },
  ],
  {
    basename: import.meta.env.BASE_URL ?? "/",
  },
);
