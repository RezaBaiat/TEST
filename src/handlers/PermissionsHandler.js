import PermissionsManager from 'react-native-dev-kit/src/permissions/PermissionsManager';
import { PermissionsAndroid } from 'react-native';

export default class {

  // this will return true only when all permissions have been granted
  static async checkPermissions() : Promise<boolean> {
    return (await PermissionsManager.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
      && await PermissionsManager.requestPermission(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO)
      && await PermissionsManager.requestPermission(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
      && await PermissionsManager.requestPermission(PermissionsAndroid.PERMISSIONS.READ_CONTACTS));
  }
}
