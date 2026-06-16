import { useEffect, useState } from "react";
import { useLogo } from "../../context/ApiProvider";
import { Link, useNavigate } from "react-router-dom";
import {
  useForgotPasswordMutation,
  useGetOtpMutation,
} from "../../redux/features/auth/authApi";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Settings } from "../../api";

const ForgotPassword = () => {
  const { logo } = useLogo();
  const navigate = useNavigate();
  const [getOTP] = useGetOtpMutation();
  const [handleForgotPassword] = useForgotPasswordMutation();
  const { register, handleSubmit } = useForm();
  const [timer, setTimer] = useState(null);
  const [order, setOrder] = useState({
    orderId: null,
    otpMethod: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mobile, setMobile] = useState("");

  const handleOTP = async () => {
    const res = await getOTP({ mobile }).unwrap();
    if (res?.success) {
      setTimer(60);
      setOrder({
        orderId: res?.result?.orderId,
        otpMethod: "sms",
      });
      toast.success(res?.result?.message);
    } else {
      toast.error(res?.error?.errorMessage);
    }
  };

  const onSubmit = async (data) => {
    const forgotPasswordData = {
      username: mobile,
      password: data?.password,
      confirmPassword: data?.confirmPassword,
      otp: data?.otp,
      isOtpAvailable: Settings.otp,
      orderId: order.orderId,
      otpMethod: order.otpMethod,
    };

    const result = await handleForgotPassword(forgotPasswordData).unwrap();

    if (result.success) {
      toast.success("Password updated successfully");
      navigate("/login");
    } else {
      toast.error(result?.error?.loginName?.[0]?.description);
    }
  };

  const handleMobileNo = (e) => {
    if (e.target.value.length <= 10) {
      setMobile(e.target.value);
    }
  };

  useEffect(() => {
    let interval = null;
    if (timer) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) return prevTimer - 1;
          clearInterval(interval);
          return 0;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleDownload = (e) => {
    e.preventDefault();
    const fileUrl = Settings.apk_link;
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", "site.apk");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  const getWhatsAppId = (link) => {
    window.open(link, "_blank");
  };
  return (
    <div id="app" data-v-app>
      <div data-v-2f3cedbb className="container">
        <div data-v-2f3cedbb>
          <div
            data-v-e4dc66ac
            data-v-2f3cedbb
            className="auth_main login-account"
          >
            <div data-v-e4dc66ac className="auth-wrapper">
              <div data-v-e4dc66ac className="auth-close">
                <Link data-v-e4dc66ac to="/" className type="button">
                  ✖
                </Link>
              </div>
              <div data-v-e4dc66ac className="auth-form">
                <div data-v-e4dc66ac className="auth-logo">
                  <img
                    onClick={() => navigate("/")}
                    data-v-e4dc66ac
                    loading="lazy"
                    className="auth-logo-pic"
                    src={logo}
                    alt="logo"
                  />
                </div>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  data-v-e4dc66ac
                  className="reg-form"
                >
                  <div data-v-e4dc66ac className="input-field">
                    <div data-v-e4dc66ac className="country-mob">
                      <div data-v-e4dc66ac className="form_list_select">
                        <div data-v-e4dc66ac className="country-select-card">
                          <div data-v-e4dc66ac className="country-select">
                            <div data-v-e4dc66ac className="country-icon">
                              <img
                                data-v-e4dc66ac
                                src="https://flagcdn.com/in.svg"
                                alt="India"
                                loading="lazy"
                              />
                            </div>
                            <div data-v-e4dc66ac className="country-code">
                              + 91
                            </div>
                            <span data-v-e4dc66ac className="arrowDown" />
                          </div>
                          <div data-v-e4dc66ac className="country-dropdown">
                            <div data-v-e4dc66ac className="country-list">
                              <div data-v-e4dc66ac className="country-item">
                                <div data-v-e4dc66ac className="country-icon">
                                  <img
                                    data-v-e4dc66ac
                                    src="https://flagcdn.com/in.svg"
                                    alt="India"
                                    loading="lazy"
                                  />
                                </div>
                                <div data-v-e4dc66ac className="country-name">
                                  91
                                </div>
                                <div data-v-e4dc66ac className="country-code">
                                  +India
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div data-v-e4dc66ac className="form_list_select_div-r">
                          <input
                            data-v-e4dc66ac
                            type="tel"
                            className="form-control pr-8"
                            placeholder="Enter Phone Number*"
                            onChange={(e) => handleMobileNo(e)}
                            value={mobile}
                          />
                          <div data-v-e4dc66ac className="mo-number-right">
                            {timer ? (
                              <div
                                data-v-e4dc66ac
                                id="otp-btn"
                                className="sendOtp-btn otp-btn"
                              >
                                Retry in {timer}
                              </div>
                            ) : (
                              <button
                                type="button"
                                disabled={Settings.otp && mobile?.length < 10}
                                onClick={handleOTP}
                                data-v-e4dc66ac
                                id="otp-btn"
                                className="sendOtp-btn otp-btn"
                              >
                                GET OTP
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div data-v-e4dc66ac className="input-field">
                    <div data-v-e4dc66ac className="input-field-group">
                      <input
                        data-v-e4dc66ac
                        type="text"
                        {...register("otp", { required: true })}
                        placeholder="Enter OTP*"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div data-v-e4dc66ac className="input-field">
                    <div data-v-e4dc66ac className="input-field-group">
                      <input
                        data-v-e4dc66ac
                        {...register("password", { required: true })}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Password*"
                        className="form-control"
                      />
                      <div
                        onClick={() => setShowPassword((prev) => !prev)}
                        data-v-e4dc66ac
                        className="showHide-icon"
                      >
                        <i
                          data-v-e4dc66ac
                          aria-hidden="true"
                          className={`fa fa-eye-slash ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
                        />
                      </div>
                    </div>
                  </div>
                  <div data-v-e4dc66ac className="input-field">
                    <div data-v-e4dc66ac className="input-field-group">
                      <input
                        data-v-e4dc66ac
                        {...register("confirmPassword", { required: true })}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Enter Password*"
                        className="form-control"
                      />
                      <div
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        data-v-e4dc66ac
                        className="showHide-icon"
                      >
                        <i
                          data-v-e4dc66ac
                          aria-hidden="true"
                          className={`fa fa-eye-slash ${showConfirmPassword ? "fa-eye" : "fa-eye-slash"}`}
                        />
                      </div>
                    </div>
                  </div>

                  <div data-v-e4dc66ac className="login-cmn-btn">
                    <button
                      data-v-e4dc66ac
                      type="submit"
                      className="btn button-login btn-login loader-btn"
                    >
                      Change Password{" "}
                      <span data-v-e4dc66ac>
                        <b data-v-e4dc66ac />
                        <b data-v-e4dc66ac />
                        <b data-v-e4dc66ac />
                      </span>
                    </button>
                  </div>
                  <div className="logon-option">
                    <div className="login-cmn-btn">
                      {Settings?.whatsapplink &&
                        Settings.registration_whatsapp && (
                          <div className="form-group">
                            <button
                              onClick={() =>
                                getWhatsAppId(Settings?.whatsapplink)
                              }
                              type="button"
                              className="btn button-login btn-login loader-btn"
                            >
                              Get Whatsapp ID
                            </button>
                          </div>
                        )}
                      {Settings.apk_link && (
                        <div className="form-group">
                          <button
                            type="button"
                            onClick={handleDownload}
                            className="btn button-login btn-login loader-btn"
                          >
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth={0}
                              viewBox="0 0 16 16"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="m10.213 1.471.691-1.26q.069-.124-.048-.192-.128-.057-.195.058l-.7 1.27A4.8 4.8 0 0 0 8.005.941q-1.032 0-1.956.404l-.7-1.27Q5.281-.037 5.154.02q-.117.069-.049.193l.691 1.259a4.25 4.25 0 0 0-1.673 1.476A3.7 3.7 0 0 0 3.5 5.02h9q0-1.125-.623-2.072a4.27 4.27 0 0 0-1.664-1.476ZM6.22 3.303a.37.37 0 0 1-.267.11.35.35 0 0 1-.263-.11.37.37 0 0 1-.107-.264.37.37 0 0 1 .107-.265.35.35 0 0 1 .263-.11q.155 0 .267.11a.36.36 0 0 1 .112.265.36.36 0 0 1-.112.264m4.101 0a.35.35 0 0 1-.262.11.37.37 0 0 1-.268-.11.36.36 0 0 1-.112-.264q0-.154.112-.265a.37.37 0 0 1 .268-.11q.155 0 .262.11a.37.37 0 0 1 .107.265q0 .153-.107.264M3.5 11.77q0 .441.311.75.311.306.76.307h.758l.01 2.182q0 .414.292.703a.96.96 0 0 0 .7.288.97.97 0 0 0 .71-.288.95.95 0 0 0 .292-.703v-2.182h1.343v2.182q0 .414.292.703a.97.97 0 0 0 .71.288.97.97 0 0 0 .71-.288.95.95 0 0 0 .292-.703v-2.182h.76q.436 0 .749-.308.31-.307.311-.75V5.365h-9zm10.495-6.587a.98.98 0 0 0-.702.278.9.9 0 0 0-.293.685v4.063q0 .406.293.69a.97.97 0 0 0 .702.284q.42 0 .712-.284a.92.92 0 0 0 .293-.69V6.146a.9.9 0 0 0-.293-.685 1 1 0 0 0-.712-.278m-12.702.283a1 1 0 0 1 .712-.283q.41 0 .702.283a.9.9 0 0 1 .293.68v4.063a.93.93 0 0 1-.288.69.97.97 0 0 1-.707.284 1 1 0 0 1-.712-.284.92.92 0 0 1-.293-.69V6.146q0-.396.293-.68" />
                            </svg>{" "}
                            Download .apk
                          </button>
                        </div>
                      )}
                    </div>
                    <ul className="submenu social-icons"></ul>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
