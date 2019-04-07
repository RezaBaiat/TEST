// @flow

import BuildConfig from '../configs/BuildConfig';
import OfflineStorage from '../storages/OfflineStorage';
import RootDispatcher from '../redux/dispatchers/RootDispatcher';
import RootState from '../redux/states/RootState';
import { AxiosResponse } from 'axios';

const axios = require('axios');

export default class NetworkWorker {

  static readData(callBack : (text : string)=>void) {
    return this.get(BuildConfig.API_BASE_URL,callBack);
  }


  static get(url : string,onSuccess : (data : string)=>void,onError? : (err)=>void){
    if(!RootState.isNetworkAvailable()){
        if (OfflineStorage.contains(url)){
          onSuccess(OfflineStorage.get(url));
        } else {
          onError && onError(null);
        }
        return;
    }
    axios.get(url)
      .then(res => res.data)
      .then((resString) => {
        OfflineStorage.store(url,resString);
        onSuccess(resString);
      }).catch((err)=>{
        console.log(err);
        onError && onError(err);
    });
  }

}


