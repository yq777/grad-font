<template>
  <div class="order-page">
    <div class="u_my_order_title">我的订单</div>
    <el-table :data="orderList">
      <el-table-column label="商品信息" min-width="500px" header-align="center">
        <template slot-scope="scope">
          <div class="m_goods_message m_goods_item">
            <span>订单号：1111111</span>
            <span>12.01</span>
            <span>收件人:1212</span>
            <span>订单状态：未支付</span>
          </div>
          <div>
            <img src=""/>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="单价" align="center">
        <template slot-scope="scope">
          <div class="m_goods_message">
            <span>订单总价</span>
          </div>
          <div>
            <span>￥2</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="数量" align="center">
        <template slot-scope="scope">
          <div class="m_goods_message"></div>
          <div>
            <span>2</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="合计" align="center">
        <template slot-scope="scope">
          <div class="m_goods_message">
            <span class="u_detail">查看详情>></span>
          </div>
          <div>
            <span>￥4</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        orderList: [{
          name: '1'
        }]
      }
    },
    created() {
    },
    methods: {}
  }
</script>

<style lang="less">
  .order-page {
    background-color: #f6f6f6;
    .u_my_order_title {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #ccc;
      font-size: 18px;
      font-weight: 700;
      color: #666;
      text-align: center;
    }
    .el-table td, .el-table th.is-leaf {
      background-color: #f6f6f6;
    }
    .el-table--small td {
      padding-top: 0;
    }
    .el-table .cell {
      padding: 0;
    }
    .m_goods_message {
      height: 40px;
      line-height: 40px;
      padding-left: 10px;
      text-align: center;
      background-color: #eee;
      .u_detail:hover {
        color: #409EFF;
        cursor: pointer;
      }
      span {
        margin-right: 10px;
      }
    }
    .m_goods_item {
      text-align: left;
    }
  }
</style>
