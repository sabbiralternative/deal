/* eslint-disable react/no-unknown-property */

import { useRef } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useCurrentBets } from "../../../hooks/currentBets";
import { useExposure } from "../../../hooks/exposure";
import useBalance from "../../../hooks/balance";
import useCloseModalClickOutside from "../../../hooks/closeModal";
import { useIndexMutation } from "../../../hooks";
import { useSelector } from "react-redux";

const SpeedCashOut = ({ speedCashOut, setSpeedCashOut }) => {
  const { closePopupForForever } = useSelector((state) => state.global);
  const { eventTypeId, eventId } = useParams();
  const { refetch: refetchCurrentBets } = useCurrentBets(eventId);
  const { refetch: refetchExposure } = useExposure(eventId);
  const { refetch: refetchBalance } = useBalance();
  const ref = useRef();
  useCloseModalClickOutside(ref, () => {
    setSpeedCashOut(null);
  });
  const { mutate } = useIndexMutation();

  const lowestExposure = Math.min(
    speedCashOut?.exposureA,
    speedCashOut?.exposureB,
  );

  const amount = lowestExposure - lowestExposure * 0.03;

  const handleSpeedCashOut = () => {
    const payload = {
      type: "speed_cashout",
      market_id: speedCashOut?.gameId,
      amount,
      event_id: eventId,
      event_type_id: eventTypeId,
      market_name: speedCashOut?.market_name,
      event_name: speedCashOut?.event_name,
      apk: closePopupForForever ? true : false,
    };
    mutate(payload, {
      onSuccess: (data) => {
        if (data?.success) {
          toast.success(data?.result?.message);
          refetchBalance();
          refetchCurrentBets();
          refetchExposure();
          setSpeedCashOut(null);
        } else {
          toast.error(data?.error?.errorMessage);
        }
      },
    });
  };
  return (
    <div className="a23_css">
      <div className="cdk-overlay-container">
        <div className="cdk-overlay-backdrop cdk-overlay-dark-backdrop cdk-overlay-backdrop-showing"></div>
        <div
          className="cdk-global-overlay-wrapper"
          dir="ltr"
          style={{ justifyContent: "center", alignItems: "flex-end" }}
        >
          <div
            id="cdk-overlay-4"
            className="cdk-overlay-pane referral-dialog"
            style={{
              width: "calc(100% - 30px)",
              maxWidth: "500px",
              position: "static",
              marginBottom: "10px",
            }}
            ref={ref}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.1 }}
          >
            <div
              className="cdk-visually-hidden cdk-focus-trap-anchor"
              aria-hidden="true"
            ></div>
            <div
              className="mat-mdc-dialog-container mdc-dialog cdk-dialog-container mdc-dialog--open"
              id="mat-mdc-dialog-3"
              role="dialog"
              aria-modal="true"
              style={{
                maxWidth: "600px",
                margin: "auto",
                position: "static",
                display: "block",
              }}
            >
              <div className="mdc-dialog__container">
                <div
                  style={{ borderRadius: "10px" }}
                  className="mat-mdc-dialog-surface mdc-dialog__surface"
                >
                  <div _nghost-ng-c526813732="" className="ng-star-inserted">
                    <div _ngcontent-ng-c526813732="" className="referral-modal">
                      <div
                        _ngcontent-ng-c526813732=""
                        className="modal-header"
                        style={{
                          backgroundColor: "white",
                          alignItems: "start",
                          justifyContent: "start",
                          paddingLeft: "10px",
                        }}
                      >
                        <h3
                          style={{ margin: "0px" }}
                          _ngcontent-ng-c526813732=""
                          className=""
                        >
                          Speed Cashout
                        </h3>
                        <button
                          onClick={() => setSpeedCashOut(false)}
                          _ngcontent-ng-c526813732=""
                          mat-button=""
                          mat-dialog-close=""
                          className="modal-close-btn mdc-button mat-mdc-button mat-unthemed mat-mdc-button-base"
                          mat-ripple-loader-class-name="mat-mdc-button-ripple"
                          type="button"
                        >
                          <svg
                            width="14"
                            height="15"
                            viewBox="0 0 14 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="ng-tns-c159-13"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M2.91703 10.7588C2.68924 10.9867 2.68928 11.356 2.9171 11.5838C3.14493 11.8116 3.51427 11.8116 3.74206 11.5837L7.00012 8.32511L10.2584 11.5834C10.4862 11.8112 10.8556 11.8112 11.0834 11.5834C11.3112 11.3556 11.3112 10.9863 11.0834 10.7585L7.82501 7.5001L11.0832 4.24138C11.3109 4.01356 11.3109 3.64421 11.083 3.41643C10.8552 3.18864 10.4859 3.18867 10.2581 3.4165L7 6.67516L3.74166 3.41678C3.51386 3.18897 3.14451 3.18897 2.91671 3.41678C2.6889 3.64459 2.6889 4.01393 2.91671 4.24174L6.17517 7.50016L2.91703 10.7588Z"
                              fill="#111827"
                              className="ng-tns-c159-13"
                            ></path>
                          </svg>
                        </button>
                      </div>
                      <div
                        _ngcontent-ng-c526813732=""
                        className="modal-body"
                        style={{
                          backgroundColor: "white",
                          paddingLeft: "0px",
                          paddingRight: "0px",
                          paddingBottom: "0px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            borderTop: "1px solid #d0d0d0ff",
                            borderBottom: "1px solid #d0d0d0ff",
                            margin: "10px 0px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexDirection: "column",
                              width: "100%",
                              borderRight: "1px solid #d0d0d0ff",
                            }}
                          >
                            <div
                              style={{
                                padding: "10px 0px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <span style={{ fontWeight: "bold" }}>
                                {speedCashOut?.runner1?.name}
                              </span>
                              <span>₹ {speedCashOut?.exposureA}</span>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",

                              width: "100%",
                            }}
                          >
                            <div
                              style={{
                                padding: "10px 0px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <span style={{ fontWeight: "bold" }}>
                                {speedCashOut?.runner2?.name}
                              </span>
                              <span>₹ {speedCashOut?.exposureB}</span>
                            </div>
                          </div>
                        </div>
                        <p
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "0px 10px",
                          }}
                          _ngcontent-ng-c526813732=""
                        >
                          We are deducting 3% fee on speed cashout
                        </p>
                        <div
                          style={{ padding: "0px" }}
                          _ngcontent-ng-c526813732=""
                          className="referral-code"
                        >
                          <button
                            style={{
                              position: "static",
                              width: "100%",
                              fontWeight: "600",
                              color: "#fff",
                              fontSize: "14px",
                            }}
                            onClick={handleSpeedCashOut}
                            _ngcontent-ng-c526813732=""
                            className="btn secondary-btn"
                          >
                            Speed Cash - {amount}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="cdk-visually-hidden cdk-focus-trap-anchor"
              aria-hidden="true"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeedCashOut;
