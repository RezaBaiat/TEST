// Providing redux's actions in global topics .
// global topics are the one's who can be used in any application

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
