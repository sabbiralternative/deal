import { useState } from "react";
import { API } from "../../api";
import toast from "react-hot-toast";
import { AxiosSecure } from "../../lib/AxiosSecure";
import WithdrawSuccess from "../../components/modals/WithdrawSuccess/WithdrawSuccess";
import images from "../../assets/images";

const WithdrawConfirm = ({
  bank,
  amount,
  setBank,
  setAmount,
  setShowBankAccount,
  setConfirmWithdraw,
}) => {
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);
  const [disable, setDisable] = useState(false);
  /* handle withdraw function */
  const handleCoinSubmit = async (e) => {
    e.preventDefault();
    setDisable(true);
    if (amount?.length > 0 && bank) {
      const bankData = {
        type: "withdrawCoins",
        amount: amount,
        bankId: bank?.bankId,
      };

      const res = await AxiosSecure.post(API.bankAccount, bankData);
      const data = res?.data;

      if (data?.success) {
        toast.success(data?.result?.message);
        setWithdrawSuccess(true);
      } else {
        toast.error(data?.error?.errorMessage);
      }
    }
  };
  return (
    <>
      <div className="withdraw-account">
        <div
          onClick={() => {
            setShowBankAccount(true);
            setConfirmWithdraw(false);
          }}
          className="back-nav-bc "
        >
          <img loading="lazy" src={images.backArrow} alt="" className="" />
          <span className="back-nav-title-bc ellipsis ">
            Back to Select Account
          </span>
        </div>
        <div className="withdraw-amount ">
          <span className="">Withdrawal Amount</span>
          <div
            style={{ cursor: "pointer" }}
            className="edit-logo"
            onClick={() => {
              setBank("");
              setShowBankAccount(false);
              setConfirmWithdraw(false);
              setAmount("");
            }}
          >
            <img loading="lazy" src={images.edit} alt="" className="" />
          </div>
        </div>
        <input
          type="text"
          name=""
          className=""
          defaultValue={amount}
          disabled
        />
        <div className="bank-account ">
          <span className="">Bank Account</span>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              setShowBankAccount(true);
              setConfirmWithdraw(false);
            }}
            className="edit-logo "
          >
            <img loading="lazy" src={images.edit} alt="" className="" />
          </div>
        </div>
        <div className="bank-card1 ">
          <div className="bank-logo1 ">
            <div className="logo ">
              <img
                style={{ maxWidth: "50px", width: "50px" }}
                loading="lazy"
                alt=""
                className=""
                src={images?.bankPicture}
              />
              <p className="">{bank?.bankName}</p>
            </div>
          </div>
          <div className="bank-inner-box ">
            <div className="bank-detail ">
              <div
                style={{
                  width: "max-content",
                  display: "flex",
                  flexDirection: "row",
                }}
                className=""
              >
                <span className="">Bank :-</span>
                <span style={{ marginLeft: "0.2rem" }} className="">
                  {bank?.bankName}
                </span>
              </div>
            </div>
            <div className="bank-detail ">
              <div
                style={{
                  width: "max-content",
                  display: "flex",
                  flexDirection: "row",
                }}
                className=""
              >
                <span className="">IFSC :-</span>
                <span style={{ marginLeft: "0.2rem" }} className="">
                  {bank?.ifsc}
                </span>
              </div>
            </div>
            <div className="bank-detail ">
              <div
                style={{
                  width: "max-content",
                  display: "flex",
                  flexDirection: "row",
                }}
                className=""
              >
                <span className="">Account No :-</span>
                <span className="bank-detail-txt "> {bank?.accountNumber}</span>
              </div>
            </div>
          </div>
        </div>
        <button
          disabled={disable}
          onClick={handleCoinSubmit}
          className="proceed-btn"
          style={{ cursor: disable ? "not-allowed" : "pointer" }}
        >
          <span className="">Proceed</span>
        </button>
      </div>
      {withdrawSuccess && (
        <WithdrawSuccess setWithdrawSuccess={setWithdrawSuccess} />
      )}
    </>
  );
};

export default WithdrawConfirm;
