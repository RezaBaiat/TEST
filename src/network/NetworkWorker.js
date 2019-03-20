export default class NetworkWorker {
  static callApi(callBack : (text : string)=>void) {
    return fetch('http://www.pixelandcode.ir').then((res) => {
        return res.text();
    }).then((resString)=>{
        callBack(resString);
    });
  }
}
