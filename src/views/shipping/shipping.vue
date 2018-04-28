<template>
  <div class="shipping-page">
    <title-content></title-content>
    <nav-content></nav-content>
    <div class="g-address">
      <div class="m-has-address" :class="{active:item.id === addressSelected.id}" v-show="addressList.length > 0" v-for="item in addressList" :key="item.id" @click="selectedAddress(item)">
        <div class="u-name">{{item.receiverProvince.label}} {{item.receiverCity.label}} ({{item.receiverName}} 收)
        </div>
        <div class="m-info">
          <span class="u-phone">手机号：{{item.receiverPhone}}</span>
          <div class="u-address">详细地址：{{item.receiverAddress}}</div>
        </div>
        <div class="m-operator">
          <span class="u-edit" @click="addAddress('update',item)">编辑</span>
          <span class="u-delete" @click="deleteAddress(item)">删除</span>
        </div>
      </div>
      <div class="m-add-address" @click="addAddress('add')">
        <i class="el-icon-plus u-add"></i>
        <div class="u-new-address">添加新地址</div>
      </div>
    </div>
    <el-pagination
      class="m-page"
      :total="pager.total"
      layout="total, prev, pager, next"
      @current-change="onPageChange"
    ></el-pagination>
    <div class="g-product-list">
      <el-table :data="cart.cartProductVoList">
        <el-table-column label="商品信息" prop="productName" align="center">
          <template slot-scope="scope">
            <div class="m-info" @click="goToDetail(scope.row)">
              <img :src="`${imageUrl}${scope.row.productMainImage}`" width="100"/>
              <span class="u-name">{{scope.row.productName}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="单价" prop="productPrice" align="center"></el-table-column>
        <el-table-column label="数量" prop="quantity" align="center"></el-table-column>
        <el-table-column label="合计" prop="productTotalPrice" align="center"></el-table-column>
      </el-table>
      <div class="table_total">
        <span>总价：￥ {{cart.cartTotalPrice}} </span>
        <span class="u-confirm" @click="goToConfirm">提交订单</span>
      </div>
    </div>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form label-width="120px">
        <el-form-item label="收件人姓名" required>
          <el-input v-model="model.receiverName"></el-input>
        </el-form-item>
        <el-form-item label="所在城市" required>
          <el-cascader
            :options="province"
            v-model="selectedOptions">
          </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" required>
          <el-input v-model="model.receiverAddress"></el-input>
        </el-form-item>
        <el-form-item label="收件人手机" required>
          <el-input v-model="model.receiverPhone"></el-input>
        </el-form-item>
        <el-form-item label="邮政编码">
          <el-input v-model="model.receiverZip"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAddress" :loading="confirmLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import TitleContent from '../common/title.vue';
  import NavContent from '../common/nav.vue';
  import province from "./province";
  import AddressModel from "../../model/address";
  import ObjectUtils from "../../utils/ObjectUtils";
  import {deleteAddress, saveAddress, searchAddressList, updateAddress} from "../../service/address";
  import PagerModel from "../../model/pager";
  import StorageUtils from "../../utils/StorageUtils";
  import {imageUrl} from '../../config/config';
  import {getCheckedProductList} from "../../service/cart";
  import {createOrder, pay} from "../../service/order";

  export default {
    components: {
      TitleContent,
      NavContent
    },
    data() {
      return {
        addressList: [],
        dialogFormVisible: false,
        confirmLoading: false,
        province,
        imageUrl,
        selectedOptions: [],
        addressSelected: {},
        model: {},
        cart: {},
        pager: new PagerModel()
      }
    },
    created() {
      this.getAddressList();
      this.getProductList();
    },
    methods: {
      getAddressList() {
        searchAddressList(this.pager.pageSize, this.pager.nowPage).then(res => {
          this.pager = new PagerModel().map(res.data);
          this.pager.nowPage = res.data.pageNum;
          this.addressList = res.data.list;
          this.addressList.forEach(item => {
            let address = this.province.filter(m => m.value === item.receiverProvince)[0];
            item.receiverProvince = {value: address.value, label: address.label};
            let city = address.children.filter(n => n.value === item.receiverCity)[0];
            item.receiverCity = {value: city.value, label: city.label};
          })
        })
      },
      getProductList() {
        getCheckedProductList().then(res => {
          this.cart = res.data;
        })
      },
      addAddress(type, val) {
        if (type === 'add') {
          this.model = new AddressModel();
          this.selectedOptions = [];
          this.model.type = type;
        } else if (type === 'update') {
          let item = ObjectUtils.deepCopy(val);
          this.selectedOptions = [val.receiverProvince.value, val.receiverCity.value];
          this.model = new AddressModel().map(item);
          this.model.type = type;
        }
        this.dialogFormVisible = true;
      },
      saveAddress() {
        this.model.receiverProvince = this.selectedOptions[0]
        this.model.receiverCity = this.selectedOptions[1];
        let model = ObjectUtils.deepCopy(this.model);
        model = new AddressModel().map(model);
        if (model.verify()) {
          let pattern = /^[1-9][0-9]{5}$/;
          if (!pattern.test(model.receiverZip)) {
            this.$message.error("请输入正确的邮编");
            return false;
          }
          this.confirmLoading = true;
          if (this.model.type === 'add') {
            saveAddress(model.convert()).then(() => {
              this.$message.success("新建地址成功");
              this.getAddressList();
              this.confirmLoading = false;
              this.dialogFormVisible = false;
            }, () => {
              this.confirmLoading = false;
            })
          } else if (this.model.type === 'update') {
            updateAddress(model.convert()).then(() => {
              this.$message.success("更新地址成功");
              this.getAddressList();
              this.confirmLoading = false;
              this.dialogFormVisible = false;
            }, () => {
              this.confirmLoading = false;
            })
          }
        }
      },
      onPageChange(val) {
        this.pager.nowPage = val;
        this.getAddressList();
      },
      selectedAddress(val) {
        this.addressSelected = val;
      },
      deleteAddress(val) {
        this.$confirm("该操作将会删除您所选中的该地址，是否继续？", "提示", {
          type: "warning"
        }).then(() => {
          deleteAddress(val.id).then(() => {
            this.$message.success("删除成功");
            this.getAddressList();
          })
        })
      },
      goToConfirm() {
        if (ObjectUtils.isNullOrEmpty(this.addressSelected)) {
          this.$message.error("请选择收货地址");
          return false;
        }
        createOrder(this.addressSelected.id).then(res => {
          let orderNo = res.data.orderNo.toString();
          pay(orderNo).then(rs => {
            StorageUtils.set("payInfo", rs.data);
            this.$router.push({
              name: 'Pay'
            })
          })
        })
      },
      goToDetail(item) {
        let product = {
          id: item.productId,
          categoryId: item.productCategoryId,
          name: item.productName,
          subTitle: item.productSubtitle,
          mainImage: item.productMainImage,
          subImages: item.productSubImages,
          detail: item.productDetail,
          content: item.productContent,
          price: item.productPrice,
          stock: item.productStock,
          saleStock: item.productSaleStock,
          status: item.productStatus
        }
        StorageUtils.set("product", product);
        this.$router.push({
          name: "GoodsDetail"
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .shipping-page {
    .g-address {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 20px;
      .m-has-address {
        flex: 0 0 20%;
        border: #ccc dashed 3px;
        margin: 20px 20px 0 0;
        padding: 5px;
        &.active {
          border: #DF3033 dashed 3px;
        }
        .u-name {
          border-bottom: #ccc solid 1px;
        }
        .m-operator {
          display: flex;
          justify-content: flex-end;
          .u-edit {
            margin-right: 10px;
            cursor: pointer;
          }
          .u-edit:hover {
            color: #57a3f3;
          }
          .u-delete {
            margin-right: 10px;
            cursor: pointer;
          }
          .u-delete:hover {
            color: #57a3f3;
          }
        }
      }
      .m-add-address {
        flex: 0 0 20%;
        margin: 20px 20px 0 0;
        padding: 5px;
        text-align: center;
        border: #ccc dashed 3px;
        .u-add {
          font-size: 28px;
          color: #8c939d;
          line-height: 60px;
          text-align: center;
        }
        .u-new-address {
          font-size: 17px;
          color: #666;
          margin-left: 5px;
          margin-bottom: 16px;
        }
      }
    }
    .m-page {
      text-align: center;
    }
    .g-product-list {
      margin-top: 20px;
      .m-info {
        display: flex;
        align-items: center;
        margin-left: 10px;
        .u-name {
          margin-left: 10px;
          color: #999;
        }
        .u-name:hover {
          cursor: pointer;
          color: #3b838c;
        }
      }
      .table_total {
        float: right;
        margin-top: 20px;
        .u-confirm {
          margin-left: 10px;
          padding: 10px;
          background-color: #DF3033;
          color: #fff;
          font-weight: 700;
          cursor: pointer;
        }
      }
    }
  }
</style>
