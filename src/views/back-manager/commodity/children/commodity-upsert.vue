<template>
  <right-aside title="添加/编辑商品信息" :show.sync="asideShow" @on-ok="handleUpsert">
    <el-form label-width="80px">
      <el-form-item label="商品名称" required>
        <el-input placeholder="请输入商品名称" v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="商品描述" required>
        <el-input placeholder="请输入商品描述" v-model="model.subtitle"></el-input>
      </el-form-item>
      <el-form-item label="所属分类" required>
        <el-select placeholder="请选择所属分类" style="width: 100%" v-model="model.categoryId">
          <el-option v-for="item in categoryList" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品价格" required>
        <el-input placeholder="请输入商品价格" v-model="model.price">
          <template slot="append">
            <span>元</span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="商品库存" required>
        <el-input placeholder="请输入商品库存" v-model.number="model.stock">
          <template slot="append">
            <span>件</span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="商品图片" required>
        <img class="u-img" v-if="model.subImages.length > 0" :key="index" v-for="(item,index) in model.subImages" :src="`${imageUrl}${item}`">
        <div v-show="model.subImages.length <7" class="pb-img-btn" @click.stop="handleClick">
          <slot>
            <el-button type="primary" plain>上传<i class="el-icon-upload el-icon--right"></i></el-button>
          </slot>
          <input type="file" ref="upload" @change="upload" hidden>
        </div>
      </el-form-item>
      <el-form-item label="商品详情" required>
        <mavon-editor
          v-model="model.detail"
          ref="editor"
          default_open="edit"
          :toolbars="editorToolbars"
          @imgAdd="editorImgAdd"
          @change="editorChange"
          style="width: 672px;height: 580px;z-index: 100"
        ></mavon-editor>
      </el-form-item>
    </el-form>
  </right-aside>

</template>

<script>
  import RightAside from '../../../common/right-aside/right-aside.vue';
  import {mavonEditor} from "mavon-editor";
  import {editorToolbars} from '../../config';
  import 'mavon-editor/dist/css/index.css';
  import axios from "axios";
  import {imageUrl} from "../../../../config/config";
  import {getChildrenCategory} from "../../../../service/category";
  import ObjectUtils from "../../../../utils/ObjectUtils";
  import {saveProduct} from "../../../../service/product";
  import ProductModel from "../../../../model/product";

  export default {
    components: {
      RightAside,
      mavonEditor
    },
    props: {
      show: {
        type: Boolean
      },
      upsertData: {
        type: Object
      }
    },
    data() {
      return {
        asideShow: this.show,
        editorToolbars: editorToolbars,
        model: this.upsertData,
        categoryList: [],
        imageUrl
      }
    },
    watch: {
      show(val) {
        this.asideShow = val;
      },
      asideShow(val) {
        this.$emit('update:show', val);
      },
      upsertData(val) {
        this.model = val;
      }
    },
    created() {
      this.getCategoryList();
    },
    methods: {
      handleClick() {
        this.$refs.upload.click();
      },
      upload() {
        let file = this.$refs.upload.files[0];
        let form = new FormData();
        form.append("file", file);
        axios.post("/api/manage/product/upload.do", form).then((res) => {
          this.model.subImages.push(res.data.data.uri);
          this.$refs.upload.value = '';
        }, () => {
          this.$refs.upload.value = '';
        })
      },
      editorImgAdd(filename, file) {
        let form = new FormData();
        form.append("file", file);
        axios.post("/api/manage/product/upload.do", form).then((res) => {
          this.$refs.editor.$img2Url(filename, imageUrl + res.data.data.uri);
        }, () => {
        })
      },
      editorChange(value, render) {
        this.model.content = render.replace(/[\r\n]/g, '');
      },
      getCategoryList() {
        let parentId = 0;
        getChildrenCategory(parentId).then(res => {
          this.categoryList = res.data;
        })
      },
      handleUpsert() {
        this.model.mainImage = this.model.subImages[0];
        let model = ObjectUtils.deepCopy(this.model);
        model = new ProductModel().map(model);
        if (model.verify()) {
          saveProduct(model.convert()).then(res => {
            this.$message.success("保存成功");
            this.asideShow = false;
            this.$emit("refresh-table");
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .pb-img-btn {
    display: inline-block;
  }

  .u-img {
    width: 80px;
    height: 80px;
    margin-right: 5px;
    padding: 3px;
    border: #f2f2f2 dashed 1px;
  }
</style>
