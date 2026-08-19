import { useSelector } from "react-redux";
import BetSLip from "./BetSLip";
import OpenBets from "./OpenBets";
import { useVideoMutation } from "../../../redux/features/events/events";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Settings } from "../../../api";
import useLanguage from "../../../hooks/use-language";
import { LanguageKey } from "../../../const";

const RightSidebar = ({ data }) => {
  const { getLanguage } = useLanguage();
  const { eventTypeId, eventId } = useParams();
  const [sportsVideo, { data: iframe }] = useVideoMutation();
  const { placeBetValues } = useSelector((state) => state.event);

  useEffect(() => {
    const handleGetVideo = async () => {
      const payload = {
        eventTypeId: eventTypeId,
        eventId: eventId,
        type: "video",
        casinoCurrency: Settings.casino_currency,
      };
      await sportsVideo(payload).unwrap();
    };
    handleGetVideo();
  }, []);
  return (
    <div className="dtl_second">
      {iframe?.result?.url && data?.score?.hasVideo && (
        <div className="live_streaming">
          <h4>{getLanguage(LanguageKey.LIVE_STREAM)}</h4>
          <div
            id="collapseBasic"
            aria-hidden="true"
            className="collapse show"
            // style={{ display: "none" }}
          >
            <iframe
              id="tvStr"
              className="embed-responsive-item w-100"
              src={iframe?.result?.url}
            />
          </div>
        </div>
      )}

      <div className="bet_placing">
        <h4>{getLanguage(LanguageKey.PLACE_BET)}</h4>
        {placeBetValues && <BetSLip />}
      </div>
      <div className="open_bets">
        <h4>{getLanguage(LanguageKey.OPEN_BETS)}</h4>
        <OpenBets />
      </div>
    </div>
  );
};

export default RightSidebar;
