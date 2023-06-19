import { createContext, useState } from "react";

const NotificationContext = createContext({
  notification: null, //{tiitle,message, status}
  showNotification: function (notificationData) {},
  hideNotifcation: function () {},
});

export function NotificationContextProvider(props) {
  const [activeNotification, setActvieNotification] = useState();

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
  
  return <NotificationContext>{props.children}</NotificationContext>;
}

export default NotificationContext;
