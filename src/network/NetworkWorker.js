import NetUtils from 'react-native-dev-kit/src/utils/NetUtils';
import Configs from '../configs/Config';
import OfflineStorage, { getOfflineData } from '../storages/OfflineStorage';

export const axios = require('axios');

const offline = OfflineStorage({
  name: 'axios-offline',
  adapter: axios.defaults.adapter,
});

export const cacherAxios = axios.create({
  adapter: offline,
});

export default class NetworkWorker {

  static readData(callBack : (text : string)=>void) {
    return this.get(Configs.API_BASE_URL, callBack);
  }

  static get(url : string, onSuccess : (Database : string)=>void, onError? : (err : Error)=>void) {
    cacherAxios.get(url)
      .then((res) => {

        if (res.status === 200) {
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
