import { useDispatch, useSelector } from "react-redux";
import { Settings } from "../../../api";
import { Link, useLocation } from "react-router-dom";
import AppPopup from "./AppPopUp";
import { Fragment, useEffect, useState } from "react";
import {
  setClosePopUpForForever,
  setShowAPKModal,
  setShowAppPopUp,
  setShowLoginModal,
} from "../../../redux/features/global/globalSlice";
import Error from "../../modals/Error/Error";
import Notification from "./Notification";
import DownloadAPK from "../../modals/DownloadAPK/DownloadAPK";
import BuildVersion from "../../modals/BuildVersion/BuildVersion";
import useBalance from "../../../hooks/balance";
import { logout } from "../../../redux/features/auth/authSlice";
import {
  FaArrowDown,
  FaArrowUp,
  FaRegArrowAltCircleDown,
} from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { data } = useBalance();
  const stored_build_version = localStorage.getItem("build_version");
  const [showBuildVersion, setShowBuildVersion] = useState(false);
  const location = useLocation();
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { showAppPopUp, windowWidth, closePopupForForever, showAPKModal } =
    useSelector((state) => state?.global);

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
    { label: "Deposit", href: "/deposit" },
    { label: "Withdraw", href: "/withdraw" },
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

          <div className="searchbar">
            <div className="input-group">
              <span className="input-group-text">
                <i data-feather="search" className="align-middle" />
              </span>
              <input
                type="text"
                placeholder="Search"
                className="form-control ng-untouched ng-pristine ng-valid"
                aria-expanded="false"
                aria-autocomplete="list"
              />
            </div>
          </div>
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
                    <button>
                      <a href="javascript:void(0);" className="loguser">
                        demo
                      </a>
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
                        style={{
                          position: "absolute",
                          top: "110%",
                          left: 0,
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
                        {links.map((link) => (
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
                        ))}
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

        <div
          tabIndex={-1}
          role="dialog"
          aria-labelledby
          className="modal fade force-change-password-popup"
        >
          <div className="modal-dialog bookModal">
            <div className="modal-content modal-content-centered">
              <div className="modal-header">
                <h5 className="modal-title">Force Change Password</h5>
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  className="close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body p-0">
                <app-change-password _nghost-nxb-c52>
                  <form
                    noValidate
                    className="cp_form p-3 ng-untouched ng-pristine ng-invalid"
                  >
                    <div className="row">
                      <div className="col-md-12">
                        <div className="row mb-lg-3 mt-lg-2 align-items-center">
                          <label className="col-md-3 col-lg-3 col-form-label text-lg-end">
                            Current Password :
                          </label>
                          <div className="col-md-9 col-lg-9">
                            <input
                              type="password"
                              className="form-control ng-untouched ng-pristine ng-invalid"
                            />
                          </div>
                        </div>
                        <div className="row mb-lg-3 mt-lg-2 align-items-center">
                          <label
                            htmlFor="newPassword"
                            className="col-md-3 col-lg-3 col-form-label text-lg-end"
                          >
                            New Password :
                          </label>
                          <div className="col-md-9 col-lg-9">
                            <input
                              type="password"
                              className="form-control ng-untouched ng-pristine ng-invalid"
                            />
                          </div>
                        </div>
                        <div className="row mb-lg-3 mt-lg-2 align-items-center">
                          <label
                            htmlFor="renewPassword"
                            className="col-md-3 col-lg-3 col-form-label text-lg-end"
                          >
                            Re-enter New Password :
                          </label>
                          <div className="col-md-9 col-lg-9">
                            <input
                              type="password"
                              className="form-control ng-untouched ng-pristine ng-invalid"
                            />
                          </div>
                        </div>
                        <div className="feedback">
                          <p className="small m-0">
                            <i>
                              <b>Note:</b> The New Password field must be at
                              least 6 characters
                            </i>
                          </p>
                          <p className="small m-0">
                            <i>
                              <b>Note:</b> The New Password must contain at
                              least: 1 uppercase letter, 1 lowercase letter, 1
                              number
                            </i>
                          </p>
                        </div>
                        <div className="row mt-1">
                          <button type="submit" className="btn btn_cp">
                            Change Password
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </app-change-password>
              </div>
            </div>
          </div>
        </div>

        <div
          tabIndex={-1}
          role="dialog"
          aria-labelledby
          className="modal fade force-change-password-popup"
        >
          <div className="modal-dialog bookModal app_version">
            <div className="modal-content">
              <div className="modal-body p-0">
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  className="close"
                  style={{
                    position: "absolute",
                    right: "13px",
                    top: "1px",
                    color: "#fff",
                    fontSize: "25px",
                    fontWeight: 900,
                  }}
                >
                  <span aria-hidden="true">×</span>
                </button>
                <a>
                  <img src="https://speedcdn.io/assets/v9-modal-popup/iccwt2026.webp" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          tabIndex={-1}
          role="dialog"
          aria-labelledby
          className="modal fade force-change-password-popup"
        >
          <div className="modal-dialog modal-dialog-centered bookModal app_version">
            <div className="modal-content" style={{ background: "none" }}>
              <div className="modal-body p-0">
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  className="close"
                  style={{
                    position: "absolute",
                    right: "13px",
                    top: "1px",
                    border: "none",
                    background: "transparent",
                    color: "#fff",
                    fontSize: "25px",
                    fontWeight: 900,
                  }}
                >
                  <span aria-hidden="true">×</span>
                </button>
                <a>
                  <img
                    src="https://speedcdn.io/assets/v9-modal-popup/apk-download-poster.webp"
                    style={{ width: "100%" }}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
