import { useSelector } from "react-redux";
import BetSLip from "./BetSLip";
import OpenBets from "./OpenBets";
import { useVideoMutation } from "../../../redux/features/events/events";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Settings } from "../../../api";

const RightSidebar = ({ data }) => {
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
          <h4>live streaming</h4>
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
        <h4>bet placing</h4>
        {placeBetValues && <BetSLip />}
      </div>
      <div className="open_bets">
        <h4>open bets</h4>
        <OpenBets />
      </div>
    </div>
  );
};

export default RightSidebar;
