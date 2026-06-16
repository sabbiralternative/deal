import { Fragment, useState } from "react";

import useWhatsApp from "../../hooks/whatsapp";
import AddNewUser from "../../components/modals/Affiliate/AddNewUser";
import { handleCopyToClipBoard } from "../../utils/handleCopyToClipBoard";
import { getSiteURL } from "../../utils/getSiteURL";
import images from "../../assets/images";
import { useIndexQuery } from "../../hooks";

const InviteSection = () => {
  const [showAddNewUserModal, setShowAddNewUserModal] = useState(false);

  let payload = { type: "get_referral_code" };
  const { siteURL } = getSiteURL();
  if (siteURL) {
    payload.site = siteURL;
  }
  const { data } = useIndexQuery(payload);
  const { data: socialLink } = useWhatsApp();

  return (
    <Fragment>
      {showAddNewUserModal && (
        <AddNewUser setShowAddNewUserModal={setShowAddNewUserModal} />
      )}
      <div
        data-v-4c49d924
        className="nw-affi-invite-sec"
        style={{ marginBottom: "20px" }}
      >
        <div className="nw-affi-invite-content-wrapper" data-v-4c49d924>
          <div className="nw-affi-invite-content" data-v-4c49d924>
            <h2 data-v-4c49d924>Invite your friends</h2>
            <p data-v-4c49d924>to join and you can receive huge bonuses</p>
          </div>
          <div className="nw-affi-invite-img" data-v-4c49d924>
            <img
              src={images.affiInvite}
              alt="affi-invite-img"
              data-v-4c49d924
            />
          </div>
        </div>
        {socialLink?.referral_create_account && (
          <div className="nw-affi-add-new-user-btn-sec" data-v-4c49d924>
            <button
              onClick={() => setShowAddNewUserModal(true)}
              className="nw-affi-add-new-user-btn"
              data-bs-target="#AfAddNewUser"
              data-bs-toggle="modal"
              data-v-4c49d924
            >
              <span data-v-4c49d924>
                <img
                  style={{ height: "20px", width: "20px" }}
                  src={images.affiAddUser}
                  alt="affi-add-user"
                  data-v-4c49d924
                />{" "}
                ADD NEW USER
              </span>
            </button>
          </div>
        )}

        <div data-v-4c49d924 className="nw-affi-qr-invite-wrapper">
          <div data-v-4c49d924 className="nw-affi-qr-invite-code">
            <div data-v-4c49d924 className="nw-affi-qr-invite-heading">
              <img
                data-v-4c49d924
                src={images.affiInviteGift}
                alt="invite-gift"
              />
              <h3 data-v-4c49d924>Invitation Code</h3>
            </div>
            <div data-v-4c49d924 className="nw-affi-share-link-sec">
              <span data-v-4c49d924>{data?.result?.link}</span>
              <button
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "0px",
                  background: "transparent",
                }}
                onClick={() => handleCopyToClipBoard(data?.result?.text)}
                data-v-4c49d924
                className="thm-but thm-bdr-btn affi-cancel-btn affi-yellow-btn"
              >
                <img data-v-4c49d924 src={images.affiCopy} alt="affi-copy" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default InviteSection;
