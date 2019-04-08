// @flow
import BuildConfig from '../../configs/BuildConfig';
import { axios } from '../NetworkWorker';



// check out https://github.com/ctimmerm/axios-mock-adapter for more info
export default class MockInterceptor {

  static initialize() {
    if (!BuildConfig.IS_DEBUG) {
      return;
    }

    const MockAdapter = require('axios-mock-adapter');
    // This sets the mock adapter on the default instance
    const mock = new MockAdapter(axios);

    mock.onGet(BuildConfig.API_BASE_URL).reply(200, 'hello im a mocked response!');
  }
}
