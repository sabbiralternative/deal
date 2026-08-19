import { Fragment, useState } from "react";
import HowToGetBonus from "../../components/modals/Affiliate/HowToGetBonus";
import CommissionInfo from "../../components/modals/Affiliate/CommissionInfo";
import images from "../../assets/images";
import useLanguage from "../../hooks/use-language";
import { LanguageKey } from "../../const";

const BonusInformation = () => {
  const { getLanguage } = useLanguage();
  const [openGetBonusModal, setOpenGetBonusModal] = useState(false);
  const [openCommissionModal, setOpenCommissionModal] = useState(false);
  return (
    <Fragment>
      {openGetBonusModal && (
        <HowToGetBonus setOpenGetBonusModal={setOpenGetBonusModal} />
      )}
      {openCommissionModal && (
        <CommissionInfo setOpenCommissionModal={setOpenCommissionModal} />
      )}
      <div className="nw-affi-how-to-get-bonus" data-v-4c49d924>
        <img
          src={images.elipBg}
          alt="ellip-bg"
          className="ellip-bg-img"
          data-v-4c49d924
        />
        <div className="nw-affi-heading-flex" data-v-4c49d924>
          <h3
            style={{ margin: "0px" }}
            className="nw-affi-heading-text"
            data-v-4c49d924
          >
            {getLanguage(LanguageKey.BONUS_INFORMATION)}
          </h3>
        </div>
        <div className="nw-affi-how-to-get-bonus-content" data-v-4c49d924>
          <div
            onClick={() => setOpenGetBonusModal(true)}
            className="nw-affi-how-to-get-bonus-content-sec"
            data-bs-target="#affihowtogetbonus"
            data-bs-toggle="modal"
            data-v-4c49d924
          >
            <img src={images.affiBonus1} alt="affi-bonus-1" data-v-4c49d924 />
            <p data-v-4c49d924>{getLanguage(LanguageKey.HOW_TO_GET_BONUS)}?</p>
          </div>
          <div
            onClick={() => setOpenCommissionModal(true)}
            className="nw-affi-how-to-get-bonus-content-sec"
            data-bs-target="#afficomhowtogetbonus"
            data-bs-toggle="modal"
            data-v-4c49d924
          >
            <img src={images.affiBonus2} alt="affi-bonus-2" data-v-4c49d924 />
            <p data-v-4c49d924>{getLanguage(LanguageKey.COMMISSION_INFO)}</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BonusInformation;
