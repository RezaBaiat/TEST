import strings from "./strings";
import colors from "./colors";
import drawables from './drawables'
import {StyleSheet} from "react-native";

const fontName = "W_homa_fixed";

const R = {
    strings,
    colors,
    drawables,
    fontName : fontName,
    styles : StyleSheet.create({
        iranSans:{
            fontFamily:fontName
        },btnStyle:{
            borderWidth:0,
            borderRadius:0
        },defaultETTitleTextStyle:{
            fontFamily:fontName
        },defaultLabelETTextStyle:{
            fontFamily:fontName
        }
    })
};



export default R;
