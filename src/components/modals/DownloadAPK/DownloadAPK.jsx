import { useRef } from "react";
import { GrAndroid } from "react-icons/gr";
import useCloseModalClickOutside from "../../../hooks/closeModal";
import { Settings } from "../../../api";
import images from "../../../assets/images";
import { useDispatch } from "react-redux";
import { setShowAPKModal } from "../../../redux/features/global/globalSlice";

const DownloadAPK = () => {
  const dispatch = useDispatch();
  const modalRef = useRef();
  useCloseModalClickOutside(modalRef, () => {
    closeModal();
  });

  const closeModal = () => {
    sessionStorage.setItem("apk_modal_shown", true);
    dispatch(setShowAPKModal(false));
  };

  const handleDownload = (e) => {
    e.preventDefault();
    const fileUrl = Settings.apk_link;
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", "site.apk");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    closeModal();
  };
  return (
    <div className="a23_css">
      {" "}
      <div
        className=" Modal-Background "
        style={{
          zIndex: 99999,
        }}
      >
        <div
          className="card-add-bank"
          ref={modalRef}
          style={{
            maxHeight: "650vh",
            position: "relative",
            borderRadius: "30px",
            overflow: "auto",
          }}
        >
          <div
            className="close-btn"
            style={{
              position: "absolute",
              right: "10px",
              top: "10px",
              zIndex: 9999,
            }}
          >
            <svg
              onClick={closeModal}
              width="1rem"
              height="1rem"
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.91703 10.7588C2.68924 10.9867 2.68928 11.356 2.9171 11.5838C3.14493 11.8116 3.51427 11.8116 3.74206 11.5837L7.00012 8.32511L10.2584 11.5834C10.4862 11.8112 10.8556 11.8112 11.0834 11.5834C11.3112 11.3556 11.3112 10.9863 11.0834 10.7585L7.82501 7.5001L11.0832 4.24138C11.3109 4.01356 11.3109 3.64421 11.083 3.41643C10.8552 3.18864 10.4859 3.18867 10.2581 3.4165L7 6.67516L3.74166 3.41678C3.51386 3.18897 3.14451 3.18897 2.91671 3.41678C2.6889 3.64459 2.6889 4.01393 2.91671 4.24174L6.17517 7.50016L2.91703 10.7588Z"
                fill="#111827"
              ></path>
            </svg>
          </div>

          <div className="promo-card">
            <header className="promo-header">
              <div className="header-content">
                <img src={images.install_android} alt="install_android" />
                <h1 className="main-title" style={{ fontSize: "18px" }}>
                  Download APK for Premium Gaming Experience
                </h1>
              </div>
            </header>

            <main className="promo-body">
              <p className="intro-text">
                Kabhi-kabhi website slow ho sakti hai ya link update ho jata
                hai, lekin hamara Official App aapko hamesha connected rakhega
                🚀
              </p>

              <h2 className="benefits-title" style={{ fontSize: "14px" }}>
                App ke saath aapko milega:
              </h2>

              <ul className="benefits-list">
                <li>
                  <strong>24×7 Instant Access</strong> – Har waqt khelo bina
                  rukawat
                </li>
                <li>
                  <strong>2X Faster Speed</strong> – Website se bhi double fast
                  loading
                </li>
                <li>
                  <strong>Secure Login</strong> – Aapka data hamesha safe &
                  protected
                </li>
                <li>
                  <strong>Non-Stop Gaming</strong> – No waiting, no
                  interruptions
                </li>
              </ul>

              <p className="closing-text">
                Yehi wajah hai ki sabse zyada serious players App prefer karte
                hain. Aap bhi join karo unme aur pao ek premium lifestyle
                experience 💎
              </p>

              <a onClick={handleDownload} className="download-button">
                <GrAndroid className="android-icon" />
                <span>Download Official App Now ↓</span>
              </a>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadAPK;
