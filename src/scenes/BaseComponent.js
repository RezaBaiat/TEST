// All scenes (screens) should extend this component,
// they can use multiple valuable work around who are done in this file
// including redux's createMapStateToProps , onResume, onPause and...
import {
  AppState, AppStateStatus, EmitterSubscription, ViewStyle,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import SmartComponent from 'react-native-dev-kit/src/ui/SmartComponent';
import { InitialState } from '../redux/reducers/RootReducer';
import AppNavigator from '../routes/AppNavigator';


export interface BaseComponentProps {
  componentId? : string,
  style? : ViewStyle
}
// every screen should extend this class
export class BaseComponent<P : BaseComponentProps> extends SmartComponent<P> {
  appearListener : EmitterSubscription;

  disapearListener : EmitterSubscription;

  mActivityState = 'not-set';

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    this.appearListener = Navigation.events().registerComponentDidAppearListener((event) => {
      if (event.componentId === this.props.componentId) {
        this.callResumeIfNeeded();
      }
    });
    this.disapearListener = Navigation.events().registerComponentDidDisappearListener((event) => {
      if (event.componentId === this.props.componentId) {
        this.callPauseIfNeeded();
      }
    });
    this.callResumeIfNeeded();
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    this.appearListener && this.appearListener.remove();
    this.disapearListener && this.disapearListener.remove();
    this.callPauseIfNeeded();
  }

  callPauseIfNeeded() {
    if (this.mActivityState === 'paused') {
      return;
    }
    this.mActivityState = 'paused';
    this.onPause();
  }

  callResumeIfNeeded() {
    if (this.mActivityState === 'resumed') {
      return;
    }
    this.mActivityState = 'resumed';
    this.onResume();
  }


  // called when component first created or has returned from background
  onResume() {}

  // called when component has gone to background and is not visible
  onPause() {}

  _handleAppStateChange = (nextAppState : AppStateStatus) => {
    if (AppNavigator.getTopScreenId() == null) {
      return;
    }
    if (nextAppState === 'active') {
      if (AppNavigator.getTopScreenId() === this.props.componentId) {
        this.callResumeIfNeeded();
      }
    } else if (nextAppState === 'background') {
      if (AppNavigator.getTopScreenId() === this.props.componentId) {
        this.callPauseIfNeeded();
      }
    } else {
      alert(`EVENT = ${nextAppState}`);
    }
  }

}


/**
 * ```javascript
 *
 * export default connect(createMapStateToProps((state)=>{
  const {isNetworkAvailable} = state.rootReducer;
  return{
    isNetworkAvailable
  }
  }))(App)

 ```
*/
// this enables IDE to detect state types , preventing typo and enabled code completion
export function createMapStateToProps(func : (state : {rootReducer : InitialState})=>{}) {
  return func;
}
