# ReactNative Boilerplate
This boilerplate is designed with mindset of performance in simplicity and tries to simplify routine tools . we try to wrap every thing up and staticify the whole project in a way that in order to change logics we have to pay visit to minimum files possible

## Tools
Tools used in this project are based on nodepack (https://github.com/pixelsandcode/nodepack)

What else we are using
-
- `react-native-navigation v2`:(https://github.com/wix/react-native-navigation) as router
- `native-base` https://github.com/GeekyAnts/NativeBase as UI Pack
- `react-native-vector-icons` (https://github.com/oblador/react-native-vector-icons) as icons feed
- `redux` (https://github.com/reduxjs/redux) as our state container
- `react-native-dev-kit` (https://github.com/pixelsandcode/reactnative-dev-kit) as the pixelandcode's react development kit repo
- `axios-mock-adapter` https://github.com/ctimmerm/axios-mock-adapter as the axios interceptor , used for mock
- `axios` https://github.com/axios/axios in replacement of fetch
- `rnfirebase` https://rnfirebase.io responsible for FCM push notifications
- `chai,sinon,mocha,istanbul,enzyme` as the prefered testing kit
- `redux-persist` as data persister (https://github.com/rt2zz/redux-persist)


## How to use

Android's manifest & gradle are up to date and ready to use and the project can be run on android with 

`yarn android` , `yarn android:prod`

or on ios with

`yarn ios` , `yarn ios:prod`

there are some more scripts worth mentioning:

`installNoDev` installs app without need to Nodejs server

`upgradeLatest` allows interactive libraries update

`doc` automated documentation generation (windows users should use bash for this command)



### App

This boilerplate tries to implement classes and methods as most static as possible . 
it also tries to take the most advantages of wrapping any thing that is possible to do so ,
resulting in ease of future changes. 

All necessary info can be found in the links below :

[Diagram](https://www.draw.io/?state=%7B%22ids%22:%5B%221vp3xHKTBvdHcTCxBSs2cbSECSas8l2Va%22%5D,%22action%22:%22open%22,%22userId%22:%22114712799140052122793%22%7D#G1vp3xHKTBvdHcTCxBSs2cbSECSas8l2Va) \
[Documentations](https://pixelsandcode.github.io/ReactNative-Boilerplate/docs/src/index.html)
