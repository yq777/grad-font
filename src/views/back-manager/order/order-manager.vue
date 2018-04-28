<template>
  <div class="books-manager-page">
    <div class="m_table">
      <el-table :data="booksData">
        <el-table-column label="订单号" prop="orderNo"></el-table-column>
        <el-table-column label="收件人" prop="receiverName"></el-table-column>
        <el-table-column label="订单状态" prop="statusDesc"></el-table-column>
        <el-table-column label="订单总价" prop="payment"></el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="showDetail(scope.row)">查看</el-button>
            <el-button type="text" v-show="scope.row.status === 20" @click="sendProduct(scope.row)">发货</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      class="m-page"
      :total="pager.total"
      layout="total, prev, pager, next"
      @current-change="onPageChange"
    ></el-pagination>
    <order-detail :show.sync="detailShow" :detailData="selectedOrder"></order-detail>
  </div>

</template>

<script>
  import OrderDetail from './children/order-detail.vue';
  import PagerModel from "../../../model/pager";
  import {getOrderList, sendGoods} from "../../../service/order";
  import ObjectUtils from "../../../utils/ObjectUtils";

  export default {
    components: {
      OrderDetail
    },
    data() {
      return {
        detailShow: false,
        booksData: [],
        pager: new PagerModel(),
        selectedOrder: {}
      }
    },
    created() {
      this._getOrderList();
    },
    methods: {
      showDetail(obj) {
        this.selectedOrder = ObjectUtils.deepCopy(obj);
        this.detailShow = true;
      },
      _getOrderList() {
        getOrderList(this.pager.pageSize, this.pager.nowPage).then(res => {
          this.pager = new PagerModel().map(res.data);
          this.pager.nowPage = res.data.pageNum;
          this.booksData = res.data.list;
        });
      },
      onPageChange(val) {
        this.pager.nowPage = val;
        this._getOrderList();
      },
      sendProduct(val) {
        this.$confirm("确认发货？", "提示", {
          type: "warning"
        }).then(() => {
          sendGoods(val.orderNo.toString()).then(() => {
            this.$message.success("发货成功");
            this._getOrderList();
          })
        })
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
