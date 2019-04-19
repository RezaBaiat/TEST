import NetUtils from 'react-native-dev-kit/src/utils/NetUtils';
import RootState from '../redux/states/RootState';
import Configs from '../configs/Configs';
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
    NetworkWorker.readData().then((res) => {
      alert(`data updated ${res}`);
      RootDispatcher.setData(res);
    }).catch((err) => {
      RootDispatcher.setData('Error loading data');
    });
  }
}
