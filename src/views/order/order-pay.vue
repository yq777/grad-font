<template>
  <div class="order-pay-page">
    <title-content></title-content>
    <nav-content></nav-content>
    <div class="m-content">
      <div class="u-title">
        <div>订单生成成功，请及时支付，订单号：{{payInfo.orderNo}}</div>
        <div style="color: #DF3033;font-weight: 600">请用支付宝扫描下方二维码进行支付</div>
      </div>
      <img :src="payInfo.qrUrl"/>
    </div>
  </div>

</template>

<script>
  import TitleContent from '../common/title.vue';
  import NavContent from '../common/nav.vue';
  import StorageUtils from "../../utils/StorageUtils";
  import {imageUrl} from "../../config/config";

  export default {
    components: {
      TitleContent,
      NavContent
    },
    data() {
      return {
        payInfo: {},
        imageUrl
      }
    },
    created() {
      this.payInfo = StorageUtils.get("payInfo");
    },
    methods: {}
  }
</script>

<style lang="less" scoped>
  .order-pay-page {
    .m-content {
      margin-top: 100px;
      text-align: center;
      .u-title {
        margin-bottom: 20px;
        line-height: 1.5;
      }
    }
  }
</style>
