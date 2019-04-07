import rootStore from '../stores/RootStore';
import RootActions from '../actions/RootActions';

export default class RootDispatcher {

  static setNetworkState(isConnected : boolean) {
    rootStore.dispatch({
      type: RootActions.ACTION_NETWORK_STATE_CHANGE,
      payload: isConnected,
    });
  }

  static setData(newData : string) {
    rootStore.dispatch({
      type: RootActions.ACTION_DATA_UPDATE,
      payload: newData,
    });
  }

}
