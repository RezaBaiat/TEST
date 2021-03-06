// In case of using multiple reducers , this reducer should contain only general and global
// states which dont fit in any other, like networkState, otherwise it will contain all redux states
// general topics are the one's who can be used in any application


import NetUtils from 'react-native-dev-kit/src/utils/NetUtils';
import { AVAILABLE_LANGUAGES } from '../../configs/Locale';
import GlobalConstants from './GlobalConstants';

// Interface to just describe our variables types
export interface InitialState {
  isNetworkAvailable : boolean,
  data : string,
  locale : string,
}

// The name tells it all , before any changes this is the default value of our state variables
const initialState : InitialState = {
  isNetworkAvailable: NetUtils.isConnected(),
  data: 'fetching data',
  locale: AVAILABLE_LANGUAGES[0],
};

// A reducer is the place which returns the new state , based on the type of action who has just dispatched
// note that this should be a copy , never return the previous state
const reducer = (state = initialState, action: { type: any;payload:any }) => {
  console.log(`reducer updated with action ${JSON.stringify(action)}`);
  switch (action.type) {
    case GlobalConstants.ACTION_NETWORK_STATE_CHANGE:
      return {
        ...state,
        isNetworkAvailable: action.payload,
      };
    case GlobalConstants.ACTION_DATA_UPDATE:
      return {
        ...state,
        data: action.payload,
      };
    case GlobalConstants.ACTION_SET_LANGUAGE:
      return {
        ...state,
        locale: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
