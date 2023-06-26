import React from 'react';

const NotificationContext = React.createContext({
  notificationCount: 0,
  updateNotificationCount: () => {},
});

export default NotificationContext;
