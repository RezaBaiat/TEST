import { AxiosResponse } from 'axios';
import BuildConfig from '../configs/BuildConfig';
import OfflineStorage from '../storages/OfflineStorage';
import RootDispatcher from '../redux/dispatchers/RootDispatcher';
import RootState from '../redux/states/RootState';

export const axios = require('axios');

export default class NetworkWorker {

  static readData(callBack : (text : string)=>void) {
    return this.get(BuildConfig.API_BASE_URL, callBack);
  }

  static get(url : string, onSuccess : (Database : string)=>void, onError? : (err : Error)=>void) {
    if (!RootState.isNetworkAvailable()) {
      if (OfflineStorage.contains(url)) {
        onSuccess(OfflineStorage.get(url));
      } else {
        onError && onError(null);
      }
      return;
    }
    axios.get(url)
      .then((res) => {
        if (res.status === 200) {
          res.data && OfflineStorage.store(url, res.data);
          onSuccess(res.data);
        } else {
          onError && onError(null);
        }
      }).catch((err) => {
        console.log(err);
        onError && onError(err);
      });
  }

}
