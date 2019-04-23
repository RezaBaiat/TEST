// This class combines usages of Redux Actions & Dispatchers of [RootReducer](../reduce/RootReducer.html) and also
// grants possibility to call them statically without any need to import functions upon every usage
// providing a lot of benefits including cleaner code , easier future patches , IDE code completion and ...

import store from '../../configs/redux/Store';
import RootActions from '../actions/RootActions';

export default class RootDispatcher {

  static setNetworkState(isConnected : boolean) {
    store.dispatch(RootActions.networkStateChangeAction(isConnected));
  }

  static setData(newData : string) {
    store.dispatch(RootActions.setDataAction(newData));
  }

}
