import NetUtils from 'react-native-dev-kit/src/utils/NetUtils';
import RootActions from '../actions/RootActions';

export interface InitialState {
  isNetworkAvailable : boolean,
  data : boolean
}

const initialState : InitialState = {
  isNetworkAvailable: NetUtils.isConnected(),
  data: 'fetching data',
};

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
