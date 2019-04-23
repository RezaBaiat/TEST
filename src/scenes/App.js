// @flow
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { createUrl } from 'react-native-dev-kit/src/ui/core/Image';
import Configs from '../configs/Configs';
import { BaseComponent, createMapStateToProps } from './BaseComponent';
import RootState from '../redux/states/RootState';
import DataSource from '../storages/DataSource';
import AppPermissionManager from '../handlers/PermissionsHandler';
import AppButton from '../components/core/AppButton';
import AppTextView from '../components/core/AppTextView';
import AppImageView from '../components/core/AppImageView';
import Screen2 from './Screen2';
import AppNavigator from '../routes/AppNavigator';

export class App extends BaseComponent {

  static className = 'App';

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
