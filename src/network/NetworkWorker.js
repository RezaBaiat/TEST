// This file is main responsible class for network calls ,
// which should contain at least the main get,post,put,delete methods
// or all of the API call , if this worker is the only one

import {
  AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse,
} from 'axios';

export const axios : AxiosInstance = require('axios');


export default class HttpRequest {


  static execute(url : string, headers = {}, method = 'GET', config : AxiosRequestConfig) : AxiosPromise<AxiosResponse> {
    return axios.get(url, {
      ...config,
      params: headers,
      method,
    }).then((res) => {
      HttpRequest.statusChecking(res);
    }).catch((error) => {
      HttpRequest.errorHandling(error);
    });
  }

  static post(url : string, headers = {}, config : AxiosRequestConfig) {
    return this.execute(url, headers, 'POST', config);
  }

  static put(url : string, headers = {}, config : AxiosRequestConfig) {
    return this.execute(url, headers, 'PUT', config);
  }

  static patch(url : string, headers = {}, config : AxiosRequestConfig) {
    return this.execute(url, headers, 'PATCH', config);
  }

  static head(url : string, headers = {}, config : AxiosRequestConfig) {
    return this.execute(url, headers, 'HEAD', config);
  }

  static delete(url : string, headers = {}, config : AxiosRequestConfig) {
    return this.execute(url, headers, 'DELETE', config);
  }

  static get(url : string, headers = {}, config : AxiosRequestConfig) {
    return this.execute(url, headers, 'GET', config);
  }

  static postFile(url : string, headers = {}, data : any, config : AxiosRequestConfig = {}) {
    return this.execute(url, headers, 'POST', {
      ...config,
      data,
      headers: Object.assign(headers, { 'content-type': 'multipart/form-data' }),
    });
  }

  // Push other status into error handling
  static statusChecking = (payload) => {
    if (payload.status !== 200) return Promise.reject(payload.status);
    return Promise.resolve(payload);
  };

  static errorHandling = (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        return Promise.reject(error.response);
      } if (error.response.status === 500) return Promise.reject({ data: { error_message: 'Server Error!' } });
      if (error.response.status === 404) return Promise.reject({ data: { error_message: error.response.data.error_message } });
      return Promise.reject(error.response);
    } if (error) {
      if (error === 401) {
        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
    return Promise.reject(400);

  }
}
