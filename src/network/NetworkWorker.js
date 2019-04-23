// This file is main responsible class for network calls ,
// which should contain at least the main get,post,put,delete methods

import { AxiosInstance } from 'axios';
import Configs from '../configs/Configs';

export const axios : AxiosInstance = require('axios');

/* const offline = OfflineStorage({
  name: 'axios-offline',
  adapter: axios.defaults.adapter,
});

// cacher axios which will cache all responses in disk
export const cacherAxios = axios.create({
  adapter: offline,
}); */

export default class NetworkWorker {

  static readData() : Promise<string> {
    return this.get(Configs.API_BASE_URL);
  }

  static getUsers() : Promise<string[]> {
    return this.get(Configs.GET_USERS_URL);
  }

  static get(url : string) {
    return axios.get(url).then(res => res.data);
  }

}
