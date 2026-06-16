import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Settings } from "../../../api";
import WarningCondition from "../../shared/WarningCondition/WarningCondition";
import "./LiveSlotCrashFishing.css";
import useLiveCasinoLobby from "../../../hooks/liveCasinoLobby";
import { setSelectedCategory } from "../../../redux/features/global/globalSlice";

const LiveSlotCrashFishing = ({ casinoType }) => {
  const location = useLocation();
  const { token, bonusToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { selectedCategory } = useSelector((state) => state.global);
  const { data } = useLiveCasinoLobby(casinoType);
  const categories = data && Object.keys(data);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [gameInfo, setGameInfo] = useState({ gameName: "", gameId: "" });
  const dispatch = useDispatch();

  const handleCategoryClick = (category) => {
    setSearchQuery("");
    dispatch(setSelectedCategory(category));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredGames =
    data && selectedCategory && selectedCategory !== "ALL"
      ? { [selectedCategory]: data[selectedCategory] }
      : data;

  const getFilteredGamesByName = (games) =>
    games &&
    games?.filter((game) =>
      game?.game_name?.toLowerCase().includes(searchQuery),
    );

  const handleNavigate = (game) => {
    if (token) {
      if (bonusToken) {
        return setError("Bonus wallet is available only on sports.");
      }
      if (Settings.casino_currency !== "AED") {
        navigate(
          `/casino/${game?.game_name.replace(/ /g, "")}/${game?.game_id}`,
        );
      } else {
        setGameInfo({ gameName: "", gameId: "" });
        setGameInfo({ gameName: game?.game_name, gameId: game?.game_id });
        setShowWarning(true);
      }
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (error) {
      return toast.error(error);
    }
  }, [error]);

  return (
    <>
      {showWarning && (
        <WarningCondition gameInfo={gameInfo} setShowWarning={setShowWarning} />
      )}

      {/* Back Navigation Bar */}
      <div onClick={() => navigate(-1)} className="nav-bar">
        <div className="nav-bar-inner">
          <div className="nav-icon-wrap">
            <button className="nav-back-btn" type="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="7"
                height="12"
                viewBox="0 0 7 12"
                fill="var(--fancy-icon)"
              >
                <path
                  d="M5.3673 11.2346L0 5.8673L5.3673 0.5L6.32 1.4527L1.90539 5.8673L6.32 10.2819L5.3673 11.2346Z"
                  fill="var(--fancy-icon)"
                />
              </svg>
            </button>
          </div>
          <span className="nav-title">
            <span>{location.pathname.split("/")[1].replace("-", " ")}</span>
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-container">
        <div className="content-wrapper">
          <div
            className="scroll-area"
            style={{ minHeight: "calc(-110px + 100dvh)" }}
          >
            <h1 className="page-heading">Play Online games</h1>

            {/* Search + Category Controls */}
            <div className="controls-section">
              <label className="sr-only">Search</label>
              <div className="search-wrapper">
                <div className="search-icon-wrap">
                  <svg
                    fill="#999"
                    style={{ height: 20, width: 20 }}
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z" />
                  </svg>
                </div>
                <div className="search-input-box">
                  <input
                    value={searchQuery}
                    onChange={handleSearchChange}
                    id="default-search"
                    className="search-input"
                    placeholder="Search Games (Atleast 3 chars.....)"
                    autoComplete="off"
                    type="search"
                  />
                </div>
              </div>

              {/* Category Tabs */}
              <div className="category-bar">
                <div className="category-btn-group">
                  <button
                    onClick={() => handleCategoryClick("ALL")}
                    className={`category-btn ${
                      selectedCategory === "ALL"
                        ? "category-btn--active"
                        : "category-btn--inactive"
                    }`}
                    type="button"
                  >
                    <span
                      className={
                        selectedCategory === "ALL"
                          ? "category-btn-label--active"
                          : "category-btn-label--inactive"
                      }
                    >
                      ALL
                    </span>
                  </button>

                  {categories &&
                    categories?.map((category) => (
                      <button
                        onClick={() => handleCategoryClick(category)}
                        key={category}
                        className={`category-btn ${
                          selectedCategory === category
                            ? "category-btn--active"
                            : "category-btn--inactive"
                        }`}
                        type="button"
                      >
                        <span
                          className={
                            selectedCategory === category
                              ? "category-btn-label--active"
                              : "category-btn-label--inactive"
                          }
                        >
                          {category}
                        </span>
                      </button>
                    ))}
                </div>
              </div>
            </div>

            {/* Games Grid */}
            <div className="games-bg">
              <div className="games-inner">
                <div className="games-list">
                  {data &&
                    Object.entries(filteredGames)?.map(
                      ([category, games], idx) => {
                        const filteredByName = getFilteredGamesByName(games);

                        if (filteredByName?.length === 0) return null;

                        return (
                          <div key={idx} className="category-section">
                            <div className="category-overflow">
                              <div className="category-header">
                                <div className="category-title-wrap">
                                  <span className="category-title">
                                    {category}
                                  </span>
                                </div>
                              </div>

                              <div
                                id={`scrollShow-${category}`}
                                className="games-row-scroll"
                              >
                                <div className="games-row">
                                  {filteredByName?.map((game, i) => (
                                    <div
                                      key={i}
                                      onClick={() => handleNavigate(game)}
                                      className="game-card-wrap"
                                    >
                                      <div className="game-card">
                                        <div className="game-img-wrap">
                                          <img
                                            src={game?.url_thumb}
                                            width="auto"
                                            height="auto"
                                            className="game-img"
                                            alt={game?.game_name || "Game"}
                                            loading="lazy"
                                            title={game?.game_name || "Game"}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      },
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveSlotCrashFishing;
