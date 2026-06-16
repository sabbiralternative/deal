import { useEffect, useRef, useState } from "react";
import { API, Settings } from "../../../api";
import toast from "react-hot-toast";
import { AxiosSecure } from "../../../lib/AxiosSecure";
import { jwtDecode } from "jwt-decode";
import useCloseModalClickOutside from "../../../hooks/closeModal";
import { useDispatch } from "react-redux";
import { setAddBank } from "../../../redux/features/global/globalSlice";

const AddBank = ({ refetchBankData }) => {
  /* Handle close modal click outside */
  const dispatch = useDispatch();
  const [mobile, setMobile] = useState(null);
  const token = localStorage.getItem("token");
  const [orderId, setOrderId] = useState(null);
  const [timer, setTimer] = useState(null);

  const addBankRef = useRef();
  useCloseModalClickOutside(addBankRef, () => {
    closeModal();
  });

  const closeModal = () => {
    dispatch(setAddBank(false));
  };
  const [isFormValid, setIsFormValid] = useState(false);
  const [bankDetails, setBankDetails] = useState({
    accountName: "",
    ifsc: "",
    accountNumber: "",
    confirmAccountNumber: "",
    upiId: "",
    otp: "",
  });

  /* Handle add bank function */
  const handleAddBank = async (e) => {
    e.preventDefault();
    if (bankDetails.accountNumber !== bankDetails.confirmAccountNumber) {
      return toast.error("Bank account number did not matched!");
    }

    if (mobile && !bankDetails.otp && Settings.otp) {
      return toast.error("Please enter otp to add new account");
    }

    let bankData = {
      accountName: bankDetails.accountName,
      ifsc: bankDetails.ifsc,
      accountNumber: bankDetails.accountNumber,
      upiId: bankDetails.upiId,
      type: "addBankAccount",
      nonce: crypto.randomUUID(),
    };
    if (mobile) {
      bankData.mobile = mobile;
      bankData.otp = bankDetails.otp;
      bankData.orderId = orderId;
    }

    const res = await AxiosSecure.post(API.bankAccount, bankData);
    const data = res?.data;

    if (data?.success) {
      toast.success(data?.result?.message);
      if (refetchBankData) {
        refetchBankData();
      }
      //   if (refetchWithdrawData) {
      //     refetchWithdrawData();
      //   }
      closeModal();
    } else {
      toast.error(data?.result?.message);
    }
  };

  const validateForm = (bankDetails) => {
    const isaccountNameFilled = bankDetails.accountName.trim() !== "";
    const isaccountNumberFilled = bankDetails.accountNumber.trim() !== "";
    const isIfscFilled = bankDetails.ifsc.trim() !== "";
    const isOTPFilled =
      mobile && Settings.otp ? bankDetails.otp.trim() !== "" : true;
    const isFormValid =
      isaccountNameFilled &&
      isIfscFilled &&
      isaccountNumberFilled &&
      isOTPFilled;
    setIsFormValid(isFormValid);
  };

  useEffect(() => {
    validateForm(bankDetails);
  }, [bankDetails]);

  const getOtp = async () => {
    const otpData = {
      mobile,
    };

    const res = await AxiosSecure.post(API.otp, otpData);
    const data = res.data;
    if (data?.success) {
      setTimer(60);
      setOrderId(data?.result?.orderId);
      toast.success(data?.result?.message);
    } else {
      toast.error(data?.error?.errorMessage);
    }
  };

  useEffect(() => {
    const getMobile = () => {
      const decode = jwtDecode(token);
      if (decode?.mobile) {
        setMobile(decode?.mobile);
      }
    };
    getMobile();
  }, [token]);

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setTimer(null);
    }
  }, [timer]);

  // const getOtpOnWhatsapp = async () => {
  //   const otpData = {
  //     mobile: mobile,
  //     type: "otpsend",
  //   };

  //   const res = await AxiosSecure.post(API.otpless, otpData);
  //   const data = res.data;

  //   if (data?.success) {
  //     toast.success(data?.result?.message);
  //   } else {
  //     toast.error(data?.error?.errorMessage);
  //   }
  // };

  return (
    <div className="Modal-Background  ">
      <div className="card-add-bank" ref={addBankRef}>
        <div className="card-header">
          <h2 style={{ color: "black" }}>Add Bank Account</h2>
          <div className="close-btn">
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
        </div>
        <div className="card-body">
          <div className="bank-popup">
            <form onSubmit={handleAddBank}>
              <div
                onChange={(e) => {
                  setBankDetails({
                    ...bankDetails,
                    upiId: e.target.value,
                  });
                }}
                className="input-box "
              >
                <input type="text" placeholder="Enter UPI ID (Optional)" />
              </div>
              <div className="input-box ">
                <input
                  onChange={(e) => {
                    setBankDetails({
                      ...bankDetails,
                      accountName: e.target.value,
                    });
                  }}
                  type="text"
                  placeholder="Enter Account Holder Name"
                  name=""
                />
              </div>
              <div className="input-box ">
                <input
                  onChange={(e) => {
                    setBankDetails({
                      ...bankDetails,
                      accountNumber: e.target.value,
                    });
                  }}
                  placeholder="Enter Bank Account Number"
                  type="text"
                />
              </div>
              <div className="input-box ">
                <input
                  onChange={(e) => {
                    setBankDetails({
                      ...bankDetails,
                      confirmAccountNumber: e.target.value,
                    });
                  }}
                  type="text"
                  name=""
                  placeholder="Re-enter Bank Account Number"
                />
              </div>

              <div
                onChange={(e) => {
                  setBankDetails({
                    ...bankDetails,
                    ifsc: e.target.value,
                  });
                }}
                className="input-box "
              >
                <input type="text" placeholder="Enter IFSC" name="" />
              </div>
              {mobile && Settings.otp && (
                <div style={{ position: "relative" }} className="input-box ">
                  <input
                    readOnly
                    type="text"
                    placeholder="Phone Number"
                    value={mobile}
                  />
                  {timer ? (
                    <div
                      style={{
                        background: "var(--theme-primary)",
                        borderRadius: "4px",
                        padding: "6px 0px",
                        width: "80px",
                        color: "white",
                        fontSize: "11px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      Retry in {timer}
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                      }}
                    >
                      {/* <button
                        onClick={getOtpOnWhatsapp}
                        style={{
                          backgroundColor: "var(--theme-primary)",
                          borderRadius: "4px",
                          padding: "6px 0px",
                          width: "110px",
                          color: "white",
                          fontSize: "11px",
                        }}
                        type="button"
                      >
                        Get OTP Whatsapp
                      </button> */}
                      <button
                        onClick={getOtp}
                        style={{
                          background: "var(--theme-primary)",
                          borderRadius: "4px",
                          padding: "6px 0px",
                          width: "110px",
                          color: "white",
                          fontSize: "11px",
                        }}
                        type="button"
                      >
                        Get OTP Message
                      </button>
                    </div>
                  )}
                </div>
              )}
              {mobile && Settings.otp && (
                <div
                  onChange={(e) => {
                    setBankDetails({
                      ...bankDetails,
                      otp: e.target.value,
                    });
                  }}
                  className="input-box"
                >
                  <input
                    maxLength={6}
                    type="text"
                    placeholder="Enter OTP"
                    name=""
                  />
                </div>
              )}

              <div className="btn-box ">
                <button onClick={closeModal} className="cancel-btn ">
                  <span className="">Cancel</span>
                </button>
                <button
                  disabled={!isFormValid}
                  className="add-btn "
                  type="submit"
                >
                  <span className="">Add Bank Account</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBank;
