// Constants identifying which action is already being dispatched used in [RootReducer](../reduce/RootReducer.html) and [RootDispatcher](../reduce/RootDispatcher.html)
// in addition to providing the action method related to each constant
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
