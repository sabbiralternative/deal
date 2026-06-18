import { Link } from "react-router-dom";

const MobileFooter = () => {
  return (
    <div>
      <div className="footermenu">
        <div className="fm_menu">
          <Link to="/">
            <img src="/assets/footer-home.svg" className="img-fluid" />
            <span>home</span>
          </Link>
        </div>
        <div className="fm_menu">
          <Link to="/sports/casino?product=All&category=All">
            <img src="/assets/footer-casino.svg" className="img-fluid" />
            <span>Casino</span>
          </Link>
        </div>
        <div className="fm_menu">
          <Link to="/sports/0">
            <img src="/assets/footer-uvgames.svg" className="img-fluid" />
            <span>Inplay</span>
          </Link>
        </div>
        <div className="fm_menu">
          <Link to="/casino/sportsbook/550000">
            <img src="/assets/footer-account.svg" className="img-fluid" />
            <span>Sportsbook</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileFooter;
