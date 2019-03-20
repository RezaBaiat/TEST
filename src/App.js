// @flow
import React from 'react';
import { Button, View } from 'react-native';
import { connect } from 'react-redux';
import BuildConfig from './configs/BuildConfig';
import { BaseComponent, createMapStateToProps } from './activities/BaseComponent';
import NetUtils from 'react-native-dev-kit/src/utils/NetUtils';

export class App extends BaseComponent {

  componentDidMount() {
    super.componentDidMount();
    NetUtils.addListener((isConnected => {
      alert(`Network state changed , Connected ? ${isConnected}`);
    }));
  }

  render() {
    return (
      <View>
        <Button
          title="App"
          onPress={() => {
            alert(`${BuildConfig.IS_DEBUG}`);
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
