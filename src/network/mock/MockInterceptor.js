// @flow
import 'es6-symbol/implement';
import FetchMock from 'react-native-fetch-mock';
import BuildConfig from '../../configs/BuildConfig';


// check out https://github.com/nock/nock for usages
export default class MockInterceptor {

  static initialize() {
    if (!BuildConfig.IS_DEBUG) {
      return;
    }
    global.fetch = new FetchMock(require('./MockData')).fetch;
  }
}
