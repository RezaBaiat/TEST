// This file , since it is the first file to be called , contains all
// initializations , pre configurations and global fixes except the one's for redux which lies
// in configs/redux folder

import { I18nManager } from 'react-native';
import NetUtils from 'react-native-dev-kit/src/utils/NetUtils';
import RootDispatcher from './src/redux/dispatchers/RootDispatcher';
import DataSource from './src/storages/DataSource';
import Configs from './src/configs/Configs';
import MockInterceptor from './src/network/mock/MockInterceptor';
import Strings from './src/resources/Strings';
import LocalNotifications from './src/configs/LocalNotifications';
import PushNotifications from './src/configs/PushNotifications';
import Routes from './src/routes/Routes';

// Fix for global Symbol error!
global.Symbol = require('core-js/es6/symbol');
require('core-js/fn/symbol/iterator');
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/array/find');

// Initializes mock interceptor if enabled in .env.staging file
if (Configs.MOCK_ENABLED) {
  MockInterceptor.initialize();
}
// This method changes language's RTL & LTR behavior
I18nManager.allowRTL(false);
// Selects app's language
Strings.setLang('fa');
// Initializer for NetUtils , allow for static call of NetWorkUtils.isConnected()
NetUtils.init();
// Listen for network state changes
NetUtils.addListener(RootDispatcher.setNetworkState);
// Datasource is where every component should ask for API data. basically DataSource handles cache and fetch strategies
DataSource.initialize();
// Initializes Push and Local Notifications listener
PushNotifications.initialize();
LocalNotifications.initialize();
// Register screens
Routes.registerScreens();
