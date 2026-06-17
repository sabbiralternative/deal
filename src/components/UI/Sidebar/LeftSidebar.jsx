import { Link, useNavigate } from "react-router-dom";
import { useLogo } from "../../../context/ApiProvider";
import { useDispatch, useSelector } from "react-redux";
import useBalance from "../../../hooks/balance";
import { useState } from "react";
import { Settings } from "../../../api";
import { setShowLoginModal } from "../../../redux/features/global/globalSlice";
import WarningCondition from "../../shared/WarningCondition/WarningCondition";

const LeftSidebar = () => {
  const { logo } = useLogo();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(false);
  const [gameInfo, setGameInfo] = useState({ gameName: "", gameId: "" });
  const { token } = useSelector((state) => state.auth);
  const { data } = useBalance();

  const handleNavigateToIFrame = (name, id) => {
    if (token) {
      if (Settings.casino_currency !== "AED") {
        navigate(`/casino/${name}/${id}`);
      } else {
        setGameInfo({ gameName: "", gameId: "" });
        setGameInfo({ gameName: name, gameId: id });
        setShowWarning(true);
      }
    } else {
      dispatch(setShowLoginModal(true));
    }
  };
  return (
    <div>
      {showWarning && (
        <WarningCondition gameInfo={gameInfo} setShowWarning={setShowWarning} />
      )}
      <nav id="sidebar" className="sidebar js-sidebar">
        <div
          className="sidebar-content js-simplebar"
          style={{ position: "relative" }}
        >
          <button className="btn btn-close d-block d-lg-none">&nbsp;</button>
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
          <Link to="/" className="sidebar-brand">
            <span className="align-middle">
              <img className="img-fluid" src={logo} />
            </span>
          </Link>
          <ul className="sidebar-nav">
            {token && (
              <li className="account_balance">
                <h2>account</h2>
                <div>
                  <span>
                    balance <em>{data?.availBalance}</em>
                  </span>
                  <span tabIndex={0}>
                    Exposure <em>{data?.deductedExposure}</em>
                  </span>
                </div>
              </li>
            )}

            <h2
              data-bs-toggle="collapse"
              to="#sidemenus"
              className="main_menu_title"
            >
              live
              <i data-feather="chevron-down" />
            </h2>
            <div id="sidemenus" className="collapse show">
              <li className="sidebar-item">
                <Link
                  data-bs-toggle="collapse"
                  className="sidebar-link"
                  to="/sports/4"
                >
                  <img className="img-fluid" src="/assets/icon-4.svg" />
                  <span className="align-middle">Cricket</span>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link
                  data-bs-toggle="collapse"
                  className="sidebar-link"
                  to="/sports/1"
                >
                  <img className="img-fluid" src="/assets/icon-1.svg" />
                  <span className="align-middle">Football</span>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link
                  data-bs-toggle="collapse"
                  className="sidebar-link"
                  to="/sports/2"
                >
                  <img className="img-fluid" src="/assets/icon-2.svg" />
                  <span className="align-middle">Tennis</span>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link
                  data-bs-toggle="collapse"
                  className="sidebar-link"
                  to="/sports/6"
                >
                  <img className="img-fluid" src="/assets/icon-2378961.svg" />
                  <span className="align-middle">Politics</span>
                </Link>

                <ul className="nav-content collapse" id="collapse3"></ul>
              </li>
              <li className="sidebar-item">
                <Link
                  to="/sports/casino?product=All&category=All"
                  className="sidebar-link"
                >
                  <img className="img-fluid" src="/assets/icon-casino.svg" />
                  <span className="align-middle">Casino</span>
                </Link>
              </li>
              <li className="sidebar-item">
                <a
                  onClick={() => handleNavigateToIFrame("sportsbook", "550000")}
                  className="sidebar-link"
                >
                  <img className="img-fluid" src="/assets/icon-99991.svg" />
                  <span className="align-middle">Sports book</span>
                </a>
              </li>
              <li className="sidebar-item">
                <Link
                  data-bs-toggle="collapse"
                  className="sidebar-link"
                  to="/sports/7"
                >
                  <img className="img-fluid" src="/assets/icon-7.svg" />
                  <span className="align-middle">Horse Racing</span>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link
                  data-bs-toggle="collapse"
                  className="sidebar-link"
                  to="/sports/4339"
                >
                  <img className="img-fluid" src="/assets/icon-4339.svg" />
                  <span className="align-middle">Greyhound Racing</span>
                </Link>
              </li>

              <li className="sidebar-item">
                <Link
                  data-bs-toggle="collapse"
                  className="sidebar-link"
                  to="/sports/5"
                >
                  <img className="img-fluid" src="/assets/icon-99994.svg" />
                  <span className="align-middle">Kabaddi</span>
                </Link>
              </li>
            </div>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default LeftSidebar;
