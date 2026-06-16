import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import useCloseModalClickOutside from "../../hooks/closeModal";
import images from "../../assets/images";
import useDepositBreakdown from "../../hooks/depositBreakdown";
const DepositModal = ({ setShowModal, setPaymentMethods, amount }) => {
  const { data: depositBreakdown } = useDepositBreakdown({
    amount: parseFloat(amount),
  });

  /* close modal click outside */
  const depositRef = useRef();
  useCloseModalClickOutside(depositRef, () => {
    setShowModal(false);
  });

  useEffect(() => {
    const floatAmount = parseFloat(amount);

    if (typeof floatAmount !== "number") {
      return toast.error("Please enter a valid number");
    }
    if (
      depositBreakdown?.minimumDeposit &&
      floatAmount < depositBreakdown?.minimumDeposit
    ) {
      toast.error(
        `Minimum deposit amount is ${depositBreakdown?.minimumDeposit}`,
      );
    }
  }, [amount, depositBreakdown]);

  return (
    <>
      {amount >= depositBreakdown?.minimumDeposit && (
        <div className="Modal-Background ng-tns-c159-13 ng-star-inserted">
          <div className="depositpop ng-tns-c159-13" ref={depositRef}>
            <div className="depositbreak ng-tns-c159-13">
              <p className="ng-tns-c159-13">Deposit Breakdown</p>
              <div
                onClick={() => setShowModal(false)}
                className="close-svg ng-tns-c159-13"
                style={{ cursor: "pointer" }}
              >
                <svg
                  width="14"
                  height="15"
                  viewBox="0 0 14 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ng-tns-c159-13"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.91703 10.7588C2.68924 10.9867 2.68928 11.356 2.9171 11.5838C3.14493 11.8116 3.51427 11.8116 3.74206 11.5837L7.00012 8.32511L10.2584 11.5834C10.4862 11.8112 10.8556 11.8112 11.0834 11.5834C11.3112 11.3556 11.3112 10.9863 11.0834 10.7585L7.82501 7.5001L11.0832 4.24138C11.3109 4.01356 11.3109 3.64421 11.083 3.41643C10.8552 3.18864 10.4859 3.18867 10.2581 3.4165L7 6.67516L3.74166 3.41678C3.51386 3.18897 3.14451 3.18897 2.91671 3.41678C2.6889 3.64459 2.6889 4.01393 2.91671 4.24174L6.17517 7.50016L2.91703 10.7588Z"
                    fill="#111827"
                    className="ng-tns-c159-13"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="deposit-inner ng-tns-c159-13">
              <div className="balancebox ng-tns-c159-13">
                <div className="damount ng-tns-c159-13">
                  <div className="balancetxt ng-tns-c159-13">
                    <p className="ng-tns-c159-13">Deposit Amount</p>
                  </div>

                  <div className="amt ng-tns-c159-13">
                    {depositBreakdown?.deposit > 0 && (
                      <p className="ng-tns-c159-13">
                        ₹ {depositBreakdown?.deposit}
                      </p>
                    )}
                    {depositBreakdown?.bonus > 0 && (
                      <p className="depamt ng-tns-c159-13 ng-star-inserted">
                        +{depositBreakdown?.bonus} Bonus
                      </p>
                    )}
                  </div>
                </div>
                {depositBreakdown?.instantMoney > 0 && (
                  <div className="moneybox ng-tns-c159-13">
                    <p className="money ng-tns-c159-13">
                      {depositBreakdown?.instantMoneyTitle}
                    </p>
                    <p className="doll ng-tns-c159-13">
                      ₹{depositBreakdown?.instantMoney}
                    </p>
                  </div>
                )}

                <div className="line ng-tns-c159-13"></div>
                <div className="totalamt ng-tns-c159-13">
                  <p className="money ng-tns-c159-13">Total Amount Credited</p>
                  <p className="doll1 ng-tns-c159-13">
                    ₹ {depositBreakdown?.totalAmount}
                  </p>
                </div>
              </div>
              <div className="giftbox ng-tns-c159-13">
                <img
                  loading="lazy"
                  src={images.star}
                  alt=""
                  className="star1 ng-tns-c159-13"
                />
                <img
                  loading="lazy"
                  src={images.star}
                  alt=""
                  className="star2 ng-tns-c159-13"
                />
                <div className="gift-input ng-tns-c159-13">
                  <p className="money ng-tns-c159-13">
                    Amount credited In main wallet
                  </p>
                  <p className="doll ng-tns-c159-13">
                    ₹ {depositBreakdown?.mainWallet}
                  </p>
                </div>
                <img
                  loading="lazy"
                  src={images.star}
                  alt=""
                  className="star3 ng-tns-c159-13"
                />
              </div>
              {depositBreakdown?.bonusWallet > 0 && (
                <div className="giftbox1 ng-tns-c159-13 ng-star-inserted">
                  <img
                    loading="lazy"
                    src={images.star}
                    alt=""
                    className="star1 ng-tns-c159-13"
                  />
                  <img
                    loading="lazy"
                    src={images.star}
                    alt=""
                    className="star2 ng-tns-c159-13"
                  />
                  <div className="gift-input ng-tns-c159-13">
                    <p className="money ng-tns-c159-13">
                      Amount credited In bonus card
                    </p>
                    <p className="doll ng-tns-c159-13">
                      ₹{depositBreakdown?.bonusWallet}
                    </p>
                  </div>
                  <img
                    loading="lazy"
                    src={images.star}
                    alt=""
                    className="star4 ng-tns-c159-13"
                  />
                </div>
              )}

              <div
                style={{ width: "100%" }}
                onClick={() => {
                  setPaymentMethods(true);
                  setShowModal(false);
                }}
                className="makepayment ng-tns-c159-13"
              >
                <div className="madepay ng-tns-c159-13">
                  <button type="button" className="ng-tns-c159-13">
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DepositModal;
