<template>
  <div class="index-page">
    <div class="B-toolbar-wrap">
      <div class="B-toolbar-condition">
        <el-row :gutter="16">
          <el-col :span="12">
            <div class="m_left" v-if="ObjectUtils.isNullOrEmpty(userInfo)">
              <span @click="goToLogin">登录</span>
              <span @click="goToRegister">注册</span>
            </div>
            <div class="m_left" v-else>
              <span style="color: #409EFF">欢迎，{{userInfo.username}}</span>
              <span style="margin-left: 10px;cursor: pointer" @click="logout">退出</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="m_left m_right">
              <span @click="goToAboutUs">我的零食小站</span>
              <span @click="goToMyOrders">我的订单</span>
              <span @click="goToShopCar">购物车</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <img src="~assets/logo.png" width="170px" @click="goToIndex">
    <div class="g-menu">
      <el-menu class="m_menu" backgroundColor="#e6e6e6" v-loading="menuLoading">
        <el-menu-item :index="index.toString()" style="padding-left: 0" @click="goToGoodsList(item)" v-for="(item,index) in categoryList" :key="item.id">
          <i class="el-icon-menu"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </el-menu>
      <el-carousel trigger="click" type="card" class="u_carousel">
        <el-carousel-item style="text-align: center;margin-top: 20px;" v-for="item in hotList" :key="item.id">
          <img :src="`${imageUrl}${item.mainImage}`" width="300" height="300" @click="goToProductDetail(item)">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="g_recommend">
      <template v-for="item in productList">
        <div class="g_recommend_item" v-if="item.list.length > 0">
          <div class="u_title"><i class="el-icon-menu"></i> {{item.name}}</div>
          <ul class="m_li_wrap">
            <li class="m_image_wrap" v-if="item.list.length > 5" v-for="product in (item.list.slice(0,5))" :key="product.id" @click="goToProductDetail(product)">
              <div style="text-align: center">
                <img :src="`${imageUrl}${product.mainImage}`" width="157"/>
              </div>
              <div class="m-info">
                <div class="u-price">￥{{product.price}}</div>
                <div class="u-name">{{product.name}}</div>
                <div class="m-stock">
                  <span>库存：{{product.stock}}</span>
                  <span>销售量：{{product.saleStock}}</span>
                </div>
              </div>
            </li>
            <li class="m_image_wrap" v-if="item.list.length < 5" v-for="product in item.list" :key="product.id" @click="goToProductDetail(product)">
              <div style="text-align: center">
                <img class="u-img" :src="`${imageUrl}${product.mainImage}`"/>
              </div>
              <div class="m-info">
                <div class="u-price">￥{{product.price}}</div>
                <div class="u-name">{{product.name}}</div>
                <div class="m-stock">
                  <span>库存：{{product.stock}}</span>
                  <span>销售量：{{product.saleStock}}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  import TitleContent from '../common/title.vue';
  import NavContent from '../common/nav.vue';
  import StorageUtils from "../../utils/StorageUtils";
  import {getIndexCategory} from "../../service/category";
  import PagerModel from "../../model/pager";
  import {getFontProducts} from "../../service/product";
  import {imageUrl} from "../../config/config"
  import ObjectUtils from "../../utils/ObjectUtils";
  import {getUserInfo, getUserInfomation, Logout} from "../../service/user";

  export default {
    components: {
      TitleContent,
      NavContent
    },
    data() {
      return {
        menuLoading: false,
        categoryList: [],
        productList: [],
        hotList: [],
        pager: new PagerModel(),
        imageUrl,
        ObjectUtils,
        userInfo: {}
      }
    },
    created() {
      this.getCategoryList();
      this.getHotProductList();
      this.getUserInfo();
    },
    methods: {
      goToGoodsList(item) {
        StorageUtils.set("category", item);
        this.$router.push({
          name: 'GoodsList'
        })
      },
      getCategoryList() {
        let patientId = 0;
        this.menuLoading = true;
        getIndexCategory(patientId).then(res => {
          this.categoryList = res.data;
          this.productList = [];
          this.categoryList.forEach(item => {
            let keyword = '';
            let orderBy = 'sale_stock_desc';
            getFontProducts(this.pager.pageSize, this.pager.nowPage, keyword, item.id, orderBy).then(rs => {
              let data = {
                ...item,
                list: rs.data.list
              };
              this.productList.push(data);
            })
          });
          this.menuLoading = false;
        })
      },
      goToIndex() {
        this.$router.push({
          name: "Index"
        })
      },
      goToProductDetail(val) {
        let product = ObjectUtils.deepCopy(val);
        StorageUtils.set("product", product);
        this.$router.push({
          name: 'GoodsDetail'
        })
      },
      getHotProductList() {
        let keyword = '';
        let orderBy = 'sale_stock_desc';
        let categoryId = -1;
        getFontProducts(this.pager.pageSize, this.pager.nowPage, keyword, categoryId, orderBy).then(res => {
          if (res.data.list.length > 4) {
            this.hotList = res.data.list.slice(0, 4);
          } else {
            this.hotList = res.data.list;
          }
        })
      },
      goToLogin() {
        this.$router.replace({
          name: 'Login'
        });
      },
      goToRegister() {
        this.$router.replace({
          name: 'Register'
        })
      },
      goToAboutUs() {
        getUserInfomation().then(() => {
          this.$router.replace({
            name: 'AboutUs'
          })
        }, res => {
          if (res.status !== 0) {
            this.$message.error(res.msg);
          }
        })
      },
      goToMyOrders() {
        getUserInfomation().then(() => {
          this.$router.replace({
            name: 'myOrders'
          })
        }, res => {
          if (res.status !== 0) {
            this.$message.error(res.msg);
          }
        })
      },
      goToShopCar() {
        getUserInfomation().then(() => {
          this.$router.replace({
            name: 'ShopCar'
          })
        }, res => {
          if (res.status !== 0) {
            this.$message.error(res.msg);
          }
        })
      },
      logout() {
        this.$confirm("退出登录？", "提示", {
          type: 'warning'
        }).then(() => {
          Logout().then(() => {
            this.$message.success("退出成功");
            this.$router.replace({
              name: 'Login'
            })
          })
        });
      },
      getUserInfo() {
        getUserInfo().then(res => {
          this.userInfo = res.data;
        })
      }
    }
  }
</script>

<style lang="less">
  .index-page {
    .m_left {
      height: 50px;
      line-height: 50px;
      font-size: 17px;
      span {
        margin-right: 10px;
      }
      span:hover {
        cursor: pointer;
        color: #409EFF;
      }
    }

    .m_right {
      display: flex;
      flex-direction: row-reverse;
    }
    padding-bottom: 10px;
    .g-menu {
      display: flex;
      .m_menu {
        flex: 0 0 170px;
        .el-menu-item {
          position: relative;
          font-size: 17px;
          .arrow-right {
            position: absolute;
            top: 50%;
            right: 5px;
            margin-top: -9px;
          }
        }
      }
      .u_carousel {
        flex: 0 0 80%;
        margin-left: 50px;
        background-color: #cccccc;
      }
    }
    .g_recommend {
      .g_recommend_item {
        .u_title {
          height: 50px;
          line-height: 50px;
          border-bottom: 1px solid #3b838c;
          font-size: 20px;
          font-weight: 400;
          color: #3b838c;
        }
        .m_li_wrap {
          display: flex;
          flex-direction: row;
        }
        .m_image_wrap {
          flex: 0 0 19%;
          display: flex;
          flex-direction: column;
          height: 250px;
          margin-top: 15px;
          padding: 10px;
          margin-right: 15px;
          background-color: #FFF;
          .u-img {
            height: 157px;
          }
          .m-info {
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
        }
        .m_image_wrap:hover {
          cursor: pointer;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
        }
      }
    }
  }
</style>
