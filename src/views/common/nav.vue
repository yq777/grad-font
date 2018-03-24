<template>
  <el-row :gutter="32" class="m_nav">
    <el-col :span="4">
      <img src="">
    </el-col>
    <el-col :span="20">
      <el-input placeholder="请输入商品名" class="u_searchContent">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {}
    },
    created() {
    },
    methods: {}
  }
</script>

<style lang="less" scoped>
  .m_nav {
    height: 70px;
    line-height: 70px;
    .u_searchContent {
      width: 80%;
    }
  }
</style>
