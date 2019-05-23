// This file is a dummy example of how to use the Socket class // in [Socket.js](../configs/network/Socket.html)

import AbstractSocket from '../configs/network/Socket';
import Application from '../configs/Application';

const mSocket : AbstractSocket = new AbstractSocket(Application.API_BASE_URL, { autoConnect: true, reconnection: true, timeout: 15000 });

mSocket.onConnect(() => {
  mSocket.joinRoom('myroom');
});

mSocket.on('message', (data) => {
  alert(data);
});

export default class {


  static open() {
    if (!mSocket.isConnected()) {
      mSocket.forceConnect();
    }
  }

  static shutdown() {
    if (mSocket.isConnected()) {
      mSocket.forceDisconnect();
    }
  }


}
