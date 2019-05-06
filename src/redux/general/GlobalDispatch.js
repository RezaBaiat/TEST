import store from '../../configs/redux/Store';
import GlobalActions from './GlobalActions';
import type { InitialState } from './GlobalReducer';

const Actions = new GlobalActions();

export default class GlobalDispatch {


  static getRootState() : InitialState {
    return store.getState().rootReducer;
  }

  static setNetworkState(isConnected : boolean) {
    store.dispatch(Actions.networkStateChangeAction(isConnected));
  }

}
