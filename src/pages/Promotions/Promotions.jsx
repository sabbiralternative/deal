import { useNavigate } from "react-router-dom";
import "./promotions.css";
import { useSelector } from "react-redux";
import useBalance from "../../hooks/balance";
import { useState } from "react";
import { useBonusMutation } from "../../hooks/bonus";
import toast from "react-hot-toast";
import images from "../../assets/images";

const Promotions = () => {
  const { refetch } = useBalance();
  const [coupon, setCoupon] = useState(null);
  const { mutateAsync } = useBonusMutation();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleNavigate = (link) => {
    token ? navigate(link) : navigate("/login");
  };

  const claimCoupon = async () => {
    if (token) {
      if (!coupon) {
        return toast.error("Please enter a coupon code");
      }
      const data = await mutateAsync({
        type: "claimCoupon",
        coupon_code: coupon,
      });

      if (data?.success) {
        refetch();
        toast.success(data?.result);
        setCoupon(null);
      } else {
        toast.error(data?.error);
      }
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="page main" id="main">
      {/* <div className="bonus-card">
        <div style={{ display: "flex", width: "100%", gap: "10px" }}>
          <div className="bonus-box">
            <p className="label">BONUS EARNED</p>
            <p className="amount">₹ X,XXX.XX</p>
          </div>

          <div className="bonus-box">
            <p className="label">FREE MONEY EARNED</p>
            <p className="amount">₹ X,XXX.XX</p>
          </div>
        </div>

        <div className="bonus-actions">
          <button
            onClick={() => handleNavigate("/deposit")}
            className="deposit"
          >
            + Deposit
          </button>
          <button className="clock">🕒</button>
        </div>
        <img
          style={{
            height: "150px",
            position: "absolute",
            bottom: "-50px",
            left: "10px",
            zIndex: "0px",
            transform: "rotate(30deg)",
          }}
          src={images.giftCard}
          alt=""
        />
      </div> */}

      <div className="lossback">
        <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
          {" "}
          <img src={images.cashBundle} alt="" />
          <div className="lossback-title">LOSSBACK BONUS</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {" "}
          {!token && <div className="lossback-info">Login to view claims</div>}
          <button
            onClick={() => handleNavigate("/lossback-bonus")}
            className="view-all"
          >
            VIEW ALL
          </button>
        </div>
      </div>

      <div className="gift-card">
        <div className="gift-top">
          <div className="gift-icon">
            <img src={images.redeemCardGift} alt="" />
          </div>
          <div className="gift-text">
            <h3>Coupon Code</h3>
            <p>
              Type or Paste your coupon code and get rewards in your wallet.
            </p>
          </div>
        </div>

        <div className="gift-input">
          <input
            className="code"
            type="text"
            placeholder="Enter coupon code here"
          />

          <button onClick={claimCoupon} className="redeem">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x={3} y={8} width={18} height={4} rx={1} />
              <path d="M12 8v13" />
              <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
              <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
            </svg>{" "}
            Redeem
          </button>
        </div>
      </div>
    </div>
  );
};

export default Promotions;
