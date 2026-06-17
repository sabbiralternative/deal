import { useDispatch, useSelector } from "react-redux";
import { Settings } from "../../../api";
import { Link, useLocation } from "react-router-dom";
import AppPopup from "./AppPopUp";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  setClosePopUpForForever,
  setShowAPKModal,
  setShowAppPopUp,
  setShowLoginModal,
  setShowRegisterModal,
} from "../../../redux/features/global/globalSlice";
import Error from "../../modals/Error/Error";
import Notification from "./Notification";
import DownloadAPK from "../../modals/DownloadAPK/DownloadAPK";
import BuildVersion from "../../modals/BuildVersion/BuildVersion";
import useBalance from "../../../hooks/balance";
import { logout } from "../../../redux/features/auth/authSlice";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import useCloseModalClickOutside from "../../../hooks/closeModal";
import Search from "./Search";

const Header = () => {
  const ref = useRef();
  const [open, setOpen] = useState(false);
  const { data } = useBalance();
  const stored_build_version = localStorage.getItem("build_version");
  const [showBuildVersion, setShowBuildVersion] = useState(false);
  const location = useLocation();
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { showAppPopUp, windowWidth, closePopupForForever, showAPKModal } =
    useSelector((state) => state?.global);

  useCloseModalClickOutside(ref, () => {
    setOpen(false);
  });

  useEffect(() => {
    const apk_modal_shown = sessionStorage.getItem("apk_modal_shown");
    const closePopupForForever = localStorage.getItem("closePopupForForever");
    dispatch(setClosePopUpForForever(closePopupForForever ? true : false));
    if (location?.state?.pathname === "/apk" || location.pathname === "/apk") {
      sessionStorage.setItem("apk_modal_shown", true);
      localStorage.setItem("closePopupForForever", true);
      dispatch(setClosePopUpForForever(true));
      localStorage.removeItem("installPromptExpiryTime");
    } else {
      if (!apk_modal_shown) {
        dispatch(setShowAPKModal(true));
      }
      if (!closePopupForForever) {
        const expiryTime = localStorage.getItem("installPromptExpiryTime");
        const currentTime = new Date().getTime();

        if ((!expiryTime || currentTime > expiryTime) && Settings.apk_link) {
          localStorage.removeItem("installPromptExpiryTime");

          dispatch(setShowAppPopUp(true));
        }
      }
    }
  }, [
    dispatch,
    windowWidth,
    showAppPopUp,
    location?.state?.pathname,
    location.pathname,
  ]);

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

  if (Settings.app_only && !closePopupForForever) {
    return <Error />;
  }
  const links = [
    { label: "Deposit", href: "/deposit", show: true },
    { label: "Withdraw", href: "/withdraw", show: true },
    {
      label: "Deposit Withdraw Report",
      href: "/deposit-withdraw-report",
      show: true,
    },
    { label: "Betting Profit Loss", href: "/betting-profit-loss", show: true },
    { label: "My Bank Details", href: "/my-bank-details", show: true },
    { label: "Bonus Statement", href: "/bonus-statement", show: true },
    {
      label: "Affiliate",
      href: "/affiliate",
      show: Settings?.referral === true,
    },
    { label: "Promos & Bonus", href: "/promotions", show: true },
    { label: "Lossback Bonus", href: "/lossback-bonus", show: true },
    {
      label: "App Only Bonus",
      href: "/app-only-bonus",
      show: closePopupForForever ? true : false,
    },
  ];
  return (
    <Fragment>
      <Notification />
      {Settings.apk_link && showAppPopUp && windowWidth < 1040 && <AppPopup />}
      {Settings.apk_link && showAPKModal && (
        <DownloadAPK setShowAPKModal={setShowAPKModal} />
      )}
      {showBuildVersion && !showAPKModal && (
        <BuildVersion
          build_version={Settings?.build_version}
          setShowBuildVersion={setShowBuildVersion}
        />
      )}
      <div>
        <nav className="navbar navbar-expand">
          <a
            href="javascript:void(0)"
            className="js-sidebar-toggle"
            style={{ width: "7%" }}
          >
            <img src="/assets/footer-menu.svg" className="img-fluid" />
          </a>
          <div className="mobile-logo">
            <img
              className="img-fluid"
              src="https://speedcdn.io/assets/logos/deal2026.com.png"
            />
          </div>

          <Search />
          <div className="navbar-collapse collapse">
            <ul className="navbar-nav navbar-align">
              {!token && (
                <Fragment>
                  <li className="mx-1">
                    <a
                      onClick={() => dispatch(setShowLoginModal(true))}
                      className="loguser"
                    >
                      login
                    </a>
                  </li>

                  <li className="mx-1">
                    <button
                      onClick={() => dispatch(setShowRegisterModal(true))}
                    >
                      <a className="loguser">Register</a>
                    </button>
                  </li>
                </Fragment>
              )}

              {token && (
                <li className="nav-item">
                  <div className="bal_exp mhide">
                    <span>
                      bal: <b>{data?.availBalance}</b>
                    </span>
                    <span>
                      exp: <b>{data?.deductedExposure}</b>
                    </span>
                    <a onClick={() => dispatch(logout())}>logout?</a>
                  </div>
                  <div
                    className="top-menu"
                    style={{
                      position: "relative",
                      display: "inline-block",
                    }}
                  >
                    <a
                      onClick={() => setOpen(!open)}
                      className="nav-link no-dw"
                      style={{
                        background: "var(--theme-gradient)",
                        color: "#000",
                        borderRadius: "4px",
                      }}
                    >
                      {" "}
                      {user} <MdOutlineKeyboardArrowDown size={20} />
                    </a>
                    {open && (
                      <ul
                        ref={ref}
                        style={{
                          position: "absolute",
                          top: "110%",
                          left: -75,
                          minWidth: "160px",
                          background: "#fff",
                          border: "1px solid #e2e8f0",
                          borderRadius: "6px",
                          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                          listStyle: "none",
                          margin: 0,
                          padding: "4px 0",
                          zIndex: 10,
                        }}
                      >
                        {links.map((link) => {
                          if (!link.show) return;
                          return (
                            <li key={link.label}>
                              <Link
                                onClick={() => setOpen(false)}
                                to={link.href}
                                style={{
                                  display: "block",
                                  padding: "8px 16px",
                                  color: "#1e293b",
                                  textDecoration: "none",
                                  background: "transparent",
                                }}
                                onMouseEnter={(e) =>
                                  (e.target.style.background = "#f1f5f9")
                                }
                                onMouseLeave={(e) =>
                                  (e.target.style.background = "transparent")
                                }
                              >
                                {link.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </li>
              )}

              <li className="nav-item">
                <div className="bal_exp mhide"></div>
              </li>
            </ul>
          </div>
        </nav>

        <Notification />
      </div>
    </Fragment>
  );
};

export default Header;
