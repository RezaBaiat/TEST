// Configuration file for listening to push notifications , every thing will be handled here since there is no need to another handler

import firebase, { Firebase, Notification, RNFirebase } from 'react-native-firebase';
import { AsyncStorage } from '@react-native-community/async-storage';
import type { PushNotificationListenerInterface } from '../notifications/PushNotificationListenerInterface';
import GeneralPushNotificationHandler from '../notifications/GeneralPushNotificationHandler';
// eslint-disable-next-line import/no-duplicates

const mFireBase : Firebase = firebase;

export default class PushNotifications {


  // Notification-only messages:            These are display messages that are automatically handled by Firebase SDK. Notifications are thrown to device tray.
  //
  // Notification + optional data messages: These are also handled by Firebase SDK. Only difference here is when user taps on notification, your app receives payload associated with that notification.
  //
  // Data only messages:                    These types of notifications are handled exclusively by app. No notification is thrown on device tray unless app explicitly does so. In iOS, these types of notifications are also termed as ‘Silent Push Notifications’.


  // notice :
  //
  // In Android, if you tap on notification when app is killed, this library won’t be able to catch title and body of notification. Therefore these attributes will be undefined in showAlert function. As a solution, you should also send title and body in data payload of notification.
  // To this date, Silent Push Notifications on iOS are not supported by this library. I have already opened an issue on their repository.
  // To listen for data message notifications while the app is in background or killed in Android, you need to implement Headless JS functionality. For details, please refer to this link.

  static notificationListener;

  static notificationOpenedListener;

  static messageListener;

  // checkout @https://rnfirebase.io/docs/v5.x.x/notifications/android
  // also checkout @https://medium.com/@anum.amin/react-native-integrating-push-notifications-using-fcm-349fff071591
  // even checkout @https://medium.com/@yangnana11/how-to-set-up-firebase-notification-in-react-native-app-android-only-4920eb875eae
  static initialize() {
    this.checkPermission();
    this.createNotificationListeners();
  }

  static async checkPermission() {
    const enabled = await mFireBase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  static async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await mFireBase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  static async requestPermission() {
    try {
      await mFireBase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }


  static async createNotificationListeners() {

    // Triggered when a particular notification has been received in foreground
    this.notificationListener = mFireBase.notifications().onNotification((notification : Notification) => {
      this.getNotificationHandler(notification).onNotification(notification);
    });

    // If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    this.notificationOpenedListener = mFireBase.notifications().onNotificationOpened((notificationOpen : RNFirebase.notifications.NotificationOpen) => {
      this.getNotificationHandler(notificationOpen.notification).onNotificationOpened(notificationOpen);
    });


    // If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    const notificationOpen = await mFireBase.notifications().getInitialNotification();
    if (notificationOpen) {
      this.getNotificationHandler(notificationOpen.notification).onInitialNotification(notificationOpen);
    }

    // Triggered for data only payload in foreground
    this.messageListener = mFireBase.messaging().onMessage((message) => {
      // process data message
      GeneralPushNotificationHandler.onMessage(message);
    });
  }

  release() {
    this.notificationListener();
    this.notificationOpenedListener();
  }


  static getNotificationHandler(notification : Notification) : PushNotificationListenerInterface {
    // switch later
    return GeneralPushNotificationHandler;
  }
}
