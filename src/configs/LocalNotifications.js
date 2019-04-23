// Configuration file and dispatcher for local notifications , will be used by [LocalNotificationsHandler](../handlers/LocalNotificationsHandler.html)
const PushNotification = require('react-native-push-notification');

export default class LocalNotifications {

  static initialize() {
    PushNotification.configure({
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,
      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       */
      requestPermissions: true,
    });
  }

  static sendLocalNotification(details : any) {
    PushNotification.localNotification(details);
  }


}
