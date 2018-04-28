<template>
  <div class="m-nav">
    <img src="~assets/logo.png" width="170px" height="42.5" @click="goToIndex">
    <template v-if="inputShow">
      <el-input placeholder="请输入商品名" class="u_searchContent" v-model="keyword">
        <el-button slot="append" icon="el-icon-search" @click="searchProduct"></el-button>
      </el-input>
    </template>
  </div>
</template>

<script>

  export default {
    props: {
      inputShow: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        keyword: ''
      }
    },
    created() {
    },
    methods: {
      goToIndex() {
        this.$router.push({
          name: "Index"
        })
      },
      searchProduct() {
        this.$emit("get-keyword", this.keyword)
      }
    }
  }
</script>

<style lang="less" scoped>
  .m-nav {
    display: flex;
    height: 50px;
    .u_searchContent {
      flex: 1;
      margin-left: 50px;
      margin-top: 2px;
    }
  }
</style>
