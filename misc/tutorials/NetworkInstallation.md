# Network Installation 

You need to import [HttpRequest](/src/network/HttpRequest.html) for communicating with APIs.
This will provide set of [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) methods such as HttpRequest.post, HttpRequest.get, HttpRequest.put and ... to get data or submit data to the restful API.  

## Sample POST request

HttpRequest.post('/cars/create', { make: 'Mazda' })
  .then((response) => {
    //if successful
  })
  .catch((error) => {
    //if not
  });