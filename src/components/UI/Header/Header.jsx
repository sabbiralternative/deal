import { useDispatch, useSelector } from "react-redux";
import { Settings } from "../../../api";
import { useLocation, useNavigate } from "react-router-dom";
import AppPopup from "./AppPopUp";
import { Fragment, useEffect, useState } from "react";
import {
  setClosePopUpForForever,
  setShowAPKModal,
  setShowAppPopUp,
  setShowLoginModal,
  setShowMobileSidebar,
  setShowRegisterModal,
} from "../../../redux/features/global/globalSlice";
import Error from "../../modals/Error/Error";
import Notification from "./Notification";
import DownloadAPK from "../../modals/DownloadAPK/DownloadAPK";
import BuildVersion from "../../modals/BuildVersion/BuildVersion";
import useBalance from "../../../hooks/balance";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Search from "./Search";
import Dropdown from "./Dropdown";
import { useLogo } from "../../../context/ApiProvider";
import { useLanguage } from "../../../context/LanguageProvider";
import images from "../../../assets/images";
import Language from "../../modals/Language";
import { languageValue } from "../../../hooks/language";
import { LanguageKey } from "../../../const";

const Header = () => {
  const { language, valueByLanguage, setLanguage } = useLanguage();
  const [showLanguage, setShowLanguage] = useState(false);
  const navigate = useNavigate();
  const { logo } = useLogo();

  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
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

  useEffect(() => {
    setLanguage(localStorage.getItem("language") || "english");
  }, [setLanguage]);

  if (Settings.app_only && !closePopupForForever) {
    return <Error />;
  }

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
            onClick={() => dispatch(setShowMobileSidebar(true))}
            className="js-sidebar-toggle"
            style={{ width: "7%" }}
          >
            <img src="/assets/footer-menu.svg" className="img-fluid" />
          </a>
          <div onClick={() => navigate("/")} className="mobile-logo">
            <img className="img-fluid" src={logo} />
          </div>

          <Search />
          <div className="navbar-collapse collapse">
            <ul
              style={{ alignItems: "center" }}
              className="navbar-nav navbar-align"
            >
              {!token && (
                <Fragment>
                  <li className="mx-1">
                    <a
                      onClick={() => dispatch(setShowLoginModal(true))}
                      className="loguser"
                    >
                      {languageValue(valueByLanguage, LanguageKey.LOGIN)}
                    </a>
                  </li>

                  <li className="mx-1">
                    <button
                      onClick={() => dispatch(setShowRegisterModal(true))}
                    >
                      <a className="loguser">
                        {" "}
                        {languageValue(valueByLanguage, LanguageKey.REGISTER)}
                      </a>
                    </button>
                  </li>
                </Fragment>
              )}

              {token && (
                <li className="nav-item">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "end",
                      width: "100%",
                    }}
                  >
                    {" "}
                    <div className="bal_exp mhide">
                      <span>
                        bal: <b>{data?.availBalance}</b>
                      </span>
                      <span>
                        exp: <b>{data?.deductedExposure}</b>
                      </span>
                      {/* <a onClick={() => dispatch(logout())}>logout?</a> */}
                    </div>
                    <div
                      className="top-menu"
                      style={{
                        position: "relative",
                      }}
                    >
                      <a
                        onClick={() =>
                          setDesktopDropdownOpen(!desktopDropdownOpen)
                        }
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
                      {desktopDropdownOpen && (
                        <Dropdown setOpen={setDesktopDropdownOpen} />
                      )}
                    </div>
                  </div>
                </li>
              )}
              {token && (
                <li className="nav-item dhide">
                  <div
                    className="nav-link maccount"
                    style={{ position: "relative" }}
                  >
                    <span>
                      <em>
                        <small>
                          <b>Bal:</b>
                          {data?.availBalance}
                        </small>
                        &nbsp; <small>Exp:{data?.deductedExposure}</small>
                      </em>
                      <a
                        onClick={() =>
                          setMobileDropdownOpen(!mobileDropdownOpen)
                        }
                      >
                        {user} <MdOutlineKeyboardArrowDown size={20} />
                      </a>
                    </span>
                    {mobileDropdownOpen && (
                      <Dropdown setOpen={setMobileDropdownOpen} />
                    )}
                  </div>
                </li>
              )}

              <li className="nav-item">
                <div className="bal_exp mhide"></div>
              </li>
              <li style={{ position: "relative" }} className="">
                {Settings.language && (
                  <button
                    // className="loguser"
                    onClick={() => setShowLanguage((prev) => !prev)}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "end",
                        background: "transparent",
                        border: "none",
                      }}
                    >
                      <img
                        style={{
                          height: "20px",
                          width: "20px",
                          filter: "invert(0)",
                        }}
                        src={images.globe}
                        alt=""
                      />
                      <b
                        style={{
                          margin: "0px",
                          fontSize: "10px",
                          textTransform: "capitalize",
                          color: "#fff",
                        }}
                      >
                        {language || "EN"}
                      </b>
                    </div>
                  </button>
                )}
                {showLanguage && <Language setShowLanguage={setShowLanguage} />}
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
