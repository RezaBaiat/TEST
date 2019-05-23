// @flow
import React from 'react';
import { View } from 'react-native';
import { BaseComponent, createCompose } from '../general/BaseComponent';
import AppPermissionManager from '../../../permissions/PermissionsHandler';
import styles from './Styles';

export class Screen1 extends BaseComponent {

  static className = 'Screen1';

  componentDidMount() {
    super.componentDidMount();
    AppPermissionManager.checkPermissions().then((granted : boolean) => {
      // do some thing now
    });
  }

  render() {

    return (
      <View style={styles.root} />
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
