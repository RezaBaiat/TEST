import NetUtils from 'react-native-dev-kit/src/utils/NetUtils';
import Configs from '../configs/Configs';
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

  static readData() : Promise<string> {
    return this.get(Configs.API_BASE_URL);
  }

  static get(url : string) {
    return cacherAxios.get(url)
      .then(res => res.data);
  }

}
