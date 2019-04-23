// constants identifying which action is already being dispatched used in RootReducer.js and RootDispatcher.js
export default class RootActions {

  static ACTION_NETWORK_STATE_CHANGE = 'ACTION_NETWORK_STATE_CHANGE';

  static ACTION_DATA_UPDATE = 'ACTION_DATA_UPDATE';

  static networkStateChangeAction(isConnected : boolean) {
    return {
      type: RootActions.ACTION_NETWORK_STATE_CHANGE,
      payload: isConnected,
    };
  }

  static setDataAction(newData : string) {
    return {
      type: RootActions.ACTION_DATA_UPDATE,
      payload: newData,
    };
  }
}
