import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./Originals.css";
import { Settings } from "../../../api";
import WarningCondition from "../../shared/WarningCondition/WarningCondition";

const Originals = ({ trendingGames }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [gameInfo, setGameInfo] = useState({ gameName: "", gameId: "" });
  const { token, bonusToken } = useSelector((state) => state.auth);

  const [selectedCategory, setSelectedCategory] = useState();
  const categories = trendingGames && Object.keys(trendingGames);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const filteredGames =
    selectedCategory && trendingGames
      ? trendingGames[selectedCategory]
      : trendingGames;

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
    if (trendingGames) {
      const [firstCategory] = Object.keys(trendingGames);
      setSelectedCategory(firstCategory);
    }
  }, [trendingGames]);

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

      <div title="Trending Games" className="originals-wrapper">
        <div className="originals-card">
          {/* Tab Header */}
          <div className="originals-tab-header">
            <div className="originals-tab-scroll">
              {categories?.map((category) => (
                <div
                  onClick={() => handleSelectCategory(category)}
                  key={category}
                  className={`originals-tab ${
                    selectedCategory === category
                      ? "originals-tab--active"
                      : "originals-tab--inactive"
                  }`}
                >
                  <span className="originals-tab-label">{category}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Games Scroll Area */}
          <div id="scrollShow" className="originals-games-scroll">
            <div className="originals-games-grid">
              {trendingGames &&
                filteredGames?.length > 0 &&
                filteredGames?.map((game, idx) => (
                  <div
                    onClick={() => handleNavigate(game)}
                    key={idx}
                    className="originals-game-card"
                  >
                    <div className="originals-game-inner">
                      <div className="originals-game-img-wrap">
                        <img
                          src={game?.url_thumb}
                          width="200"
                          height="auto"
                          className="originals-game-img"
                          alt="casino-event-image"
                          loading="lazy"
                          title={game?.game_name}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Originals;
