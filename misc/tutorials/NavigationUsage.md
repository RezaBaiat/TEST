# Navigation

We use [react-native-navigation v2](https://github.com/wix/react-native-navigation) as our native router. 
Every scene is registered in [Router.js](../../src/routes/Routes.html) file and they should always extend
[BaseComponent](../../src/scenes/BaseComponent.html) . 
````javascript
Navigation.registerComponentWithRedux(App.className, () => require('./src/scenes/App').default, Provider, store);
````
Using this method , the component is automatically wrapped by redux . navigating between screens has became very easy thanks to well designed [AppNavigator](../../src/routes/AppNavigator.html)
. also it is considered best practice if each scene contain a static variable called `className`
, which equals to name of the scene 
````javascript
export class App extends BaseComponent {

  static className = 'App';
  .
  .
  .
````
[AppNavigator](../../src/routes/AppNavigator.html) automatically detects top screen and makes the job alot easier.  

# Usage

to push a screen into navigation stack , you should simply call 

````javascript
    AppNavigator.navigateTo(Screen2.className); 
````
and to go back from screen call :
````javascript
    AppNavigator.goBack();
````
`goBack()` method called from screen B will only go to screen A when screen B is not root of navigation stack , which then calling goBack() will hide the application from foreground.    
to make a scene root of navigation stack , simply call
````javascript
    AppNavigator.setRoot(ScreenB.className);
````

