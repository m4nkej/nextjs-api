import { createContext, useEffect, useState } from "react";

const NotificationContext = createContext({
  notification: null, //{tiitle,message, status}
  showNotification: function (notificationData) {},
  hideNotification: function () {},
});

export function NotificationContextProvider(props) {
  const [activeNotification, setActvieNotification] = useState();

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === "success" ||
        activeNotification.status === "error")
    ) {
      const timer = setTimeout(() => {
        hideNotificationHendler();
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  function showNotificationHendler(notificationData) {
    setActvieNotification(notificationData);
  }
  function hideNotificationHendler() {
    setActvieNotification(null);
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHendler,
    hideNotification: hideNotificationHendler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
