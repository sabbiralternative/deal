import { useNavigate } from "react-router-dom";
import { API } from "../../../api";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { AxiosSecure } from "../../../lib/AxiosSecure";
import { scrollToLeft, scrollToRight } from "../../../utils/scroll";

const styles = `
  .aura-wolf-wrapper {
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 6px;
    padding-right: 6px;
    width: 100%;
  }

  .aura-wolf-card {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: var(--color-bg_Quaternary);
    border-radius: 4px;
    box-shadow: var(--shadow-homeCasinoCardGamesShadow);
    divide-color: transparent;
  }

  .aura-wolf-card > * + * {
    border-top: 1px solid var(--color-divider, rgba(0,0,0,0.1));
  }

  /* Header */
  .aura-wolf-header {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 8px 0px;
    gap: 10px;
    border-radius: 4px 4px 0 0;
    background-color: var(--color-bg_Quaternary);
  }

  .aura-wolf-header-inner {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .aura-wolf-title {
    color: #000;
    font-weight: 600;
    text-transform: capitalize;
  }

  .aura-wolf-controls {
    display: flex;
    width: 108.75px;
    align-items: center;
    justify-content: flex-end;
    gap: 5px;
  }

  .aura-wolf-btn-see-all {
    display: inline-block;
    line-height: normal;
    position: relative;
    overflow: hidden;
    transition: all 200ms ease-in-out;
    font-family: 'Lato', sans-serif;
    color: var(--color-text_DepositTextColor);
    font-weight: 600;
    font-size: 12px;
    line-height: 18px;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
  }

  .aura-wolf-btn-scroll {
    display: inline-flex;
    line-height: normal;
    position: relative;
    overflow: hidden;
    transition: all 150ms ease-in-out;
    width: 22px;
    height: 22px;
    padding: 4px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    color: var(--color-text_Primary);
    border: 1px solid var(--color-border, rgba(255,255,255,0.15));
    background-color: var(--theme-primary);
    border-radius: 4px;
    cursor: pointer;
  }

  /* Scroll container */
  .aura-wolf-scroll-container {
    padding: 10px 0px;
    transition: all 200ms ease-in-out;
    width: 100%;
    height: max-content;
    overflow-x: auto;
  }

  /* Grid — horizontal scroll mode (default) */
  .aura-wolf-grid {
    display: grid;
    gap: 8px 6px;
    width: 100%;
  }

  .aura-wolf-grid--scroll {
    grid-auto-flow: column;
    grid-template-rows: repeat(2, auto);
  }

  /* Grid — see-all expanded mode */
  .aura-wolf-grid--expanded {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 640px) {
    .aura-wolf-grid--expanded {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @media (min-width: 768px) {
    .aura-wolf-grid--expanded {
      grid-template-columns: repeat(5, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .aura-wolf-grid--expanded {
      grid-template-columns: repeat(6, 1fr);
    }
  }

  @media (min-width: 1280px) {
    .aura-wolf-grid--expanded {
      grid-template-columns: repeat(7, 1fr);
    }
  }

  @media (min-width: 1536px) {
    .aura-wolf-grid--expanded {
      grid-template-columns: repeat(8, 1fr);
    }
  }

  /* Game item */
  .aura-wolf-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 100ms ease-in-out;
  }

  .aura-wolf-item--scroll {
    width: 120px;
  }

  @media (min-width: 640px) {
    .aura-wolf-item--scroll {
      width: 180px;
    }
  }

  @media (min-width: 768px) {
    .aura-wolf-item--scroll {
      width: 140px;
    }
  }

  .aura-wolf-item-inner {
    width: 100%;
    background: transparent;
    display: flex;
    flex-direction: column;
    transition: all 200ms ease-in-out;
    position: relative;
    overflow: hidden;
    border-radius: 4px;
  }

  .aura-wolf-img-wrapper {
    aspect-ratio: 1 / 1;
  }

  .aura-wolf-img-wrapper--scroll {
    width: 120px;
  }

  @media (min-width: 640px) {
    .aura-wolf-img-wrapper--scroll {
      width: 180px;
    }
  }

  @media (min-width: 768px) {
    .aura-wolf-img-wrapper--scroll {
      width: 140px;
    }
  }

  .aura-wolf-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 6px;
    transition: transform 200ms ease-in-out;
  }

  .aura-wolf-img:hover {
    transform: scale(1.03);
  }
`;

const IndianCardGames = () => {
  const [showSeeAll, setShowSeeAll] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();
  const { token, bonusToken } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [warnMessage, setWarnMessage] = useState("");

  useEffect(() => {
    const getGames = async () => {
      const res = await AxiosSecure.post(API.mac88, {
        gameList: "ALL",
        product: "ALL",
        isHome: false,
      });

      if (res?.status === 200) {
        const result = res?.data;
        setData(result);
      }
    };
    getGames();
  }, []);

  const handleAuraCasino = (code, name) => {
    if (token) {
      if (bonusToken) {
        return setWarnMessage("Bonus wallet is available only on sports.");
      } else {
        navigate(`/casino/${name.replace(/ /g, "")}/${code}`);
      }
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (warnMessage) {
      return toast.error(warnMessage);
    }
  }, [warnMessage]);

  return (
    <>
      <style>{styles}</style>
      <div title="IndianCardGames" className="aura-wolf-wrapper">
        <div className="aura-wolf-card">
          {/* Header */}
          <div className="aura-wolf-header">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="16"
              height="16"
              x="0"
              y="0"
              viewBox="0 0 511.643 511.643"
              xmlSpace="preserve"
            >
              <g>
                <path
                  d="M453.209 184.081C373.725 121.725 300.804 41.437 270.565 6.713c-7.795-8.951-21.691-8.951-29.486 0-30.24 34.723-103.16 115.011-182.644 177.368C22.372 212.373 1.267 254.915 1.267 299.99c0 80 66.652 144.853 148.871 144.853 27.807 0 53.101-10.455 71.97-27.539v28.247c0 34.386-24.644 38.65-43.766 54.707-4.599 3.862-1.775 11.384 4.23 11.384h145.994c5.984 0 8.811-7.47 4.262-11.358-18.926-16.176-43.294-19.786-43.294-54.478v-28.503c18.869 17.084 44.163 27.539 71.97 27.539 82.219 0 148.871-64.853 148.871-144.853.001-45.074-21.104-87.616-57.166-115.908z"
                  fill="var(--primary-color)"
                  opacity="1"
                />
              </g>
            </svg>

            <div className="aura-wolf-header-inner">
              <span className="aura-wolf-title">Indian Card Games</span>

              <div className="aura-wolf-controls">
                <button
                  onClick={() => setShowSeeAll((prev) => !prev)}
                  className="aura-wolf-btn-see-all"
                  type="button"
                >
                  {showSeeAll ? "See Less" : "See All"}
                </button>

                <button
                  onClick={() => scrollToLeft(ref)}
                  className="aura-wolf-btn-scroll"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="27"
                    height="27"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M15 6l-6 6l6 6" />
                  </svg>
                </button>

                <button
                  onClick={() => scrollToRight(ref)}
                  className="aura-wolf-btn-scroll"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="27"
                    height="27"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M9 6l6 6l-6 6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Scroll / Grid area */}
          <div ref={ref} id="scrollShow" className="aura-wolf-scroll-container">
            <div
              className={`aura-wolf-grid ${
                showSeeAll
                  ? "aura-wolf-grid--expanded"
                  : "aura-wolf-grid--scroll"
              }`}
            >
              {data?.data?.map((item, i) => (
                <div
                  onClick={() =>
                    handleAuraCasino(item?.game_id, item?.game_name)
                  }
                  key={i}
                  className={`aura-wolf-item${
                    showSeeAll ? "" : " aura-wolf-item--scroll"
                  }`}
                >
                  <div className="aura-wolf-item-inner">
                    <div
                      className={`aura-wolf-img-wrapper${
                        showSeeAll ? "" : " aura-wolf-img-wrapper--scroll"
                      }`}
                    >
                      <img
                        src={item?.img}
                        height="auto"
                        className="aura-wolf-img"
                        alt="Live Teenpatti"
                        loading="lazy"
                        title="Live Teenpatti"
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

export default IndianCardGames;
