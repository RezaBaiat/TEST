import { Navigation } from 'react-native-navigation';

const mOpenScreens : {componentId : string, componentName : string}[] = [];

Navigation.events().registerComponentDidDisappearListener((component) => {
  mOpenScreens.forEach((value, index) => {
    if (value.componentId === component.componentId) {
      mOpenScreens.splice(index, 1);
    }
  });
});

Navigation.events().registerComponentDidAppearListener((component) => {
  mOpenScreens.push({
    componentId: component.componentId,
    componentName: component.componentName,
  });
});


export default class AppNavigator {


  static getTopScreenName() : string {
    return mOpenScreens[mOpenScreens.length - 1].componentName;
  }

  // returns componentId of the top screen
  static getTopScreenId() : string {
    return mOpenScreens[mOpenScreens.length - 1].componentId;
  }

  // pushes a screen to the stack
  static navigateTo(component : string, props? : {}) {
    Navigation.push(this.getTopScreenId(), {
      component: {
        name: component,
        passProps: props,
      },
    });
  }

  // clears stack and sets the root
  static setRoot(component : string, props? : {}) {
    Navigation.setRoot({
      root: {
        stack: {
          id: 'App',
          children: [
            {
              component: {
                name: component,
                passProps: props,
              },
            },
          ],
        },
      },
    });
  }

  static getActiveScreenByName(componentName : string) : {componentId : string, componentName : string} {
    for (const component of mOpenScreens) {
      if (component.componentName === componentName) {
        return component;
      }
    }
    return null;
  }


  static goBack(componentId : string) : Promise<any> {
    return Navigation.pop(componentId);
  }

}
