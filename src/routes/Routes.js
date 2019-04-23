import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import store from '../configs/redux/Store';
import { App } from '../scenes/App';

export default class Routes {

  static registerScreens() {

    // default options for react-native-navigation-v2
    Navigation.setDefaultOptions({
      topBar: {
        visible: false,
        drawBehind: true,
        animate: false,
      },
    });

    // registers a screen with redux included
    Navigation.registerComponentWithRedux(App.className, () => require('./src/scenes/App').default, Provider, store);

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
  }

}
