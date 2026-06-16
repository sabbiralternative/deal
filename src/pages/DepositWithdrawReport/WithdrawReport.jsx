import { useEffect, useState } from "react";
import ImageModal from "./ImageModal";
import { RxCrossCircled } from "react-icons/rx";
import { MdOutlinePendingActions } from "react-icons/md";
import { useAccountStatement } from "../../hooks/accountStatement";
import Complaint from "../../components/modals/Complaint/Complaint";
import { Settings } from "../../api";
import toast from "react-hot-toast";
import { useBankAccountMutation } from "../../redux/features/deposit/deposit.api";

const WithdrawReport = () => {
  const [deleteWithdraw] = useBankAccountMutation();
  const [complaintId, setComplaintId] = useState(null);
  const fromDate = new Date(new Date().setDate(new Date().getDate() - 7))
    .toISOString()
    .split("T")[0];

  const toDate = new Date().toISOString().split("T")[0];
  const payload = {
    from: fromDate,
    to: toDate,
    type: "WITHDRAW",
    status: "ALL",
  };
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState("");
  const { data: withdrawStatement, refetch } = useAccountStatement(payload);
  const [category, setCategory] = useState();

  useEffect(() => {
    if (withdrawStatement?.length > 0) {
      const categories = Array.from(
        new Set(withdrawStatement?.map((item) => item?.date?.split(" ")?.[0])),
      );
      setCategory(categories);
    }
  }, [withdrawStatement]);

  const handleDeleteWithdraw = async (withdraw_id) => {
    const payload = {
      type: "withdrawDelete",
      withdraw_id,
    };
    const res = await deleteWithdraw(payload).unwrap();

    if (res?.success) {
      refetch();
      toast.success(res?.result?.message);
    } else {
      toast.error(res?.error?.errorMessage);
    }
  };

  return (
    <>
      {complaintId && (
        <Complaint
          setComplaintId={setComplaintId}
          complaintId={complaintId}
          method="withdraw"
        />
      )}
      {showModal && image && (
        <ImageModal setShowModal={setShowModal} image={image} />
      )}
      <div className="main-content  ">
        {withdrawStatement?.length > 0 ? (
          category?.map((category, i) => {
            return (
              <div key={i}>
                <span className="date-separator  "> {category}</span>
                {withdrawStatement
                  ?.filter((item) => item?.date?.split(" ")?.[0] === category)
                  ?.map((data, i) => {
                    return (
                      <div
                        // onClick={() => {
                        //   navigate(
                        //     `/deposit-withdraw-report/${data?.referenceNo}`
                        //   );
                        // }}
                        key={i}
                        className="card-deposit  "
                      >
                        <div
                          className="logo"
                          onClick={() => {
                            setImage("");
                            setShowModal(true);
                            setImage(data?.image);
                          }}
                          style={{ marginLeft: "0px" }}
                        >
                          {data?.image && (
                            <img
                              style={{ height: "30px", objectFit: "contain" }}
                              src={data?.image}
                              alt="logo"
                              className="bank-logo  "
                            />
                          )}
                        </div>
                        <div className="card-content bg-primary-light">
                          <div className="top-content ">
                            <div className="left-top-text ">
                              <span className="">{data?.referenceNo}</span>
                              <span className="status  status-aproved">
                                {data?.status === "APPROVED" && (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="10"
                                    height="10"
                                    viewBox="0 0 10 10"
                                    fill="none"
                                    className=" "
                                  >
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M5 10C2.23858 10 0 7.76142 0 5C0 2.23858 2.23858 0 5 0C7.76142 0 10 2.23858 10 5C10 7.76142 7.76142 10 5 10ZM0.78125 5C0.78125 7.32995 2.67005 9.21875 5 9.21875C7.32995 9.21875 9.21875 7.32995 9.21875 5C9.21875 2.67005 7.32995 0.78125 5 0.78125C2.67005 0.78125 0.78125 2.67005 0.78125 5ZM4.58968 6.58651C4.43713 6.73906 4.1898 6.73906 4.03725 6.58651L2.78973 5.33901C2.63718 5.18647 2.63718 4.93914 2.78973 4.78659C2.94228 4.63404 3.1896 4.63403 3.34215 4.78658L4.31346 5.75787L6.65784 3.4135C6.81038 3.26095 7.05771 3.26095 7.21026 3.4135C7.36281 3.56605 7.36281 3.81338 7.21026 3.96592L4.58968 6.58651Z"
                                      fill="#17C964"
                                      className=""
                                    ></path>
                                  </svg>
                                )}
                                {data?.status === "REJECTED" && (
                                  <RxCrossCircled color="red" />
                                )}
                                {data?.status === "PENDING" && (
                                  <MdOutlinePendingActions color="yellowgreen" />
                                )}

                                <span
                                  className={`status-text ${
                                    data?.status === "APPROVED"
                                      ? "status-text-approved"
                                      : ""
                                  } ${
                                    data?.status === "REJECTED"
                                      ? "status-text-rejected"
                                      : ""
                                  } ${
                                    data?.status === "PENDING"
                                      ? "status-text-pending"
                                      : ""
                                  }`}
                                >
                                  {data?.status}
                                </span>
                              </span>
                            </div>
                            <span className="right-top-amount  right-top-amount-approved">
                              ₹ {data?.amount}{" "}
                            </span>
                          </div>
                          <div className="bottom-content ">
                            <span className="left-bottom-id ">
                              {" "}
                              <span> {data?.remark} </span>
                              <span className="">{data?.date}</span>
                            </span>

                            <div style={{ display: "flex", gap: "5px" }}>
                              {data.status === "PENDING" &&
                                data?.reject_request === 0 && (
                                  <button
                                    style={{
                                      backgroundColor: "rgb(255 131 46)",
                                      borderRadius: "5px",
                                      fontSize: "12px",
                                    }}
                                    onClick={() =>
                                      handleDeleteWithdraw(data?.withdraw_id)
                                    }
                                    className="px-2 py-1  text-white   "
                                  >
                                    Cancel Withdraw
                                  </button>
                                )}

                              {data.status === "PENDING" &&
                                data?.reject_request === 1 && (
                                  <p className="px-2 py-1  text-black   ">
                                    Withdraw delete request sent.
                                  </p>
                                )}
                              {Settings.complaint && (
                                <button
                                  style={{
                                    backgroundColor: "rgb(255 131 46)",
                                    borderRadius: "5px",
                                    fontSize: "12px",
                                  }}
                                  onClick={() =>
                                    setComplaintId(data?.referenceNo)
                                  }
                                  className="px-2 py-1  text-white   "
                                >
                                  Report Issue
                                </button>
                              )}
                            </div>

                            {/* <span className="right-bottom-date ">
                              {" "}
                              {data?.date}{" "}
                            </span> */}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })
        ) : (
          <div className="no-data ng-star-inserted ">
            <p>No transaction yet!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default WithdrawReport;
