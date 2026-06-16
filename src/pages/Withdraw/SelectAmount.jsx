import images from "../../assets/images";
import useWithdrawBreakdown from "../../hooks/withdrawBreakdown";

const SelectAmount = ({ setAmount, amount, setShowBankAccount }) => {
  const { data: withdrawBreakdown } = useWithdrawBreakdown();

  return (
    <div
      data-scroll-lock-scrollable=""
      className="dep-w-info-bc  ng-star-inserted"
    >
      <div className="withdraw-section  ng-star-inserted">
        <div className="bonus-amount bg-primary-light">
          <img
            loading="lazy"
            src={images.star}
            alt=""
            className="bonus-star1 "
          />
          <img
            loading="lazy"
            src={images.star}
            alt=""
            className="bonus-star2 "
          />
          <img
            loading="lazy"
            src={images.star}
            alt=""
            className="bonus-star3 "
          />
          <img
            loading="lazy"
            src={images.star}
            alt=""
            className="wallet-logo "
          />
          <div className="">
            <img
              loading="lazy"
              src={images.star}
              alt=""
              className="wallet-3D-frame "
            />
            <img
              loading="lazy"
              src={images.star}
              alt=""
              className="wallet-3d "
            />
          </div>
          <div className="wallet-card " style={{ height: "100%" }}>
            <span className="wallet-amount ">
              ₹ {withdrawBreakdown?.mainWallet}
            </span>
            <div className="wallet-txt ">
              <p className="">Main Wallet</p>
            </div>
          </div>
        </div>

        <div className="amount-input bg-primary-light">
          <p className="amount-text ">Please enter the amount to withdraw</p>
          <form
            style={{
              width: "100%",
              background: "white",
            }}
            className=" ng-pristine ng-invalid ng-touched"
          >
            <div className="diposit_form ">
              <div
                className="w-100 deposit_form_input "
                style={{ background: "#ebedf4" }}
              >
                <div className="w-100 deposit_form_input ">
                  <div className="inputBox2 ">
                    <input
                      onChange={(e) => setAmount(e.target.value)}
                      id="depositamount"
                      name="depositamount"
                      min="0"
                      type="text"
                      className="deposit_form_input   ng-pristine ng-invalid ng-touched"
                      placeholder="₹ Amount"
                    />
                    <p className="deposit-input-min-text ">
                      minimum ₹{withdrawBreakdown?.minimumWithdraw}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <button
          disabled={
            amount < withdrawBreakdown?.minimumWithdraw ||
            amount > withdrawBreakdown?.mainWallet
          }
          onClick={() => setShowBankAccount(true)}
          className="btnn1 "
        >
          Continue to Select Account
        </button>
      </div>
    </div>
  );
};

export default SelectAmount;
