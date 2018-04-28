<template>
  <div class="business-index-page">
    <div class="g_nav_menu">
      <div class="m_logo">
        <img src="~assets/logo.png" alt="" width="155px"/>
      </div>
      <el-menu class="m_menu" backgroundColor="#eee" default-active="1">
        <el-menu-item index="1" style="padding-left: 0" @click="showBooksManager">
          <i class="el-icon-menu"></i>
          <span slot="title">商品管理</span>
        </el-menu-item>
        <el-menu-item index="2" style="padding-left: 0" @click="showCategoryManager">
          <i class="el-icon-menu"></i>
          <span slot="title">品类管理</span>
        </el-menu-item>
        <el-menu-item index="3" style="padding-left: 0" @click="showOrderManager">
          <i class="el-icon-menu"></i>
          <span slot="title">订单管理</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="g_content">
      <div class="m_user_info">
        <span>欢迎，{{managerInfo.username}}</span>
        <el-button class="u_button" type="text" @click="logout">退出</el-button>
      </div>
      <div class="m_content">
        <books-manager v-show="booksManagerShow"></books-manager>
        <category-manager v-show="categoryManagerShow"></category-manager>
        <order-manager v-show="orderManagerShow"></order-manager>
      </div>
    </div>
  </div>
</template>

<script>
  import BooksManager from "../back-manager/commodity/commodity-manager.vue";
  import CategoryManager from "../back-manager/category/category-manager.vue";
  import OrderManager from "../back-manager/order/order-manager.vue";
  import {getManagerInfomation, managerLogout} from "../../service/manager";

  export default {
    components: {
      BooksManager,
      CategoryManager,
      OrderManager
    },
    data() {
      return {
        booksManagerShow: true,
        categoryManagerShow: false,
        orderManagerShow: false,
        managerInfo: {}
      }
    },
    created() {
      this.showBooksManager();
      getManagerInfomation().then(res => {
        this.managerInfo = res.data;
      }, res => {
        this.$router.push({
          name: "Login"
        })
      })
    },
    methods: {
      showBooksManager() {
        this.booksManagerShow = true;
        this.categoryManagerShow = false;
        this.orderManagerShow = false;
      },
      showCategoryManager() {
        this.categoryManagerShow = true;
        this.booksManagerShow = false;
        this.orderManagerShow = false;
      },
      showOrderManager() {
        this.categoryManagerShow = false;
        this.booksManagerShow = false;
        this.orderManagerShow = true;
      },
      logout() {
        this.$confirm("退出登录？", "提示", {
          type: 'warning'
        }).then(() => {
          managerLogout().then(() => {
            this.$router.replace({
              name: 'Login'
            })
          })
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .business-index-page {
    display: flex;
    .g_nav_menu {
      display: inline-block;
      .m_logo {
        margin-top: 10px;
        height: 50px;
      }
      .m_menu {
        width: 150px;
      }
    }

    .g_content {
      display: flex;
      flex-direction: column;
      width: 100%;
      .m_user_info {
        width: 100%;
        height: 60px;
        line-height: 60px;
        font-size: 14px;
        text-align: end;
        .u_button {
          font-size: 14px;
          margin-right: 5px;
          margin-left: 10px;
        }
      }
      .m_content {
        width: 100%;
        height: 100%;
        padding: 10px;
        background-color: #fff;
      }
    }
  }


</style>
