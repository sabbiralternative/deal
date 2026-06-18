import { useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from "../../redux/features/auth/authApi";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ChangePassword = () => {
  // const [showPassword, setShowPassword] = useState(false);
  // const [showNewPassword, setShowNewPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const { logo } = useLogo();
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
    <main>
      <div className="container">
        <div className="ng-star-inserted">
          <div className="member_account mhide">
            <div className="tab-container">
              <div className="tab-content">
                <div
                  role="tabpanel"
                  aria-labelledby
                  className="tab-pane active"
                >
                  <div>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="cp_form ng-untouched ng-pristine ng-invalid"
                    >
                      <div className="row">
                        <div className="col-md-6">
                          <div className="row mb-lg-3 mt-lg-2 align-items-center">
                            <label className="col-md-3 col-lg-3 col-form-label text-lg-end">
                              Current Password :
                            </label>
                            <div className="col-md-9 col-lg-9">
                              <input
                                {...register("password", { required: true })}
                                type="password"
                                className="form-control ng-untouched ng-pristine ng-invalid"
                              />
                            </div>
                          </div>
                          <div className="row mb-lg-3 mt-lg-2 align-items-center">
                            <label
                              htmlFor="newPassword"
                              className="col-md-3 col-lg-3 col-form-label text-lg-end"
                            >
                              New Password :
                            </label>
                            <div className="col-md-9 col-lg-9">
                              <input
                                {...register("newPassword", { required: true })}
                                type="password"
                                className="form-control ng-untouched ng-pristine ng-invalid"
                              />
                            </div>
                          </div>
                          <div className="row mb-lg-3 mt-lg-2 align-items-center">
                            <label
                              htmlFor="renewPassword"
                              className="col-md-3 col-lg-3 col-form-label text-lg-end"
                            >
                              Re-enter New Password :
                            </label>
                            <div className="col-md-9 col-lg-9">
                              <input
                                {...register("newPasswordConfirm", {
                                  required: true,
                                })}
                                type="password"
                                className="form-control ng-untouched ng-pristine ng-invalid"
                              />
                            </div>
                          </div>
                          {/* <div className="feedback">
                            <p className="small m-0">
                              <i>
                                <b>Note:</b> The New Password field must be at
                                least 6 characters
                              </i>
                            </p>
                            <p className="small m-0">
                              <i>
                                <b>Note:</b> The New Password must contain at
                                least: 1 uppercase letter, 1 lowercase letter, 1
                                number
                              </i>
                            </p>
                          </div> */}
                          <div className="row">
                            <button type="submit" className="btn btn_cp">
                              Change Password
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ChangePassword;
