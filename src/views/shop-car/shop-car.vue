<template>
  <div class="shop-car-page">
    <title-content></title-content>
    <nav-content></nav-content>
    <div class="g_content">
      <div class="m_goods_nav">
        <span class="u_goods_nav">商品详情</span>
      </div>
      <div class="m_table">
        <div class="B-toolbar-wrap">
          <div class="B-toolbar-condition">
            <el-button type="info" plain>删除</el-button>
          </div>
        </div>
        <el-table :data="shopCarList">
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="商品信息" prop="name"></el-table-column>
          <el-table-column label="单价"></el-table-column>
          <el-table-column label="数量"></el-table-column>
          <el-table-column label="合计"></el-table-column>
          <el-table-column label="操作"></el-table-column>
        </el-table>
        <div class="table_total">
          <span>总价：</span>
          <span>去结算</span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import TitleContent from '../common/title.vue';
  import NavContent from '../common/nav.vue';

  export default {
    components: {
      TitleContent,
      NavContent
    },
    data() {
      return {
        shopCarList: [
          {name: '1'},
          {name: '1'},
          {name: '1'},
          {name: '1'},
          {name: '1'},
          {name: '1'},
          {name: '1'},
          {name: '1'},
          {name: '1'},
          {name: '1'},
          {name: '1'},
          {name: '1'},
          {name: '1'},
          {name: '1'},
          {name: '1'},
          {name: '1'},
          {name: '1'},
          {name: '1'},
          {name: '1'}
        ]
      }
    },
    created() {
    },
    methods: {}
  }
</script>

<style lang="less" scoped>
  .g_content {
    padding: 0 50px;
    border-top: 2px solid #cccccc;
    .m_goods_nav {
      height: 50px;
      line-height: 50px;
    }
    .m_table {
      .table_total {
        float: right;
      }
    }
  }
</style>
