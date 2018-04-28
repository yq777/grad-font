import {FontModel, CheckType, Check, throwErrorMessage} from "../utils/framework";
import StringUtils from "../utils/StringUtils";
import ArrayUtils from "../utils/ArrayUtils";

export default class ProductModel extends FontModel {

  @Check(CheckType.Number)
  id = null;

  @Check(CheckType.String)
  categoryId = '';

  @Check(CheckType.String)
  name = '';

  @Check(CheckType.String)
  subtitle = '';

  @Check(CheckType.String)
  mainImage = '';

  @Check(CheckType.Array)
  subImages = [];

  @Check(CheckType.String)
  content = '';

  @Check(CheckType.String)
  detail = '';

  @Check(CheckType.String)
  price = '';

  @Check(CheckType.Number)
  stock = 0;
  @Check(CheckType.Number)
  saleStock = 0;

  @Check(CheckType.Number)
  status = 1;

  verify() {
    if (StringUtils.isBlank(this.name)) {
      throwErrorMessage("请输入商品名");
      return false;
    }
    if (StringUtils.isBlank(this.subtitle)) {
      throwErrorMessage("请输入商品描述");
      return false;
    }
    if (StringUtils.isBlank(this.categoryId)) {
      throwErrorMessage("请选择商品分类");
      return false;
    }
    if (StringUtils.isBlank(this.price)) {
      throwErrorMessage("请输入商品价格");
      return false;
    }
    if (this.stock === 0) {
      throwErrorMessage("库存量需大于0");
      return false;
    }
    if (ArrayUtils.isNullOrEmpty(this.subImages)) {
      throwErrorMessage("请上传商品图片");
      return false;
    }
    if (StringUtils.isBlank(this.detail)) {
      throwErrorMessage("请输入商品详情");
      return false;
    }
    return true;
  }

  convert() {
    this.subImages = this.subImages.join(',');
    return this;
  }
}
