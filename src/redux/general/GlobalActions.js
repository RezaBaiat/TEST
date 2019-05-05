// Constants identifying which action is already being dispatched used in [RootReducer](../reduce/RootReducer.html) and [RootDispatcher](../reduce/RootDispatcher.html)
// In addition to providing the action method related to each constant
export default class GlobalActions {

  static networkStateChangeAction(isConnected : boolean) {
    return {
      type: GlobalActions.ACTION_NETWORK_STATE_CHANGE,
      payload: isConnected,
    };
  }

  static setDataAction(newData : string) {
    return {
      type: GlobalActions.ACTION_DATA_UPDATE,
      payload: newData,
    };
  }

  static testSagaAction(url : string) {
    return {
      type: GlobalActions.ACTION_TEST_SAGA,
      payload: url,
    };
  }
}
