<template>
  <div class="good-detail-page">
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
    <nav-content></nav-content>
    <div class="g_content">
      <div class="m_goods_nav">
        <span class="u_goods_nav">商品详情</span>
      </div>
      <el-row :gutter="16" class="g_goods_detail">
        <el-col :span="8" class="m_img">
          <div class="u_img_large">
            <img width="300px" ref="img" :src="`${imageUrl}${productDetail.mainImage}`"/>
          </div>
          <div class="u_img_small">
            <img v-for="item in subImages" :src="`${imageUrl}${item}`" :class="{active:item === currentImg}" style="margin-right: 10px" height="50" @mouseover="changeImage(item)"/>
          </div>
        </el-col>
        <el-col :span="16" class="m_goods_info">
          <p>商品名 : {{productDetail.name}}</p>
          <p>描述 : {{productDetail.subtitle}}</p>
          <p class="u-price">价格:￥{{productDetail.price}}</p>
          <p>库存:{{productDetail.stock}}</p>
          <p>数量：
            <el-input-number :min="1" :max="productDetail.stock" v-model="num"></el-input-number>
          </p>
          <div class="m-car">
            <span class="u-car" @click="addCart">加入购物车</span>
          </div>

        </el-col>
      </el-row>
      <div>
        <div class="m-detail">商品详情</div>
        <div class="m-info" v-html="productDetail.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import TitleContent from '../common/title.vue';
  import NavContent from '../common/nav.vue';
  import StorageUtils from "../../utils/StorageUtils";
  import {imageUrl} from "../../config/config";
  import {upsertCart} from "../../service/cart";
  import ObjectUtils from "../../utils/ObjectUtils";
  import {getUserInfo, getUserInfomation, Logout} from "../../service/user";

  export default {
    components: {
      TitleContent,
      NavContent
    },
    data() {
      return {
        productDetail: {},
        imageUrl,
        num: 1,
        currentImg: '',
        ObjectUtils,
        userInfo: {}
      }
    },
    computed: {
      subImages() {
        return this.productDetail.subImages.split(',');
      }
    },
    created() {
      this.productDetail = StorageUtils.get("product");
      this.getUserInfo();
    },
    methods: {
      changeImage(item) {
        this.currentImg = item;
        this.$refs.img.src = `${imageUrl}${item}`;
      },
      addCart() {
        upsertCart(this.productDetail.id, this.num).then(res => {
          this.$message.success("加入购物车成功");
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

<style lang="less" scoped>
  .good-detail-page {
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
    .g_content {
      padding: 0 50px;
      border-top: 2px solid #cccccc;
      .m_goods_nav {
        height: 50px;
        line-height: 50px;
      }
      .g_goods_detail {
        .m_img {
          .u_img_large {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 300px;
            background: #fff;
          }
          .u_img_small {
            display: flex;
            flex-direction: row;
            margin-top: 5px;
            .u_img_small img {
              background: #fff;
            }
            .active {
              border: #DF3033 solid 2px;
            }
          }
        }
        .m_goods_info {
          p {
            margin-top: 10px;
            color: #666;
          }
          .u-price {
            color: #DF3033;
          }
          .m-car {
            margin-top: 20px;
            .u-car {
              padding: 10px;
              background-color: #DF3033;
              color: #fff;
              font-weight: 700;
              cursor: pointer;
            }
          }
        }
      }
      .m-detail {
        margin-top: 20px;
        margin-bottom: 20px;
      }
      .m-info {
        background-color: #fff;
        text-align: center;
        padding: 10px;
      }
    }
  }
</style>
