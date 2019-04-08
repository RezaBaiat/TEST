import React, {Component, PureComponent} from 'react';
import {Text} from 'native-base';
import LangUtils from "react-native-dev-kit/src/utils/LangUtils";
import {TextProps, TextStyle} from "react-native";
import R from "../res/R";
import SmartComponent from 'react-native-dev-kit/src/ui/SmartComponent';

export interface Props extends TextProps{
    text: any,
    textColor?: any,
    backgroundColor?: any,
    fontSize?: any,
    style? : TextStyle,
    shadow? : {size:number,radius:number};
}
export default class AppTextView extends SmartComponent<Props>{

    state={
        text : ""
    };

    constructor(props : Props){
        super(props);
        this.state.text = props.text;
    }

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        this.state.text = nextProps.text;
    }

    setText(text : string){
        this.state.text = text;
        this.forceUpdate();
    }

    render(){
        let props = this.props;

        let text = this.state.text;
        let textColor = props.textColor ? props.textColor : null;
        let backgroundColor = props.backgroundColor ? props.backgroundColor : null;
        let fontSize = props.fontSize ? props.fontSize : null;
        let shadow = props.shadow ? props.shadow : {size:0,radius:0};

        //,textAlign: "center",textAlignVertical: "center"
        return (
          <Text {...props} style={[{fontSize:fontSize,color:textColor,backgroundColor:backgroundColor,textShadowColor: 'rgba(0, 0, 0, 0.75)',textShadowOffset: {width: -shadow.size, height: shadow.size},textShadowRadius:shadow.radius},props.style]} >{text}</Text>
        );
    }
}
