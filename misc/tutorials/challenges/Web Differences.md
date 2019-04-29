##[Reducing Redux Boilerplate](https://redux.js.org/recipes/reducing-boilerplate)

https://stackoverflow.com/questions/38532433/react-redux-global-function-that-can-dispatch-actions

 allows accessing redux dispatchers and states statically , instead of injecting them into every component . resulting in :
 - Reduced boilerplate (some times can be huge)
 - You <u><b>CAN</b></u> combine actions,dispatchers which reduces file number of files , without adding any complexity
 - Less complexity 
 - Easier debug 
 - Cleaner and more readable code by a huge amount. 
 - You can then dispatch actions without any need to connect , which means background workers can also use dispatch without complexity which is a huge benefit.
 - Much easier to rename or remove functions in case of need
 - Much easier to find usages of the function
 - There is no down side effect
 
  Quotes from redux website :
 
 how ever it is recommended to keep action constants in a separate files in large projects because : 
 
 - It helps keep the naming consistent because all action types are gathered in a single place.
 - Sometimes you want to see all existing actions before working on a new feature. It may be that the action you need was already added by somebody on the team, but you didn't know.
 - The list of action types that were added, removed, and changed in a Pull Request helps everyone on the team keep track of scope and implementation of new features.
 - If you make a typo when importing an action constant, you will get undefined. Redux will immediately throw when dispatching such an action, and you'll find the mistake sooner.

    - <u>It is up to you to choose the conventions for your project. You may start by using inline strings, and later transition to constants, and maybe later group them into a single file. Redux does not have any opinion here, so use your best judgment<u/>
    
    - <u>Action creators have often been criticized as boilerplate. Well, you don't have to write them! You can use object literals if you feel this better suits your project. There are, however, some benefits for writing action creators you should know about.<u/>
    
    - <u>redux website is using store from redux-thunk and calling dispatch on it , but we are importing store and using it directly<u/>    
    
##Using [Builder Pattern](https://github.com/pixelsandcode/reactnative-dev-kit/blob/master/src/network/CallCreator.tsx) instead of [casual integration](https://github.com/pixelsandcode/web-boilerplate/blob/develop/src/network/HttpRequest.js)

- where input parameters can change alot due to usage , best design pattern is builder pattern . difference will be : 

````javascript

static postFile(url : string, headers = {}, data : any, config : AxiosRequestConfig = {}) {
    return this.execute(url, headers, 'POST', {
      ...config,
      data,
      headers: Object.assign(headers, { 'content-type': 'multipart/form-data' }),
    });
  }


.
.
.

static execute = (url : string, headers = {}, method = 'GET', config : AxiosRequestConfig) : AxiosPromise<AxiosResponse> => {
    return axios.get(url, {
      ...config,
      params: headers,
      method,
    }).then(res => NetworkWorker.statusChecking(res))
      .catch(error => NetworkWorker.errorHandling(error));
  };

```` 
vs 

````javascript
static postFile(url : string, headers = {}, data : any) : AxiosPromise<AxiosResponse> =>{
    return new CallCreator()
      .addHeaders(headers)
      .addBody(data)
      .post(url)
      .then((res) => { NetworkWorker.statusChecking(res); })
      .catch((error) => { NetworkWorker.errorHandling(error); });
  }
````

## Using static class as resources reference provider instead of requiring in every usage

````javascript
export default class images {
   static media_empty_view = require("../../assets/images/media_empty_view.png");
}
.
.
.
const R = {
  strings,
  colors,
  drawables: images,
  styles,
  animations,
};

export default R;
````

Resulting in 
````javascript
<Image src={R.images.media_empty_view}/>
````
Instead of 
````javascript
<Image src={require('../../assets/images/media_empty_view.png')}/>
````

## Use a language provider which IDE can detect keys . or provider a solution for that

