// All scenes (screens) should extend this component,
// they can use multiple valuable work around who are done in this file
// including redux's createMapStateToProps , onResume, onPause and...
import {
  AppState, AppStateStatus, EmitterSubscription, ViewStyle,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import SmartComponent from 'react-native-dev-kit/src/ui/SmartComponent';
import { compose } from 'redux';
import {
  injectIntl, intlShape, IntlProvider, addLocaleData,
} from 'react-intl';
import { connect } from 'react-redux';
import { InitialState } from '../../../redux/general/GlobalReducer';
import AppNavigator from '../../../routes/AppNavigator';
import { Screen1 } from '../screen1/Screen1';
import * as actions from '../../../redux/general/GlobalActions';
import GlobalActions from '../../../redux/general/GlobalActions';

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

  getString(key : string) : string {
    return this.props.intl.messages[key];
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

  };

  getGlobalActions() : GlobalActions {
    return this.props;
  }

}

// this enables IDE to detect state types , preventing typo and enabled code completion
export function createCompose(mapStateToProps : (state : {rootReducer : InitialState})=>{}) {
  const withConnect = connect(mapStateToProps, actions);
  return compose(
    withConnect,
    injectIntl,
  );
}
