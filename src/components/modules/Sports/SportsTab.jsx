import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Settings } from "../../../api";
import { setShowLoginModal } from "../../../redux/features/global/globalSlice";
import WarningCondition from "../../shared/WarningCondition/WarningCondition";
import { LanguageKey } from "../../../const";
import { eventNameList } from "../../../static/event-name-list";
import useLanguage from "../../../hooks/use-language";

const SportsTab = () => {
  const { getLanguage } = useLanguage();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { eventTypeId } = useParams();
  const [showWarning, setShowWarning] = useState(false);
  const [gameInfo, setGameInfo] = useState({ gameName: "", gameId: "" });
  const { token } = useSelector((state) => state.auth);
  const getActiveClass = (id) => {
    if (id == eventTypeId) {
      return "active";
    }
  };

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
    <Fragment>
      {showWarning && (
        <WarningCondition gameInfo={gameInfo} setShowWarning={setShowWarning} />
      )}
      <ul
        role="tablist"
        className="nav nav-nav sportlist_div_sub_tabs"
        aria-label="Tabs"
      >
        <li className="nav-item">
          <Link
            to="/sports/0"
            role="tab"
            className={`nav-link ${getActiveClass("0")}`}
            aria-controls
            aria-selected="false"
            id
          >
            <span />
            <img
              className="img-fluid"
              id="tab-in_play"
              src="/assets/icon-in_play.svg"
            />{" "}
            {getLanguage(LanguageKey.IN_PLAY)}
          </Link>
        </li>
        <li className="nav-item ">
          <Link
            to="/sports/4"
            role="tab"
            className={`nav-link ${getActiveClass("4")}`}
            aria-controls
            aria-selected="true"
            id
          >
            <span />
            <img
              className="img-fluid"
              id="tab-4"
              src="/assets/icon-4.svg"
            />{" "}
            {getLanguage(LanguageKey.CRICKET)}
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/sports/1"
            role="tab"
            className={`nav-link ${getActiveClass("1")}`}
            aria-controls
            aria-selected="false"
            id
          >
            <span />
            <img
              className="img-fluid"
              id="tab-1"
              src="/assets/icon-1.svg"
            />{" "}
            {getLanguage(LanguageKey.FOOTBALL)}
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/sports/2"
            role="tab"
            className={`nav-link ${getActiveClass("2")}`}
            aria-controls
            aria-selected="false"
            id
          >
            <span />
            <img
              className="img-fluid"
              id="tab-2"
              src="/assets/icon-2.svg"
            />{" "}
            {getLanguage(LanguageKey.TENNIS)}
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/sports/6"
            role="tab"
            className={`nav-link ${getActiveClass("6")}`}
            aria-controls
            aria-selected="false"
            id
          >
            <span />
            <img
              className="img-fluid"
              id="tab-2378961"
              src="/assets/icon-2378961.svg"
            />{" "}
            {getLanguage(LanguageKey.POLITICS)}
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to="/sports/casino?product=All&category=All"
            role="tab"
            className={`nav-link ${getActiveClass("casino")}`}
            aria-controls
            aria-selected="false"
            id
          >
            <span />
            <img
              className="img-fluid"
              id="tab-99998"
              src="/assets/icon-casino.svg"
            />{" "}
            {getLanguage(LanguageKey.CASINO)}
          </Link>
        </li>
        <li className="nav-item">
          <a
            onClick={() => handleNavigateToIFrame("sportsbook", "550000")}
            role="tab"
            className={`nav-link `}
            aria-controls
            aria-selected="false"
            id
          >
            <span />
            <img
              className="img-fluid"
              id="tab-99991"
              src="/assets/icon-99991.svg"
            />{" "}
            {getLanguage(LanguageKey.SPORTSBOOK)}
          </a>
        </li>
        <li className="nav-item">
          <Link
            to="/sports/7"
            role="tab"
            className={`nav-link ${getActiveClass("7")}`}
            aria-controls
            aria-selected="false"
            id
          >
            <span />
            <img
              className="img-fluid"
              id="tab-7"
              src="/assets/icon-7.svg"
            />{" "}
            {getLanguage(LanguageKey.HORSE)}
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/sports/4339"
            role="tab"
            className={`nav-link ${getActiveClass("4349")}`}
            aria-controls
            aria-selected="false"
            id
          >
            <span />
            <img
              className="img-fluid"
              id="tab-4339"
              src="/assets/icon-4339.svg"
            />{" "}
            {getLanguage(LanguageKey.GREYHOUND)}
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to="/sports/5"
            role="tab"
            className={`nav-link ${getActiveClass("5")}`}
            aria-controls
            aria-selected="false"
            id
          >
            <span />
            <img
              className="img-fluid"
              id="tab-99994"
              src="/assets/icon-99994.svg"
            />{" "}
            {getLanguage(LanguageKey.KABADDI)}
          </Link>
        </li>
        {eventNameList.map((item) => {
          return (
            <li key={item.id} className="nav-item">
              <Link
                to={`/sports/${item.id}`}
                role="tab"
                className={`nav-link ${getActiveClass(item.id)}`}
                aria-controls
                aria-selected="false"
                id
              >
                <span />
                <img className="img-fluid" id="tab-99994" src={item.image} />
                {getLanguage(item.name)}
              </Link>
            </li>
          );
        })}
      </ul>
    </Fragment>
  );
};

export default SportsTab;
