/**
 * 对象工具类
 */
export default class ObjectUtils {

  static isObject(object) {
    return object && {}.toString.call(object) === '[object Object]';
  }

  static isNullOrEmpty(object) {
    if (object === null || object === undefined) {
      return true;
    }
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  static deepCopy(object) {
    if (object === null) {
      return object;
    }
    if (typeof object !== 'object') {
      return object;
    }
    const newObj = {}.toString.call(object) === '[object Array]' ? [] : {};
    for (const key in object) {
      newObj[key] = typeof object[key] === 'object'
        ? this.deepCopy(object[key])
        : object[key];
    }
    return newObj;
  }

}
