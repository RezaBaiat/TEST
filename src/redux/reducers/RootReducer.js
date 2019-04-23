// In case of using multiple reducers , this reducer should contain only general and global
// states which dont fit in any other, like networkState, otherwise it will contain all redux states

import NetUtils from 'react-native-dev-kit/src/utils/NetUtils';
import RootActions from '../actions/RootActions';

// Interface to just describe our variables types
export interface InitialState {
  isNetworkAvailable : boolean,
  data : boolean
}

// The name tells it all , before any changes this is the default value of our state variables
const initialState : InitialState = {
  isNetworkAvailable: NetUtils.isConnected(),
  data: 'fetching data',
};

// A reducer is the place which returns the new state , based on the type of action who has just dispatched
// note that this should be a copy , never return the previous state
const reducer = (state = initialState, action: { type: any;payload:any }) => {
  switch (action.type) {
    case RootActions.ACTION_NETWORK_STATE_CHANGE:
      return {
        ...state,
        isNetworkAvailable: action.payload,
      };
    case RootActions.ACTION_DATA_UPDATE:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
