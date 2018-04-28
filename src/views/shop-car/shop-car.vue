<template>
  <div class="shop-car-page">
    <title-content></title-content>
    <nav-content></nav-content>
    <div class="g_content">
      <div class="m_goods_nav">
        <span class="u_goods_nav">商品详情</span>
      </div>
      <div class="m_table">
        <div class="B-toolbar-wrap">
          <div class="B-toolbar-condition">
            <el-button type="info" plain :disabled="disabled" @click="deleteProducts">删除</el-button>
          </div>
        </div>
        <el-table :data="shopCarList" @selection-change="handleSelectionChange">
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="商品信息" prop="productName" align="center">
            <template slot-scope="scope">
              <div class="m-info" @click="goToDetail(scope.row)">
                <img :src="`${imageUrl}${scope.row.productMainImage}`" width="100"/>
                <span class="u-name">{{scope.row.productName}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="单价" prop="productPrice" align="center"></el-table-column>
          <el-table-column label="数量" prop="quantity" align="center">
            <template slot-scope="scope">
              <el-input-number :min="1" controls-position="right" v-model="scope.row.quantity" @change="changeNum(scope.row)"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="合计" prop="productTotalPrice" align="center"></el-table-column>
        </el-table>
        <div class="table_total">
          <span v-show="disabled">总价：￥ 0 </span>
          <span v-show="!disabled">总价：￥ {{total}} </span>
          <span class="u-confirm" @click="goToConfirm">去结算</span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import TitleContent from '../common/title.vue';
  import NavContent from '../common/nav.vue';
  import {confirmProduct, deleteProducts, getCartList, updateCartNum} from "../../service/cart";
  import {imageUrl} from "../../config/config"
  import StorageUtils from "../../utils/StorageUtils";
  import ArrayUtils from "../../utils/ArrayUtils";

  export default {
    components: {
      TitleContent,
      NavContent
    },
    data() {
      return {
        shopCarList: [],
        imageUrl,
        cart: {},
        multipleSelection: [],
        disabled: true
      }
    },
    computed: {
      total() {
        let total = 0;
        this.multipleSelection.forEach(item => {
          total = total + item.productTotalPrice * 100;
        });
        return total / 100;
      }
    },
    created() {
      this.getProductList();
    },
    methods: {
      getProductList() {
        getCartList().then(res => {
          this.cart = res.data;
          this.shopCarList = res.data.cartProductVoList;
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
      },
      changeNum(item) {
        updateCartNum(item.productId, item.quantity).then(res => {
          this.cart = res.data;
          this.shopCarList = res.data.cartProductVoList;
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.disabled = ArrayUtils.isNullOrEmpty(this.multipleSelection);
      },
      deleteProducts() {
        let productIds = this.multipleSelection.map(m => m.productId);
        productIds = productIds.join(",");
        deleteProducts(productIds).then(res => {
          this.getProductList();
        })
      },
      goToConfirm() {
        if (ArrayUtils.isNullOrEmpty(this.multipleSelection)) {
          this.$message.warning("请选择商品");
          return false;
        }
        let productIds = this.multipleSelection.map(m => m.productId);
        productIds = productIds.join(",");
        confirmProduct(productIds).then(() => {
          this.$router.push({
            name: 'Shipping'
          })
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .g_content {
    padding: 0 50px;
    border-top: 2px solid #cccccc;
    .m_goods_nav {
      height: 50px;
      line-height: 50px;
    }
    .m_table {
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
    .m-info {
      display: flex;
      align-items: center;
      .u-name {
        margin-left: 10px;
        color: #999;
      }
      .u-name:hover {
        cursor: pointer;
        color: #3b838c;
      }
    }
  }
</style>
