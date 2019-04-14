import NetUtils from 'react-native-dev-kit/src/utils/NetUtils';
import RootState from '../redux/states/RootState';
import BuildConfig from '../configs/BuildConfig';
import RootDispatcher from '../redux/dispatchers/RootDispatcher';
import NetworkWorker from '../network/NetworkWorker';

export default class DataSource {

  static initialize() {
    NetUtils.addListener(() => {
      if (NetUtils.isConnected()) {
        this.updateData();
      }
    });
    this.updateData();
  }

  static getData() {
    return RootState.getRootState().data;
  }

  static updateData() {
    NetworkWorker.readData((resString : string) => {
      RootDispatcher.setData(resString);
    });
  }
}
