<template>
  <div class="about-us-page">
    <title-content></title-content>
    <nav-content></nav-content>
    <el-tabs class="m_tabs" v-model="activeName" @select="changeTab">
      <el-tab-pane label="个人中心" name="userCenter">
        <div>
          <div class="u_my_info_title">我的信息</div>
          <el-form label-width="90px" class="m_form" v-show="!editInfoShow">
            <el-form-item style="padding-top: 10px" label="用户名：">
              <span>{{userInfo ? userInfo.username : ''}}</span>
            </el-form-item>
            <el-form-item label="电话：">
              <span>{{userInfo ? userInfo.phone : ''}}</span>
            </el-form-item>
            <el-form-item label="邮箱：">
              <span>{{userInfo ? userInfo.email : ''}}</span>
            </el-form-item>
            <el-form-item label="密保问题：">
              <span>{{userInfo ? userInfo.question : ''}}</span>
            </el-form-item>
            <el-form-item label="密保答案：">
              <span>{{userInfo ? userInfo.answer : ''}}</span>
            </el-form-item>
            <el-button class="u_edit_button" @click="updateInfo">编辑</el-button>
          </el-form>
          <el-form label-width="100px" class="m_form" v-show="editInfoShow">
            <el-form-item style="padding-top: 10px" label="用户名：">
              <span>{{userInfo.username}}</span>
            </el-form-item>
            <el-form-item label="电话：" required>
              <el-input style="width: 80%" placeholder="请输入电话号码" v-model="userInfo.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：" required>
              <el-input style="width: 80%" placeholder="请输入邮箱" v-model="userInfo.email"></el-input>
            </el-form-item>
            <el-form-item label="密保问题：" required>
              <el-input style="width: 80%" placeholder="请输入密保问题" v-model="userInfo.question"></el-input>
            </el-form-item>
            <el-form-item label="密保答案：" required>
              <el-input style="width: 80%" placeholder="请输入密保答案" v-model="userInfo.answer"></el-input>
            </el-form-item>
            <el-button class="u_edit_button" @click="update">修改</el-button>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的订单" name="myOrders">
        <orders></orders>
      </el-tab-pane>
      <el-tab-pane label="修改密码" name="updatePassword">
        <div>
          <div class="u_my_info_title">修改密码</div>
          <el-form label-width="100px" class="m_form">
            <el-form-item style="padding-top: 10px" label="原始密码：" required>
              <el-input style="width: 80%" type="password" placeholder="请输入原始密码" v-model="passwordOld"></el-input>
            </el-form-item>
            <el-form-item label="新密码：" required>
              <el-input style="width: 80%" type="password" placeholder="请输入新密码" v-model="passwordNew"></el-input>
            </el-form-item>
            <el-form-item label="确认密码：" required>
              <el-input style="width: 80%" type="password" placeholder="请输入新密码" v-model="confirmPassword"></el-input>
            </el-form-item>
            <el-button class="u_edit_button" @click="updatePassword">提交</el-button>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>

  </div>

</template>

<script>
  import NavContent from '../common/nav.vue';
  import TitleContent from '../common/title.vue';
  import Orders from '../order/order.vue';
  import {getUserInfo, resetPassword, updateUserInfo} from "../../service/user";
  import StringUtils from "../../utils/StringUtils";
  import StorageUtils from "../../utils/StorageUtils";
  import MatcherUtils from "../../utils/MatcherUtils";

  export default {
    components: {
      TitleContent,
      NavContent,
      Orders
    },
    data() {
      return {
        activeName: 'userCenter',
        editInfoShow: false,
        path: '',
        passwordOld: '',
        passwordNew: '',
        confirmPassword: '',
        userInfo: {}
      }
    },
    created() {
      let path = this.$route.path;
      this.activeName = /myOrder/.test(path) ? 'myOrders' : 'userCenter';
      this.userInfo = StorageUtils.get("userInfo");
    },
    methods: {
      updateInfo() {
        this.editInfoShow = true;
      },
      update() {
        let user = {
          id: this.userInfo.id,
          username: this.userInfo.username,
          password: this.userInfo.password,
          email: this.userInfo.email,
          phone: this.userInfo.phone,
          question: this.userInfo.question,
          answer: this.userInfo.answer,
          role: this.userInfo.role
        };
        if (StringUtils.isBlank(user.phone)) {
          this.$message.error("请输入手机号");
          return false;
        }
        if (!MatcherUtils.isPhone(user.phone)) {
          this.$message.error("请输入正确的手机号");
          return false;
        }
        if (StringUtils.isBlank(user.email)) {
          this.$message.error("请输入邮箱");
          return false;
        }
        if (!MatcherUtils.isEmail(user.email)) {
          this.$message.error("请输入正确的邮箱");
          return false;
        }
        if (StringUtils.isBlank(user.question)) {
          this.$message.error("请输入密保问题");
          return false;
        }
        if (StringUtils.isBlank(user.answer)) {
          this.$message.error("请输入密保答案");
          return false;
        }
        updateUserInfo(user).then(res => {
          this.$message.success("修改信息成功");
          StorageUtils.set("userInfo", res.data);
          this.editInfoShow = false;
        });
      },
      updatePassword() {
        if (StringUtils.isBlank(this.passwordOld)) {
          this.$message.error("请输入原始密码");
          return false;
        }
        if (StringUtils.isBlank(this.passwordNew)) {
          this.$message.error("请输入新密码");
          return false;
        }
        if (this.passwordNew !== this.confirmPassword) {
          this.$message.error("确认密码与新密码不一致");
          return false;
        }
        resetPassword(this.passwordOld, this.passwordNew).then(() => {
          this.$message.success("修改密码成功");
          this.$router.replace({
            name: 'Login'
          })
        });
      },
      changeTab(val) {
        getUserInfo().then(() => {
          this.$message.warning("用户未登录或登录过期");
        })
      }
    }
  }
</script>

<style lang="less">
  .about-us-page {
    .m_tabs {
      width: 80%;
      margin: 0 auto;
      .el-tabs__item {
        font-size: 17px;
      }
    }
    .u_my_info_title {
      width: 50%;
      height: 40px;
      line-height: 40px;
      margin: 0 auto;
      border-bottom: 1px solid #ccc;
      background-color: #f6f6f6;
      font-size: 18px;
      font-weight: 700;
      color: #666;
      text-align: center;
    }
    .m_form {
      width: 50%;
      margin: 0 auto;
      position: relative;
      padding-bottom: 50px;
      background-color: #f6f6f6;
      .u_edit_button {
        position: absolute;
        left: 50%;
        bottom: 20px;
      }
    }
  }
</style>
