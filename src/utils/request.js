import {Message} from 'element-ui';
import HttpUtils from "./httpUtils";
import {makeRequestHeader, coverData} from './requestHeader';

export const doPost = (url, params) => {
  let pa = Object.assign({}, params);
  let headers = makeRequestHeader();
  let data = coverData(pa, headers, headers['X-Client-Time']);
  return HttpUtils.request({
    method: 'POST',
    url: url,
    headers,
    data
  }).then((res) => {
    return new Promise((resolve, reject) => {
      if (res.status === 0) {
        resolve(res);
      } else {
        if (res.status === 10) {
          Message.error(res.msg);
          reject(res);
        } else if (res.msg === "用户未登录或登录已过期") {
          reject(res);
        } else {
          Message.error(res.msg);
        }
      }
    });
  });
};
