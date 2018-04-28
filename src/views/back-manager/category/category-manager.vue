<template>
  <div class="books-manager-page">
    <el-button type="primary" @click="editCategoryName('add')">添加品类</el-button>
    <el-button @click="deleteCategorys" :disabled="disabled">删除品类</el-button>
    <div class="m_table">
      <el-table :data="categoryList" v-loading="fatherTableLoading" max-height="500" @selection-change="getCategoryList">
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="品类ID" prop="id"></el-table-column>
        <el-table-column label="品类名称" width="400" prop="name"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="editCategoryName('update',scope.row)">修改名称</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="提示"
               :visible.sync="dialogVisible"
               width="30%"
    >
      <el-form label-width="80px">
        <el-form-item label="品类名">
          <el-input placeholder="请输入品类名" v-model="categoryName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateCategoryName">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import {getChildrenCategory, removeCategory, saveCategory, updateCategory} from "../../../service/category";
  import StringUtils from "../../../utils/StringUtils";
  import ArrayUtils from "../../../utils/ArrayUtils";

  export default {
    data() {
      return {
        categoryList: [],
        fatherTableLoading: false,
        dialogVisible: false,
        selectedFather: {},
        categoryName: '',
        type: '',
        mulitySelection: [],
        disabled: true
      }
    },
    created() {
      this.getCategory();
    },
    methods: {
      getCategory() {
        this.fatherTableLoading = true;
        let patientId = 0;
        getChildrenCategory(patientId).then(res => {
          this.categoryList = res.data;
          this.fatherTableLoading = false;
        })
      },
      editCategoryName(type, val) {
        this.type = type;
        this.selectedFather = val;
        this.dialogVisible = true;
        this.categoryName = '';
      },
      updateCategoryName() {
        if (StringUtils.isBlank(this.categoryName)) {
          this.$message.error("请输入品类名");
          return false;
        }
        if (this.type === 'add') {
          let patientId = 0;
          saveCategory(this.categoryName, patientId).then(() => {
            this.getCategory();
            this.dialogVisible = false;
            this.$message.success('创建分类成功');
          })
        } else {
          updateCategory(this.categoryName, this.selectedFather.id).then(() => {
            this.$message.success("更新成功");
            this.getCategory();
            this.dialogVisible = false;
          });
        }
      },
      getCategoryList(val) {
        this.mulitySelection = val;
        this.disabled = ArrayUtils.isNullOrEmpty(this.mulitySelection);
      },
      deleteCategorys() {
        let ids = this.mulitySelection.map(item => item.id);
        this.$confirm('该操作将会删除您所选中的品类，是否继续？', "提示", {
          type: 'warning'
        }).then(() => {
          removeCategory(ids).then(() => {
            this.$message.success("删除成功");
            this.getCategory();
          })
        });
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
