// Handling app's permissions . will show a permission dialog whenever needed , based on permissions in [Permissions](../configs/Permissions.html)
// and will only return true when all permissions have been granted

import PermissionsManager from 'react-native-dev-kit/src/permissions/PermissionsManager';
import Permission from '../configs/Permission';

export default class PermissionsHandler {

  // This will return true only when all permissions have been granted , other wise returns false
  static async checkPermissions() : Promise<boolean> {

    for (const permission of Permission.permissions) {
      if (!await PermissionsManager.requestPermission(permission)) {
        return false;
      }
    }

    return true;
  }
}
