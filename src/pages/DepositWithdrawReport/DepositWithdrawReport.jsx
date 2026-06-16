import { useEffect, useState } from "react";
import DepositReport from "./DepositReport";
import WithdrawReport from "./WithdrawReport";
import { Settings } from "../../api";

const DepositWithdrawReport = () => {
  const [tab, setTab] = useState("deposit");
  const [depositWithdraw, setDepositWithdraw] = useState("deposit");

  useEffect(() => {
    setTimeout(() => {
      setTab(depositWithdraw);
    }, 500);
  }, [depositWithdraw]);

  const depositTab = [
    'If you face any issue with your deposit, click the "Report Issue" button next to your deposit details to let us know.',
    "यदि आपकी जमा राशि में कोई समस्या आती है, तो हमें बताने के लिए अपनी डिपॉज़िट विवरण के पास दिए गए Report Issue बटन पर क्लिक करें",
  ];
  const withdrawTab = [
    'If you face any issue with your withdraw, click the "Report Issue" button next to your withdraw details to let us know.',
    "यदि आपको अपने निकासी (Withdrawal) में कोई समस्या आती है, तो हमें बताने के लिए अपनी निकासी विवरण के पास दिए गए  Report Issue बटन पर क्लिक करें",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // fade out
      setFade(false);

      setTimeout(() => {
        setCurrentIndex((prev) => {
          const arrLength =
            tab === "deposit" ? depositTab.length : withdrawTab.length;
          return (prev + 1) % arrLength;
        });
        setFade(true);
      }, 500); // fade out duration
    }, 10000); // 10s display time

    return () => clearInterval(interval);
  }, [tab]);

  return (
    <main id="main" className="main a23_css">
      <div className="deposit-withdraw-btns  ">
        <div className="btns-animation ">
          <div className="btnBox ">
            <button
              onClick={() => setDepositWithdraw("deposit")}
              className={`btn-inactive `}
            >
              <span className={`text-white`}>Deposit</span>
            </button>
            <button
              onClick={() => setDepositWithdraw("withdraw")}
              className="btn-inactive "
            >
              <span className={`text-white`}>Withdraw</span>
            </button>
          </div>
          <div
            className={` ${
              depositWithdraw === "deposit"
                ? "animation-div-1"
                : "animation-div-2"
            }`}
          ></div>
        </div>
      </div>
      {Settings.complaint && (
        <div
          className="bg-primary-light"
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
          <span>
            {tab === "deposit"
              ? depositTab[currentIndex]
              : withdrawTab[currentIndex]}
          </span>
        </div>
      )}

      {depositWithdraw === "deposit" ? <DepositReport /> : <WithdrawReport />}
    </main>
  );
};

export default DepositWithdrawReport;
