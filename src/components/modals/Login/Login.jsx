import { Fragment, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogo } from "../../../context/ApiProvider";
import { useLoginMutation } from "../../../redux/features/auth/authApi";
import { useForm } from "react-hook-form";
import { Settings } from "../../../api";
import { setUser } from "../../../redux/features/auth/authSlice";
import {
  setShowBanner,
  setShowLoginModal,
} from "../../../redux/features/global/globalSlice";
import toast from "react-hot-toast";
import useCloseModalClickOutside from "../../../hooks/closeModal";

const Login = () => {
  const ref = useRef(null);
  const { closePopupForForever } = useSelector((state) => state.global);
  const navigate = useNavigate();
  const { logo } = useLogo();
  const dispatch = useDispatch();
  const [handleLogin] = useLoginMutation();
  const { register, handleSubmit } = useForm();

  const closeLogin = () => {
    dispatch(setShowLoginModal(false));
  };

  useCloseModalClickOutside(ref, closeLogin);

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
        closeLogin();
        localStorage.setItem("changePassword", true);
        navigate("/change-password");
      }
      if (!result?.result?.changePassword && token && user) {
        closeLogin();
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
        closeLogin();
        toast.success("Login successful");
      }
    } else {
      toast.error(result?.error);
    }
  };

  // const handleDownload = (e) => {
  //   e.preventDefault();
  //   const fileUrl = Settings.apk_link;
  //   const link = document.createElement("a");
  //   link.href = fileUrl;
  //   link.setAttribute("download", "site.apk");
  //   document.body.appendChild(link);
  //   link.click();
  //   link.parentNode.removeChild(link);
  // };

  // const getWhatsAppId = (link) => {
  //   window.open(link, "_blank");
  // };
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
                      onClick={closeLogin}
                      type="button"
                      className="close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                    <div className="text-center mb-5" tabIndex={0}>
                      <img className="img-fluid" src={logo} />
                    </div>
                    <div className="modal_login">
                      <h2>login</h2>
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="ng-untouched ng-pristine ng-invalid"
                      >
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
                            {...register("username", { required: true })}
                            type="text"
                            placeholder="Enter Username"
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
                            placeholder="Please enter password"
                            className="form-control ng-untouched ng-pristine ng-invalid"
                          />
                        </div>

                        <button type="submit" className="btn_login mb-2">
                          login
                        </button>
                        <button
                          onClick={loginWithDemo}
                          type="button"
                          className="btn_login mt-0"
                        >
                          login with demo
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

export default Login;
