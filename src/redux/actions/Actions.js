import store from '../Store';
import {InitialState} from "../reducers/root";

export const ACTION_SET_CONTACTS = "SET_CONTACTS";


export default class Actions{

    static getRootState() : InitialState{
        return store.getState().rootReducer;
    }

    static setContacts(contacts : any){
        store.dispatch({
            type:ACTION_SET_CONTACTS,
            payload:contacts
        })
    }
}

