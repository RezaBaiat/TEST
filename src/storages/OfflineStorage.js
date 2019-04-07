// @flow
import HashMap from 'react-native-dev-kit/src/objects/HashMap';

export default class OfflineStorage {

  static map = new HashMap<string, any>();

  static store(url : string, data : any) {
    this.map.put(url, data);
  }

  static get(url : string) : any {
    return this.map.get(url);
  }

  static contains(url : string) : boolean {
    return this.map.containsKey(url);
  }

}
