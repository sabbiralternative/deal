import { useState } from "react";

import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./OpenBets.css";
import { useCurrentBets } from "../../hooks/currentBets";

const OpenBets = () => {
  const navigate = useNavigate();
  const { data: myBets } = useCurrentBets();
  const [openBets, setOpenBets] = useState(true);
  const orderedBets = [
    ...myBets.filter((bet) => bet.betType === "Back"),
    ...myBets.filter((bet) => bet.betType === "Lay"),
  ];

  return (
    <div className="openbets-page">
      <div
        id="openBetsRightSide"
        title="Open Bets"
        className="openbets-section"
      >
        <div className="openbets-col">
          {/* Toggle Header */}
          <div
            onClick={() => setOpenBets((prev) => !prev)}
            id="matched_1"
            className="openbets-toggle"
          >
            <span className="openbets-toggle-label">Open Bets</span>
            <div className="openbets-toggle-icon">
              {openBets ? (
                <MdOutlineKeyboardArrowUp size={20} />
              ) : (
                <MdOutlineKeyboardArrowDown size={20} />
              )}
            </div>
          </div>

          {/* Bets List */}
          {openBets && myBets?.length > 0 && orderedBets?.length > 0 && (
            <div className="openbets-list-wrap">
              <div className="openbets-list">
                {orderedBets?.map((bet, i) => (
                  <div key={i} className="openbets-card">
                    {/* Event Header */}
                    <div
                      onClick={() =>
                        navigate(
                          `/event-details/${bet?.eventTypeId}/${bet?.eventId}`,
                        )
                      }
                      id="eventHeader"
                      className="openbets-card-header"
                    >
                      <div
                        style={{
                          color: bet?.isBack ? "#72bbef" : "#faa9ba",
                          testDecoration: "underline",
                        }}
                        className={`openbets-card-title ${
                          bet?.betType === "Back"
                            ? "openbets-card-title--back"
                            : "openbets-card-title--lay"
                        }`}
                      >
                        {bet?.title}
                      </div>
                    </div>

                    {/* Nation / Sport */}
                    <div className="openbets-card-meta">
                      <span className="openbets-card-nation">
                        {bet?.nation}
                      </span>
                      <span className="openbets-card-sport">{bet?.sports}</span>
                    </div>

                    {/* Placed Date */}
                    <div
                      id={`tiem_Date_of_order_0_${i}`}
                      className="openbets-card-date"
                    >
                      PLACED - {bet?.placeDate}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {openBets && myBets?.length === 0 && orderedBets?.length === 0 && (
            <div className="openbets-empty-wrap">
              <div className="openbets-empty">You have no Open Bets.</div>
            </div>
          )}
        </div>
      </div>
      <div style={{ padding: "0 6px" }}></div>
      <div style={{ padding: "4px 6px" }}></div>
    </div>
  );
};

export default OpenBets;
