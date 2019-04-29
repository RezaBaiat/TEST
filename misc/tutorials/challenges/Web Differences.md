##[Reducing Redux Boilerplate](https://redux.js.org/recipes/reducing-boilerplate)
- allows accessing redux dispatchers and states statically , instead of injecting them into every component , resulting in reduced boilerplate , number of files , less complexity , easier debug , cleaner and more readable code by a huge amount. 

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

