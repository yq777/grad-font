/* eslint-disable no-eval */
/**
 * 日期工具类
 */
export default class DateUtils {

  /**
   * 日期对象转换为指定格式的字符串
   * @param formatStr 日期格式,格式定义如下 yyyy-MM-dd HH:mm:ss
   * @param date Date日期对象, 如果缺省，则为当前时间
   * YYYY/yyyy/YY/yy 表示年份
   * MM/M 月份
   * W/w 星期
   * dd/DD/d/D 日期
   * hh/HH/h/H 时间
   * mm/m 分钟
   * ss/SS/s/S 秒
   * @return string 指定格式的时间字符串
   */
  static format(formatStr, date) {
    formatStr = arguments[0] || "yyyy-MM-dd HH:mm:ss";
    date = arguments[1] || new Date();
    let str = formatStr;
    let Week = ['日', '一', '二', '三', '四', '五', '六'];
    str = str.replace(/yyyy|YYYY/, date.getFullYear());
    str = str.replace(/yy|YY/,
      (date.getYear() % 100) > 9 ? (date.getYear() % 100).toString() : '0' + (date.getYear() % 100));
    str = str.replace(/MM/, (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1));
    str = str.replace(/M/g, date.getMonth() + 1);
    str = str.replace(/w|W/g, Week[date.getDay()]);

    str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate());
    str = str.replace(/d|D/g, date.getDate());

    str = str.replace(/hh|HH/, date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours());
    str = str.replace(/h|H/g, date.getHours());
    str = str.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes());
    str = str.replace(/m/g, date.getMinutes());

    str = str.replace(/ss|SS/, date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds());
    str = str.replace(/s|S/g, date.getSeconds());

    return str;
  }

  /**
   * 通过偏移量查日期
   * @param offset 0 代表当天
   * @param date - yyyy-MM-dd 表示以哪个日期开始计算
   * @return string - yyyy-MM-dd
   */
  static getDateByOffset(offset, date) {
    let _date;
    let _offset = offset || 0;
    if (date) {
      _date = new Date(date);
    } else {
      _date = new Date();
    }

    _date.setDate(_date.getDate() + _offset);
    let yy = _date.getFullYear();
    let mm = _date.getMonth() + 1;
    let dd = _date.getDate();

    function preZero(num) {
      num = parseInt(num);
      if (num < 10) {
        return '0' + num;
      } else {
        return num;
      }
    }

    return yy + '-' + preZero(mm) + '-' + preZero(dd);
  }

  /**
   * number类型日期转字符串
   * @param dateNum
   * @param formatStr
   * @returns {*}
   */
  static numberToString(dateNum, formatStr) {
    if (!dateNum) {
      return null;
    }
    formatStr = formatStr || '-';
    let dateStr = dateNum.toString();
    return dateStr.substr(0, 4) + formatStr + dateStr.substr(4, 2) + formatStr + dateStr.substr(6, 2);
  }

  /**
   * 字符串类型转number
   * @param dateStr - 格式 yyyy-MM-dd
   * @return number
   */
  static StringToNumber(dateStr) {
    return parseInt(dateStr.replace(/-/g, ''));
  }

  /**
   * 字符串转换为日期对象
   * @param dateStr - 格式为yyyy-MM-dd HH:mm:ss，必须按年月日时分秒的顺序，中间分隔符不限制
   */
  static stringToDate(dateStr) {
    let data = dateStr;
    let reCat = /(\d{1,4})/gm;
    let t = data.match(reCat);
    t[1] = t[1] - 1;
    let _t = t.map(n => parseInt(n));
    return new Date(..._t);
  }

  /**
   * 日期对象转换为毫秒数
   * @param date - 日期对象
   */
  static dateToLong(date) {
    return date.getTime();
  }

  /**
   * 毫秒转换为日期对象
   * @param long - 日期的毫秒数
   */
  static longToDate(long) {
    return new Date(long);
  }

  /**
   * 取得当前日期所在月的最大天数
   */
  static maxDayOfDate(date) {
    date = arguments[0] || new Date();
    date.setDate(1);
    date.setMonth(date.getMonth() + 1);
    let time = date.getTime() - 24 * 60 * 60 * 1000;
    let newDate = new Date(time);
    return newDate.getDate();
  }

}
