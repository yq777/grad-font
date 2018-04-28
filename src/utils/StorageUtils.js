import store from 'store';

/**
 * 本地存储工具类
 */
export default class StorageUtils {

  static get(key) {
    return store.get(key);
  }

  static set(key, value) {
    return store.set(key, value);
  }

  static remove(key) {
    return store.remove(key);
  }

  static clearAll() {
    return store.clearAll();
  }

}
