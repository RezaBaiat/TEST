// Handling app's permissions . will show a permission dialog whenever needed , based on permissions in [Permissions](../configs/Permissions.html)
// and will only return true when all permissions have been granted

import PermissionsManager from 'react-native-dev-kit/src/permissions/PermissionsManager';
import Permissions from '../configs/Permissions';

export default class PermissionsHandler {

  // This will return true only when all permissions have been granted , other wise returns false
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
