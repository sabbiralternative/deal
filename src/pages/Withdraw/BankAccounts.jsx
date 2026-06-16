import { useEffect, useState } from "react";
import AddBank from "../../components/modals/Bank/AddBank";
import DeleteBank from "../../components/modals/Bank/DeleteBank";
import { useDispatch, useSelector } from "react-redux";
import { setAddBank } from "../../redux/features/global/globalSlice";
import images from "../../assets/images";

const BankAccounts = ({
  bankData,
  setConfirmWithdraw,
  setShowBankAccount,
  setAmount,
  refetchBankData,
  setBank,
  bank,
}) => {
  const dispatch = useDispatch();
  const { addBank } = useSelector((state) => state.global);
  const [removeBank, setRemoveBank] = useState("");

  /* select first bank by default */
  useEffect(() => {
    setBank(bankData?.[0]);
  }, [bankData, setBank]);

  return (
    <>
      <div
        className="dep-w-info-bc"
        style={{
          backgroundColor: "white",
          padding: "10px",
        }}
      >
        <div className="bank-account-section  ">
          <div
            onClick={() => {
              setAmount("");
              setShowBankAccount(false);
              setBank("");
            }}
            className="back-nav-bc "
          >
            <img loading="lazy" src={images.backArrow} alt="" className="" />
            <span className="back-nav-title-bc ellipsis ">Back to Amount</span>
          </div>

          <div
            style={{ width: "100%", gap: "1rem", display: "grid" }}
            className=" "
          >
            {bankData?.map((data, i) => {
              return (
                <div
                  onClick={() => setBank(data)}
                  key={i}
                  className={`bank-card${bankData?.length - i} ${
                    bank?.bankId === data?.bankId ? "active" : ""
                  }`}
                >
                  <div className=" bank-logo3">
                    <div className="logo ">
                      <img
                        style={{ maxWidth: "50px", width: "50px" }}
                        loading="lazy"
                        alt=""
                        className=""
                        src={images.bankPicture}
                      />
                      <p className=""> {data?.bankName}</p>
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
                        <span className="bank-detail-txt ">
                          {data?.bankName}
                        </span>
                      </div>
                      <div
                        onClick={() => setRemoveBank(data?.bankId)}
                        className=""
                      >
                        <img
                          loading="lazy"
                          src={images.deleteIcon}
                          alt=""
                          className="delete-logo "
                        />
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
                        <span className="bank-detail-txt ">{data?.ifsc}</span>
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
                        <span className="bank-detail-txt ">
                          {data?.accountNumber}
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
                        <span className="">Upi ID :-</span>
                        <span className="bank-detail-txt ">{data?.upiId}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ gap: "1rem", display: "grid" }} className=" "></div>
          <div className="withdraw-page-buttons  ">
            <button
              onClick={() => dispatch(setAddBank(true))}
              className="plus-btn  "
            >
              <img
                loading="lazy"
                src="assets/img/plus-logo.svg"
                alt=""
                className=""
              />
              <span className="">Add Bank Account</span>
            </button>
            <button
              onClick={() => {
                setConfirmWithdraw(true);
                setShowBankAccount(false);
              }}
              type="submit"
              className="process-btn "
              disabled={!bank}
            >
              <span className="">Proceed</span>
            </button>
          </div>

          {/*     <!-- bank accoutn list end  --> */}
        </div>
      </div>
      {addBank && <AddBank refetchBankData={refetchBankData} />}
      {removeBank && (
        <DeleteBank
          refetchBankData={refetchBankData}
          setRemoveBank={setRemoveBank}
          removeBank={removeBank}
        />
      )}
    </>
  );
};

export default BankAccounts;
