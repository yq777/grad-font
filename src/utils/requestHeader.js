import Md5 from "./Md5";

const configHeader = {
  /** 请求数据格式，如： application/json */
  ContentType: 'application/json',

  /** 请求返回类型，如： HTML, JSON；默认返回 HTML */
  ReplyDataType: 'JSON',

  /** 请求时的客户端时间戳毫秒数 */
  ClientTime: () => {
    return new Date().getTime();
  },
  /** 针对以上 Header 参数的 MD5 验签 */
  Authorization: (str) => {
    return Md5.hex_md5(str).toUpperCase();
  }
};
export const makeRequestHeader = () => {
  let r = configHeader;

  let typeSort = ['Content-Type', 'X-Reply-Type', 'X-Client-Time'];

  let requestHeader = {};
  requestHeader['Content-Type'] = r.ContentType;
  requestHeader['X-Reply-Type'] = r.ReplyDataType;
  requestHeader['X-Client-Time'] = r.ClientTime();

  let authArray = [];
  for (let i = 0; i < typeSort.length; i++) {
    authArray.push('"' + typeSort[i] + '":"' + requestHeader[typeSort[i]] + '"');
  }
  let authStr = '{' + authArray.join(',') + '}';
  requestHeader['X-Authorization'] = r.Authorization(authStr);

  return requestHeader;
};

/**
 * 奇偶 + 掩值验签
 */
export const coverData = (params, reqHeader, time) => {
  params = params || 'N/A';
  let data = params === 'N/A' ? params : JSON.stringify(params);
  return {
    time: time,
    data: data
  };
};
