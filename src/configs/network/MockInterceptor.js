// Simple , yet powerful Mock Interceptor
// When initialized and in DEBUG_MODE will intercept requests on-fly
import Configs from '../Configs';
import { axios } from '../Gateway';

// Check out https://github.com/ctimmerm/axios-mock-adapter for more info
export default class MockInterceptor {

  // Initializing this - which can only be done in debug mode - will cause the intercepted urls to return the defined response
  static initialize() {
    if (!Configs.IS_DEBUG) {
      return;
    }

    const MockAdapter = require('axios-mock-adapter');
    // This sets the mock adapter on the default instance
    const mock = new MockAdapter(axios);

    mock.onGet(Configs.API_BASE_URL).reply(200, 'hello im a mocked response!');
  }
}
