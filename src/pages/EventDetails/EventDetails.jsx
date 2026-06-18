import { useEffect, useState } from "react";
import {
  useGetEventDetailsQuery,
  useVideoMutation,
} from "../../redux/features/events/events";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPredictOdd } from "../../redux/features/events/eventSlice";
import { Settings } from "../../api";
import MatchOdds from "../../components/modules/EventDetails/MatchOdds";
import Bookmaker from "../../components/modules/EventDetails/Bookmaker";
import Fancy from "../../components/modules/EventDetails/Fancy";
import HorseGreyhoundEventDetails from "../../components/modules/EventDetails/HorseGreyhoundEventDetails";
import RightSidebar from "../../components/modules/EventDetails/RightSidebar";
import Score from "../../components/modules/EventDetails/Score";

const EventDetails = () => {
  const [sportsVideo, { data: iframe }] = useVideoMutation();
  const { eventTypeId, eventId } = useParams();
  const [profit, setProfit] = useState(0);
  const dispatch = useDispatch();
  const { placeBetValues, price, stake } = useSelector((state) => state.event);

  const { data } = useGetEventDetailsQuery(
    { eventTypeId, eventId },
    {
      pollingInterval: 1000,
    },
  );

  useEffect(() => {
    if (
      price &&
      stake &&
      placeBetValues?.back &&
      placeBetValues?.btype === "MATCH_ODDS"
    ) {
      const multiply = price * stake;
      setProfit(formatNumber(multiply - stake));
    } else if (
      price &&
      stake &&
      placeBetValues?.back &&
      (placeBetValues?.btype === "BOOKMAKER" ||
        placeBetValues?.btype === "BOOKMAKER2")
    ) {
      setProfit(formatNumber(1 + price / stake));
    }
  }, [price, stake, profit, placeBetValues, setProfit]);

  useEffect(() => {
    let total;
    if (
      placeBetValues?.btype === "MATCH_ODDS" ||
      placeBetValues?.btype === "BOOKMAKER"
    ) {
      if (placeBetValues?.back) {
        if (placeBetValues?.btype === "MATCH_ODDS") {
          total = price * stake - stake;
        }
        if (placeBetValues?.btype === "BOOKMAKER") {
          const bookmaker = 1 + price / 100;
          total = bookmaker * stake - stake;
        }

        if (stake) {
          const currentExposure = placeBetValues?.exposure?.map((exp) => {
            return {
              exposure: exp?.isBettingOnThisRunner
                ? formatNumber(exp?.exposure + total)
                : formatNumber(exp?.exposure + -1 * stake),

              id: exp?.id,
              isBettingOnThisRunner: exp?.isBettingOnThisRunner,
            };
          });

          dispatch(setPredictOdd(currentExposure));
        }
      } else if (placeBetValues?.lay) {
        if (placeBetValues?.btype === "MATCH_ODDS") {
          total = -1 * (price * stake - stake);
        }
        if (placeBetValues?.btype === "BOOKMAKER") {
          const bookmaker = 1 + price / 100;
          total = -1 * (bookmaker * stake - stake);
        }

        if (stake) {
          const currentExposure = placeBetValues?.exposure?.map((exp) => {
            return {
              exposure: exp?.isBettingOnThisRunner
                ? formatNumber(exp?.exposure + total)
                : formatNumber(1 * exp?.exposure + 1 * stake),
              id: exp?.id,
              isBettingOnThisRunner: exp?.isBettingOnThisRunner,
            };
          });
          dispatch(setPredictOdd(currentExposure));
        }
      }
    }
  }, [price, stake, placeBetValues, dispatch]);

  /* Format number */
  const formatNumber = (value) => {
    const hasDecimal = value % 1 !== 0;
    // value?.toFixed(2)
    return hasDecimal ? parseFloat(value?.toFixed(2)) : value;
  };

  const matchOdds = data?.result?.filter(
    (game) =>
      game.btype === "MATCH_ODDS" &&
      game?.visible == true &&
      game?.name !== "tied match",
  );
  const bookmaker = data?.result?.filter(
    (game) =>
      game.btype === "BOOKMAKER" &&
      game?.visible == true &&
      game?.name !== "tied match",
  );

  const tiedMatch = data?.result?.filter(
    (game) =>
      (game.btype === "MATCH_ODDS" || game.btype === "BOOKMAKER") &&
      game?.visible == true &&
      game?.name === "tied match",
  );

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
    <main>
      <div className="container">
        <div>
          <div className="detail_div">
            <div className="dtl_row">
              <div className="dtl_first">
                <h2 className="detail_eventName">
                  {data?.result?.[0]?.eventName}
                  <span className="tv_time">
                    <em> {data?.result?.[0]?.openDate}</em>
                  </span>
                </h2>
                {iframe?.result?.url && data?.score?.hasVideo && (
                  <div
                    id="collapseBasic"
                    className="embed-responsive embed-responsive-16by9 collapse show d-none-desktop"
                    aria-hidden="true"
                  >
                    <iframe
                      id="tvStr"
                      className="embed-responsive-item w-100"
                      src={iframe?.result?.url}
                    />
                  </div>
                )}
                {data?.score?.tracker && (
                  <div
                    id="collapseBasic"
                    className="embed-responsive embed-responsive-16by9 collapse show "
                    aria-hidden="true"
                  >
                    <iframe
                      id="tvStr"
                      className="embed-responsive-item w-100"
                      src={data?.score?.tracker}
                    />
                  </div>
                )}

                <div id="accordionPanelsStayOpenExample" className="accordion">
                  {eventTypeId == 4 && data?.iscore && (
                    <Score iscore={data?.iscore} />
                  )}
                  {matchOdds?.length > 0 && <MatchOdds data={matchOdds} />}
                  {bookmaker?.length > 0 && <Bookmaker data={bookmaker} />}
                  {data?.result?.length > 0 && <Fancy data={data?.result} />}
                  {eventTypeId == 7 || eventTypeId == 4339 ? (
                    <HorseGreyhoundEventDetails data={data?.result} />
                  ) : null}
                  {tiedMatch?.length > 0 && <MatchOdds data={tiedMatch} />}
                </div>
              </div>
              <RightSidebar data={data} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EventDetails;
