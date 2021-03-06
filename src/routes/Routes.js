// Class which registers all screens and identifies which screen to run first when app started
// it also sets default options for navigates and initializes react-redux
// every scene being registered should be wrapped by atleast redux and react-intl equivalent provider
// this will easily be done as is shown below

import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { persistStore, persistCombineReducers, PersistConfig } from 'redux-persist';
import React from 'react';
import store from '../configs/redux/Store';
import { Screen1 } from '../app/scenes/screen1/Screen1';
import Screen2 from '../app/scenes/screen2/Screen2';
import IntlProviderWrapper from '../configs/Locale';

const Providers = (props : {children : any}) => {
  const { children } = props;
  return (
    <Provider store={store}>
      <IntlProviderWrapper>
        {children}
      </IntlProviderWrapper>
    </Provider>
  );
};

export default class Routes {


  static registerScreens() {

    // registers a screen with redux included
    Navigation.registerComponentWithRedux(Screen1.className, () => require('../app/scenes/screen1/Screen1').default, Providers, store);
    Navigation.registerComponentWithRedux(Screen2.className, () => require('../app/scenes/screen2/Screen2').default, Providers, store);

    // identifies which screen to run first when application launched
    Navigation.events().registerAppLaunchedListener(() => {
      // default options for [react-native-navigation-v2](https://github.com/wix/react-native-navigation)
      Navigation.setDefaultOptions({
        topBar: {
          visible: false,
          drawBehind: true,
          animate: false,
        },
      });
      // since we are using redux-persist , we have to wait for it to load data from DB into our redux state
      persistStore(store, null, () => {
        Navigation.setRoot({
          root: {
            stack: {
              id: 'App',
              children: [
                {
                  component: {
                    name: Screen1.className,
                  },
                },
              ],
            },
          },
        });
      });

    });
  }

}
