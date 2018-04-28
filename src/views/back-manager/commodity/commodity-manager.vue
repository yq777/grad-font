<template>
  <div class="books-manager-page">
    <el-button type="primary" @click="upsertCommodity('add')">添加商品</el-button>
    <el-button @click="deleteProducts" :disabled="disabled">删除商品</el-button>
    <el-input placeholder="请输入商品名称" v-model="productName" style="width: 300px;margin-left: 15px">
      <el-button slot="append" icon="el-icon-search" @click="searchProducts"></el-button>
    </el-input>
    <div class="m_table">
      <el-table :data="booksData" v-loading="tableLoading" @selection-change="getProductIdList">
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="商品ID" prop="id"></el-table-column>
        <el-table-column label="商品名" prop="name"></el-table-column>
        <el-table-column label="描述" width="400" prop="subtitle"></el-table-column>
        <el-table-column label="价格" prop="price"></el-table-column>
        <el-table-column label="库存" prop="stock"></el-table-column>
        <el-table-column label="销售量" prop="saleStock"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">在售</span>
            <span v-else>下架</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" v-if="scope.row.status === 1" @click="ableProduct(scope.row,2)">下架</el-button>
            <el-button type="text" v-else @click="ableProduct(scope.row,1)">上架</el-button>
            <el-button type="text" @click="upsertCommodity('update',scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      :total="pager.total"
      layout="total, prev, pager, next"
      @current-change="onPageChange"
    ></el-pagination>
    <commodity-upsert :show.sync="upsertShow" :upsertData="selectedProduct" @refresh-table="getProductList"></commodity-upsert>
  </div>

</template>

<script>
  import CommodityUpsert from './children/commodity-upsert.vue';
  import ProductModel from "../../../model/product";
  import {abledProduct, getProducts, removeProduct, searProduct} from "../../../service/product";
  import PagerModel from "../../../model/pager";
  import ObjectUtils from "../../../utils/ObjectUtils";
  import ArrayUtils from "../../../utils/ArrayUtils";
  import StringUtils from "../../../utils/StringUtils";

  export default {
    components: {
      CommodityUpsert
    },
    data() {
      return {
        booksData: [],
        upsertShow: false,
        tableLoading: false,
        disabled: true,
        selectedProduct: {},
        pager: new PagerModel(),
        productName: '',
        mulitySelection: []
      }
    },
    created() {
      this.getProductList();
    },
    methods: {
      upsertCommodity(type, item) {
        if (type === 'add') {
          this.selectedProduct = new ProductModel();
        } else if (type === 'update') {
          let model = ObjectUtils.deepCopy(item);
          console.log(item);
          model.subImages = model.subImages.split(",");
          let images = [];
          model.subImages.forEach(item => {
            if (item.length > 0) {
              images.push(item);
            }
          });
          model.subImages = images;
          this.selectedProduct = new ProductModel().map(model);
        }
        this.upsertShow = true;
      },
      getProductList() {
        this.tableLoading = true;
        getProducts(this.pager.pageSize, this.pager.nowPage).then(res => {
          this.pager = new PagerModel().map(res.data);
          this.pager.nowPage = res.data.pageNum;
          this.booksData = res.data.list;
          this.tableLoading = false;
        })
      },
      onPageChange(val) {
        this.pager.nowPage = val;
        this.getProductList();
      },
      ableProduct(item, val) {
        if (val === 1) {
          this.$confirm("该操作将会上架该商品，是否继续？", "提示", {
            type: "warning"
          }).then(() => {
            abledProduct(item.id, val).then(res => {
              this.$message.success("商品上架成功");
              this.getProductList();
            })
          });
        } else if (val === 2) {
          this.$confirm("该操作将会下架该商品，是否继续？", "提示", {
            type: "warning"
          }).then(() => {
            abledProduct(item.id, val).then(res => {
              this.$message.success("商品下架成功");
              this.getProductList();
            })
          });
        }
      },
      searchProducts() {
        if (StringUtils.isBlank(this.productName)) {
          this.$message.error("请输入搜索内容");
          return false;
        }
        this.tableLoading = true;
        searProduct(this.pager.pageSize, this.pager.nowPage, this.productName).then(res => {
          this.pager = new PagerModel().map(res.data);
          this.pager.nowPage = res.data.pageNum;
          this.booksData = res.data.list;
          this.tableLoading = false;
        })
      },
      getProductIdList(val) {
        this.mulitySelection = val;
        this.disabled = ArrayUtils.isNullOrEmpty(this.mulitySelection);
      },
      deleteProducts() {
        let ids = this.mulitySelection.map(item => item.id);
        this.$confirm('该操作将会删除您所选中的品类，是否继续？', "提示", {
          type: 'warning'
        }).then(() => {
          removeProduct(ids).then(() => {
            this.$message.success("删除成功");
            this.getProductList();
          })
        });
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
