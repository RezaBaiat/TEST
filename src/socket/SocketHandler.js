import AbstractSocket from '../network/AbstractSocket';
import Configs from '../configs/Configs';

const mSocket : AbstractSocket = new AbstractSocket(Configs.API_BASE_URL, { autoConnect: true, reconnection: true, timeout: 15000 });

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
