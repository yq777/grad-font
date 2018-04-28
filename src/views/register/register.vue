<template>
  <div class="register_page">
    <el-row>
      <el-col :span="4">
        <div class="u_log">
          <img src="~assets/logo.png" width="200px" @click="goToIndex"/>
        </div>
      </el-col>
    </el-row>
    <div class="g_register_wrap">
      <div class="m_register_content">
        <div class="u_register_title">新用户注册</div>
        <el-form class="m_form" label-width="100px">
          <el-form-item required label="用户名：">
            <el-input class="u_input" placeholder="请输入用户名" v-model="username" @blur="checkUsername">
            </el-input>
          </el-form-item>
          <el-form-item required label="密码：">
            <el-input type="password" placeholder="请输入密码" v-model="password">
            </el-input>
          </el-form-item>
          <el-form-item required label="确认密码：">
            <el-input type="password" placeholder="请再次输入密码" v-model="passwordAgain">
            </el-input>
          </el-form-item>
          <el-form-item required label="电话号码：">
            <el-input placeholder="请输入电话号码" v-model="phone">
            </el-input>
          </el-form-item>
          <el-form-item required label="邮箱：">
            <el-input placeholder="请输入邮箱" v-model="email">
            </el-input>
          </el-form-item>
          <el-form-item required label="密保问题：">
            <el-input placeholder="请输入密保问题" v-model="question">
            </el-input>
          </el-form-item>
          <el-form-item required label="密保答案：">
            <el-input placeholder="请输入密保答案" v-model="answer">
            </el-input>
          </el-form-item>
        </el-form>
        <div style="margin: 0 10px">
          <el-button style="width: 100%;background-color: #F5F7FA;font-size: 13px" @click="_register">立即注册</el-button>
        </div>
        <div class="m_go_login">
          <el-button type="text">
            <span class="u_footer_button" @click="goToLogin">已有账号去登录>></span>
          </el-button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import FooterContent from '../common/nav.vue';
  import {CheckValid, Register} from "../../service/user";
  import StringUtils from "../../utils/StringUtils";
  import MatcherUtils from "../../utils/MatcherUtils";

  export default {
    components: {
      FooterContent
    },
    data() {
      return {
        username: '',
        password: '',
        passwordAgain: '',
        phone: '',
        email: '',
        question: '',
        answer: '',
        usernamePass: false,
        MatcherUtils
      }
    },
    created() {
    },
    methods: {
      goToLogin() {
        this.$router.replace({
          name: 'Login'
        })
      },
      goToIndex() {
        this.$router.replace({
          name: 'Index'
        })
      },
      _register() {
        if (StringUtils.isBlank(this.username)) {
          this.$message.error("请输入用户名");
          return false;
        }
        if (StringUtils.isBlank(this.password)) {
          this.$message.error("请输入密码");
          return false;
        }
        if (this.password.length < 6) {
          this.$message.error("密码长度不能小于6");
          return false;
        }
        if (StringUtils.isBlank(this.passwordAgain)) {
          this.$message.error("请输入确认密码");
          return false;
        }
        if (this.password !== this.passwordAgain) {
          this.$message.error("两次输入的密码不一致");
          return false;
        }
        if (StringUtils.isBlank(this.phone)) {
          this.$message.error("请输入手机号");
          return false;
        }
        if (!MatcherUtils.isPhone(this.phone)) {
          this.$message.error("请输入正确的手机号");
          return false;
        }
        if (StringUtils.isBlank(this.email)) {
          this.$message.error("请输入邮箱");
          return false;
        }
        if (!MatcherUtils.isEmail(this.email)) {
          this.$message.error("请输入正确的邮箱");
          return false;
        }
        if (StringUtils.isBlank(this.question)) {
          this.$message.error("请输入密保问题");
          return false;
        }
        if (StringUtils.isBlank(this.answer)) {
          this.$message.error("请输入密保答案");
          return false;
        }
        CheckValid(this.username, "username").then(() => {
          Register({
            username: this.username,
            password: this.password,
            phone: this.phone,
            email: this.email,
            question: this.question,
            answer: this.answer
          }).then(() => {
            this.$message.success("注册成功");
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
  .register_page {
    .u_log {
      height: 50px;
      line-height: 50px;
      margin: 10px 0;
    }
    .g_register_wrap {
      margin: 0 50px 50px 50px;
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
        }
        .m_go_login {
          display: flex;
          flex-direction: row-reverse;
          margin-top: 15px;
          .el-button--text {
            margin-right: 10px;
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
