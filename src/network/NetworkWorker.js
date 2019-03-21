export default class NetworkWorker {
  static callApi(callBack : (text : string)=>void) {
    return fetch('http://www.pixelsandcode.ir').then((res) => {
      return res.text();
    }).then((resString) => {
      callBack(resString);
    });
  }
}
