import NetUtils from 'react-native-dev-kit/src/utils/NetUtils';
import RootState from '../redux/states/RootState';
import BuildConfig from '../configs/BuildConfig';
import RootDispatcher from '../redux/dispatchers/RootDispatcher';
import NetworkWorker from '../network/NetworkWorker';

export default class DataSource {


  static mLastCachedResponse = null;

  static initialize() {
    NetUtils.addListener((isConnected : boolean) => {
      this.updateData(isConnected);
    });
    this.updateData(RootState.isNetworkAvailable());
  }

  static getData() {
    return RootState.getRootState().data;
  }

  static updateData(isConnected : boolean) {
    if (!isConnected) {
      if (this.mLastCachedResponse) {
        RootDispatcher.setData(`this is loaded from cache :\n ${this.mLastCachedResponse}`);
      } else {
        RootDispatcher.setData('Network connection error!');
      }
      return;
    }
    NetworkWorker.callApi((resString : string) => {
      this.mLastCachedResponse = resString;
      RootDispatcher.setData(`this is a live load version :\n ${this.mLastCachedResponse}`);
    });
  }
}
