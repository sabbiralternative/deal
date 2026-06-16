import { useNavigate } from "react-router-dom";
import "./app-only-bonus.css";
import { useBonusMutation, useBonusQuery } from "../../hooks/bonus";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
const AppOnlyBonus = () => {
  const bonusMessage = [
    "Lossback can be claimed only if you have a net loss on the specified date. If your total bets result in any profit, you are not eligible for this lossback bonus.Loss is calculated after all wins, losses, and settlements for that date.",
    "लॉसबैक का दावा केवल उसी स्थिति में किया जा सकता है जब निर्धारित तिथि पर आपका कुल शुद्ध नुकसान (नेट लॉस) हो। यदि उस दिन आपकी कुल बेटिंग का परिणाम किसी भी प्रकार का मुनाफ़ा (प्रॉफिट) दिखाता है, तो आप इस लॉसबैक बोनस के लिए पात्र नहीं होंगे। लॉस की गणना उस तिथि की सभी जीत, हार और सेटलमेंट को जोड़ने के बाद की जाएगी।",
  ];
  const navigate = useNavigate();
  const { mutate: claimBonus } = useBonusMutation();
  const { data, refetch } = useBonusQuery({
    type: "viewLossbackBonus",
    visible_on: "app",
  });

  const handleClaimBonus = (lossback_bonus_id) => {
    claimBonus(
      {
        type: "claimLossbackBonus",
        lossback_bonus_id,
        visible_on: "app",
      },
      {
        onSuccess: (data) => {
          if (data?.success) {
            refetch();
            toast.success(data?.result);
          } else {
            toast.error(data?.error);
          }
        },
      },
    );
  };
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // fade out
      setFade(false);

      setTimeout(() => {
        setCurrentIndex((prev) => {
          return (prev + 1) % bonusMessage?.length;
        });
        setFade(true);
      }, 500); // fade out duration
    }, 30000); // 30s display time

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="simplebar-content-wrapper dashbord-p-top">
      <div
        className="lossback-wrapper main"
        id="main"
        style={{ width: "auto" }}
      >
        <div
          className="bg-secondary"
          style={{
            textAlign: "start",

            paddingLeft: "0.625rem", // px-2.5
            paddingRight: "0.625rem",
            paddingTop: "0.25rem", // py-1
            paddingBottom: "0.25rem",
            color: "black",
            borderRadius: "0.25rem", // rounded
            fontSize: "12px", // text-[12px]
            boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)", // shadow-sm
            marginLeft: "0.5rem", // mx-2
            marginRight: "0.5rem",
            display: "flex", // flex
            alignItems: "center", // items-center
            gap: "0.5rem", // gap-2
            transitionProperty: "opacity", // transition-opacity
            transitionDuration: "500ms", // duration-500
            opacity: fade ? 1 : 0,
            fontWeight: 500, // for font-medium in <span>
          }}
        >
          <img
            style={{ height: "15px" }}
            src="/icon/info-icon-svgrepo-com.svg"
            alt=""
          />
          <span>{bonusMessage[currentIndex]}</span>
        </div>
        {data?.length > 0 && (
          <div className="lossback-card-wrapper">
            {data?.map((item) => {
              return (
                <div key={item?.lossback_bonus_id} className="info-card">
                  <div className="info-card-inner">
                    <div>
                      <h4> Title :</h4>
                      <p>{item?.title}</p>
                    </div>
                    <div>
                      <h4> Minimum Loss Amount :</h4>
                      <p> {item?.minimum_loss_amount}</p>
                    </div>
                    <div>
                      <h4> Maximum Bonus Amount :</h4>
                      <p> {item?.maximum_bonus_amount}</p>
                    </div>
                    <div>
                      <h4> Status :</h4>
                      <p
                        className={`${
                          item?.status === "ACTIVE"
                            ? "text-success"
                            : item?.status === "INACTIVE"
                              ? "text-warning"
                              : "text-danger"
                        }`}
                      >
                        {item?.status}
                      </p>
                    </div>
                    <div>
                      <h4> Expiry :</h4>
                      <p> {item?.expires_at}</p>
                    </div>
                  </div>
                  {item?.claim_button == 1 && (
                    <button
                      onClick={() => handleClaimBonus(item?.lossback_bonus_id)}
                      className="primary-btn"
                    >
                      Claim
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {data?.length === 0 && (
          <div className="lossback-content">
            <div className="icon-wrap">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="main-icon"
              >
                <path d="M190.5 68.8L225.3 128l-1.3 0-72 0c-22.1 0-40-17.9-40-40s17.9-40 40-40l2.2 0c14.9 0 28.8 7.9 36.3 20.8zM64 88c0 14.4 3.5 28 9.6 40L32 128c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32l448 0c17.7 0 32-14.3 32-32l0-64c0-17.7-14.3-32-32-32l-41.6 0c6.1-12 9.6-25.6 9.6-40c0-48.6-39.4-88-88-88l-2.2 0c-31.9 0-61.5 16.9-77.7 44.4L256 85.5l-24.1-41C215.7 16.9 186.1 0 154.2 0L152 0C103.4 0 64 39.4 64 88zm336 0c0 22.1-17.9 40-40 40l-72 0-1.3 0 34.8-59.2C329.1 55.9 342.9 48 357.8 48l2.2 0c22.1 0 40 17.9 40 40zM32 288l0 176c0 26.5 21.5 48 48 48l144 0 0-224L32 288zM288 512l144 0c26.5 0 48-21.5 48-48l0-176-192 0 0 224z" />
              </svg>
              <span className="alert-dot">!</span>
            </div>

            <div className="text-center">
              <h3>No Loss Back Claims Available!</h3>
              <p>
                Continue playing to earn loss back bonuses! New claims are
                typically processed on Tuesday, Wednesday, and Thursday.
              </p>
            </div>

            <div className="info-card">
              <div className="info-top">
                <div className="info-icon">💡</div>
                <div>
                  <h4>How Loss Back Works</h4>
                  <p>
                    When you experience losses while playing, a percentage gets
                    credited back to your main balance automatically. The more
                    you play, the more you can earn back!
                  </p>
                </div>
              </div>

              <div className="info-steps">
                <div className="step">
                  <div className="step-icon">▶</div>
                  <p>Play Games</p>
                </div>
                <div className="step">
                  <div className="step-icon">⏱</div>
                  <p>Auto Calculate</p>
                </div>
                <div className="step">
                  <div className="step-icon">💰</div>
                  <p>Get Rewarded</p>
                </div>
              </div>
            </div>

            <button onClick={() => navigate("/")} className="primary-btn">
              Continue Playing
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AppOnlyBonus;
