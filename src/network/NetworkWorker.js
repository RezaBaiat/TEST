import BuildConfig from '../configs/BuildConfig';
import OfflineStorage from '../storages/OfflineStorage';
import RootDispatcher from '../redux/dispatchers/RootDispatcher';
import RootState from '../redux/states/RootState';
import { AxiosResponse } from 'axios';

export const axios = require('axios');

export default class NetworkWorker {

  static readData(callBack : (text : string)=>void) {
    return this.get(BuildConfig.API_BASE_URL,callBack);
  }

  static get(url : string){
    if(!RootState.isNetworkAvailable()){
      if (OfflineStorage.contains(url)){
        onSuccess(OfflineStorage.get(url));
      } else {
        onError && onError(null);
      }
      return;
    }
    axios.get(url)
      .then((res)=>{
        if (res.ok){
          if (res.data){
            OfflineStorage.store(url,resString);
          }
          onSuccess(res.data);
        }else{
          onError && onError(null);
        }
      }).catch((err)=>{
      console.log(err);
      onError && onError(err);
    });
  }

}


