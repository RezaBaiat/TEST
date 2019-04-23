// This class grants immutable access to the state variables statically for easier use
// and cleaner code

import type { InitialState } from '../reducers/RootReducer';
import store from '../../configs/redux/Store';


export default class {

  static getRootState() : InitialState {
    return store.getState().rootReducer;
  }

  static isNetworkAvailable() : boolean {
    return this.getRootState().isNetworkAvailable;
  }

}
