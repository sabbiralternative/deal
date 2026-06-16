import { useDispatch, useSelector } from "react-redux";
import { Settings } from "../../api";
import { useLogo } from "../../context/ApiProvider";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useForm } from "react-hook-form";
import { setUser } from "../../redux/features/auth/authSlice";
import { setShowBanner } from "../../redux/features/global/globalSlice";
import toast from "react-hot-toast";
import { useState } from "react";

const Login = () => {
  const { closePopupForForever } = useSelector((state) => state.global);
  const navigate = useNavigate();
  const { logo } = useLogo();
  const dispatch = useDispatch();
  const [handleLogin] = useLoginMutation();
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async ({ username, password }) => {
    const loginData = {
      username: username,
      password: password,
      b2c: Settings.b2c,
      apk: closePopupForForever ? true : false,
      nonce: crypto.randomUUID(),
    };
    const result = await handleLogin(loginData).unwrap();

    if (result.success) {
      const token = result?.result?.token;
      const bonusToken = result?.result?.bonusToken;
      const user = result?.result?.loginName;
      const game = result?.result?.buttonValue?.game;
      const memberId = result?.result?.memberId;
      const banner = result?.result?.banner;

      dispatch(setUser({ user, token, memberId }));
      localStorage.setItem("memberId", memberId);
      localStorage.setItem("buttonValue", JSON.stringify(game));
      localStorage.setItem("token", token);
      localStorage.setItem("bonusToken", bonusToken);
      if (banner) {
        localStorage.setItem("banner", banner);
        dispatch(setShowBanner(true));
      }
      if (result?.result?.changePassword) {
        navigate("/");
        localStorage.setItem("changePassword", true);
        navigate("/change-password");
      }
      if (!result?.result?.changePassword && token && user) {
        navigate("/");
        toast.success("Login successful");
      }
    } else {
      toast.error(result?.error);
    }
  };

  /* handle login demo user */
  const loginWithDemo = async () => {
    /* Random token generator */
    /* Encrypted the post data */
    const loginData = {
      username: "demo",
      password: "",
      b2c: Settings.b2c,
      apk: closePopupForForever ? true : false,
      nonce: crypto.randomUUID(),
    };

    const result = await handleLogin(loginData).unwrap();

    if (result.success) {
      const token = result?.result?.token;
      const bonusToken = result?.result?.bonusToken;
      const user = result?.result?.loginName;
      const game = result?.result?.buttonValue?.game;
      const banner = result?.result?.banner;

      dispatch(setUser({ user, token }));
      localStorage.setItem("buttonValue", JSON.stringify(game));
      localStorage.setItem("token", token);

      localStorage.setItem("bonusToken", bonusToken);
      if (banner) {
        localStorage.setItem("banner", banner);
        dispatch(setShowBanner(true));
      }
      if (token && user) {
        navigate("/");
        toast.success("Login successful");
      }
    } else {
      toast.error(result?.error);
    }
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
  };

  const getWhatsAppId = (link) => {
    window.open(link, "_blank");
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

                <div className="tab-content" id="pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="user-login"
                    role="tabpanel"
                    aria-labelledby="user-login-tab"
                  >
                    <div className="input-field">
                      <div className="input-field-group">
                        <input
                          {...register("username", { required: true })}
                          type="text"
                          placeholder="Enter Username"
                          className="form-control"
                        />
                        <div className="input-group-icon">
                          <i className="fas fa-user" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="input-field">
                  <div className="input-field-group">
                    <input
                      {...register("password", { required: true })}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Your Password"
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
                  <div
                    className="whats-with-acc"
                    style={{
                      textAlign: "end",
                      color: "white",
                      fontSize: "12px",
                      marginTop: "3px",
                    }}
                  >
                    {" "}
                    <Link to="/forgot-password" className="yol-bd-font">
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <div className="login-cmn-btn">
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn button-login btn-login loader-btn"
                    >
                      Login
                    </button>
                  </div>
                  <div className="form-group">
                    <button
                      onClick={loginWithDemo}
                      type="button"
                      className="btn button-login btn-login loader-btn"
                    >
                      Login with Demo
                    </button>
                  </div>
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
                <div data-v-e4dc66ac className="whats-with-acc">
                  <span data-v-e4dc66ac>Don&apos;t have any Account? </span>
                  <Link to="/register" className="yol-bd-font">
                    Register
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
