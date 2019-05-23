// Domain-based class to handle the request
// map application model/params to API acceptable params before calls
// map Server response to Client Data
// this file will also handle some logics as explained in the diagram
// and will directly work with the [Gateway](../configs/network/Gateway.html) file

import { AxiosPromise, AxiosResponse } from 'axios';
import Gateway from '../configs/network/Gateway';

export default class GeneralService {

  static readData() : AxiosPromise<AxiosResponse> {
    return Gateway.get('https://github.com/reduxjs/reselect/blob/master/README.md')
      .catch((error) => {
        console.log(error);
      });
  }

}
