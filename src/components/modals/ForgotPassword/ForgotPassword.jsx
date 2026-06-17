import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLogo } from "../../../context/ApiProvider";
import {
  useForgotPasswordMutation,
  useGetOtpMutation,
} from "../../../redux/features/auth/authApi";
import { useForm } from "react-hook-form";
import { Settings } from "../../../api";
import {
  setShowForgotPasswordModal,
  setShowLoginModal,
} from "../../../redux/features/global/globalSlice";
import toast from "react-hot-toast";
import useCloseModalClickOutside from "../../../hooks/closeModal";

const ForgotPassword = () => {
  const ref = useRef();
  const { logo } = useLogo();
  const [timer, setTimer] = useState(null);
  const dispatch = useDispatch();
  const [getOTP] = useGetOtpMutation();
  const [handleForgotPassword] = useForgotPasswordMutation();
  const { register, handleSubmit } = useForm();
  const [order, setOrder] = useState({
    orderId: null,
    otpMethod: null,
  });
  // const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mobile, setMobile] = useState("");

  const closeModal = () => {
    dispatch(setShowForgotPasswordModal(false));
  };
  useCloseModalClickOutside(ref, closeModal);

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
      dispatch(setShowForgotPasswordModal(false));
      dispatch(setShowLoginModal(true));
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
  return (
    <Fragment>
      <div className="modal-backdrop fade in show"></div>
      <div
        role="dialog"
        tabIndex={-1}
        className="modal fade show"
        aria-modal="true"
        style={{ display: "block" }}
      >
        <div
          tabIndex={0}
          className="cdk-visually-hidden cdk-focus-trap-anchor"
          aria-hidden="true"
        />
        <div
          role="document"
          className="cred_form_ui modal-dialog modal-dialog-centered"
        >
          <div className="modal-content" ref={ref}>
            <div>
              <div className="row vh-100">
                <div className="d-table h-100">
                  <div className="d-table-cell align-middle">
                    <button
                      onClick={closeModal}
                      type="button"
                      className="close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                    <div className="text-center mb-5" tabIndex={0}>
                      <img className="img-fluid" src={logo} />
                    </div>
                    <div className="modal_login">
                      <h2>Forgot Password</h2>
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="ng-untouched ng-pristine ng-invalid"
                      >
                        <div className="input-group">
                          <input
                            onChange={(e) => handleMobileNo(e)}
                            value={mobile}
                            type="text"
                            placeholder="Enter Phone Number"
                            className="form-control ng-untouched ng-pristine ng-invalid"
                          />
                          <div className="input-group-prepend">
                            {timer ? (
                              <button type="button" style={{ color: "white" }}>
                                Retry in {timer}
                              </button>
                            ) : (
                              <button
                                className="loguser"
                                onClick={handleOTP}
                                type="button"
                                disabled={Settings.otp && mobile?.length < 10}
                              >
                                Get OTP
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <img
                                src="/assets/user.webp"
                                className="img-fluid"
                              />
                            </span>
                          </div>
                          <input
                            {...register("otp", { required: true })}
                            type="text"
                            placeholder="Enter OTP"
                            className="form-control ng-untouched ng-pristine ng-invalid"
                          />
                        </div>

                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <img
                                src="/assets/password.webp"
                                className="img-fluid"
                              />
                            </span>
                          </div>
                          <input
                            {...register("password", { required: true })}
                            type="password"
                            placeholder="Enter Password"
                            className="form-control ng-untouched ng-pristine ng-invalid"
                          />
                        </div>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <img
                                src="/assets/password.webp"
                                className="img-fluid"
                              />
                            </span>
                          </div>
                          <input
                            {...register("password", { required: true })}
                            type="password"
                            placeholder="Enter Confirm Password"
                            className="form-control ng-untouched ng-pristine ng-invalid"
                          />
                        </div>

                        <button type="submit" className="btn_login mb-2">
                          Change Password
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          tabIndex={0}
          className="cdk-visually-hidden cdk-focus-trap-anchor"
          aria-hidden="true"
        />
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
