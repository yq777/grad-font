export default class MatcherUtils {
  static isPhone(str) {
    const pattern = /^(13[0-9]|14[5|7]|17[0-9]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]|19[0-9])\d{8}$/;
    return pattern.test(str);
  }

  static isEmail(str) {
    const pattern = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    return pattern.test(str);
  }
}
