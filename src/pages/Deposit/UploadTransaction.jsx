/* eslint-disable react/no-unknown-property */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../api";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { AxiosSecure } from "../../lib/AxiosSecure";
import axios from "axios";
import useUTR from "../../hooks/utr";
import { useSelector } from "react-redux";

const UploadTransaction = ({ paymentId, amount, tabs }) => {
  const { mutate: getUTR } = useUTR();
  const [utr, setUTR] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [filePath, setFilePath] = useState(null);
  // const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    if (image) {
      setLoading(true);
      const handleSubmitImage = async () => {
        const formData = new FormData();
        formData.append("image", image);
        const res = await axios.post(API.uploadScreenshot, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        if (data?.success) {
          getUTR(data?.filePath, {
            onSuccess: (data) => {
              if (data?.success) {
                if (data?.utr !== null) {
                  setUTR(data?.utr);
                }
              }
            },
          });
          setLoading(false);
          setUploadedImage(data?.fileName);

          setFilePath(data?.filePath);
          setImage(null);
        } else {
          setLoading(false);

          setImage(null);
          setFilePath("");
          setUploadedImage(null);
          toast.error(data?.error);
        }
      };
      handleSubmitImage();
    }
  }, [image, token, getUTR]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    e.target.value = null;
  };

  const handleDepositSubmit = async () => {
    if (!filePath || !utr) {
      return;
    }
    if (uploadedImage || utr) {
      let screenshotPostData = {
        type: "depositSubmit",
        paymentId,
        amount: amount,
        fileName: uploadedImage,
        utr: String(utr),
      };
      // if (tabs === "usdt" || tabs === "usdt_bep20") {
      //   screenshotPostData.receipt_no = receipt;
      // }

      const res = await AxiosSecure.post(API.bankAccount, screenshotPostData);
      const result = res?.data;
      if (result?.success) {
        setUTR(null);
        setImage(null);
        toast.success(result?.result?.message);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setImage(null);
        setFilePath("");
        setUploadedImage(null);
        toast.error(result?.error?.errorMessage || result?.result?.message);
      }
    }
  };
  const handleUTRChange = (e) => {
    const value = e.target.value;

    setUTR(value);
  };

  return (
    <>
      {!filePath && !loading && (
        <div className="utrbox ng-tns-c159-0">
          <div className="utrtxt ng-tns-c159-0">
            <div className="u-i-p-control-item-holder-bc ng-tns-c159-0">
              <form
                style={{ background: "#fff" }}
                className="ng-tns-c159-0 ng-pristine ng-invalid ng-touched"
              >
                <div className="upload ng-tns-c159-0 ng-star-inserted">
                  <div className="uploadimg ng-tns-c159-0">
                    <div className="uploadsvg ng-tns-c159-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="33"
                        height="32"
                        viewBox="0 0 33 32"
                        fill="none"
                        className="ng-tns-c159-0 ng-star-inserted"
                      >
                        <path
                          d="M29.5 14.6667V22.6667C29.5783 23.3422 29.5028 24.0268 29.2792 24.669C29.0556 25.3113 28.6897 25.8947 28.2088 26.3756C27.7279 26.8564 27.1445 27.2224 26.5023 27.4459C25.86 27.6695 25.1755 27.745 24.5 27.6667H8.49997C7.82442 27.745 7.13991 27.6695 6.49765 27.4459C5.85539 27.2224 5.272 26.8564 4.79111 26.3756C4.31023 25.8947 3.94431 25.3113 3.72072 24.669C3.49714 24.0268 3.42167 23.3422 3.49997 22.6667V9.33337C3.42167 8.65782 3.49714 7.97332 3.72072 7.33105C3.94431 6.68879 4.31023 6.1054 4.79111 5.62452C5.272 5.14364 5.85539 4.77771 6.49765 4.55413C7.13991 4.33054 7.82442 4.25507 8.49997 4.33337H19.1666C19.4318 4.33337 19.6862 4.43873 19.8737 4.62626C20.0613 4.8138 20.1666 5.06815 20.1666 5.33337C20.1666 5.59858 20.0613 5.85294 19.8737 6.04048C19.6862 6.22801 19.4318 6.33337 19.1666 6.33337H8.49997C6.3973 6.33337 5.49997 7.2307 5.49997 9.33337V21.6667L8.88663 18.28C9.13838 18.0302 9.47865 17.8901 9.8333 17.8901C10.1879 17.8901 10.5282 18.0302 10.78 18.28L12.0333 19.5334C12.1579 19.6555 12.3255 19.7239 12.5 19.7239C12.6745 19.7239 12.842 19.6555 12.9666 19.5334L19.5533 12.9467C19.805 12.6969 20.1453 12.5567 20.5 12.5567C20.8546 12.5567 21.1949 12.6969 21.4466 12.9467L27.5 19V14.6667C27.5 14.4015 27.6053 14.1471 27.7929 13.9596C27.9804 13.7721 28.2347 13.6667 28.5 13.6667C28.7652 13.6667 29.0195 13.7721 29.2071 13.9596C29.3946 14.1471 29.5 14.4015 29.5 14.6667ZM11.1573 10.3334C10.7146 10.3346 10.2905 10.5115 9.97815 10.8252C9.66579 11.1388 9.49068 11.5637 9.4913 12.0064C9.49192 12.449 9.66821 12.8734 9.98145 13.1862C10.2947 13.499 10.7193 13.6747 11.162 13.6747C11.6047 13.6747 12.0292 13.499 12.3425 13.1862C12.6557 12.8734 12.832 12.449 12.8326 12.0064C12.8332 11.5637 12.6581 11.1388 12.3458 10.8252C12.0334 10.5115 11.6093 10.3346 11.1666 10.3334H11.1573ZM25.2066 6.7067L25.5 6.4147V9.33337C25.5 9.59858 25.6053 9.85294 25.7929 10.0405C25.9804 10.228 26.2347 10.3334 26.5 10.3334C26.7652 10.3334 27.0195 10.228 27.2071 10.0405C27.3946 9.85294 27.5 9.59858 27.5 9.33337V6.4147L27.7933 6.7067C27.9829 6.88334 28.2336 6.97951 28.4927 6.97494C28.7517 6.97036 28.9989 6.86541 29.1821 6.6822C29.3653 6.49898 29.4703 6.2518 29.4749 5.99273C29.4794 5.73366 29.3833 5.48293 29.2066 5.29337L27.2066 3.29337C27.019 3.10643 26.7649 3.00146 26.5 3.00146C26.2351 3.00146 25.981 3.10643 25.7933 3.29337L23.7933 5.29337C23.6167 5.48293 23.5205 5.73366 23.5251 5.99273C23.5296 6.2518 23.6346 6.49898 23.8178 6.6822C24.001 6.86541 24.2482 6.97036 24.5073 6.97494C24.7663 6.97951 25.0171 6.88334 25.2066 6.7067Z"
                          fill="url(#paint0_linear_517_8279)"
                          className="ng-tns-c159-0"
                        ></path>
                        <defs className="ng-tns-c159-0">
                          <linearGradient
                            id="paint0_linear_517_8279"
                            x1="3.46997"
                            y1="5.02199"
                            x2="32.1899"
                            y2="9.13848"
                            gradientUnits="userSpaceOnUse"
                            className="ng-tns-c159-0"
                          >
                            <stop
                              stopColor="#36E2FA"
                              className="ng-tns-c159-0"
                            ></stop>
                            <stop
                              offset="1"
                              stopColor="#EBFFBF"
                              className="ng-tns-c159-0"
                            ></stop>
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="uploadtxt ng-tns-c159-0 ng-star-inserted">
                        <p className="ng-tns-c159-0">
                          Upload Transaction Image
                        </p>
                      </div>
                      <div className="frame ng-tns-c159-0 ng-star-inserted">
                        <input
                          onChange={(e) => handleImageChange(e)}
                          type="file"
                          accept="image/*"
                          id="fileInput"
                          // capture="environment"
                          className="file-input ng-tns-c159-0"
                          style={{ display: "none" }}
                        />
                        <label
                          htmlFor="fileInput"
                          className="uploadbtn ng-tns-c159-0"
                        >
                          Upload
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {filePath && !loading && (
        <div className="upload ng-tns-c159-2 ng-star-inserted">
          <div className="uploadimg ng-tns-c159-2">
            <div
              onClick={() => {
                setFilePath("");
                setUploadedImage(null);
                setImage(null);
              }}
              className="close-button ng-tns-c159-2 ng-star-inserted"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.2rem"
                height="1.2rem"
                viewBox="0 0 14 15"
                fill="none"
                style={{
                  border: "1px solid gray",
                  borderRadius: "50%",
                  background: "gray",
                }}
                className="ng-tns-c159-2"
              >
                <path
                  _ngcontent-qwy-c36=""
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.91728 10.7587C2.68949 10.9866 2.68952 11.3559 2.91735 11.5837C3.14517 11.8115 3.51452 11.8115 3.7423 11.5836L7.00036 8.32499L10.2587 11.5833C10.4865 11.8111 10.8558 11.8111 11.0836 11.5833C11.3114 11.3555 11.3114 10.9862 11.0836 10.7584L7.82525 7.49998L11.0834 4.24126C11.3111 4.01343 11.3111 3.64409 11.0833 3.41631C10.8555 3.18851 10.4861 3.18855 10.2583 3.41638L7.00024 6.67503L3.74191 3.41666C3.5141 3.18885 3.14475 3.18885 2.91695 3.41666C2.68914 3.64446 2.68914 4.01381 2.91695 4.24162L6.17541 7.50004L2.91728 10.7587Z"
                  fill="#111827"
                  className="ng-tns-c159-2"
                ></path>
              </svg>
            </div>
            <div className="uploadsvg ng-tns-c159-2">
              <img
                loading="lazy"
                id="bank-receipt"
                src={filePath}
                alt=""
                style={{ borderRadius: "0.375rem", width: "15rem" }}
                className="ng-tns-c159-2 ng-star-inserted"
              />
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div _ngcontent-ng-c3816252360="" class="utrbox ng-tns-c159-0">
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FaSpinner className="animate-spin" fontSize={30} />
          </div>
        </div>
      )}

      <div className="utrbox ng-tns-c159-0">
        <div className="utrtxt ng-tns-c159-0">
          <div className="u-i-p-control-item-holder-bc ng-tns-c159-0">
            <p className="ng-tns-c159-0" style={{ color: "black" }}>
              {" "}
              {tabs === "usdt" || tabs === "usdt_bep20"
                ? "Hash Code"
                : " Enter UTR/Trans ID/Ref ID number to proceed further"}
            </p>

            <div className="u-i-p-control-item-holder-bc mb-3 ng-tns-c159-0">
              <div className="utrinput form-control-bc ng-tns-c159-0 ng-pristine ng-invalid ng-touched">
                <input
                  onChange={handleUTRChange}
                  id="utrnumber"
                  name="utrnumber"
                  type="text"
                  style={{ width: "100%" }}
                  className="ng-tns-c159-0 ng-pristine ng-invalid ng-touched"
                  placeholder={
                    tabs === "usdt" || tabs === "usdt_bep20"
                      ? "Enter Hash Code"
                      : "Enter UTR/Transaction ID/ Ref ID"
                  }
                  value={utr !== null ? utr : null}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {tabs === "usdt" || tabs === "usdt_bep20" ? (
        <div className="utrbox ng-tns-c159-0">
          <div className="utrtxt ng-tns-c159-0">
            <div className="u-i-p-control-item-holder-bc ng-tns-c159-0">
              <p className="ng-tns-c159-0" style={{ color: "black" }}>
                {" "}
                Receipt Number
              </p>

              <div className="u-i-p-control-item-holder-bc mb-3 ng-tns-c159-0">
                <div className="utrinput form-control-bc ng-tns-c159-0 ng-pristine ng-invalid ng-touched">
                  <input
                    onChange={(e) => setReceipt(e.target.value)}
                    type="text"
                    style={{ width: "100%" }}
                    className="ng-tns-c159-0 ng-pristine ng-invalid ng-touched"
                    placeholder={"Enter Receipt Number"}
                    value={receipt}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null} */}

      <div
        style={{ padding: "0px" }}
        className="makepayment madepay ng-tns-c159-2"
      >
        <button
          disabled={!filePath || !utr}
          style={{
            cursor: `${!filePath || !utr ? "not-allowed" : "pointer"}`,
            width: "100%",
            height: "100%",
            padding: "0.5rem",
          }}
          onClick={handleDepositSubmit}
          className="ng-tns-c159-2"
        >
          I have Made The Payment
        </button>
      </div>
    </>
  );
};

export default UploadTransaction;
