// @flow
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { createUrl } from 'react-native-dev-kit/src/ui/wrappers/ImageWrapper';
import {
  injectIntl, intlShape, IntlProvider, addLocaleData,
} from 'react-intl';
import { compose } from 'redux';
import Configs from '../configs/Configs';
import { BaseComponent, createMapStateToProps } from './BaseComponent';
import RootState from '../redux/states/RootState';
import AppPermissionManager from '../handlers/PermissionsHandler';
import AppButton from '../components/AppButton';
import AppTextView from '../components/AppTextView';
import AppImageView from '../components/AppImageView';
import Screen2 from './Screen2';
import AppNavigator from '../routes/AppNavigator';
import RootDispatcher from '../redux/dispatchers/RootDispatcher';
import Gateway from '../network/Gateway';
import APIClient from '../handlers/DataHandler';
import R from '../resources/R';
import styles from './Styles';

export class App extends BaseComponent {

  static className = 'App';

  componentDidMount() {
    AppPermissionManager.checkPermissions().then((granted : boolean) => {
      Gateway.updateData();
      RootDispatcher.runSagaTest('https://github.com/reduxjs/reselect/blob/master/README.md');
    });
  }

  render() {

    console.log(JSON.stringify(this.props.intl));
    console.log(this.getString(R.strings.error_connecting_network));

    alert(`Network state changed , Connected ? ${RootState.isNetworkAvailable()}`);

    return (
      <View style={styles.root}>
        <AppButton
          onPress={() => {
            alert(`DEBUG MODE ENABLED ? ${Configs.IS_DEBUG}`);
          }}
          textColor="black"
          text="Check debug mode"
        />
        <AppButton
          onPress={() => {
            AppNavigator.navigateTo(Screen2.className);
          }}
          textColor="black"
          text="Go to next page"
        />
        <AppImageView style={styles.imageview} src={createUrl('http://hdwpro.com/wp-content/uploads/2018/12/hd-wallpapers-1.jpg')} />
        <AppTextView text={APIClient.getData()} />
      </View>
    );
  }
}

const withConnect = connect(createMapStateToProps((state) => {
  const { isNetworkAvailable, data } = state.rootReducer;
  return {
    isNetworkAvailable,
    data,
  };
}));

export default compose(
  withConnect,
  injectIntl,
)(App);
