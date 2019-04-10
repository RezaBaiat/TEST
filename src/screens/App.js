// @flow
import React from 'react';
import { Button, Text, View } from 'react-native';
import { connect } from 'react-redux';
import BuildConfig from '../configs/BuildConfig';
import { BaseComponent, createMapStateToProps } from './BaseComponent';
import NetworkWorker from '../network/NetworkWorker';
import MockInterceptor from '../network/mock/MockInterceptor';
import RootState from '../redux/states/RootState';
import DataSource from '../storages/DataSource';
import { InitialState } from '../redux/reducers/RootReducer';
import AppPermissionManager from '../handlers/AppPermissionManager';
import AppButton from '../components/core/AppButton';
import AppTextView from '../components/core/AppTextView';
import AppImageView, { createUrl } from '../components/core/AppImageView';
import R from '../resources/R';

// i should be visible as doc in docs/activities/App.html
// after you run docco src/activities/App.js
export class App extends BaseComponent {

  componentDidMount() {

    AppPermissionManager.checkPermissions().then((granted : boolean) => {

    });
  }


  render() {

    alert(`Network state changed , Connected ? ${RootState.isNetworkAvailable()}`);

    return (
      <View style={{ flexDirection: 'column' }}>
        <AppButton
          onPress={() => {
            alert(`DEBUG MODE ENABLED ? ${BuildConfig.IS_DEBUG}`);
          }}
          textColor="black"
          text="CHECK DEBUG MODE"
        />
        <AppImageView style={{ width: 250, height: 250, backgroundColor: 'black' }} src={createUrl('http://hdwpro.com/wp-content/uploads/2018/12/hd-wallpapers-1.jpg')} />
        <AppTextView text={DataSource.getData()} />
      </View>
    );
  }
}

export default connect(createMapStateToProps((state) => {
  const { isNetworkAvailable, data } = state.rootReducer;
  return {
    isNetworkAvailable,
    data,
  };
}))(App);
