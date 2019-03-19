import store from '../Store';
import { InitialState } from '../reducers/root';

export const ACTION_NETWORK_STATE_CHANGE = 'ACTION_NETWORK_STATE_CHANGE';


export default class Actions {
  static getRootState() : InitialState {
    return store.getState().rootReducer;
  }

  static setNetworkState(isConnected : boolean) {
    store.dispatch({
      type: ACTION_NETWORK_STATE_CHANGE,
      payload: isConnected,
    });
  }

  static isNetworkAvailable() : boolean {
    return this.getRootState().isNetworkAvailable;
  }
}
