import {
  FontModel,
  CheckType,
  Check
} from '../utils/framework';

/**
 * 分页model
 */
export default class PagerModel extends FontModel {
  // 当前页数
  @Check(CheckType.Number)
  nowPage = 1;

  // 总页数
  @Check(CheckType.Number)
  pages = 0;

  // 每页条数
  @Check(CheckType.Number)
  pageSize = 10;

  // 总条数
  @Check(CheckType.Number)
  total = 0;

  convert() {
    return this;
  }
}
