import { AsyncStorage } from 'react-native';
import NetUtils from 'react-native-dev-kit/src/utils/NetUtils';
import { AxiosResponse } from 'axios';

// Best possible implementation of axios adapter to disk cache requests, which intercepts response and will cache it if connection was successful.
// this will also return a cached version - if available - when a network request failes due to connection issues
export function getOfflineData(url : string) : Promise<AxiosResponse> {
  const key = encodeURI(url);
  return AsyncStorage.getItem(key).then(data => (data ? JSON.parse(data) : null));
}

module.exports = (options) => {
  const { adapter } = options;
  return (config) => {
    const { url } = config;
    const key = encodeURI(url);
    return adapter(config)
      .then((ret) => {
        AsyncStorage.setItem(key, JSON.stringify(ret));
        return ret;
      })
      .catch((err) => {
        const { code, message, response } = err;

        if (
          response === undefined
          && (code === 'ECONNABORTED' || message === 'Network Error')
        ) {
          return getOfflineData(url);
        }

        return Promise.reject(err);
      });
  };
};
