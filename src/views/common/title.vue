<template>
  <div class="title-page">
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
  </div>

</template>

<script>
  import ObjectUtils from "../../utils/ObjectUtils";
  import {getUserInfomation, Logout} from "../../service/user";

  export default {
    data() {
      return {
        userInfo: {},
        ObjectUtils
      }
    },
    created() {
      this.getUserInfo();
    },
    methods: {
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
        getUserInfomation().then(res => {
          this.userInfo = res.data;
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
