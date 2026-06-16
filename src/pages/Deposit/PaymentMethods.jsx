import { API } from "../../api";
import { useEffect, useState } from "react";
import { handleCopyToClipBoard } from "../../utils/handleCopyToClipBoard";
import { FaQrcode } from "react-icons/fa";
import { CiBank } from "react-icons/ci";
import toast from "react-hot-toast";

import { AxiosSecure } from "../../lib/AxiosSecure";

import images from "../../assets/images";
import { useBankAccountQuery } from "../../hooks/bankAccount";

/* eslint-disable react/no-unknown-property */
const PaymentMethods = ({
  setUploadTransaction,
  setPaymentMethods,
  setPaymentId,
  amount,
  tabs,
  setTabs,
}) => {
  const {
    data: depositMethods,
    refetch: refetchBankData,
    isFetched,
  } = useBankAccountQuery({
    type: "depositMethods",
    amount,
  });

  const [depositData, setDepositData] = useState({});

  useEffect(() => {
    refetchBankData();
  }, [refetchBankData]);

  const handleVisibleBankMethod = async (e, method) => {
    e.preventDefault();
    setTabs(method?.type);
    setPaymentId(method?.paymentId);

    if (
      method?.type === "upigateway" ||
      method?.type === "toitgateway" ||
      method?.type === "i100gateway" ||
      method?.type === "upiclick"
    ) {
      const depositDetailForPg = {
        paymentId: method?.paymentId,
        amount,
      };
      const res = await AxiosSecure.post(API.pg, depositDetailForPg);
      const data = res?.data;

      if (data?.success) {
        window.location.href = data?.result?.link;
      } else {
        toast.error(data?.result?.message);
      }
    } else {
      const depositDetail = {
        type: "depositDetails",
        paymentId: method?.paymentId,
        amount,
      };

      const res = await AxiosSecure.post(API.bankAccount, depositDetail);
      const data = res?.data;

      if (data?.success) {
        if (method?.type === "whatsapp") {
          window.location.href = data?.result?.link;
        } else {
          setDepositData(data?.result);
        }
      }
    }
  };

  return (
    <>
      <div _ngcontent-kdb-c159="" className="paymethod ng-tns-c159-13">
        <div _ngcontent-kdb-c159="" className="accountdetail ng-tns-c159-13">
          <p
            _ngcontent-kdb-c159=""
            className="make ng-tns-c159-13"
            style={{ marginBottom: "0.75rem", color: "black" }}
          >
            Payment Methods
          </p>

          {Array.isArray(depositMethods) &&
            depositMethods?.length > 0 &&
            depositMethods
              ?.sort((a, b) => a?.sort - b?.sort)
              ?.map((method) => {
                return (
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={(e) => handleVisibleBankMethod(e, method)}
                    key={method?.paymentId}
                    _ngcontent-kdb-c159=""
                    className="accountdetailss  bg-primary-light"
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                      className="payment_container"
                    >
                      <span>{method?.title?.toUpperCase()}</span>
                      {method?.type == "qr" && (
                        <FaQrcode size={20} color="gray" />
                      )}
                      {method?.type == "bank" && (
                        <CiBank size={20} color="gray" />
                      )}
                      {method?.type == "upi" || method?.type == "pg" ? (
                        <img
                          style={{ height: "20px", width: "20px" }}
                          src={images.upi}
                        />
                      ) : null}
                      {method?.type == "usdt" ? (
                        <img
                          style={{ height: "20px", width: "20px" }}
                          src={"/icon/trc20.svg"}
                        />
                      ) : null}
                      {method?.type == "usdt_bep20" ? (
                        <img
                          style={{ height: "20px", width: "20px" }}
                          src={"/icon/bep20.svg"}
                        />
                      ) : null}
                      {method?.type == "whatsapp" ? (
                        <img
                          style={{ height: "17px", width: "17px" }}
                          src={images.whatsapp}
                        />
                      ) : null}
                      {method?.type == "upigateway" ||
                      method?.type === "toitgateway" ||
                      method?.type === "i100gateway" ||
                      method?.type === "upiclick" ? (
                        <img
                          style={{ height: "25px", width: "25px" }}
                          src={images.bhim}
                        />
                      ) : null}
                    </div>
                  </div>
                );
              })}

          {isFetched && depositMethods?.length === 0 && (
            <h2>No payment method available right now.</h2>
          )}

          {/*    <!-- Add more divs as needed --> */}
        </div>
      </div>

      {tabs === "bank" && (
        <div _ngcontent-kdb-c159="" className="paymethod ng-tns-c159-13">
          <div _ngcontent-kdb-c159="" className="accountdetail ng-tns-c159-13">
            <p
              _ngcontent-kdb-c159=""
              className="make ng-tns-c159-13"
              style={{ marginBottom: "0.75rem", color: "black" }}
            >
              Use below details to make payment
            </p>
            <div
              _ngcontent-kdb-c159=""
              className="accountdetailss ng-tns-c159-13 ng-star-inserted"
            >
              <div _ngcontent-kdb-c159="" className="accountnum ng-tns-c159-13">
                <div
                  _ngcontent-kdb-c159=""
                  className="bankdetail ng-tns-c159-13"
                >
                  <img
                    _ngcontent-kdb-c159=""
                    loading="lazy"
                    src={images.contactOne}
                    alt=""
                    className="ng-tns-c159-13"
                  />
                </div>
                <div _ngcontent-kdb-c159="" className="banknum ng-tns-c159-13">
                  {" "}
                  Account Number{" "}
                  <div _ngcontent-kdb-c159="" className="icon ng-tns-c159-13">
                    <p
                      _ngcontent-kdb-c159=""
                      className="accnum account-number ng-tns-c159-13"
                    >
                      {depositData?.accountNumber}
                    </p>
                    <p
                      onClick={() =>
                        handleCopyToClipBoard(depositData?.accountNumber)
                      }
                      style={{ cursor: "pointer" }}
                      _ngcontent-kdb-c159=""
                      className="svg ng-tns-c159-13"
                    >
                      <img
                        _ngcontent-kdb-c159=""
                        loading="lazy"
                        src={images.cli}
                        alt=""
                        className="ng-tns-c159-13"
                      />
                    </p>
                  </div>
                </div>
              </div>
              <div _ngcontent-kdb-c159="" className="accountnum ng-tns-c159-13">
                <div
                  _ngcontent-kdb-c159=""
                  className="bankdetail ng-tns-c159-13"
                >
                  <img
                    _ngcontent-kdb-c159=""
                    loading="lazy"
                    src={images.contactTwo}
                    alt=""
                    className="ng-tns-c159-13"
                  />
                </div>
                <div _ngcontent-kdb-c159="" className="banknum ng-tns-c159-13">
                  {" "}
                  Account Name{" "}
                  <div _ngcontent-kdb-c159="" className="icon ng-tns-c159-13">
                    <p
                      _ngcontent-kdb-c159=""
                      className="accnum account-name ng-tns-c159-13"
                    >
                      {depositData?.accountName}
                    </p>
                    <p
                      onClick={() =>
                        handleCopyToClipBoard(depositData?.accountName)
                      }
                      style={{ cursor: "pointer" }}
                      _ngcontent-kdb-c159=""
                      className="svg ng-tns-c159-13"
                    >
                      <img
                        _ngcontent-kdb-c159=""
                        loading="lazy"
                        src={images.clipBoard}
                        alt=""
                        className="ng-tns-c159-13"
                      />
                    </p>
                  </div>
                </div>
              </div>
              <div _ngcontent-kdb-c159="" className="accountnum ng-tns-c159-13">
                <div
                  _ngcontent-kdb-c159=""
                  className="bankdetail ng-tns-c159-13"
                >
                  <img
                    _ngcontent-kdb-c159=""
                    loading="lazy"
                    src={images.codeBlock}
                    alt=""
                    className="ng-tns-c159-13"
                  />
                </div>
                <div _ngcontent-kdb-c159="" className="banknum ng-tns-c159-13">
                  {" "}
                  IFSC{" "}
                  <div _ngcontent-kdb-c159="" className="icon ng-tns-c159-13">
                    <p
                      _ngcontent-kdb-c159=""
                      className="accnum ifsc-code ng-tns-c159-13"
                    >
                      {depositData?.ifsc}
                    </p>
                    <p
                      onClick={() => handleCopyToClipBoard(depositData?.ifsc)}
                      style={{ cursor: "pointer" }}
                      _ngcontent-kdb-c159=""
                      className="svg ng-tns-c159-13"
                    >
                      <img
                        _ngcontent-kdb-c159=""
                        loading="lazy"
                        src={images.clipBoard}
                        alt=""
                        className="ng-tns-c159-13"
                      />
                    </p>
                  </div>
                </div>
              </div>
              <div _ngcontent-kdb-c159="" className="accountnum ng-tns-c159-13">
                <div
                  _ngcontent-kdb-c159=""
                  className="bankdetail ng-tns-c159-13"
                >
                  <img
                    _ngcontent-kdb-c159=""
                    loading="lazy"
                    src={images.institution}
                    alt=""
                    className="ng-tns-c159-13"
                  />
                </div>
                <div _ngcontent-kdb-c159="" className="banknum ng-tns-c159-13">
                  {" "}
                  Bank Name{" "}
                  <div _ngcontent-kdb-c159="" className="icon ng-tns-c159-13">
                    <p
                      _ngcontent-kdb-c159=""
                      className="accnum bank-name ng-tns-c159-13"
                    >
                      {depositData?.bankName}
                    </p>
                    <p
                      onClick={() =>
                        handleCopyToClipBoard(depositData?.bankName)
                      }
                      style={{ cursor: "pointer" }}
                      _ngcontent-kdb-c159=""
                      className="svg ng-tns-c159-13"
                    >
                      <img
                        _ngcontent-kdb-c159=""
                        loading="lazy"
                        src={images.clipBoard}
                        alt=""
                        className="ng-tns-c159-13"
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              onClick={() => {
                setPaymentMethods(false);
                setUploadTransaction(true);
              }}
              _ngcontent-kdb-c159=""
              className="makepayment ng-tns-c159-13"
              style={{ marginTop: "10px" }}
            >
              <div _ngcontent-kdb-c159="" className="madepay ng-tns-c159-13">
                <button _ngcontent-kdb-c159="" className="ng-tns-c159-13">
                  I have Made The Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {tabs === "upi" && (
        <div _ngcontent-kdb-c159="" className="paymethod ng-tns-c159-13">
          <div _ngcontent-kdb-c159="" className="accountdetail ng-tns-c159-13">
            <p
              _ngcontent-kdb-c159=""
              className="make ng-tns-c159-13"
              style={{ marginBottom: "0.75rem", color: "black" }}
            >
              Use below details to make payment
            </p>
            <div
              _ngcontent-kdb-c159=""
              className="accountdetailss ng-tns-c159-13 ng-star-inserted"
            >
              {/* <div _ngcontent-kdb-c159="" className="accountnum ng-tns-c159-13">
                <div
                  _ngcontent-kdb-c159=""
                  className="bankdetail ng-tns-c159-13"
                >
                  <img
                    _ngcontent-kdb-c159=""
                    loading="lazy"
                    src={images.contactOne}
                    alt=""
                    className="ng-tns-c159-13"
                  />
                </div>
                <div _ngcontent-kdb-c159="" className="banknum ng-tns-c159-13">
                  {" "}
                  Account Number{" "}
                  <div _ngcontent-kdb-c159="" className="icon ng-tns-c159-13">
                    <p
                      _ngcontent-kdb-c159=""
                      className="accnum account-number ng-tns-c159-13"
                    >
                      {depositData?.accountNumber}
                    </p>
                    <p
                      onClick={() =>
                        handleCopyToClipBoard(depositData?.accountNumber)
                      }
                      style={{ cursor: "pointer" }}
                      _ngcontent-kdb-c159=""
                      className="svg ng-tns-c159-13"
                    >
                      <img
                        _ngcontent-kdb-c159=""
                        loading="lazy"
                        src={images.clipBoard}
                        alt=""
                        className="ng-tns-c159-13"
                      />
                    </p>
                  </div>
                </div>
              </div> */}
              <div _ngcontent-kdb-c159="" className="accountnum ng-tns-c159-13">
                <div
                  _ngcontent-kdb-c159=""
                  className="bankdetail ng-tns-c159-13"
                >
                  <img
                    _ngcontent-kdb-c159=""
                    loading="lazy"
                    src={images.contactTwo}
                    alt=""
                    className="ng-tns-c159-13"
                  />
                </div>
                <div _ngcontent-kdb-c159="" className="banknum ng-tns-c159-13">
                  {" "}
                  Display Name{" "}
                  <div _ngcontent-kdb-c159="" className="icon ng-tns-c159-13">
                    <p
                      _ngcontent-kdb-c159=""
                      className="accnum account-name ng-tns-c159-13"
                    >
                      {depositData?.upiAccountName}
                    </p>
                    <p
                      onClick={() =>
                        handleCopyToClipBoard(depositData?.upiAccountName)
                      }
                      style={{ cursor: "pointer" }}
                      _ngcontent-kdb-c159=""
                      className="svg ng-tns-c159-13"
                    >
                      <img
                        _ngcontent-kdb-c159=""
                        loading="lazy"
                        src={images.clipBoard}
                        alt=""
                        className="ng-tns-c159-13"
                      />
                    </p>
                  </div>
                </div>
              </div>
              <div _ngcontent-kdb-c159="" className="accountnum ng-tns-c159-13">
                <div
                  _ngcontent-kdb-c159=""
                  className="bankdetail ng-tns-c159-13"
                >
                  <img
                    _ngcontent-kdb-c159=""
                    loading="lazy"
                    src={images.codeBlock}
                    alt=""
                    className="ng-tns-c159-13"
                  />
                </div>
                <div _ngcontent-kdb-c159="" className="banknum ng-tns-c159-13">
                  {" "}
                  UPI Details
                  <div _ngcontent-kdb-c159="" className="icon ng-tns-c159-13">
                    <p
                      _ngcontent-kdb-c159=""
                      className="accnum ifsc-code ng-tns-c159-13"
                    >
                      {depositData?.upiId}
                    </p>
                    <p
                      onClick={() => handleCopyToClipBoard(depositData?.upiId)}
                      style={{ cursor: "pointer" }}
                      _ngcontent-kdb-c159=""
                      className="svg ng-tns-c159-13"
                    >
                      <img
                        _ngcontent-kdb-c159=""
                        loading="lazy"
                        src={images.clipBoard}
                        alt=""
                        className="ng-tns-c159-13"
                      />
                    </p>
                  </div>
                </div>
              </div>
              {/* <div _ngcontent-kdb-c159="" className="accountnum ng-tns-c159-13">
                <div
                  _ngcontent-kdb-c159=""
                  className="bankdetail ng-tns-c159-13"
                >
                  <img
                    _ngcontent-kdb-c159=""
                    loading="lazy"
                    src={institution}
                    alt=""
                    className="ng-tns-c159-13"
                  />
                </div>
                <div _ngcontent-kdb-c159="" className="banknum ng-tns-c159-13">
                  {" "}
                  Bank Name{" "}
                  <div _ngcontent-kdb-c159="" className="icon ng-tns-c159-13">
                    <p
                      _ngcontent-kdb-c159=""
                      className="accnum bank-name ng-tns-c159-13"
                    >
                      {depositData?.bankName}
                    </p>
                    <p
                      onClick={() =>
                        handleCopyToClipBoard(depositData?.bankName)
                      }
                      style={{ cursor: "pointer" }}
                      _ngcontent-kdb-c159=""
                      className="svg ng-tns-c159-13"
                    >
                      <img
                        _ngcontent-kdb-c159=""
                        loading="lazy"
                        src={images.clipBoard}
                        alt=""
                        className="ng-tns-c159-13"
                      />
                    </p>
                  </div>
                </div>
              </div> */}
            </div>
            <div
              onClick={() => {
                setPaymentMethods(false);
                setUploadTransaction(true);
              }}
              _ngcontent-kdb-c159=""
              className="makepayment ng-tns-c159-13"
              style={{ marginTop: "10px" }}
            >
              <div _ngcontent-kdb-c159="" className="madepay ng-tns-c159-13">
                <button _ngcontent-kdb-c159="" className="ng-tns-c159-13">
                  I have Made The Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {tabs === "qr" && (
        <div _ngcontent-kdb-c159="" className="paymethod ng-tns-c159-13">
          <div _ngcontent-kdb-c159="" className="accountdetail ng-tns-c159-13">
            <p
              _ngcontent-kdb-c159=""
              className="make ng-tns-c159-13"
              style={{
                marginBottom: "0.75rem",
                marginLeft: "10px",
                color: "black",
              }}
            >
              QR code for payment
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              _ngcontent-kdb-c159=""
              className="accountdetailss ng-tns-c159-13 ng-star-inserted"
            >
              <div
                _ngcontent-kdb-c159=""
                className="accountnum ng-tns-c159-13"
                style={{ width: "100%", justifyContent: "center" }}
              >
                <div
                  style={{
                    border: "3px solid #f2f2f2",
                    padding: "3px",
                    borderRadius: "4px",
                  }}
                  _ngcontent-kdb-c159=""
                  className="ng-tns-c159-13"
                >
                  <img
                    style={{ height: "250px", borderRadius: "4px" }}
                    _ngcontent-kdb-c159=""
                    loading="lazy"
                    src={depositData?.qrCodeLink}
                    alt=""
                    className="ng-tns-c159-13"
                  />
                </div>
                {depositData?.qrDisplayName && (
                  <div
                    _ngcontent-kdb-c159=""
                    className="banknum ng-tns-c159-13"
                  >
                    <span
                      style={{
                        display: "flex",
                        gap: "7px",
                        alignItems: "center",
                      }}
                    >
                      <img
                        _ngcontent-kdb-c159=""
                        loading="lazy"
                        src={images.contactOne}
                        alt=""
                        className="ng-tns-c159-13"
                      />{" "}
                      <span> Display Name </span>
                    </span>
                    <div _ngcontent-kdb-c159="" className="icon ng-tns-c159-13">
                      <p
                        _ngcontent-kdb-c159=""
                        className="accnum account-name ng-tns-c159-13"
                      >
                        {depositData?.qrDisplayName}
                      </p>
                      <p
                        onClick={() =>
                          handleCopyToClipBoard(depositData?.qrDisplayName)
                        }
                        style={{ cursor: "pointer" }}
                        _ngcontent-kdb-c159=""
                        className="svg ng-tns-c159-13"
                      >
                        <img
                          _ngcontent-kdb-c159=""
                          loading="lazy"
                          src={images.clipBoard}
                          alt=""
                          className="ng-tns-c159-13"
                        />
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div
              onClick={() => {
                setPaymentMethods(false);
                setUploadTransaction(true);
              }}
              _ngcontent-kdb-c159=""
              className="makepayment ng-tns-c159-13"
              style={{ margin: "10px" }}
            >
              <div _ngcontent-kdb-c159="" className="madepay ng-tns-c159-13">
                <button _ngcontent-kdb-c159="" className="ng-tns-c159-13">
                  I have Made The Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {tabs === "usdt" || tabs === "usdt_bep20" ? (
        <div _ngcontent-kdb-c159="" className="paymethod ng-tns-c159-13">
          <div _ngcontent-kdb-c159="" className="accountdetail ng-tns-c159-13">
            <div _ngcontent-kdb-c159="" className="paymethod ng-tns-c159-13">
              <div
                _ngcontent-kdb-c159=""
                className="accountdetail ng-tns-c159-13"
              >
                <p
                  _ngcontent-kdb-c159=""
                  className="make ng-tns-c159-13"
                  style={{ marginBottom: "0.75rem", color: "black" }}
                >
                  Use below details to make payment
                </p>
                <div
                  style={{ margin: "0px" }}
                  _ngcontent-kdb-c159=""
                  className="accountdetailss ng-tns-c159-13 ng-star-inserted"
                >
                  <div
                    _ngcontent-kdb-c159=""
                    className="accountnum ng-tns-c159-13"
                  >
                    <div
                      _ngcontent-kdb-c159=""
                      className="bankdetail ng-tns-c159-13"
                    >
                      <img
                        _ngcontent-kdb-c159=""
                        loading="lazy"
                        src={images.contactTwo}
                        alt=""
                        className="ng-tns-c159-13"
                      />
                    </div>
                    <div
                      _ngcontent-kdb-c159=""
                      className="banknum ng-tns-c159-13"
                    >
                      {" "}
                      Wallet Address
                      <div
                        _ngcontent-kdb-c159=""
                        className="icon ng-tns-c159-13"
                      >
                        <p
                          _ngcontent-kdb-c159=""
                          className="accnum account-name ng-tns-c159-13"
                        >
                          {depositData?.token}
                        </p>
                        <p
                          onClick={() =>
                            handleCopyToClipBoard(depositData?.token)
                          }
                          style={{ cursor: "pointer" }}
                          _ngcontent-kdb-c159=""
                          className="svg ng-tns-c159-13"
                        >
                          <img
                            _ngcontent-kdb-c159=""
                            loading="lazy"
                            src={images.clipBoard}
                            alt=""
                            className="ng-tns-c159-13"
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    _ngcontent-kdb-c159=""
                    className="accountnum ng-tns-c159-13"
                  >
                    <div
                      _ngcontent-kdb-c159=""
                      className="bankdetail ng-tns-c159-13"
                    >
                      <img
                        _ngcontent-kdb-c159=""
                        loading="lazy"
                        src={images.contactTwo}
                        alt=""
                        className="ng-tns-c159-13"
                      />
                    </div>
                    <div
                      _ngcontent-kdb-c159=""
                      className="banknum ng-tns-c159-13"
                    >
                      {" "}
                      Amount
                      <div
                        _ngcontent-kdb-c159=""
                        className="icon ng-tns-c159-13"
                      >
                        <p
                          _ngcontent-kdb-c159=""
                          className="accnum account-name ng-tns-c159-13"
                        >
                          USDT {depositData?.depositAmount}
                        </p>
                        <p
                          onClick={() =>
                            handleCopyToClipBoard(
                              depositData?.depositAmount?.toString(),
                            )
                          }
                          style={{ cursor: "pointer" }}
                          _ngcontent-kdb-c159=""
                          className="svg ng-tns-c159-13"
                        >
                          <img
                            _ngcontent-kdb-c159=""
                            loading="lazy"
                            src={images.clipBoard}
                            alt=""
                            className="ng-tns-c159-13"
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p
              _ngcontent-kdb-c159=""
              className="make ng-tns-c159-13"
              style={{
                marginBottom: "0.75rem",
                marginLeft: "10px",
                color: "black",
              }}
            >
              QR code for payment
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              _ngcontent-kdb-c159=""
              className="accountdetailss ng-tns-c159-13 ng-star-inserted"
            >
              <div
                _ngcontent-kdb-c159=""
                className="accountnum ng-tns-c159-13"
                style={{ width: "100%", justifyContent: "center" }}
              >
                <div
                  style={{
                    border: "3px solid #f2f2f2",
                    padding: "3px",
                    borderRadius: "4px",
                  }}
                  _ngcontent-kdb-c159=""
                  className="ng-tns-c159-13"
                >
                  <img
                    style={{ height: "250px", borderRadius: "4px" }}
                    _ngcontent-kdb-c159=""
                    loading="lazy"
                    src={depositData?.qrCodeLink}
                    alt=""
                    className="ng-tns-c159-13"
                  />
                </div>
              </div>
            </div>

            <div
              onClick={() => {
                setPaymentMethods(false);
                setUploadTransaction(true);
              }}
              _ngcontent-kdb-c159=""
              className="makepayment ng-tns-c159-13"
              style={{ margin: "10px" }}
            >
              <div _ngcontent-kdb-c159="" className="madepay ng-tns-c159-13">
                <button _ngcontent-kdb-c159="" className="ng-tns-c159-13">
                  I have Made The Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {/* {tabs === "pg" && qrcode && isDesktop && (
        <div _ngcontent-kdb-c159="" className="paymethod ng-tns-c159-13">
          <div _ngcontent-kdb-c159="" className="accountdetail ng-tns-c159-13">
            <p
              _ngcontent-kdb-c159=""
              className="make ng-tns-c159-13"
              style={{
                marginBottom: "0.75rem",
                marginLeft: "10px",
                color: "black",
              }}
            >
              QR code for payment
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              _ngcontent-kdb-c159=""
              className="accountdetailss ng-tns-c159-13 ng-star-inserted"
            >
              <div
                _ngcontent-kdb-c159=""
                className="accountnum ng-tns-c159-13"
                style={{ width: "100%", justifyContent: "center" }}
              >
                <div
                  style={{
                    border: "3px solid #f2f2f2",
                    padding: "3px",
                    borderRadius: "4px",
                  }}
                  _ngcontent-kdb-c159=""
                  className="ng-tns-c159-13"
                >
             
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p style={{ fontSize: "12px" }}>
                  Scan to pay with any UPI app.
                </p>
                <p
                  style={{
                    paddingTop: "8px",
                    paddingBottom: "8px",
                    fontSize: "12px",
                  }}
                >
                  checking payment status..
                  <span style={{ color: "green" }}>{formatTime(time)}</span>
                </p>
                {time && (
                  <ProgressBar
                    visible={true}
                    height="40"
                    width="40"
                    borderColor="#5c2092"
                    barColor="#873de4"
                    ariaLabel="progress-bar-loading"
                    wrapperStyle={{}}
                    wrapperClass="progress-bar-loading"
                  />
                )}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <img style={{ height: "40px" }} src={images.phonpe} alt="" />
                  <img style={{ height: "40px" }} src={images.paytm} alt="" />
                  <img style={{ height: "40px" }} src={images.gpay} alt="" />
                  <img style={{ height: "40px" }} src={images.bhim} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )} */}
      {/* {tabs === "pg" && qrcode && isAndroid && (
        <div _ngcontent-kdb-c159="" className="paymethod ng-tns-c159-13">
          <div _ngcontent-kdb-c159="" className="accountdetail ng-tns-c159-13">
            <p
              _ngcontent-kdb-c159=""
              className="make ng-tns-c159-13"
              style={{
                marginBottom: "0.75rem",
                marginLeft: "10px",
                color: "black",
              }}
            >
              QR code for payment
            </p>
            {pgPaymentMethods?.upi && (
              <div
                onClick={() => navigatePGLink(pgPaymentMethods?.upi)}
                style={{ cursor: "pointer" }}
                _ngcontent-kdb-c159=""
                className="accountdetailss  "
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                  className="payment_container"
                >
                  <span>Instant UPI</span>

                  <img
                    style={{ height: "20px", width: "20px" }}
                    src={images.upi}
                  />
                </div>
              </div>
            )}
            {pgPaymentMethods?.gpay && (
              <div
                onClick={() => navigatePGLink(pgPaymentMethods?.gpay)}
                style={{ cursor: "pointer" }}
                _ngcontent-kdb-c159=""
                className="accountdetailss  "
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                  className="payment_container"
                >
                  <span>Instant Google Pay</span>

                  <img
                    style={{ height: "20px", width: "20px" }}
                    src={images.gpay}
                  />
                </div>
              </div>
            )}
            {pgPaymentMethods?.paytm && (
              <div
                onClick={() => navigatePGLink(pgPaymentMethods?.paytm)}
                style={{ cursor: "pointer" }}
                _ngcontent-kdb-c159=""
                className="accountdetailss  "
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                  className="payment_container"
                >
                  <span>Instant Paytm</span>

                  <img
                    style={{ height: "20px", width: "20px" }}
                    src={images.paytm}
                  />
                </div>
              </div>
            )}
            {pgPaymentMethods?.phonepe && (
              <div
                onClick={() => navigatePGLink(pgPaymentMethods?.phonepe)}
                style={{ cursor: "pointer" }}
                _ngcontent-kdb-c159=""
                className="accountdetailss  "
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                  className="payment_container"
                >
                  <span>Instant Phone Pe</span>

                  <img
                    style={{ height: "20px", width: "20px" }}
                    src={images.phonpe}
                  />
                </div>
              </div>
            )}
           
          </div>
        </div>
      )} */}
    </>
  );
};

export default PaymentMethods;
