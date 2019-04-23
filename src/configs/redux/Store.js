// our redux configurator file
// any preConfiguration and initialization to the redux and all it's relevants should be done here

import { createStore, combineReducers, compose } from 'redux';
import { persistStore, persistCombineReducers, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import reducer from '../../redux/reducers/RootReducer';

const config : PersistConfig = {
  key: 'root',
  storage,
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

const configureStore = () => createStore(combinedReducer, composeEnhancers());

const store = configureStore();

export default store;
