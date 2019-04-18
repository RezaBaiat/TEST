import React from 'react';
import { View } from 'react-native';
import { BaseComponent } from './BaseComponent';
import AppTextView from '../components/core/AppTextView';
import AppTouchable from '../components/core/AppTouchable';
import { goBack } from '../AppNavigator';

export default class Screen2 extends BaseComponent {

  static className = 'Screen2';

  render() {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <AppTouchable onPress={goBack()}>
          <AppTextView text="Page2 , Press me to go back" />
        </AppTouchable>
      </View>
    );
  }
}
