import Config from 'react-native-config';

export default class BuildConfig {

  static API_BASE_URL = Config.API_BASE_URL;

  static IS_DEBUG = Config.IS_DEBUG === 'true';

  static MOCK_ENABLED = Config.MOCK_ENABLED && Config.MOCK_ENABLED === 'true';
}
