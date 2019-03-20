/** @format */

import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { I18nManager } from 'react-native';
import NetUtils from 'react-native-dev-kit/src/utils/NetUtils';
import store from './src/redux/Store';
import Actions from './src/redux/actions/Actions';


I18nManager.allowRTL(false);
NetUtils.init();
NetUtils.addListener(Actions.setNetworkState);
Navigation.setDefaultOptions({
  topBar: {
    visible: false,
    drawBehind: true,
    animate: false,
  },
});

Navigation.registerComponentWithRedux('App', () => require('./src/activities/App').default, Provider, store);


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
