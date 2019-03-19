import {
  ACTION_NETWORK_STATE_CHANGE,
} from '../actions/Actions';

export interface InitialState {
  isNetworkAvailable : boolean,
}

const initialState : InitialState = {// the base state is defined here
  isNetworkAvailable: false,
};


/**
 *
 * reducers are the action receivers
 * important : in redux we never manipulate the old state , we always return a new one
 *
 * @param state we set default state to initialState
 * @param action
 */
const reducer = (state = initialState, action: { type: any;payload:any }) => {
  switch (action.type) {
    case ACTION_NETWORK_STATE_CHANGE:
      return {
        ...state,
        isNetworkAvailable: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
