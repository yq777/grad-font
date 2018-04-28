<template>
  <div class="goods-list_page">
    <title-content></title-content>
    <nav-content @get-keyword="getKeyword" :inputShow="true"></nav-content>
    <div class="g_content">
      <div class="m_goods_nav">
        <span class="u_goods_nav">商品列表</span>
      </div>
      <div class="g_goods_order">
        <div class="m_goods_order">推荐排序</div>
        <div class="m_goods_order">
          <div>价格</div>
          <div class="m_goods_caret">
            <i class="el-icon-caret-top icon-size" :class="{active:orderBy === 'price_asc'}" @click="changeOrderBy('price_asc')"></i>
            <i class="el-icon-caret-bottom icon-size" :class="{active:orderBy === 'price_desc'}" @click="changeOrderBy('price_desc')"></i>
          </div>
        </div>
        <div class="m_goods_order">
          <div>销量</div>
          <div class="m_goods_caret">
            <i class="el-icon-caret-top icon-size" :class="{active:orderBy === 'sale_stock_asc'}" @click="changeOrderBy('sale_stock_asc')"></i>
            <i class="el-icon-caret-bottom icon-size" :class="{active:orderBy === 'sale_stock_desc'}" @click="changeOrderBy('sale_stock_desc')"></i>
          </div>
        </div>
      </div>
      <template v-if="productList.length>0">
        <ul class="g_goods">
          <li v-for="item in productList" :key="item.id" class="m_goods" @click="goToDetail(item)">
            <img :src="`${imageUrl}${item.mainImage}`" width="157"/>
            <div>
              <div class="u-price">￥{{item.price}}</div>
              <div class="u-name">{{item.name}}</div>
              <div class="m-stock">
                <span class="u-stock">库存：{{item.stock}}</span>
                <span class="u-sale-stock"> 销售量：{{item.saleStock}}</span>
              </div>
            </div>
          </li>
        </ul>
        <el-pagination
          class="m-page"
          :total="pager.total"
          layout="total, prev, pager, next"
          @current-change="onPageChange"
        ></el-pagination>
      </template>
      <template v-if="productList.length === 0">
        <div style="text-align: center">该分类下暂无商品</div>
      </template>
    </div>
  </div>
</template>

<script>
  import TitleContent from '../common/title.vue';
  import NavContent from '../common/nav.vue';
  import {getFontProducts} from "../../service/product";
  import PagerModel from "../../model/pager";
  import StorageUtils from "../../utils/StorageUtils";
  import {imageUrl} from "../../config/config";
  import ObjectUtils from "../../utils/ObjectUtils";

  export default {
    components: {
      TitleContent,
      NavContent
    },
    data() {
      return {
        category: {},
        orderBy: "price_asc",
        pager: new PagerModel(),
        productList: [],
        imageUrl
      }
    },
    created() {
      this.category = StorageUtils.get("category");
      this.getFontProductList();
    },
    methods: {
      goToDetail(val) {
        let product = ObjectUtils.deepCopy(val);
        StorageUtils.set("product", product);
        this.$router.push({
          name: 'GoodsDetail'
        })
      },
      getFontProductList() {
        let keyword = '';
        getFontProducts(this.pager.pageSize, this.pager.nowPage, keyword, this.category.id, this.orderBy).then(res => {
          this.productList = res.data.list;
          this.pager = new PagerModel().map(res.data);
          this.pager.nowPage = res.data.pageNum;
        })
      },
      changeOrderBy(val) {
        this.orderBy = val;
        this.getFontProductList();
      },
      onPageChange(val) {
        this.pager.nowPage = val;
        this.getFontProductList();
      },
      getKeyword(val) {
        getFontProducts(this.pager.pageSize, this.pager.nowPage, val, this.category.id, this.orderBy).then(res => {
          this.productList = res.data.list;
          this.pager = new PagerModel().map(res.data);
          this.pager.nowPage = res.data.pageNum;
        })
      }
    }
  }
</script>

<style lang="less">
  .goods-list_page {
    .g_content {
      padding: 0 50px;
      border-top: 2px solid #cccccc;
      .m_goods_nav {
        height: 50px;
        line-height: 50px;
      }
      .g_goods_order {
        display: flex;
        flex-direction: row;
        margin-bottom: 20px;
        .m_goods_order {
          display: flex;
          flex-direction: row;
          padding: 2px 5px;
          border: 1px solid #ccc;
          .m_goods_caret {
            display: flex;
            flex-direction: column;
            justify-content: center;
            .icon-size {
              font-size: 16px;
              &.active {
                color: #57a3f3;
              }
            }
            .icon-size:hover {
              cursor: pointer;
              color: #57a3f3;
            }
          }
        }
      }
      .g_goods {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        .m_goods {
          display: flex;
          flex-direction: column;
          flex: 0 0 18%;
          background: #fff;
          margin: 0 20px 20px 0;
          padding: 20px;
          .u-price {
            font-size: 16px;
            color: #e7380d;
          }
          .u-name {
            font-size: 15px;
            line-height: 1.5;
          }
          .m-stock {
            font-size: 13px;
            color: #666;
          }
        }
        .m_goods:hover {
          cursor: pointer;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
        }
      }
    }
    .m-page {
      text-align: center;
    }
  }

  [class*=" el-icon-"], [class^=el-icon-] {
    line-height: 0.7;
  }
</style>
