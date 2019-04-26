// Class which registers all screens and identifies which screen to run first when app started
// it also sets default options for navigates

import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { persistStore, persistCombineReducers, PersistConfig } from 'redux-persist';
import store from '../configs/redux/Store';
import { App } from '../scenes/App';

export default class Routes {

  static registerScreens() {

    // default options for [react-native-navigation-v2](https://github.com/wix/react-native-navigation)
    Navigation.setDefaultOptions({
      topBar: {
        visible: false,
        drawBehind: true,
        animate: false,
      },
    });

    // registers a screen with redux included
    Navigation.registerComponentWithRedux(App.className, () => require('../scenes/App').default, Provider, store);

    // identifies which screen to run first when application launched
    Navigation.events().registerAppLaunchedListener(() => {
      // since we are using redux-persist , we have to wait for it to load data from DB into our redux state
      persistStore(store, null, () => {
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

    });
  }

}
