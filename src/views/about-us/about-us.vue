<template>
  <div class="about-us-page">
    <title-content></title-content>
    <nav-content></nav-content>
    <el-tabs class="m_tabs" v-model="activeName">
      <el-tab-pane label="个人中心" name="userCenter">
        <div>
          <div class="u_my_info_title">我的信息</div>
          <el-form label-width="90px" class="m_form" v-show="!editInfoShow">
            <el-form-item style="padding-top: 10px" label="用户名："></el-form-item>
            <el-form-item label="电话："></el-form-item>
            <el-form-item label="邮箱："></el-form-item>
            <el-form-item label="密保问题："></el-form-item>
            <el-form-item label="密保答案："></el-form-item>
            <el-button class="u_edit_button" @click="updateInfo">编辑</el-button>
          </el-form>
          <el-form label-width="90px" class="m_form" v-show="editInfoShow">
            <el-form-item style="padding-top: 10px" label="用户名：">
              <el-input style="width: 80%" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="电话：">
              <el-input style="width: 80%" placeholder="请输入电话号码"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input style="width: 80%" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item label="密保问题：">
              <el-input style="width: 80%" placeholder="请输入密保问题"></el-input>
            </el-form-item>
            <el-form-item label="密保答案：">
              <el-input style="width: 80%" placeholder="请输入密保答案"></el-input>
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
          <el-form label-width="90px" class="m_form">
            <el-form-item style="padding-top: 10px" label="原始密码：">
              <el-input style="width: 80%" placeholder="请输入原始密码"></el-input>
            </el-form-item>
            <el-form-item label="新密码：">
              <el-input style="width: 80%" placeholder="请输入新密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码：">
              <el-input style="width: 80%" placeholder="请输入新密码"></el-input>
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
        path: ''
      }
    },
    created() {
      let path = this.$route.path;
      console.log(path);
      this.activeName = /myOrder/.test(path) ? 'myOrders' : 'userCenter';
    },
    methods: {
      updateInfo() {
        this.editInfoShow = true;
      },
      update() {
        this.editInfoShow = false;
      },
      updatePassword() {
        this.$message.success("修改密码成功");
        this.$router.replace({
          name: 'Login'
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
