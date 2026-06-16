import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const MobileFooter = () => {
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);

  return (
    <div>
      <div className="footermenu">
        <div className="fm_menu">
          <a href="/home">
            <img src="/assets/footer-home.svg" className="img-fluid" />
            <span>home</span>
          </a>
        </div>
        <div className="fm_menu">
          <a href="/sports/99998">
            <img src="/assets/footer-casino.svg" className="img-fluid" />
            <span>Casino</span>
          </a>
        </div>
        <div className="fm_menu">
          <a href="javascript:void(0)">
            <img src="/assets/footer-uvgames.svg" className="img-fluid" />
            <span>UV games</span>
          </a>
        </div>
        <div className="fm_menu">
          <a href="/profile">
            <img src="/assets/footer-account.svg" className="img-fluid" />
            <span>account</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileFooter;
