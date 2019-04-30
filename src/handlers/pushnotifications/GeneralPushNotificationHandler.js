// General push notification handler , an implementation on PushNotificationListenerInterface ,
// is mainly responsible for data type notifications and other notifications which will not
// fit into any other

import { PushNotificationListenerInterface } from './PushNotificationListenerInterface';

export default class GeneralPushNotificationHandler implements PushNotificationListenerInterface {

  static onInitialNotification(notificationOpen) {
    const { title, body } = notificationOpen;
    this.showAlert(title, body);
  }

  static onNotification(notification) {
    const { title, body } = notification;
    this.showAlert(title, body);
  }

  static onNotificationOpened(notificationOpen) {
    const { title, body } = notificationOpen;
    this.showAlert(title, body);
  }

  static onMessage(message) {
    console.log(JSON.stringify(message));
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
