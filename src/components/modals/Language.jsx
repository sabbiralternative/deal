/* eslint-disable react/no-unknown-property */

import { useRef } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import useCloseModalClickOutside from "../../hooks/closeModal";
import { useGetLanguage } from "../../hooks/language.hook";
import { useLanguage } from "../../context/LanguageProvider";

const Language = ({ setShowLanguage }) => {
  const { setLanguage } = useLanguage();
  const { data } = useGetLanguage();

  const languageRef = useRef();
  useCloseModalClickOutside(languageRef, () => {
    setShowLanguage(false);
  });

  console.log(data);

  const languages = data?.CRICKET;

  const handleSetLanguage = (language) => {
    localStorage.setItem("language", language);
    setShowLanguage(false);
    setLanguage(language);
  };

  return (
    <div
      className="cdk-overlay-container"
      style={{ position: "absolute", zIndex: 9999, pointerEvents: "auto" }}
    >
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "#00000066",
        }}
        className="cdk-overlay-backdrop cdk-overlay-dark-backdrop cdk-overlay-backdrop-showing"
      ></div>
      <div
        className="cdk-global-overlay-wrapper"
        dir="ltr"
        style={{ justifyContent: "center", alignItems: "flex-end" }}
      >
        <div
          id="cdk-overlay-4"
          className="cdk-overlay-pane referral-dialog"
          style={{
            width: "120px",
            maxWidth: "200px",
            position: "absolute",
            top: "50px",
            right: "5px",
            marginBottom: "10px",
            zIndex: 9999,
          }}
          ref={languageRef}
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
              zIndex: 9999,
              backgroundColor: "white",
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
                      className="modal-body"
                      style={{ backgroundColor: "white", zIndex: 9999 }}
                    >
                      <h1
                        style={{
                          color: "black",
                          display: "flex",
                          alignItems: "center",
                          fontSize: "11px",
                        }}
                        _ngcontent-ng-c2806737617=""
                        className="form-title"
                      >
                        <MdKeyboardArrowRight /> <span>Select Language</span>
                      </h1>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "start",
                          width: "100%",
                          gap: "1px",
                          marginTop: "0px",
                          fontSize: "11px",
                          zIndex: 9999,
                        }}
                      >
                        {languages &&
                          Object.keys(languages)?.map((language, idx) => {
                            return (
                              <button
                                onClick={() => handleSetLanguage(language)}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "3px",
                                  border: "none",
                                  background: "transparent",
                                  textTransform: "capitalize",
                                  paddingLeft: "0px",
                                  color: "var(--theme-primary)",
                                }}
                                key={idx}
                              >
                                <MdKeyboardArrowRight />
                                <span>{language}</span>
                              </button>
                            );
                          })}
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
  );
};

export default Language;
