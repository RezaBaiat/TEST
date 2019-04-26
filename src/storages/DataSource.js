// App's main data source which acts as a gateway between app itself and [NetworkWorker](../network/NetworkWorker.html) .
// any component who needs any kind of data from API, should request it from this class
// this class will handle when to fetch data , when to update data
// or when to read it from cache

import NetUtils from 'react-native-dev-kit/src/utils/NetUtils';
import RootState from '../redux/states/RootState';
import RootDispatcher from '../redux/dispatchers/RootDispatcher';
import NetworkWorker from '../network/NetworkWorker';

export default class DataSource {

  static initialize() {
    NetUtils.addListener(() => {
      if (NetUtils.isConnected()) {
        this.updateData();
      }
    });
  }

  static getData() {
    return RootState.getRootState().data;
  }

  static updateData() {
    NetworkWorker.readData().then((res) => {
      RootDispatcher.setData(res.data);
    }).catch((err) => {
      RootDispatcher.setData(RootState.getRootState().data || 'Error loading data');
    });
  }
}
