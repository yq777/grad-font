import axios from "axios";

export default class HttpUtils {

  static request(options) {
    let opts = Object.assign({}, options);

    return axios(opts).then((res) => {
      return Promise.resolve(res.data);
    });
  }

}
