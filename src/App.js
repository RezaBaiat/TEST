// @flow
import { Button, ThemeProvider } from 'react-native-elements';
import React, {Component} from "react";
import {View} from "react-native";

export default class App extends Component{

    s : string = "";
    name : string;

  render() {
      this.s = 1;
      this.s = 2;
      this.s = 2;

    return(
        <View>
          <Button title={"App"} onPress={()=>{

          }}/>
        </View>
    )
  }
}
