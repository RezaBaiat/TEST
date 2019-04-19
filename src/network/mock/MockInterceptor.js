// @flow
import Config from '../../configs/Config';
import { axios } from '../NetworkWorker';

// check out https://github.com/ctimmerm/axios-mock-adapter for more info
export default class MockInterceptor {

  static initialize() {
    if (!Config.IS_DEBUG) {
      return;
    }

    const MockAdapter = require('axios-mock-adapter');
    // This sets the mock adapter on the default instance
    const mock = new MockAdapter(axios);

    mock.onGet(Config.API_BASE_URL).reply(200, 'hello im a mocked response!');
  }
}
