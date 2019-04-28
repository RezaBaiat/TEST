// Our redux configuration file
// unlike other initializations , any preConfiguration and initialization related to the redux and all it's relevants should be done here
// any middleware for the redux will be created and added here in the middlewares object
// this file also exports store object and installs sagas if there are any

import {
  createStore, combineReducers, compose, applyMiddleware,
} from 'redux';
import { persistStore, persistCombineReducers, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import createSagaMiddleware from 'redux-saga';
import reducer from '../../redux/reducers/RootReducer';
import mySaga from '../../redux/sagas/SagaExample';

// main configuration for redux-persist
const config : PersistConfig = {
  key: 'root',
  storage,
  blacklist: ['navigation'], // navigation will not be persisted
};

const combinedReducer = persistCombineReducers(config, {
  rootReducer: reducer,
});

let composeEnhancers = compose;

/* eslint-disable */
if (__DEV__) {
  // @ts-ignore
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
/* eslint-enable */


// create the saga middleware and mount it on the Store
export const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const enhancers = [applyMiddleware(...middlewares)];

const configureStore = () => createStore(combinedReducer, composeEnhancers(...enhancers));

const store = configureStore();

// export const persistor = persistStore(store);

export default store;


// then run the saga . for example
sagaMiddleware.run(mySaga);
