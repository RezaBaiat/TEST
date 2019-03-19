import {
    ACTION_SET_CONTACTS
} from '../actions/Actions'

export interface InitialState {

}

const initialState : InitialState = {//the base state is defined here
    contacts : null
};


/**
 *
 * reducers are the action receivers
 * important : in redux we never manipulate the old state , we always return a new one
 *
 * @param state we set default state to initialState
 * @param action
 */
const reducer = (state = initialState,action: { type: any;payload:any }) =>{

    switch (action.type) {

        case ACTION_SET_CONTACTS:
            return{
                ...state,
                contacts : action.payload
            };

        default:
            return state;
    }
};

export default reducer;