// This class creates a reference to the variables available in .env.staging or .env.production
// based on the build variant used to run the application

import Config from 'react-native-config';

export default class Application {

  static API_BASE_URL = Config.API_BASE_URL;

  static IS_DEBUG = Config.IS_DEBUG === 'true';

  static MOCK_ENABLED = Config.MOCK_ENABLED && Config.MOCK_ENABLED === 'true';

  static ROLLBAR_ACCESS_TOKEN = Config.ROLL_BAR_ID;
}
