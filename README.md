# ReactNative Boilerplate
This boilerplate is designed with mindset of performance in simplicity and tries to simplify routine tools . we try to wrap things up and staticify the whole project in a way that in order to change logics we have to pay visit to only a few files

## Tools
tools used in this project are based on nodepack (https://github.com/pixelsandcode/nodepack)

What else we are using
-
- `react-native-navigation v2`:(https://github.com/wix/react-native-navigation) as router
- `react-native-elements` (https://github.com/react-native-training/react-native-elements) as UI Pack
- `react-native-vector-icons` (https://github.com/oblador/react-native-vector-icons) as icons feed
- `react-timer-mixin` (https://github.com/reactjs/react-timer-mixin) as default timer pattern
- `redux` (https://github.com/reduxjs/redux) as our state container

## How to use

Android's manifest & gradle are up to date and ready to use and the project can be run on android with 

`yarn android`

or on ios with

`yarn ios`

there are some more scipts worth mentioning:

`installNoDev` installs app without need to Nodejs server

`upgradeLatest` allows interactive libraries update

`doc` automated documentation generation


### App
this boilerplate tries to implement classes and methods as most static as possible . 
it also tries to take the most advantages of wrapping any thing that is possible to do so ,
resulting in ease of future changes. lets explore the app content a bit:
 
- project structure :

   `/src` all sources except index.js go inside this folder \
   `/assets` container folder of our fonts and images \
   `/misc` templates of docco documenter \
   `/docs` generated by docco containing the app's generated docs \
   `/test` all our tests go inside this folder \
   `/src/activities` contains all screens of the app \
   `/src/models` the containers of APIs models layer \
   `/src/network` reponsible folder for all network & API callbacks \
   `/src/redux` contains and all global state needs \
   `/src/ui` the container of all UI components wrapper , also containing the Views which are made by components \
   `/src/utils` the names tells it all ! :)
   
- index.js :

by default we only include project settings , screen registrations and workarounds here as this file is the first file will be compiled

registering classes are easy as hell! all you have to do is this:

`Navigation.registerComponentWithRedux('App', () => require('./src/App').default,Provider,store);`

and laters navigate to it by :

`AppNavigator.navigateTo('App')`

seriously piece of cake is an insult !

- AppNavigator.js :

if you want to route , you want to listen to route events, you want to go back , you want to change to stack root , this beautiful lady is who you will want to visit! it smartly simplifies the simplified react-native-navigation even more !

- Logger.js :

logging is also simplified using this class . so you have to only call :

`Logger.info('weather...could be better!')`  or  `Logger.error('my stomach hurts !')` or `Logger.silly('tonight is sunny!')`

- Store.js :

our Redux reducer(s) and its middlewares go here and we create the store inside it . the default root reducer is named `rootReducer`

- Actions.js :

Redux is an implementation of Observer pattern , but the world seems to go crazy when try to introduce it! 

let us simplify it for you:

```javascript
import store from '../Store';

/**
* this is how we can get our rootReducer's state (statically)
*/
 static getRootState() : InitialState{
     return store.getState().rootReducer;
 }
 
 /**
 * and this is how we dispatch an action (statically)
*/
 static setContacts(contacts : any){
         store.dispatch({
             type:ACTION_SET_CONTACTS,
             payload:contacts
         })
     }
 
```

that would be all!

- root.js

and finally this is our reducer responsible for handling actions dispatched from Actions.js

- colors.js , drawables.js , strings.js & R.js

R is shortened word for Resources (Hello Android) , colors.js , drawables.js and strings.js are holders of their names! \
yes we obviously keep our resources static too , so you can simply call them by:

`<Text style={}>R.strings.holla<Text/>`
