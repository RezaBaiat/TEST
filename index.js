/** @format */

import { I18nManager } from 'react-native';
import NetUtils from 'react-native-dev-kit/src/utils/NetUtils';
import { persistStore, persistReducer } from 'redux-persist';
import NetworkWorker from './src/network/NetworkWorker';
import RootDispatcher from './src/redux/dispatchers/RootDispatcher';
import DataSource from './src/storages/DataSource';
import Configs from './src/configs/Configs';
import MockInterceptor from './src/network/mock/MockInterceptor';
import PushNotificationsHandler from './src/handlers/PushNotificationsHandler';
import strings from './src/resources/Strings';
import LocalNotifications from './src/configs/LocalNotifications';
import PushNotifications from './src/configs/PushNotifications';
import Routes from './src/routes/Routes';

// fix for god damn Symbol!
global.Symbol = require('core-js/es6/symbol');
require('core-js/fn/symbol/iterator');
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/array/find');

// initializes mock interceptor if enabled in .env.staging file
if (Configs.MOCK_ENABLED) {
  MockInterceptor.initialize();
}
// this method changes language's RTL & LTR behavior
I18nManager.allowRTL(false);
// selects app's language
strings.setLang('fa');
// initializer for NetUtils , allow for static call of NetWorkUtils.isConnected()
NetUtils.init();
// listen for network state changes
NetUtils.addListener(RootDispatcher.setNetworkState);
// datasource is where every component should ask for data. basically datasource handles data changes upon network state changes
DataSource.initialize();
// initializes Push Notifications listener
PushNotifications.initialize();
LocalNotifications.initialize();
// register screens
Routes.registerScreens();
