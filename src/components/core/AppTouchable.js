import React, { Component, PureComponent } from 'react';
import { View, ViewStyle, TouchableOpacity } from 'react-native';
import SmartComponent from 'smart_managers/src/ui/SmartComponent';

interface Props {
  style? : ViewStyle,
  children? : any,
  onPress : ()=>void,
  onLongPress? : ()=>void
}
export default class AppTouchable extends SmartComponent<Props> {

  render() {
    return (
      <TouchableOpacity {...this.props} delayLongPress={500}>
        {
          this.props.children
        }
      </TouchableOpacity>
    );
  }
}
