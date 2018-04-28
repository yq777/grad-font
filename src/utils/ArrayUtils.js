/**
 * 数组工具类
 */
export default class ArrayUtils {

  static isArray(array) {
    return array && {}.toString.call(array) === '[object Array]';
  }

  static isNullOrEmpty(array) {
    return array === null || array.length === 0;
  }

  static toString(array, char = ',') {
    return array.join(char);
  }

  static add(array, item) {
    return array.push(item);
  }

  static remove(array, item) {
    let index = array.findIndex(n => n === item);
    if (index > -1) {
      array.splice(index, 1);
    }
    return array;
  }

  static removeAt(array, index) {
    return array.splice(index, 1);
  }

  static contains(array, item) {
    let index = array.findIndex(n => n === item);
    return index > -1;
  }

  static findIndex(array, item) {
    return array.findIndex(n => n === item);
  }

}
