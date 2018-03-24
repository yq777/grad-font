<template>
  <div class="index-page">
    <title-content></title-content>
    <nav-content></nav-content>
    <el-row :gutter="32">
      <el-col :span="4">
        <el-menu class="m_menu" backgroundColor="#e6e6e6">
          <el-menu-item index="1" style="padding-left: 0" @click="goToGoodsList">
            <i class="el-icon-menu"></i>
            <span slot="title">坚果炒货</span>
            <i class="el-icon-arrow-right arrow-right"></i>
          </el-menu-item>
          <el-menu-item index="2" style="padding-left: 0">
            <i class="el-icon-menu"></i>
            <span slot="title">糖果巧克力</span>
            <i class="el-icon-arrow-right arrow-right"></i>
          </el-menu-item>
          <el-menu-item index="3" style="padding-left: 0">
            <i class="el-icon-menu"></i>
            <span slot="title">无糖食品</span>
            <i class="el-icon-arrow-right arrow-right"></i>
          </el-menu-item>
          <el-menu-item index="4" style="padding-left: 0">
            <i class="el-icon-menu"></i>
            <span slot="title">休闲食品</span>
            <i class="el-icon-arrow-right arrow-right"></i>
          </el-menu-item>
          <el-menu-item index="5" style="padding-left: 0">
            <i class="el-icon-menu"></i>
            <span slot="title">肉干肉脯</span>
            <i class="el-icon-arrow-right arrow-right"></i>
          </el-menu-item>
          <el-menu-item index="6" style="padding-left: 0">
            <i class="el-icon-menu"></i>
            <span slot="title">饼干蛋糕</span>
            <i class="el-icon-arrow-right arrow-right"></i>
          </el-menu-item>
          <el-menu-item index="7" style="padding-left: 0">
            <i class="el-icon-menu"></i>
            <span slot="title">蜜饯果干</span>
            <i class="el-icon-arrow-right arrow-right"></i>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <el-carousel height="392px" trigger="click" class="u_carousel">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3 style="line-height: 392px;text-align: center">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
    <div class="g_recommend">
      <div class="g_recommend_item">
        <div class="u_title"><i class="el-icon-menu"></i> 坚果炒货</div>
        <ul class="m_li_wrap">
          <li class="m_image_wrap" v-for="item in 5" :key="item">
            <img src=""/>
          </li>
        </ul>
      </div>
      <div class="g_recommend_item">
        <div class="u_title"><i class="el-icon-menu"></i> 糖果巧克力</div>
        <ul class="m_li_wrap">
          <li class="m_image_wrap" v-for="item in 5" :key="item">
            <img src=""/>
          </li>
        </ul>
      </div>
      <div class="g_recommend_item">
        <div class="u_title"><i class="el-icon-menu"></i> 无糖食品</div>
        <ul class="m_li_wrap">
          <li class="m_image_wrap" v-for="item in 5" :key="item">
            <img src=""/>
          </li>
        </ul>
      </div>
      <div class="g_recommend_item">
        <div class="u_title"><i class="el-icon-menu"></i> 休闲食品</div>
        <ul class="m_li_wrap">
          <li class="m_image_wrap" v-for="item in 5" :key="item">
            <img src=""/>
          </li>
        </ul>
      </div>
      <div class="g_recommend_item">
        <div class="u_title"><i class="el-icon-menu"></i> 肉干肉脯</div>
        <ul class="m_li_wrap">
          <li class="m_image_wrap" v-for="item in 5" :key="item">
            <img src=""/>
          </li>
        </ul>
      </div>
      <div class="g_recommend_item">
        <div class="u_title"><i class="el-icon-menu"></i> 饼干蛋糕</div>
        <ul class="m_li_wrap">
          <li class="m_image_wrap" v-for="item in 5" :key="item">
            <img src=""/>
          </li>
        </ul>
      </div>
      <div class="g_recommend_item">
        <div class="u_title"><i class="el-icon-menu"></i> 蜜饯果干</div>
        <ul class="m_li_wrap">
          <li class="m_image_wrap" v-for="item in 5" :key="item">
            <img src=""/>
          </li>
        </ul>
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
    methods: {
      goToGoodsList() {
        this.$router.push({
          name: 'GoodsList'
        })
      }
    }
  }
</script>

<style lang="less">
  .index-page {
    padding-bottom: 10px;
    .m_menu {
      width: 170px;

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
      width: 80%;
      background-color: #cccccc;
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
          justify-content: space-between;
        }
        .m_image_wrap {
          flex: 0 0 19%;
          height: 250px;
          margin-top: 15px;
          margin-right: 15px;
          background-color: #FFF;
        }
        .m_image_wrap:hover {
          cursor: pointer;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
        }
      }
    }
  }
</style>
