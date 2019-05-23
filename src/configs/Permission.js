// This files contains name references to all permissions this app requires , which
// will be used by [PermissionsHandler](../permissions/PermissionsHandler.html)
import { PermissionsAndroid } from 'react-native';

export default class Permission {

  static permissions = [
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
  ]

}
