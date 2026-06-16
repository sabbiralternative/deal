import { useRef } from "react";
import useCloseModalClickOutside from "../../../hooks/closeModal";

/* eslint-disable react/no-unescaped-entities */
const KYC = ({ closeModal }) => {
  const ref = useRef();
  useCloseModalClickOutside(ref, () => {
    closeModal();
  });
  return (
    <div className="rules-wrap">
      <div
        className="modal fade show"
        id="kycModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-modal="true"
        role="dialog"
        style={{ display: "block" }}
      >
        <div className="modal-dialog">
          <div className="modal-content" ref={ref}>
            <div className="modal-body">
              <div className="rules-content-wrapper menu-details-list">
                <div className="rules-wrap-cmn-h exchange-rule-h">
                  <h3>KNOW YOUR CUSTOMER POLICY</h3>
                </div>
                <div className="rules-wrap-content">
                  <p>
                    To maintain the highest level of security, we require all
                    our members to provide us with certain documentation in
                    order to validate their accounts.
                  </p>
                  <p>
                    Please note that the identification procedures shall be done
                    before a cardholder starts operating and using services of
                    our merchants.
                  </p>
                </div>
                <div className="rules-wrap-cmn-h exchange-rule-h">
                  <h3>Why do I need to provide documentation?</h3>
                </div>
                <div className="rules-wrap-content">
                  <p>There are several reasons:</p>
                  <p>
                    We are committed to providing a socially responsible
                    platform for online gaming. All of our members must be 18 or
                    older and we are bound by our licensing agreement to verify
                    this.
                  </p>
                  <p>
                    Secondly, as a respected online and global company it is in
                    our interests to guarantee maximum security on all
                    transactions.
                  </p>
                  <p>
                    {" "}
                    Thirdly, our payment processors require that our policies
                    are in line with international banking standards. A proven
                    business relationship with each and every member is
                    mandatory for the protection of all parties. Our licensing
                    agreement also obliges us to comply with this.{" "}
                  </p>
                  <p>
                    {" "}
                    Finally, by ensuring that your account details are
                    absolutely correct, the inconvenience of 'missing payments'
                    can be avoided. It can take weeks (and sometimes months) to
                    trace, recall and resend using the correct information. This
                    lengthy process also results in additional fees from our
                    processors.{" "}
                  </p>
                </div>
                <div className="rules-wrap-cmn-h exchange-rule-h">
                  <h3>WHAT DOCUMENTS DO I NEED TO PROVIDE?</h3>
                </div>
                <div className="rules-wrap-content">
                  <p>PROOF OF ID:</p>
                  <p>
                    A color copy of a valid government issued form of ID
                    (Driver's License, Passport, State ID or Military ID)
                  </p>
                </div>
                <div className="rules-wrap-cmn-h exchange-rule-h">
                  <h3>PROOF OF ADDRESS:</h3>
                </div>
                <div className="rules-wrap-content">
                  <p>A copy of a recent utility bill showing your address</p>
                  <p>
                    Note: If your government Id shows your address, you do not
                    need to provide further proof of address.
                  </p>
                  <p>
                    Additional documentation might be required depending on the
                    withdrawal method you choose{" "}
                  </p>
                  <h3>When do I need to provide these documents?</h3>
                  <p>
                    {" "}
                    We greatly appreciate your cooperation in providing these at
                    your earliest possible convenience to avoid any delays in
                    processing your transactions. We must be in receipt of the
                    documents before any cash transactions can be sent back to
                    you. Under special circumstances we may require the
                    documents before further activity (deposits and wagering)
                    can take place on your account{" "}
                  </p>
                  <p>
                    Please understand, if we do not have the required documents
                    on file, your pending withdrawals will be cancelled and
                    credited back to your account. You will be notified when
                    this happens via the notification system.
                  </p>
                </div>
                <div className="rules-wrap-cmn-h exchange-rule-h">
                  <h3>How can I send you these documents?</h3>
                </div>
                <div className="rules-wrap-content">
                  <p>
                    Please scan your documents, or take a high quality digital
                    camera picture, save the images as jpegs, then upload the
                    files using our secure form{" "}
                    <a href="https://WWW.GOOGLE.COM">here</a>.
                  </p>
                </div>
                <div className="rules-wrap-cmn-h exchange-rule-h">
                  <h3>How do I know my documents are safe with you?</h3>
                </div>
                <div className="rules-wrap-content">
                  <p>
                    {" "}
                    The security of your documentation is of paramount
                    importance. All files are protected with the highest level
                    of encryption at every step of the review process. All
                    documentation received is treated with the utmost respect
                    and confidentiality.{" "}
                  </p>
                  <p>
                    {" "}
                    We’d like to thank you for your cooperation in helping us
                    make OUR EXCHANGE&nbsp;a safer place to play. As always, if
                    you have any questions about this policy, or anything else,
                    don’t hesitate to contact us using the contact us links on
                    this page.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="modal-footer btn-wrap break">
              <button
                onClick={closeModal}
                type="button"
                data-bs-dismiss="modal"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYC;
