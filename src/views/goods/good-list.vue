<template>
  <div class="goods-list_page">
    <title-content></title-content>
    <nav-content></nav-content>
    <div class="g_content">
      <div class="m_goods_nav">
        <span class="u_goods_nav">商品列表</span>
      </div>
      <div class="g_goods_order">
        <div class="m_goods_order">推荐排序</div>
        <div class="m_goods_order">
          <div>价格</div>
          <div class="m_goods_caret">
            <i class="el-icon-caret-top icon-size"></i>
            <i class="el-icon-caret-bottom icon-size"></i>
          </div>
        </div>
        <div class="m_goods_order">
          <div>销量</div>
          <div class="m_goods_caret">
            <i class="el-icon-caret-top icon-size"></i>
            <i class="el-icon-caret-bottom icon-size"></i>
          </div>
        </div>
      </div>
      <ul class="g_goods">
        <li v-for="item in 7" :key="item" class="m_goods" @click="goToDetail">{{item}}</li>
      </ul>
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
    methods: {
      goToDetail() {
        this.$router.push({
          name: 'GoodsDetail'
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
          flex: 0 0 18%;
          background: #fff;
          margin: 0 20px 20px 0;
          padding: 20px;
        }
        .m_goods:hover {
          cursor: pointer;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
        }
      }
    }
  }

  [class*=" el-icon-"], [class^=el-icon-] {
    line-height: 0.7;
  }
</style>
