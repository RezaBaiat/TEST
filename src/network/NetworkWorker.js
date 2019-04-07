import BuildConfig from '../configs/BuildConfig';

const axios = require('axios');

export default class NetworkWorker {
  static callApi(callBack : (text : string)=>void) {
    return axios.get(BuildConfig.API_BASE_URL).catch((err) => { console.error(err); }).then(res => res.data).then((resString) => {
      callBack(resString);
    });
  }
}
