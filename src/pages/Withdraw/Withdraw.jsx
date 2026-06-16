import { useEffect, useState } from "react";
import SelectAmount from "./SelectAmount";
import BankAccounts from "./BankAccounts";
import { useDispatch, useSelector } from "react-redux";
import { setAddBank } from "../../redux/features/global/globalSlice";
import AddBank from "../../components/modals/Bank/AddBank";
import WithdrawConfirm from "./WithdrawConfirm";
import { useBankAccountQuery } from "../../hooks/bankAccount";

const Withdraw = () => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const [showBankAccount, setShowBankAccount] = useState(false);
  const [confirmWithdraw, setConfirmWithdraw] = useState(false);
  const [bank, setBank] = useState("");
  const { addBank } = useSelector((state) => state.global);
  const payload = {
    type: "getBankAccounts",
    status: "1",
  };
  const { data: bankData, refetch: refetchBankData } =
    useBankAccountQuery(payload);

  useEffect(() => {
    setShowBankAccount(false);
    setConfirmWithdraw(false);
  }, []);

  useEffect(() => {
    if (showBankAccount && bankData?.length < 1) {
      setShowBankAccount(false);
      dispatch(setAddBank(true));
    }
  }, [bankData, showBankAccount, dispatch]);

  return (
    <main id="main" className="main a23_css">
      {!showBankAccount && !confirmWithdraw && (
        <SelectAmount
          setShowBankAccount={setShowBankAccount}
          setAmount={setAmount}
          amount={amount}
        />
      )}
      {showBankAccount && bankData?.length > 0 && (
        <BankAccounts
          refetchBankData={refetchBankData}
          setAmount={setAmount}
          bankData={bankData}
          setConfirmWithdraw={setConfirmWithdraw}
          setShowBankAccount={setShowBankAccount}
          bank={bank}
          setBank={setBank}
        />
      )}
      {addBank && bankData?.length < 1 && (
        <AddBank setAddBank={setAddBank} refetchBankData={refetchBankData} />
      )}
      {confirmWithdraw && (
        <WithdrawConfirm
          amount={amount}
          bank={bank}
          setAmount={setAmount}
          setShowBankAccount={setShowBankAccount}
          setConfirmWithdraw={setConfirmWithdraw}
          setBank={setBank}
        />
      )}
    </main>
  );
};

export default Withdraw;
