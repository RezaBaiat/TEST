/** @format */

import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { I18nManager } from 'react-native';
import NetUtils from 'react-native-dev-kit/src/utils/NetUtils';
import rootStore from './src/redux/stores/RootStore';
import NetworkWorker from './src/network/NetworkWorker';
import RootDispatcher from './src/redux/dispatchers/RootDispatcher';
import DataSource from './src/storages/DataSource';
import BuildConfig from './src/configs/BuildConfig';
import MockInterceptor from './src/network/mock/MockInterceptor';
import PushNotificationsHandler from './src/handlers/PushNotificationsHandler';
import strings from './src/resources/strings';

// fix for god damn Symbol!
global.Symbol = require('core-js/es6/symbol');
require('core-js/fn/symbol/iterator');
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/array/find');

// initializes mock interceptor if enabled in .env.staging file
if (BuildConfig.MOCK_ENABLED) {
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
PushNotificationsHandler.initialize();
// default options for react-native-navigation-v2
Navigation.setDefaultOptions({
  topBar: {
    visible: false,
    drawBehind: true,
    animate: false,
  },
});


// registers a screen with redux included
Navigation.registerComponentWithRedux('App', () => require('./src/screens/App').default, Provider, rootStore);

// identifies which screen to run first when application launched
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        id: 'App',
        children: [
          {
            component: {
              name: 'App',
            },
          },
        ],
      },
    },
  });
});
