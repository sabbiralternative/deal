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
                  <div className="ng-star-inserted">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="stake_setting"
                    >
                      <div className="row">
                        <div className="col-md-6">
                          <div className="row">
                            {stakes?.map((stake, i) => {
                              return (
                                <div key={i} className="col-6 ng-star-inserted">
                                  <div className="inputgroup">
                                    <span>100</span>
                                    <input
                                      {...register(
                                        `buttonGameValues.${i}.value`,
                                      )}
                                      defaultValue={stake?.value}
                                      type="number"
                                      className="form-control ng-untouched ng-pristine ng-valid"
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          <div className="row">
                            <div className="col-12">
                              <button type="submit" className="savestake_btns">
                                save
                              </button>
                            </div>
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

export default Settings;
