import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Marquee from "react-fast-marquee";
// import { RxCross2 } from "react-icons/rx";
import { setShowNotification } from "../../../redux/features/global/globalSlice";
import useGetNotification from "../../../hooks/useGetNotification";

const Notification = () => {
  const { notification, isFetchingNotification, isFetched } =
    useGetNotification();

  const dispatch = useDispatch();
  const [filteredNotification, setFilteredNotification] = useState([]);
  const { showNotification } = useSelector((state) => state?.global);

  useEffect(() => {
    const storedNotificationId =
      JSON.parse(localStorage.getItem("notificationId")) || [];
    if (
      (!storedNotificationId || storedNotificationId?.length === 0) &&
      notification?.length > 0
    ) {
      dispatch(setShowNotification(true));

      setFilteredNotification(notification);
    }
    if (
      notification?.length > 0 &&
      storedNotificationId &&
      storedNotificationId?.length > 0 &&
      !showNotification
    ) {
      const filteredNotifications = notification.filter(
        (notif) => !storedNotificationId.some((nId) => nId.id == notif.id),
      );

      if (filteredNotifications?.length > 0) {
        setFilteredNotification(filteredNotifications);
        dispatch(setShowNotification(true));
      }
    }
  }, [
    notification,
    showNotification,
    isFetched,
    isFetchingNotification,
    dispatch,
  ]);

  // const closeNotification = () => {
  //   const notificationIds =
  //     JSON.parse(localStorage.getItem("notificationId")) || [];

  //   notification?.forEach((item) => {
  //     if (!notificationIds.some((notif) => notif.id === item.id)) {
  //       notificationIds.push({ id: item.id });
  //     }
  //   });

  //   localStorage.setItem("notificationId", JSON.stringify(notificationIds));

  //   dispatch(setShowNotification(false));
  // };

  return (
    <>
      {showNotification && filteredNotification?.length > 0 && (
        <div className="commentary">
          <div className="marquee">
            <span>
              {filteredNotification?.map((item) => (
                <p key={item?.id} className="mr-[100vw] text-white">
                  {item?.text}
                </p>
              ))}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Notification;
