// Constants identifying which action is already being dispatched used in [RootReducer](../reduce/RootReducer.html) and [RootDispatcher](../reduce/RootDispatcher.html)
// In addition to providing the action method related to each constant
import GlobalConstants from './GlobalConstants';


export function networkStateChangeAction(isConnected : boolean) {
  return {
    type: GlobalConstants.ACTION_NETWORK_STATE_CHANGE,
    payload: isConnected,
  };
}

export function setDataAction(newData : string) {
  return {
    type: GlobalConstants.ACTION_DATA_UPDATE,
    payload: newData,
  };
}

export function setLanguageAction(lang : string) {
  return {
    type: GlobalConstants.ACTION_SET_LANGUAGE,
    payload: lang,
  };
}

export function testSagaAction(url : string) {
  return {
    type: GlobalConstants.ACTION_TEST_SAGA,
    payload: url,
  };
}
export default {
  networkStateChangeAction,
  setLanguageAction,
  setDataAction,
  testSagaAction,
};
