import firebase from 'react-native-firebase';
import { AsyncStorage } from 'react-native';

export default class PushNotificationsHandler {

  /**
   Notification-only messages:            These are display messages that are automatically handled by Firebase SDK. Notifications are thrown to device tray.

   Notification + optional data messages: These are also handled by Firebase SDK. Only difference here is when user taps on notification, your app receives payload associated with that notification.

   Data only messages:                    These types of notifications are handled exclusively by app. No notification is thrown on device tray unless app explicitly does so. In iOS, these types of notifications are also termed as ‘Silent Push Notifications’.
   */

  /**
   * notice :
   *
   - In Android, if you tap on notification when app is killed, this library won’t be able to catch title and body of notification. Therefore these attributes will be undefined in showAlert function. As a solution, you should also send title and body in data payload of notification.
   - To this date, Silent Push Notifications on iOS are not supported by this library. I have already opened an issue on their repository.
   - To listen for data message notifications while the app is in background or killed in Android, you need to implement Headless JS functionality. For details, please refer to this link.
   */
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
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  static async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  static async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }


  static async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body } = notification;
      this.showAlert(title, body);
    });

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      // process data message
      console.log(JSON.stringify(message));
    });
  }

  release() {
    this.notificationListener();
    this.notificationOpenedListener();
  }

  static showAlert(title, body) {
    alert(
      title, body,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }
}
