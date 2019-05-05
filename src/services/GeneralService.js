// Domain-based classe to handle the request
// map application model/params to API acceptable params before calls
// map Server response to Client Data

import { AxiosPromise, AxiosResponse } from 'axios';
import Gateway from '../Gateway';

export default class GeneralService {

  static readData() : AxiosPromise<AxiosResponse> {
    return Gateway.get('https://github.com/reduxjs/reselect/blob/master/README.md')
      .catch((error) => {
        console.log(error);
        // return Promise.reject(error); needed??
      });
  }

}
