// this file takes actions needed to be taken
// upon network (state) change

import NetUtils from 'react-native-dev-kit/src/utils/NetUtils'
import RootDispatcher from '../redux/dispatchers/RootDispatcher'

export default class Health {
  static initialize () {
    NetUtils.addListener(RootDispatcher.setNetworkState)
  }
}
