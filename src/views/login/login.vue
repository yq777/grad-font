<template>
  <div class="login_page">
    <el-row>
      <el-col :span="4">
        <div class="u_log">
          <img src="~assets/logo.png" width="200px" @click="goToIndex"/>
        </div>
      </el-col>
    </el-row>
    <div class="g_login_wrap">
      <div class="m_login_content">
        <el-menu mode="horizontal" :default-active="activeIndex" @select="handlerSelect">
          <el-menu-item index="1" style="width: 50%;text-align: center">用户登录</el-menu-item>
          <el-menu-item index="2" style="width: 50%;text-align: center">管理员登录</el-menu-item>
        </el-menu>
        <el-form class="m_form" label-width="80px">
          <el-form-item label="用户名：" required>
            <el-input class="u_input" placeholder="请输入用户名" v-model="username">
            </el-input>
          </el-form-item>
          <el-form-item label="密码：" required>
            <el-input placeholder="请输入密码" v-model="password" type="password">
            </el-input>
          </el-form-item>
        </el-form>
        <div style="margin: 0 10px 10px 10px">
          <el-button style="width: 100%;background-color: #F5F7FA;font-size: 13px;" @click="_login">登录
          </el-button>
        </div>
        <div class="m_footer" v-show="activeIndex === '1'">
          <el-button style="float: left;margin-left: 10px" type="text">
            <span class="u_footer_button" @click="goToForgetPassword">忘记密码</span>
          </el-button>
          <el-button style="float: right;margin-right: 10px" type="text">
            <span class="u_footer_button" @click="goToRegister">免费注册</span>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import {Login} from "../../service/user";
  import StringUtils from "../../utils/StringUtils";
  import StorageUtils from "../../utils/StorageUtils";
  import {managerLogin} from "../../service/manager";

  export default {
    data() {
      return {
        username: '',
        password: '',
        activeIndex: '1'
      }
    },
    created() {
    },
    methods: {
      goToRegister() {
        this.$router.push({
          name: 'Register'
        })
      },
      goToForgetPassword() {
        this.$router.push({
          name: 'ForgetPassword'
        })
      },
      handlerSelect(val) {
        this.activeIndex = val;
        this.username = '';
        this.password = '';
      },
      _login() {
        if (StringUtils.isBlank(this.username)) {
          this.$message.error("用户名不能为空");
          return false;
        }
        if (StringUtils.isBlank(this.password)) {
          this.$message.error("密码不能为空");
          return false;
        }
        if (this.activeIndex === '1') {
          Login(this.username, this.password).then(res => {
            if (res.data.role === 0) {
              this.$router.replace({
                name: 'Index',
                query: {
                  state: 'login'
                }
              });
              StorageUtils.set("userInfo", res.data);
            }
          })
        } else if (this.activeIndex === '2') {
          managerLogin(this.username, this.password).then(res => {
            this.$router.replace({
              name: 'businessIndex'
            });
            StorageUtils.set("managerInfo", res.data);
          })
        }
      },
      goToIndex() {
        this.$router.replace({
          name: 'Index'
        })
      }
    }
  }
</script>

<style lang="less">
  .login_page {
    .u_log {
      height: 50px;
      line-height: 50px;
      margin: 20px 0 20px 0;
    }
    .g_login_wrap {
      margin: 0 50px 50px 50px;
      .m_login_content {
        width: 30%;
        margin: 0 auto;
        border: 1px solid #ccc;
        box-shadow: 0 0 20px #ccc;
        background-color: #f6f6f6;
        .u_login_title {
          height: 40px;
          line-height: 40px;
          border-bottom: 1px solid #ccc;
          font-size: 18px;
          font-weight: 700;
          color: #666;
          text-align: center;
        }
        .m_form {
          padding: 10px;
          .u_tips {
            width: 60px;
            text-align: right;
          }
        }
        .m_footer {
          background-color: #f6f6f6;
          padding: 5px;
          height: 60px;
          .el-button--text {
            font-size: 13px;
            color: #606266;
          }
          .u_footer_button:hover {
            color: #409EFF;
          }
        }
      }
    }
  }
</style>
