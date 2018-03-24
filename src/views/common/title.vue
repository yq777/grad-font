<template>
  <div class="title-page">
    <div class="B-toolbar-wrap">
      <div class="B-toolbar-condition">
        <el-row :gutter="16">
          <el-col :span="12">
            <div class="m_left">
              <span @click="goToLogin">登录</span>
              <span @click="goToRegister">注册</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="m_left m_right">
              <span @click="goToAboutUs">我的零食小站</span>
              <span @click="goToMyOrders">我的订单</span>
              <span @click="goToShopCar">购物车(0)</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {}
    },
    created() {
    },
    methods: {
      goToLogin() {
        this.$router.push({
          name: 'Login'
        });
      },
      goToRegister() {
        this.$router.push({
          name: 'Register'
        })
      },
      goToAboutUs() {
        this.$router.push({
          name: 'AboutUs'
        })
      },
      goToMyOrders() {
        this.$router.push({
          name: 'myOrders'
        })
      },
      goToShopCar() {
        this.$router.push({
          name: 'ShopCar'
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .title-page {
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
  }
</style>
