const Parser = require('socket.io-parser');
const io = require('socket.io-client');
const { Manager } = require('socket.io-client');
const { Socket } = require('socket.io-client');

export interface ManagerOptions{
  path?: string, // name of the path that is captured on the server side (/socket.io)
  reconnection? : boolean, // whether to reconnect automatically (true)
  reconnectionAttempts? : number, // number of reconnection attempts before giving up (Infinity)
  reconnectionDelay? : number, // how long to initially wait before attempting a new reconnection (1000). Affected by +/- randomizationFactor, for example the default initial delay will be between 500 to 1500ms.
  reconnectionDelayMax? : number, // maximum amount of time to wait between reconnections (5000). Each attempt increases the reconnection delay by 2x along with a randomization as above
  randomizationFactor? : number, // randomizationFactor (Number) (0.5), 0 <= randomizationFactor <= 1
  timeout? : number, // connection timeout before a connect_error and connect_timeout events are emitted (20000)
  autoConnect? : boolean, // autoConnect (Boolean) by setting this false, you have to call manager.open whenever you decide it's appropriate
  query? : any, // additional query parameters that are sent when connecting a namespace (then found in socket.handshake.query object on the server-side)
  parser? : Parser, // the parser to use. Defaults to an instance of the Parser that ships with socket.io. See socket.io-parser.
  forceNew? : boolean, // whether to reuse an existing connection
}
// please see @https://github.com/socketio/socket.io-client/blob/master/docs/API.md#initialization-examples for more informations
export default class AbstractSocket {

  socket : Socket;


  /**
   * A new Socket instance is returned for the namespace specified by the pathname in the URL, defaulting to /. For example, if the url is http://localhost/users, a transport connection will be established to http://localhost and a Socket.IO connection will be established to /users
   * Query parameters can also be provided, either with the query option or directly in the url (example: http://localhost/users?token=abc).
   */
  constructor(url : string, options : ManagerOptions) {
    this.socket = io(url, options);
  }

  isConnected = () : boolean => this.socket.connected;

  onConnect = (cb : ()=>void) => {
    this.socket.on('connect', cb);
  };

  // Fired upon a successful reconnection
  onReconnected = (cb : (attemptNumber : number)=>void) => {
    this.socket.on('reconnect', cb);
  };

  onReconnectingAttemptStarted = (cb : (attemptNumber : number)=>void) => {
    this.socket.on('reconnecting', cb);
  };

  onReconnectError = (cb : (err : Error)=>void) => {
    this.socket.on('reconnect_error', cb);
  };

  onReconnectionFailed = (cb : ()=>void) => {
    this.socket.on('reconnect_failed', cb);
  };

  onPing = (cb : ()=>void) => {
    this.socket.on('ping', cb);
  };

  onPong = (cb : ()=>void) => {
    this.socket.on('pong', cb);
  };

  onConnectError = (cb : ()=>void) => {
    this.socket.on('connect_error', cb);
  };

  onConnectionTimedOut = (cb : ()=>void) => {
    this.socket.on('connect_timeout', cb);
  };

  onError = (cb : ()=>void) => {
    this.socket.on('error', cb);
  };

  // if (reason === 'io server disconnect') {
  //     // the disconnection was initiated by the server, you need to reconnect manually
  //     socket.connect();
  //   }
  // else the socket will automatically try to reconnect
  onDisconnect = (cb : (reason : string)=>void) => {
    this.socket.on('disconnect', cb);
  }

  forceConnect = () => {
    this.socket.connect();
  };

  forceDisconnect = () => {
    this.socket.close();
  };

  emit = (eventName : string, args : any, ackcb : ()=>void) => {
    this.socket.emit(eventName, args, ackcb);
  }

  on = (eventName : string, cb : (data : any)=>void) => {
    this.socket.on(eventName, cb);
  }

}
