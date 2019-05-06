import React from 'react';
import { View } from 'react-native';
import { BaseComponent } from '../general/BaseComponent';
import AppTextView from '../../components/apptextview/AppTextView';
import AppTouchable from '../../components/apptouchable/AppTouchable';
import AppNavigator from '../../../routes/AppNavigator';
import Styles from './Styles';

export default class Screen2 extends BaseComponent {

  static className = 'Screen2';

  render() {
    return (
      <View style={Styles.root}>
        <AppTouchable onPress={AppNavigator.goBack()}>
          <AppTextView text="Page2 , Press me to go back" />
        </AppTouchable>
      </View>
    );
  }
}
