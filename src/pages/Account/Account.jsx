import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/auth/authSlice";
import { Settings } from "../../api";
import useLanguage from "../../hooks/use-language";
import { LanguageKey } from "../../const";

const Account = () => {
  const { getLanguage } = useLanguage();
  const { closePopupForForever } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, memberId } = useSelector((state) => state.auth);
  return (
    <div data-v-2f3cedbb>
      <section className="mobile-account" loading="lazy">
        <div className="mobile-menus-screen">
          <div className="user-profile flex-d">
            <div className="account-circle">
              <h3>
                <img
                  loading="lazy"
                  src="/assets/user-icon123-DbL8niSy.png"
                  alt=""
                />
                {user}
              </h3>
              <div className="tooltip-container">
                <button type="button" className="copy_btn text">
                  <img
                    loading="lazy"
                    src="/assets/copy-bold-DvClfR-5.svg"
                    alt="moon"
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="setting-one-click-bet-sec">
            <span>{getLanguage(LanguageKey.USER_ID)}: &nbsp; </span>
            <div className="iconText">
              <span className="exp_bal_amo-size">{memberId}</span>
              <span className="edit_icon">
                <i className="fa fa-pen" />
              </span>
            </div>
          </div>

          <ul>
            <li>
              <Link to="/deposit" className>
                {getLanguage(LanguageKey.DEPOSIT)}
              </Link>
            </li>
            <li>
              <Link to="/withdraw" className>
                {getLanguage(LanguageKey.WITHDRAW)}
              </Link>
            </li>
            <li>
              <Link to="/deposit-withdraw-report" className>
                {getLanguage(LanguageKey.DEPOSIT_WITHDRAW_REPORT)}
              </Link>
            </li>
            <li>
              <Link to="/betting-profit-loss" className>
                {getLanguage(LanguageKey.BETTING_PROFIT_AND_LOSS)}
              </Link>
            </li>

            <li>
              <Link to="/my-bank-details" className>
                {getLanguage(LanguageKey.MY_BANK_DETAILS)}
              </Link>
            </li>
            <li>
              <Link to="/bonus-statement" className>
                {getLanguage(LanguageKey.BONUS_STATEMENT)}
              </Link>
            </li>
            {Settings?.referral && (
              <li>
                <Link to="/affiliate" className>
                  {getLanguage(LanguageKey.AFFILIATE)}
                </Link>
              </li>
            )}

            <li>
              <Link to="/promotions" className>
                {getLanguage(LanguageKey.PROMOTION_AND_BONUSES)}
              </Link>
            </li>
            <li>
              <Link to="/lossback-bonus" className>
                {getLanguage(LanguageKey.LOSSBACK_BONUS)}
              </Link>
            </li>
            {closePopupForForever && (
              <li>
                <Link to="/app-only-bonus" className>
                  {getLanguage(LanguageKey.APP_ONLY_BONUS)}
                </Link>
              </li>
            )}
          </ul>
          <a
            onClick={() => {
              dispatch(logout());
              navigate("/");
            }}
            className="mbl-logout-btn"
            data-bs-toggle="modal"
            data-bs-target="#logoutmodal"
          >
            {getLanguage(LanguageKey.LOGOUT)}
            <img
              src="/assets/sign-out-DPrmzSef.png"
              alt="sign"
              className="sign_out"
            />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Account;
