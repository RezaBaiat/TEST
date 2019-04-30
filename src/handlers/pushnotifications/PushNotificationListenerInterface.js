// This class is an interface which should be implemented by all push notification handlers ,
// forcing them to override these methods , easing and fastening coding
// note : all methods should be static

import { Notification, NotificationOpen, RNFirebase } from 'react-native-firebase';

export interface PushNotificationListenerInterface{

  onInitialNotification(notificationOpen : NotificationOpen) : void,
  onNotification(notification : Notification) : void,
  onNotificationOpened(notificationOpen : RNFirebase.notifications.NotificationOpen) : void,
  onMessage(message : any) : void
}
