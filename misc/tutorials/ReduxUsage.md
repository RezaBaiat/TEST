# Redux Usage 

To understand what [Redux](https://github.com/reduxjs/redux)
 actually does ,let's assume you want to listen for network state change event.
this achieve this , best and probably first pattern comes to mind is observer pattern , so
you will need a registerer and a dispatcher who calls those registered call backs upon network state change. 
in this project our registerer lies in (`BaseComponent.js`) class . 

#Registration
````javascript
export class BaseComponent<P : BaseComponentProps> extends SmartComponent<P> {
.
.
.
export function createMapStateToProps(func : (state : {rootReducer : InitialState})=>{}) {
  return func;
}
````
This class is basically a [HOC](https://reactjs.org/docs/higher-order-components.html)
which does a lot of works for you , including registering to redux , basically any component who wants to use Redux should either extends this or import the createMapStateToProps from above, and then use it like this :

````javascript
import { connect } from 'react-redux';
export class App extends BaseComponent {
.
.
.
export default connect(createMapStateToProps((state) => {
  const { isNetworkAvailable } = state.rootReducer;
  return {
    isNetworkAvailable,
  };
}))(App);

````

Please note that when extending `BaseComponent.js` , the class itself does not use export default any more
 , the default export is now our connect method. now take a look this constant : 
 ````
const { isNetworkAvailable} = state.rootReducer;
  return {
    isNetworkAvailable,
  };
 ````
 Basically `isNetworkAvailable` is a predefined state variable in our redux `InitialState` (take a look at `RootReducer.js`) , when we 
 use it as a constant and return it in the connect method , we have magically registered to the variable changes.
 
 #Dispatching
 so now that we have registered to `isNetworkAvailable` , and let's say we are listening for network state changes from `NetUtils`, so where are the dispatchers and how to call them?
 take a look at (`RootDispatcher.js`) , unlike some online tutorials , using redux is not that terrifying
 using this method , all you have to do is to import 
 ```` javascript
 import rootStore from '../../configs/redux/RootStore';
 import RootActions from '../actions/RootActions';
 ````
 and create the action name if it doesnt exit in (`RootActions.js`) if it doesnt exist already (like `RootActions.ACTION_NETWORK_STATE_CHANGE`)
 and then call the dispatch on rootStore and put variables (if there are any) in the payload like this :
 
 ```` javascript
 static setNetworkState(isConnected : boolean) {
     rootStore.dispatch({
       type: RootActions.ACTION_NETWORK_STATE_CHANGE,
       payload: isConnected,
     });
   }
 ````
 
 Then the Redux will call our reducer method in (`RootReducer.js`) :
 ````javascript
 const reducer = (state = initialState, action: { type: any;payload:any }) => {
   switch (action.type) {
     case RootActions.ACTION_NETWORK_STATE_CHANGE:
       return {
         ...state,
         isNetworkAvailable: action.payload,
       };
       .
       .
       .
````
Ok , what then?  then the method :
````javascript
shouldComponentUpdate()
````
 of our (`App.js`) wil be called and if it returns true , our component's state changes and so it will re-render
 but that is not all ! in addition to all these magics , you can also access those variables in our global states in (`RootState.js`) statically , like this :
 ````javascript
 export default class {
 
   static getRootState() : InitialState {
     return rootStore.getState().rootReducer;
   }
 
   static isNetworkAvailable() : boolean {
     return this.getRootState().isNetworkAvailable;
   }
 
 }

 ````
 
 


  