// @flow
import React from 'react';
import { Button, View } from 'react-native';
import { connect } from 'react-redux';
import BuildConfig from '../configs/BuildConfig';
import { BaseComponent, createMapStateToProps } from './BaseComponent';
import Actions from '../redux/actions/Actions';

export class App extends BaseComponent {
  render() {
    alert(`Network state changed , Connected ? ${Actions.isNetworkAvailable()}`);

    return (
      <View>
        <Button
          title="CHECK DEBUG MODE"
          onPress={() => {
            alert(`DEBUG MODE ENABLED ? ${BuildConfig.IS_DEBUG}`);
          }}
        />
      </View>
    );
  }
}

export default connect(createMapStateToProps((state) => {
  const { isNetworkAvailable } = state.rootReducer;
  return {
    isNetworkAvailable,
  };
}))(App);
