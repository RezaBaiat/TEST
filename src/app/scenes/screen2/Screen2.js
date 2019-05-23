import React from 'react';
import { View } from 'react-native';
import { BaseComponent } from '../general/BaseComponent';
import Styles from './Styles';

export default class Screen2 extends BaseComponent {

  static className = 'Screen2';

  render() {
    return (
      <View style={Styles.root} />
    );
  }
}
