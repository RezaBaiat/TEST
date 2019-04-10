import React from 'react';
import { ViewStyle } from 'react-native';
import SmartImageView, { SmartImageViewState } from 'react-native-dev-kit/src/cachers/imagecachers/SmartImageView';
import SmartComponent from 'react-native-dev-kit/src/ui/SmartComponent';
import ArrayList from 'react-native-dev-kit/src/objects/ArrayList';
import R from '../../resources/R';


interface Props{
    src: any,
    resizeMode? : any,
    style: ViewStyle | ViewStyle[],
    opacity? : number, // 0.0 : 1.0,
    blurRadius? : number,
    fadeDuration? : number,
    defaultImage? : number | string,
    hasDefaultImage? : boolean,
    headers? : { [key: string]: string }
}

export default class AppImageView extends SmartComponent<Props> {

    static defaultProps = {
      defaultImage: R.drawables.media_empty_view,
      hasDefaultImage: true,
    };

    state={
      showDefaultImage: false
    };

    shouldComponentUpdate(nextProps, nextState, nextContext: any): boolean {

      const should = super.shouldComponentUpdate(nextProps, nextState, nextContext);
      if (should && nextProps.src !== this.props.src) {
        this.state.showDefaultImage = false;
      }
      return should;
    }

    render() {
      const { props } = this;
      const { src } = props;
      const resizeMode = props.resizeMode ? props.resizeMode : 'stretch';

      return (
        <SmartImageView
          {...props}
          style={[this.props.style, { opacity: props.opacity ? props.opacity : 1.0 }]}
          resizeMode={resizeMode}
          src={((this.state.showDefaultImage && this.props.hasDefaultImage) || !props.src) ? this.props.defaultImage : src}
          stateListener={this.stateListener}
        />
      );
    }

    stateListener = (newState : SmartImageViewState) => {
      switch (newState) {
        case SmartImageViewState.DOWNLOADING:
          this.setState((prevState : any) => ({
            ...prevState,
            showDefaultImage: true,
          }));
          break;
        case SmartImageViewState.LOADED:
          this.state.showDefaultImage = false;
          break;
        case SmartImageViewState.FAILED:
          this.setState((prevState : any) => ({
            ...prevState,
            showDefaultImage: true,
          }));
          break;
      }
    }
}

/**
 *  {...props}
 source={src}
 resizeMode={resizeMode}
 * @param url
 * @param useCache
 */

export const createUrl = (url : String) => {
  return SmartImageView.createUri(url);
};

export const createBase64 = (data : String, imageType : String = 'jpeg') => ({ uri: `data:image/${imageType};base64,{${data}}` });
