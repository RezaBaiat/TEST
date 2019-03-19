/** @format */

import React from 'react'
import {Provider} from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { I18nManager } from 'react-native';




I18nManager.allowRTL(false);
Navigation.setDefaultOptions({
    topBar:{
        visible:false,
        drawBehind: true,
        animate:false
    }
});

Navigation.registerComponentWithRedux('App', () => require("./src/App").default,Provider,store);


Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            stack: {
                id: 'App',
                children: [
                    {
                        component: {
                            name: 'App',
                        }
                    }
                ],
            }
        }
    });
});
