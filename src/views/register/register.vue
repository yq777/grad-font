<template>
  <div class="register_page">
    <el-row>
      <el-col :span="4">
        <div class="u_log">
          <img src=""/>
        </div>
      </el-col>
    </el-row>
    <div class="g_register_wrap">
      <div class="m_register_content">
        <div class="u_register_title">新用户注册</div>
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
            <el-input placeholder="请再次输入密码">
              <el-button class="u_tips" slot="prepend" type="text">确认密码：</el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="请输入电话号码">
              <el-button class="u_tips" slot="prepend" type="text">电话号码：</el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="请输入邮箱">
              <el-button class="u_tips" slot="prepend" type="text">邮箱：</el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="请输入密保问题">
              <el-button class="u_tips" slot="prepend" type="text">密保问题：</el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="请输入密保答案">
              <el-button class="u_tips" slot="prepend" type="text">密保答案：</el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100%;background-color: #F5F7FA;font-size: 13px">立即注册</el-button>
          </el-form-item>
          <el-form-item>
            <el-button style="float: right" type="text">
              <span class="u_footer_button" @click="goToLogin">已有账号去登录>></span>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <footer-content></footer-content>
  </div>

</template>

<script>
  import FooterContent from '../common/nav.vue';

  export default {
    components: {
      FooterContent
    },
    data() {
      return {}
    },
    created() {
    },
    methods: {
      goToLogin() {
        this.$router.push({
          name: 'Login'
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .register_page {
    .u_log {
      height: 50px;
      line-height: 50px;
    }
    .g_register_wrap {
      margin: 50px;
      .m_register_content {
        width: 30%;
        margin: 0 auto;
        border: 1px solid #ccc;
        box-shadow: 0 0 20px #ccc;
        background-color: #f6f6f6;
        .u_register_title {
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
            width: 80px;
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
