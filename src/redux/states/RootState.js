import type { InitialState } from '../reducers/RootReducer';
import rootStore from '../stores/RootStore';

export default class {

  static getRootState() : InitialState {
    return rootStore.getState().rootReducer;
  }

  static isNetworkAvailable() : boolean {
    return this.getRootState().isNetworkAvailable;
  }

}
