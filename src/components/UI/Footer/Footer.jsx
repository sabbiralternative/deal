import { Link } from "react-router-dom";
import useLanguage from "../../../hooks/use-language";
import { LanguageKey } from "../../../const";

const MobileFooter = () => {
  const { getLanguage } = useLanguage();
  return (
    <div>
      <div className="footermenu">
        <div className="fm_menu">
          <Link to="/">
            <img src="/assets/footer-home.svg" className="img-fluid" />
            <span>{getLanguage(LanguageKey.HOME)}</span>
          </Link>
        </div>
        <div className="fm_menu">
          <Link to="/sports/casino?product=All&category=All">
            <img src="/assets/footer-casino.svg" className="img-fluid" />
            <span>{getLanguage(LanguageKey.CASINO)}</span>
          </Link>
        </div>
        <div className="fm_menu">
          <Link to="/sports/0">
            <img src="/assets/footer-uvgames.svg" className="img-fluid" />
            <span>{getLanguage(LanguageKey.IN_PLAY)}</span>
          </Link>
        </div>
        <div className="fm_menu">
          <Link to="/casino/sportsbook/550000">
            <img src="/assets/footer-account.svg" className="img-fluid" />
            <span>{getLanguage(LanguageKey.SPORTSBOOK)}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileFooter;
