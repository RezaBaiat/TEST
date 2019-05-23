// this file takes actions needed to be taken
// upon network (state) change

import NetUtils from 'react-native-dev-kit/src/utils/NetUtils';
import GlobalActions from '../../redux/general/GlobalActions';
import store from '../redux/Store';


export default class Health {
  static initialize() {
    NetUtils.addListener((isConnected) => {
      store.dispatch(new GlobalActions().networkStateChangeAction(isConnected));
    });
  }
}
