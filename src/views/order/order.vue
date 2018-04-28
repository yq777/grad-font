<template>
  <div class="order-page">
    <div class="u_my_order_title">我的订单</div>
    <el-table :data="orderList">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-table :data="scope.row.orderItemVoList" :show-header="false" header-align="center">
            <el-table-column min-width="500">
              <template slot-scope="props">
                <div class="m-info">
                  <img class="u-img" :src="`${imageUrl}${props.row.productImage}`" width="100"/>
                  <span style="margin-left: 10px">{{props.row.productName}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column min-width="170">
              <template slot-scope="props">
                <span class="m-info">{{props.row.currentUnitPrice}}</span>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="props">
                <span class="m-info">{{props.row.quantity}}</span>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="props">
                <span class="m-info">{{props.row.totalPrice}}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-button @click="cancel(scope.row)" v-if="scope.row.status === 10" style="margin: 10px 0 10px 10px; float: right">
            取消订单
          </el-button>
          <span @click="cancel(scope.row)" v-if="scope.row.status === 0" style="margin: 10px 0 10px 10px; float: right">
            已取消
          </span>
          <el-button type="primary" @click="goToPay(scope.row)" v-if="scope.row.status === 10" style="margin: 10px 0; float: right">
            去支付
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="商品信息" min-width="400" header-align="center">
        <template slot-scope="scope">
          <div class="m_goods_message m_goods_item">
            <span>订单号：{{scope.row.orderNo}}</span>
            <span>{{scope.row.createTime}}</span>
            <span>收件人:{{scope.row.receiverName}}</span>
            <span>订单状态：{{scope.row.statusDesc}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="单价" align="center" min-width="100">
        <template slot-scope="scope">
          <div class="m_goods_message">
            <span>订单总价:￥{{scope.row.payment}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="数量" align="center">
      </el-table-column>
      <el-table-column label="合计" align="center">
      </el-table-column>
    </el-table>
    <el-pagination
      class="m-page"
      :total="pager.total"
      layout="total, prev, pager, next"
      @current-change="onPageChange"
    ></el-pagination>
  </div>

</template>

<script>
  import PagerModel from "../../model/pager";
  import {concelOrder, searchUserOrder} from "../../service/order";
  import {imageUrl} from "../../config/config";
  import StorageUtils from "../../utils/StorageUtils";

  export default {
    data() {
      return {
        orderList: [],
        pager: new PagerModel(),
        imageUrl,
        selectedOrder: {},
        detailShow: false
      }
    },
    created() {
      this.getOrderList();
    },
    methods: {
      getOrderList() {
        searchUserOrder(this.pager.nowPage, this.pager.pageSize).then(res => {
          this.orderList = res.data.list;
          this.pager = new PagerModel().map(res.data);
          this.pager.nowPage = res.data.pageNum;
        })
      },
      onPageChange(val) {
        this.pager.nowPage = val;
        this.getOrderList();
      },
      goToPay(item) {
        let qrUrl = `${item.imageHost}qr-${item.orderNo}.png`;
        let orderNo = item.orderNo;
        StorageUtils.set("payInfo", {orderNo, qrUrl});
        this.$router.push({
          name: 'Pay'
        })
      },
      cancel(item) {
        this.$confirm("确认取消订单？", "提示", {
          type: "warning"
        }).then(() => {
          concelOrder(item.orderNo.toString()).then(res => {
            this.$message.success("取消成功");
            this.getOrderList();
          });
        });
      }
    }
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
    .m_goods_message {
      height: 40px;
      line-height: 40px;
      padding-left: 10px;
      text-align: center;
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
    .m-info {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
