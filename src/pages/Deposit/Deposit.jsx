import { useState } from "react";
import AmountBox from "./AmountBox";
import PaymentMethods from "./PaymentMethods";
import UploadTransaction from "./UploadTransaction";
import DepositModal from "./DepositModal";

const Deposit = () => {
  const [amount, setAmount] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState(false);
  const [uploadTransaction, setUploadTransaction] = useState(false);
  const [paymentId, setPaymentId] = useState("");
  const [tabs, setTabs] = useState("");

  return (
    <main id="main" className="main a23_css">
      {!paymentMethods && !uploadTransaction && (
        <AmountBox
          amount={amount}
          setAmount={setAmount}
          setShowModal={setShowModal}
        />
      )}
      {uploadTransaction && (
        <UploadTransaction tabs={tabs} paymentId={paymentId} amount={amount} />
      )}
      {paymentMethods && (
        <PaymentMethods
          setTabs={setTabs}
          tabs={tabs}
          setUploadTransaction={setUploadTransaction}
          setPaymentMethods={setPaymentMethods}
          setPaymentId={setPaymentId}
          amount={amount}
        />
      )}
      {showModal && (
        <DepositModal
          amount={amount}
          setShowModal={setShowModal}
          setPaymentMethods={setPaymentMethods}
        />
      )}
    </main>
  );
};

export default Deposit;
