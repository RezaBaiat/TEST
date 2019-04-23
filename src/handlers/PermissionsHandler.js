// Handling the permissions dialog , based on permissions in [Permissions](../configs/Permissions.html)

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
