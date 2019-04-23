import PermissionsManager from 'react-native-dev-kit/src/permissions/PermissionsManager';
import Permissions from '../configs/Permissions';

export default class {

  // this will return true only when all permissions have been granted
  static async checkPermissions() : Promise<boolean> {

    for (const permission of Permissions.permissions) {
      // eslint-disable-next-line no-await-in-loop
      if (!await PermissionsManager.requestPermission(permission)) {
        return false;
      }
    }

    return true;
  }
}
