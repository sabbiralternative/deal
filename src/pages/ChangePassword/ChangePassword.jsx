import { Link, useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from "../../redux/features/auth/authApi";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLogo } from "../../context/ApiProvider";
import { useState } from "react";

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { logo } = useLogo();
  const [handleChangePassword] = useChangePasswordMutation();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async ({ password, newPassword, newPasswordConfirm }) => {
    const payload = {
      oldPassword: password,
      password: newPassword,
      passVerify: newPasswordConfirm,
      nonce: crypto.randomUUID(),
    };

    const res = await handleChangePassword(payload).unwrap();
    if (res.success) {
      localStorage.removeItem("changePassword");
      toast.success(res?.result?.message);
      navigate("/");
    } else {
      toast.error(res?.error?.errorMessage);
    }
  };
  return (
    <div id="app" data-v-app>
      <div data-v-2f3cedbb className="container">
        <div data-v-2f3cedbb>
          <div data-v-2f3cedbb className="auth_main login-account">
            <div className="auth-wrapper">
              <div className="auth-close">
                <Link to="/" className type="button">
                  ✖
                </Link>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
                <div className="auth-logo">
                  <img
                    onClick={() => navigate("/")}
                    loading="lazy"
                    className="auth-logo-pic"
                    src={logo}
                    alt="logo"
                  />
                </div>

                <div className="input-field">
                  <div className="input-field-group">
                    <input
                      {...register("password", { required: true })}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Old Password"
                      className="form-control"
                    />
                    <div
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="showHide-icon"
                    >
                      <i
                        aria-hidden="true"
                        className={`fa  ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
                      />
                    </div>
                  </div>
                </div>
                <div className="input-field">
                  <div className="input-field-group">
                    <input
                      {...register("newPassword", { required: true })}
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter New Password"
                      className="form-control"
                    />
                    <div
                      onClick={() => setShowNewPassword((prev) => !prev)}
                      className="showHide-icon"
                    >
                      <i
                        aria-hidden="true"
                        className={`fa  ${showNewPassword ? "fa-eye" : "fa-eye-slash"}`}
                      />
                    </div>
                  </div>
                </div>
                <div className="input-field">
                  <div className="input-field-group">
                    <input
                      {...register("newPasswordConfirm", { required: true })}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Enter Confirm Password"
                      className="form-control"
                    />
                    <div
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="showHide-icon"
                    >
                      <i
                        aria-hidden="true"
                        className={`fa  ${showConfirmPassword ? "fa-eye" : "fa-eye-slash"}`}
                      />
                    </div>
                  </div>
                </div>

                <div className="login-cmn-btn">
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn button-login btn-login loader-btn"
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
