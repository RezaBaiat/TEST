import {createStore,combineReducers,compose} from 'redux'
import reducer from './reducers/root'

const rootReducer = combineReducers({
    rootReducer: reducer
});

let composeEnhancers = compose;

if (__DEV__){
    // @ts-ignore
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
    return createStore(rootReducer,composeEnhancers());
};

const store = configureStore();
export default store;
