import store from "../../../index";
import {initialStateInterface} from "../reducers/root";

export const ACTION_SET_CONTACTS = "SET_CONTACTS";


export default class ActionTypes{

    public static getRootState() : initialStateInterface{
        return store.getState().rootReducer;
    }

    public static setContacts(contacts : any){
        store.dispatch({
            type:ACTION_SET_CONTACTS,
            payload:contacts
        })
    }
}

