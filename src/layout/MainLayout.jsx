import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Settings } from "../api";
import Header from "../components/UI/Header/Header";
import MobileFooter from "../components/UI/Footer/Footer";
import LeftSidebar from "../components/UI/Sidebar/LeftSidebar";
import Login from "../components/modals/Login/Login";
import Register from "../components/modals/Register/Register";
import ForgotPassword from "../components/modals/ForgotPassword/ForgotPassword";

const MainLayout = () => {
  const [, setShowBuildVersion] = useState(false);
  const stored_build_version = localStorage.getItem("build_version");
  const { group, showLoginModal, showRegisterModal, showForgotPasswordModal } =
    useSelector((state) => state.global);
  const location = useLocation();
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location, group]);

  useEffect(() => {
    const newVersion = Settings?.build_version;
    if (!stored_build_version) {
      if (newVersion) {
        localStorage.setItem("build_version", newVersion);
      }
    }
    if (stored_build_version && newVersion) {
      const parseVersion = JSON.parse(stored_build_version);
      if (newVersion > parseVersion) {
        setShowBuildVersion(true);
      }
    }
  }, [stored_build_version]);

  return (
    <div className="wrapper">
      {showLoginModal && <Login />}
      {showRegisterModal && <Register />}
      {showForgotPasswordModal && <ForgotPassword />}
      <LeftSidebar />
      <div className="main">
        <Header />
        <Outlet />
        <MobileFooter />
      </div>
    </div>
  );
};

export default MainLayout;
