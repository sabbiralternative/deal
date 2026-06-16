import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import useCloseModalClickOutside from "../../../hooks/closeModal";
import { API, Settings } from "../../../api";
import { AxiosSecure } from "../../../lib/AxiosSecure";
import { useIndexMutation } from "../../../hooks";

const AddNewUser = ({ setShowAddNewUserModal }) => {
  const { mutate: addNewUser } = useIndexMutation();
  const [mobile, setMobile] = useState(null);
  const [timer, setTimer] = useState(null);

  const addNewUserRef = useRef();
  useCloseModalClickOutside(addNewUserRef, () => {
    setShowAddNewUserModal(false);
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [userDetails, setUserDetails] = useState({
    userId: "",
    password: "",
    confirmPassword: "",
    selfPassword: "",
    otp: "",
  });

  /* Handle add bank function */
  const handleAddBank = async (e) => {
    e.preventDefault();

    if (mobile && !userDetails.otp && Settings.otp) {
      return toast.error("Please enter otp to add new account");
    }

    let payload = {
      username: userDetails.userId,
      password: userDetails.password,
      self_password: userDetails.selfPassword,
      mobile: mobile,
      otp: userDetails.otp,
      type: "add_affiliate",
    };

    addNewUser(payload, {
      onSuccess: (data) => {
        if (data?.success) {
          toast.success(data?.result?.message);
          setShowAddNewUserModal(false);
        } else {
          toast.error(data?.result?.message);
        }
      },
      onError: (data) => {
        toast.error(data?.result?.message);
      },
    });
  };

  const validateForm = (userDetails) => {
    const isMobileFilled = mobile && mobile?.trim() !== "";
    const isOTPFilled = userDetails.otp.trim() !== "";
    const isUserIdFilled = userDetails.userId.trim() !== "";
    const isPasswordFilled = userDetails.password.trim() !== "";
    const isConfirmPasswordFilled = userDetails.confirmPassword.trim() !== "";
    const isSelfPasswordFilled = userDetails.selfPassword.trim() !== "";

    const isFormValid =
      (isPasswordFilled &&
        isConfirmPasswordFilled &&
        isSelfPasswordFilled &&
        isMobileFilled &&
        isOTPFilled) ||
      (isPasswordFilled &&
        isConfirmPasswordFilled &&
        isSelfPasswordFilled &&
        isUserIdFilled) ||
      (isPasswordFilled &&
        isConfirmPasswordFilled &&
        isSelfPasswordFilled &&
        isUserIdFilled &&
        isMobileFilled &&
        isOTPFilled);

    setIsFormValid(isFormValid);
  };

  useEffect(() => {
    validateForm(userDetails);
  }, [userDetails]);

  const getOtp = async () => {
    const otpData = {
      mobile,
    };

    const res = await AxiosSecure.post(API.otp, otpData);
    const data = res.data;
    if (data?.success) {
      setTimer(60);
      toast.success(data?.result?.message);
    } else {
      toast.error(data?.error?.errorMessage);
    }
  };

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
    <div className="a23_css">
      <div className=" Modal-Background">
        <div className="card-add-bank" ref={addNewUserRef}>
          <div className="card-header">
            <h2 style={{ color: "black" }}>Add New User</h2>
            <div className="close-btn">
              <svg
                onClick={() => setShowAddNewUserModal(false)}
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
                <div style={{ position: "relative" }} className="input-box ">
                  <input
                    onChange={(e) => {
                      if (e.target.value.length <= 10) {
                        setMobile(e.target.value);
                      }
                    }}
                    type="number"
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
                      {/* {Settings.otpWhatsapp && (
                        <button
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
                        </button>
                      )} */}
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

                <div
                  onChange={(e) => {
                    setUserDetails({
                      ...userDetails,
                      otp: e.target.value,
                    });
                  }}
                  className="input-box "
                >
                  <input
                    maxLength={6}
                    type="text"
                    placeholder="Enter OTP"
                    name=""
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "10px 0px",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      alignItems: "center",
                      display: "flex",
                      height: "1px",
                      background: "rgba(158, 158, 158, 0.2)",
                    }}
                  ></div>
                  <span
                    style={{
                      width: "100%",
                      color: "#000",
                      textAlign: "center",
                      fontFamily: "Inter",
                      fontSize: "0.75rem",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "150%",
                      letterSpacing: "0.01875rem",
                    }}
                  >
                    OR{" "}
                  </span>
                  <div
                    style={{
                      width: "100%",
                      alignItems: "center",
                      display: "flex",
                      height: "1px",
                      background: "rgba(158, 158, 158, 0.2)",
                    }}
                  ></div>
                </div>
                <div
                  onChange={(e) => {
                    setUserDetails({
                      ...userDetails,
                      userId: e.target.value,
                    });
                  }}
                  className="input-box "
                >
                  <input type="text" placeholder="Enter User ID" />
                </div>
                <div className="input-box ">
                  <input
                    onChange={(e) => {
                      setUserDetails({
                        ...userDetails,
                        password: e.target.value,
                      });
                    }}
                    type="password"
                    placeholder="Enter Password"
                  />
                </div>
                <div className="input-box ">
                  <input
                    onChange={(e) => {
                      setUserDetails({
                        ...userDetails,
                        confirmPassword: e.target.value,
                      });
                    }}
                    placeholder="Enter Confirm Password"
                    type="password"
                  />
                </div>
                <div className="input-box ">
                  <input
                    onChange={(e) => {
                      setUserDetails({
                        ...userDetails,
                        selfPassword: e.target.value,
                      });
                    }}
                    type="text"
                    name=""
                    placeholder="Enter Self Password"
                  />
                </div>

                <div className="btn-box ">
                  <button
                    onClick={() => setShowAddNewUserModal(false)}
                    className="cancel-btn "
                  >
                    <span className="">Cancel</span>
                  </button>
                  <button
                    disabled={!isFormValid}
                    className="add-btn "
                    type="submit"
                  >
                    <span className="">Add New User</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewUser;
