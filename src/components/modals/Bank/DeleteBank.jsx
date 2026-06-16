import { API } from "../../../api";
import toast from "react-hot-toast";
import { useRef } from "react";
import { AxiosSecure } from "../../../lib/AxiosSecure";
import useCloseModalClickOutside from "../../../hooks/closeModal";

const DeleteBank = ({ setRemoveBank, removeBank, refetchBankData }) => {
  /* Close modal click outside */
  const deleteBankRef = useRef();
  useCloseModalClickOutside(deleteBankRef, () => {
    setRemoveBank(false);
  });

  /* Handle delete bank account */
  const handleDeleteBank = async () => {
    const bankData = {
      type: "deleteBankAccount",
      bankId: removeBank,
    };

    const res = await AxiosSecure.post(API.bankAccount, bankData);
    const data = res?.data;
    if (data?.success) {
      setRemoveBank("");
      toast.success(data?.result?.message);
      /* Refetch bank data to get updated bank */
      refetchBankData();
    } else {
      setRemoveBank("");
      toast.error(data?.error?.errorMessage);
      /* Refetch bank data to get updated bank */
      refetchBankData();
    }
  };

  return (
    <div className="Modal-Background  ng-trigger ng-trigger-inOutPaneAnimation ">
      <div className="card" ref={deleteBankRef}>
        <div className="card-header">
          <h2>Remove Account</h2>
          <div className="close-btn">
            <svg
              onClick={() => setRemoveBank("")}
              width="1rem"
              height="1rem"
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.91703 10.7588C2.68924 10.9867 2.68928 11.356 2.9171 11.5838C3.14493 11.8116 3.51427 11.8116 3.74206 11.5837L7.00012 8.32511L10.2584 11.5834C10.4862 11.8112 10.8556 11.8112 11.0834 11.5834C11.3112 11.3556 11.3112 10.9863 11.0834 10.7585L7.82501 7.5001L11.0832 4.24138C11.3109 4.01356 11.3109 3.64421 11.083 3.41643C10.8552 3.18864 10.4859 3.18867 10.2581 3.4165L7 6.67516L3.74166 3.41678C3.51386 3.18897 3.14451 3.18897 2.91671 3.41678C2.6889 3.64459 2.6889 4.01393 2.91671 4.24174L6.17517 7.50016L2.91703 10.7588Z"
                fill="#111827"
              ></path>
            </svg>
          </div>
        </div>
        <div className="card-body">
          <div className="hr-line"></div>
          <div className="remove-text">
            <span className="">
              Are you sure you want to remove this account
            </span>
          </div>
          <div onClick={() => setRemoveBank("")} className="remove-btn">
            <button className="cancel-btnn ">
              <span className="">Cancel</span>
            </button>
            <button onClick={handleDeleteBank} className="confirm-btnn ">
              <span className="">Yes, Remove</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBank;
