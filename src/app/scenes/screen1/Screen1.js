// @flow
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { createUrl } from 'react-native-dev-kit/src/ui/wrappers/ImageWrapper';
import {
  injectIntl, intlShape, IntlProvider, addLocaleData,
} from 'react-intl';
import { compose } from 'redux';
import Application from '../../../configs/Application';
import { BaseComponent, createCompose } from '../general/BaseComponent';
import AppPermissionManager from '../../../permissions/PermissionsHandler';
import AppButton from '../../components/appbutton/AppButton';
import AppTextView from '../../components/apptextview/AppTextView';
import AppImageView from '../../components/appimageview/AppImageView';
import Screen2 from '../screen2/Screen2';
import AppNavigator from '../../../routes/AppNavigator';
import Gateway from '../../../configs/network/Gateway';
import R from '../../../resources/R';
import styles from './Styles';
import GeneralService from '../../../services/GeneralService';

export class Screen1 extends BaseComponent {

  static className = 'Screen1';

  componentDidMount() {
    super.componentDidMount();
    AppPermissionManager.checkPermissions().then((granted : boolean) => {
      // GeneralService.updateData();
      // RootDispatcher.runSagaTest('https://github.com/reduxjs/reselect/blob/master/README.md');
    });
  }

  render() {

    console.log(JSON.stringify(this.props.intl));
    console.log(this.getString(R.strings.error_connecting_network));

    /* alert(`Network state changed , Connected ? ${RootState.isNetworkAvailable()}`); */

    return (
      <View style={styles.root}>
        <AppButton
          onPress={() => {
            alert(`DEBUG MODE ENABLED ? ${Application.IS_DEBUG}`);
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
        <AppTextView text="APIClient.getData()" />
      </View>
    );
  }
}

export default createCompose((state) => {
  const { isNetworkAvailable, data } = state.rootReducer;
  return {
    isNetworkAvailable,
    data,
  };
})(Screen1);
