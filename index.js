/** @format */

import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { I18nManager } from 'react-native';
import NetUtils from 'react-native-dev-kit/src/utils/NetUtils';
import rootStore from './src/redux/stores/RootStore';
import NetworkWorker from './src/network/NetworkWorker';
import RootDispatcher from './src/redux/dispatchers/RootDispatcher';
import DataSource from './src/storages/DataSource';

// this method changes language's RTL & LTR behavior
I18nManager.allowRTL(false);
// initializer for NetUtils , allow for static call of NetWorkUtils.isConnected()
NetUtils.init();
// listen for network state changes
NetUtils.addListener(RootDispatcher.setNetworkState);
DataSource.initialize();
// default options for react-native-navigation-v2
Navigation.setDefaultOptions({
  topBar: {
    visible: false,
    drawBehind: true,
    animate: false,
  },
});

// registers a screen with redux included
Navigation.registerComponentWithRedux('App', () => require('./src/activities/App').default, Provider, rootStore);

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
