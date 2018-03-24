<template>
  <div class="login_page">
    <el-row>
      <el-col :span="4">
        <div class="u_log">
          <img src=""/>
        </div>
      </el-col>
    </el-row>
    <div class="g_login_wrap">
      <div class="m_login_content">
        <div class="u_login_title">用户登录</div>
        <el-form class="m_form">
          <el-form-item>
            <el-input class="u_input" placeholder="请输入用户名">
              <el-button class="u_tips" slot="prepend" type="text">用户名：</el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="请输入密码">
              <el-button class="u_tips" slot="prepend" type="text">密码：</el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100%;background-color: #F5F7FA;font-size: 13px">登录</el-button>
          </el-form-item>
          <el-form-item>
            <el-button style="float: left" type="text">
              <span class="u_footer_button" @click="goToForgetPassword">忘记密码</span>
            </el-button>
            <el-button style="float: right" type="text">
              <span class="u_footer_button" @click="goToRegister">免费注册</span>
            </el-button>
          </el-form-item>
        </el-form>
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
      goToRegister() {
        this.$router.push({
          name: 'Register'
        })
      },
      goToForgetPassword() {
        this.$router.push({
          name: 'ForgetPassword'
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
    }
    .g_login_wrap {
      margin: 50px;
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
