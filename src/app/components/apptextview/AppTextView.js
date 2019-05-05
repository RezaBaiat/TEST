// This class is an extension of it's related global UI components wrapper , which provides solutions for current react-native bugs
// and also handles the shouldComponentUpdate() function .
// this is currently empty but should be changed based on the App's needs .
// the App prefix means the class is Application specific

import TextWrapper, { Props as TextProps } from 'react-native-dev-kit/src/ui/wrappers/TextWrapper';

export interface Props extends TextProps{

}
export default class AppTextView extends TextWrapper<Props> {


}
