import { Navigation } from 'react-native-navigation'
import {I18nManager} from "react-native";
import {Options} from "react-native-navigation/lib/src/interfaces/Options";

const mOpenScreens : {componentId : string,componentName : string}[] = [];

Navigation.events().registerComponentDidDisappearListener((component)=>{
    mOpenScreens.forEach((value,index)=>{
        if (value.componentId === component.componentId){
            mOpenScreens.splice(index,1);
        }
    })
});

Navigation.events().registerComponentDidAppearListener((component)=>{
    mOpenScreens.push({
        componentId : component.componentId,
        componentName : component.componentName
    })
});

export function navigateTo(component : string,props? : {}) {
    Navigation.push(getTopScreenId(), {
        component: {
            name: component,
            passProps : props
        }
    });
}

export function setRoot(component : string,props? : {}) {
    Navigation.setRoot({
        root: {
            stack: {
                id: 'App',
                children: [
                    {
                        component: {
                            name: component,
                            passProps : props
                        }
                    }
                ],
            }
        }
    });
}

export function getActiveScreenByName(componentName : string) : {componentId : string,componentName : string} {
    for (let component of mOpenScreens){
        if (component.componentName === componentName){
            return component;
        }
    }
    return null;
}


export function goBack(componentId : string) : Promise<any>{
    return Navigation.pop(componentId);
}

export function getTopScreenName() : string {
    return mOpenScreens[mOpenScreens.length - 1].componentName;
}

export function getTopScreenId() : string {
    return mOpenScreens[mOpenScreens.length - 1].componentId;
}
