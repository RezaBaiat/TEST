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
import AppPermissionManager from '../managers/AppPermissionManager';

// i should be visible as doc in docs/activities/App.html
// after you run docco src/activities/App.js
export class App extends BaseComponent {

  componentDidMount() {
    // MockInterceptor.initialize();
    AppPermissionManager.checkPermissions().then((granted : boolean) => {

    });
  }


  render() {

    alert(`Network state changed , Connected ? ${RootState.isNetworkAvailable()}`);

    return (
      <View style={{ flexDirection: 'column' }}>
        <Button
          title="CHECK DEBUG MODE"
          onPress={() => {
            alert(`DEBUG MODE ENABLED ? ${BuildConfig.IS_DEBUG}`);
          }}
        />
        <Text>{DataSource.getData()}</Text>
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
