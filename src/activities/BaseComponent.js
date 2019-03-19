// @flow
import {
  AppState, AppStateStatus, EmitterSubscription, ViewStyle,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { getTopScreenId } from '../AppNavigator';
import { InitialState } from '../redux/reducers/root';

export interface BaseComponentProps {
    componentId? : string,
    style? : ViewStyle
}
export class BaseComponent<P : BaseComponentProps> extends SmartComponent<P> {
    _appearListener : EmitterSubscription;

    _disapearListener : EmitterSubscription;

    mActivityState = 'not-set';

    componentDidMount() {
      AppState.addEventListener('change', this._handleAppStateChange);
      this._appearListener = Navigation.events().registerComponentDidAppearListener((event) => {
        if (event.componentId === this.props.componentId) {
          this.callResumeIfNeeded();
        }
      });
      this._disapearListener = Navigation.events().registerComponentDidDisappearListener((event) => {
        if (event.componentId === this.props.componentId) {
          this.callPauseIfNeeded();
        }
      });
      this.callResumeIfNeeded();
    }

    componentWillUnmount() {
      AppState.removeEventListener('change', this._handleAppStateChange);
      this._appearListener && this._appearListener.remove();
      this._disapearListener && this._disapearListener.remove();
      this.callPauseIfNeeded();
      this.onDestroy();
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

    onResume() {
      // console.log("onResume "+this.mc);
    }

    onPause() {
      // console.log("onPause "+this.mc);
    }

    onDestroy() {
      // console.log("onDestroy "+this.mc);
    }

    _handleAppStateChange = (nextAppState : AppStateStatus) => {
      if (getTopScreenId() == null) {
        return;
      }
      if (nextAppState === 'active') {
        if (getTopScreenId() === this.props.componentId) {
          this.callResumeIfNeeded();
        }
      } else if (nextAppState === 'background') {
        if (getTopScreenId() === this.props.componentId) {
          this.callPauseIfNeeded();
        }
      } else {
        alert(`EVENT = ${nextAppState}`);
      }
    }
}


/**
 *
 *
 * example :
 *
 * export default connect(createMapStateToProps((state)=>{
  const {isNetworkAvailable} = state.rootReducer;
  return{
    isNetworkAvailable
  }
  }))(App)
 *
 * this enables IDE to detect state types , preventing typo and enabled code completion
 * @param func
 */
export function createMapStateToProps(func : (state : {rootReducer : InitialState})=>{}) {
  return func;
}

/*
export const mapStateToProps = (state : {rootReducer : initialStateInterface}) =>{

    return{
        contacts : state.rootReducer.contacts
    }
};

export const mapDispatchToProps = (dispatch: any) =>{
    return{

    }
} */
