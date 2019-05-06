// this file takes actions needed to be taken
// upon network (state) change

import NetUtils from 'react-native-dev-kit/src/utils/NetUtils';
import GlobalDispatch from '../../redux/general/GlobalDispatch';


export default class Health {
  static initialize() {
    NetUtils.addListener(GlobalDispatch.setNetworkState);
  }
}
