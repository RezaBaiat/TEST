// This class is an extension of it's related global UI components wrapper , which provides solutions for current react-native bugs
// and also handles the shouldComponentUpdate() function .
// this is currently empty but should be changed based on the App's needs .
// the App prefix means the class is Application specific

import ImageWrapper, { Props as ImageProps } from 'react-native-dev-kit/src/ui/wrappers/ImageWrapper';

export interface Props extends ImageProps{

}
export default class AppImageView extends ImageWrapper<Props> {

}
