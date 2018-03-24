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
            <img src="../../assets/icon.png"/>
          </div>
          <div class="u_img_small">
            <img src="../../assets/icon.png"/>
            <img src="../../assets/icon.png"/>
            <img src="../../assets/icon.png"/>
            <img src="../../assets/icon.png"/>
            <img src="../../assets/icon.png"/>
          </div>
        </el-col>
        <el-col :span="16" class="m_goods_info">
          <p>商品名</p>
          <p>价格</p>
          <p>库存</p>
          <p>数量：
            <el-input-number :min="1"></el-input-number>
          </p>
          <div>加入购物车</div>
        </el-col>
      </el-row>
      <div>
        <div>商品详情</div>
      </div>
    </div>
  </div>
</template>

<script>
  import TitleContent from '../common/title.vue';
  import NavContent from '../common/nav.vue';

  export default {
    components: {
      TitleContent,
      NavContent
    },
    data() {
      return {}
    },
    created() {
    },
    methods: {}
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
            background: #fff;
          }
          .u_img_small {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin-top: 5px;
            .u_img_small img {
              flex: 0 0 19%;
              background: #fff;
            }
          }
        }
      }
    }
  }
</style>
