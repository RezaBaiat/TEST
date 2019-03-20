// @flow
import React from 'react';
import { Button, View } from 'react-native';
import { connect } from 'react-redux';
import BuildConfig from '../configs/BuildConfig';
import { BaseComponent, createMapStateToProps } from './BaseComponent';
import Actions from '../redux/actions/Actions';
import NetworkWorker from '../network/NetworkWorker';
import MockInterceptor from '../network/mock/MockInterceptor';

// Hi , i should be visible as doc in docs/activities/App.html!
// after you run docco src/activities/App.js
export class App extends BaseComponent {

  componentDidMount() {
    MockInterceptor.initialize();
  }

  render() {
    alert(`Network state changed , Connected ? ${Actions.isNetworkAvailable()}`);

    return (
      <View style={{ flexDirection: 'column' }}>
        <Button
          title="CHECK DEBUG MODE"
          onPress={() => {
            alert(`DEBUG MODE ENABLED ? ${BuildConfig.IS_DEBUG}`);
          }}
        />
        <Button
          title="TEST MOCK DATA"
          onPress={() => {
            NetworkWorker.callApi((text) => {
              alert(text);
            });
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
