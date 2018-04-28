<template>
  <right-aside title="订单详情" :show.sync="asideShow" :show-footer="false">
    <el-form label-width="80px">
      <el-form-item label="订单号">
        <span>{{data.orderNo}}</span>
      </el-form-item>
      <el-form-item label="创建时间">
        <span>{{data.createTime}}</span>
      </el-form-item>
      <el-form-item label="收件人">
        <span>{{data.receiverName}}</span>
      </el-form-item>
      <el-form-item label="订单状态">
        <span>{{data.statusDesc}}</span>
      </el-form-item>
      <el-form-item label="支付方式">
        <span>{{data.paymentTypeDesc}}</span>
      </el-form-item>
      <el-form-item label="订单金额">
        <span>{{data.payment}}</span>
      </el-form-item>
    </el-form>
    <el-table :data="data.orderItemVoList">
      <el-table-column label="商品图片">
        <template slot-scope="scope">
          <img width="100" :src="`${imageUrl}${scope.row.productImage}`"/>
        </template>
      </el-table-column>
      <el-table-column label="商品信息" prop="productName"></el-table-column>
      <el-table-column label="单价" prop="currentUnitPrice"></el-table-column>
      <el-table-column label="数量" prop="quantity"></el-table-column>
      <el-table-column label="合计" prop="totalPrice"></el-table-column>
    </el-table>
  </right-aside>

</template>

<script>
  import RightAside from "../../../common/right-aside/right-aside.vue";
  import {imageUrl} from "../../../../config/config"

  export default {
    components: {
      RightAside
    },
    props: {
      show: {
        type: Boolean
      },
      detailData: {
        type: Object
      }
    },
    data() {
      return {
        asideShow: this.show,
        tableData: [],
        data: this.detailData,
        imageUrl
      }
    },
    watch: {
      show(val) {
        this.asideShow = val;
      },
      asideShow(val) {
        this.$emit("update:show", val);
      },
      detailData(val) {
        this.data = val;
      }
    },
    created() {
    },
    methods: {}
  }
</script>

<style lang="less" scoped>

</style>
