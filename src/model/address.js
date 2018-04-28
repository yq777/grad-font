import {FontModel, CheckType, Check, throwErrorMessage} from "../utils/framework";
import StringUtils from "../utils/StringUtils";
import MatcherUtils from "../utils/MatcherUtils";

export default class AddressModel extends FontModel {

  @Check(CheckType.Number)
  id = null;

  @Check(CheckType.String)
  receiverName = '';

  @Check(CheckType.String)
  receiverPhone = '';

  @Check(CheckType.String)
  receiverProvince = '';

  @Check(CheckType.String)
  receiverCity = '';

  @Check(CheckType.String)
  receiverAddress = '';

  @Check(CheckType.String)
  receiverZip = '';

  verify() {
    if (StringUtils.isBlank(this.receiverName)) {
      throwErrorMessage("请输入收件人姓名");
      return false
    }
    if (StringUtils.isBlank(this.receiverCity)) {
      throwErrorMessage("请选择所在城市");
      return false;
    }
    if (StringUtils.isBlank(this.receiverProvince)) {
      throwErrorMessage("请选择所在城市");
      return false;
    }
    if (StringUtils.isBlank(this.receiverAddress)) {
      throwErrorMessage("请填写详细地址");
      return false;
    }
    if (StringUtils.isBlank(this.receiverPhone)) {
      throwErrorMessage("请填写收件人手机");
      return false;
    }
    if (!MatcherUtils.isPhone(this.receiverPhone)) {
      throwErrorMessage("请输入正确的手机号");
      return false;
    }
    return true;
  }

  convert() {
    return this;
  }
}
