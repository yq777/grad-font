<template>
  <div class="forget-password-page">
    <el-row>
      <el-col :span="4">
        <div class="u_log">
          <img src=""/>
        </div>
      </el-col>
    </el-row>
    <div class="g_forget_password_wrap">
      <div class="m_forget_password_content">
        <div class="u_forget_password_title">找回密码</div>
        <el-form class="m_form">
          <el-form-item>
            <el-input class="u_input" placeholder="请输入用户名">
              <el-button class="u_tips" slot="prepend" type="text">用户名：</el-button>
            </el-input>
          </el-form-item>
          <div class="u_tip">
            <span>密保问题(提示)：密保问题</span>
          </div>
          <el-form-item>
            <el-input class="u_input" placeholder="请输入密保答案">
              <el-button class="u_tips" slot="prepend" type="text">密保答案：</el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input class="u_input" placeholder="请输入新密码">
              <el-button class="u_tips" slot="prepend" type="text">新密码：</el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100%;background-color: #F5F7FA;font-size: 13px" @click="goToNext">下一步</el-button>
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
      goToNext() {
        this.$confirm('重置密码成功，马上登录？', '提示', {
          type: 'waring'
        }).then(() => {
          this.$router.replace({
            name: 'Login'
          })
        })
      }
    }
  }
</script>

<style lang="less">
  .forget-password-page {
    .u_log {
      height: 50px;
      line-height: 50px;
    }
    .g_forget_password_wrap {
      margin: 50px;
      .m_forget_password_content {
        width: 30%;
        margin: 0 auto;
        border: 1px solid #ccc;
        box-shadow: 0 0 20px #ccc;
        background-color: #f6f6f6;
        .u_forget_password_title {
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
          font-size: 13px;
          .u_tip {
            height: 30px;
          }
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
