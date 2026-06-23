import { Link } from "react-router-dom";
import { Settings } from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/features/auth/authSlice";
import { Fragment, useRef } from "react";
import useCloseModalClickOutside from "../../../hooks/closeModal";
import { useLanguage } from "../../../context/LanguageProvider";
import { languageValue } from "../../../hooks/language";
import { LanguageKey } from "../../../const";

const Dropdown = ({ setOpen }) => {
  const { valueByLanguage } = useLanguage();
  const ref = useRef();
  const dispatch = useDispatch();
  const { closePopupForForever } = useSelector((state) => state?.global);

  useCloseModalClickOutside(ref, () => setOpen(false));
  const links = [
    {
      label: languageValue(valueByLanguage, LanguageKey.DEPOSIT),
      href: "/deposit",
      show: true,
    },
    {
      label: languageValue(valueByLanguage, LanguageKey.WITHDRAW),
      href: "/withdraw",
      show: true,
    },
    {
      label: "Deposit Withdraw Report",
      href: "/deposit-withdraw-report",
      show: true,
    },
    { label: "Betting Profit Loss", href: "/betting-profit-loss", show: true },
    {
      label: languageValue(valueByLanguage, LanguageKey.MY_BANK_DETAILS),
      href: "/my-bank-details",
      show: true,
    },
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
    { label: "Stake Settings", href: "/settings", show: true },
    {
      label: languageValue(valueByLanguage, LanguageKey.CHANGE_PASSWORD),
      href: "/change-password",
      show: true,
    },
  ];
  const handleOpenSocialLink = (link) => {
    if (link) {
      window.open(link, "_blank");
    }
  };
  return (
    <Fragment>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "#00000070",
          zIndex: 10000,
        }}
      ></div>
      <ul
        ref={ref}
        style={{
          position: "absolute",
          top: "110%",
          left: -55,
          minWidth: "160px",
          background: "#fff",
          border: "1px solid #e2e8f0",
          borderRadius: "6px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          listStyle: "none",
          margin: 0,
          padding: "4px 0",
          zIndex: 9999999,
        }}
      >
        {Settings?.branchWhatsapplink && (
          <li>
            <a
              onClick={() => handleOpenSocialLink(Settings?.branchWhatsapplink)}
              style={{
                display: "block",
                padding: "8px 16px",
                color: "#1e293b",
                textDecoration: "none",
                background: "transparent",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#f1f5f9")}
              onMouseLeave={(e) => (e.target.style.background = "transparent")}
            >
              Customer Support
            </a>
          </li>
        )}

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
                onMouseEnter={(e) => (e.target.style.background = "#f1f5f9")}
                onMouseLeave={(e) =>
                  (e.target.style.background = "transparent")
                }
              >
                {link.label}
              </Link>
            </li>
          );
        })}
        <li>
          <a
            onClick={() => dispatch(logout())}
            onMouseEnter={(e) => (e.target.style.background = "#f1f5f9")}
            onMouseLeave={(e) => (e.target.style.background = "transparent")}
            style={{
              display: "block",
              padding: "8px 16px",
              color: "#1e293b",
              textDecoration: "none",
              background: "transparent",
            }}
          >
            Logout
          </a>
        </li>
      </ul>
    </Fragment>
  );
};

export default Dropdown;
