import React, { Component, PureComponent } from 'react';
import { Container, Button, Text } from 'native-base';
import { View, ViewStyle } from 'react-native';
import SmartComponent from 'react-native-dev-kit/src/ui/SmartComponent';
import R from '../../resources/R';
import AppImageView from './AppImageView';

interface Props {
  text: string,
  textColor?: string,
  color?: string,
  onPress : ()=>void,
  style? : ViewStyle,
  textSize? : number,
  iconRight? : {resource: number, style:ViewStyle}
}
export default class AppButton extends SmartComponent<Props> {

  render() {

    const { props } = this;

    const textColor = props.textColor || R.colors.white;
    const text = props.text || '';
    const bgColor = props.color || R.colors.white;
    const textSize = props.textSize || 15;

    return (
      <Button {...props} onPress={this.props.onPress} delayLongPress={20000} style={[{ backgroundColor: bgColor }, props.style]} block>
        <Text style={{ color: textColor, fontSize: textSize }}>
          {text}
        </Text>
        {
          this.props.iconRight ? <AppImageView src={this.props.iconRight.resource} style={[{ marginTop: 'auto', marginBottom: 'auto' }, this.props.iconRight.style]} /> : null
        }
      </Button>
    );
  }

}
