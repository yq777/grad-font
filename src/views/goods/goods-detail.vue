<template>
  <div class="good-detail-page">
    <title-content></title-content>
    <nav-content></nav-content>
    <div class="g_content">
      <div class="m_goods_nav">
        <span class="u_goods_nav">商品详情</span>
      </div>
      <el-row :gutter="16" class="g_goods_detail">
        <el-col :span="8" class="m_img">
          <div class="u_img_large">
            <img ref="img" :src="`${imageUrl}${productDetail.mainImage}`"/>
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
        currentImg: ''
      }
    },
    computed: {
      subImages() {
        return this.productDetail.subImages.split(',');
      }
    },
    created() {
      this.productDetail = StorageUtils.get("product");
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
      }
    }
  }
</script>

<style lang="less" scoped>
  .good-detail-page {
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
