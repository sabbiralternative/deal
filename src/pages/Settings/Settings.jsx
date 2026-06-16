import { useForm } from "react-hook-form";
import { useEditButtonValuesMutation } from "../../redux/features/events/events";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const [editButtonValue] = useEditButtonValuesMutation();
  const stakes = JSON.parse(localStorage.getItem("buttonValue"));
  const { handleSubmit, register, watch } = useForm({
    defaultValues: {
      buttonGameValues: stakes,
    },
  });

  const buttonGameValues = watch("buttonGameValues");

  const onSubmit = async () => {
    const payload = {
      game: buttonGameValues?.map((btn) => ({
        label: parseFloat(btn?.value),
        value: parseFloat(btn?.value),
      })),
    };

    const res = await editButtonValue(payload).unwrap();
    if (res.success) {
      toast.success(res?.result?.message);
      localStorage.removeItem("buttonValue");
      const gameButtonsValues = buttonGameValues;
      localStorage.setItem("buttonValue", JSON.stringify(gameButtonsValues));
      navigate("/");
    }
  };

  return (
    <div data-v-2f3cedbb>
      <div data-v-2f3cedbb className="ng-star-inserted">
        <div className="card border-0 shadowOn">
          <div className="parent-setting">
            <div className="side-head">
              <h3 className="a-setting mb-0">
                <img
                  loading="lazy"
                  className="setting_icon_img"
                  src="/assets/setting_icon-DkwhIRGw.svg"
                  alt=""
                />
                <span className="setting-txt-con">Setting</span>
              </h3>
            </div>
            {/* <div className="card-header theme-color-option">
              <h3 className="mb-0 theme-default bold">
                Theme{" "}
                <span className="default">
                  Default <i className="fa fa-refresh ml-2 me-2" />
                </span>
              </h3>
            </div>
            <div className="card-body container-fluid container-fluid-5 button-value theme-con-5">
              <div className="row row5">
                <div className="col-12 theme-opt-con">
                  <div className="theme-options">
                    <span className="circle1">
                      <span className="round bg1" />
                    </span>
                    <span className="circle1">
                      <span className="round bg2" />
                    </span>
                    <span className="circle1">
                      <span className="round bg3" />
                    </span>
                    <span className="circle1">
                      <span className="round bg4" />
                    </span>
                    <span className="circle1">
                      <span className="round bg5" />
                    </span>
                    <span className="circle1">
                      <span className="round bg6" />
                    </span>
                    <span className="circle1">
                      <span className="round bg7" />
                    </span>
                    <span className="circle1">
                      <span className="round bg8" />
                    </span>
                    <span className="circle1">
                      <span className="round bg9" />
                    </span>
                    <span className="circle1">
                      <span className="round bg10" />
                    </span>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <div className="card-header theme-color-option">
            <h3 className="mb-0 bold">
              <span>Stake</span>
            </h3>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body container-fluid container-fluid-5 button-value quick-stake-container"
          >
            <div className="row mb-1 desktop-pl">
              <div className="col">
                <div className="button-title">
                  <span>
                    <b className="stake-amount">Quick Stakes</b>
                  </span>
                </div>
              </div>
            </div>
            <div className="row g-1 desktop-pl quick-stake-boxes mb-3">
              {stakes?.map((stake, i) => {
                return (
                  <div
                    key={i}
                    {...register(`buttonGameValues.${i}.value`)}
                    className="col-3 mt-2 quick-box-con ng-star-inserted"
                  >
                    <div className="form-group mb-0 quick-stake-box">
                      <input
                        maxLength={8}
                        className="form-control ng-untouched ng-pristine ng-valid"
                        defaultValue={stake?.value}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="update-btn-con">
              <div className="update-btn-container">
                <button type="submit" className="updatebtn ">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
