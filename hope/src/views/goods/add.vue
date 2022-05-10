<template>
  <div class="add">
    <el-form>
      <!-- {{ twos?[0].attr_vals[0]:'' }} -->
      <i class="iconfont icon-a-weixiaokaixingaoxing-10"></i>
      <el-button disabled style="width: 100%" class="el-icon-info"
        >添加商品信息</el-button
      >
      <el-steps :space="200" :active="active" finish-status="success">
        <el-step
          v-for="(item, i) in arr"
          :key="i"
          :title="item"
          style="font-weight: 400"
        ></el-step>
        <el-step title="完成">完成</el-step>
      </el-steps>

      <el-tabs
        tab-position="left"
        v-model="ele"
        :before-leave="change"
        style=""
      >
        <el-tab-pane label="基本信息">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            class="demo-ruleForm"
            style="padding: 5px"
          >
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="ruleForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="ruleForm.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="ruleForm.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="ruleForm.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                style="width: 100%"
                v-model="value"
                :options="cityOptions"
                @change="changeProvince"
                :props="state"
              ></el-cascader>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品参数">
          <br />

          <!--哒哒哒多 -->

          <el-form-item
            :label="item.attr_name"
            v-for="(item, i) in twos"
            :key="i"
          >
            <el-checkbox-group v-model="item.attr_vals">
              <el-checkbox
                v-for="(ele, index) in item.attr_vals"
                :key="index"
                :label="ele"
              >
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <!-- 哒哒哒哒哒 -->
        </el-tab-pane>
        <el-tab-pane label="商品属性"
          >动态参数 <br />

          <el-form-item
            :label="omg.attr_name"
            v-for="(omg, ddd) in one"
            :key="ddd"
          >
            <el-input v-model="omg.attr_vals"> </el-input
          ></el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品图片">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="商品内容">
          <template>
            <quill-editor ref="myQuillEditor" :options="editorOption" />
          </template>
          <el-button style="margin-top: 60px" type="primary" @click="adds"
            >添加商品</el-button
          >
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>
<script>
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import {
  Categories,
  cateAdd,
  categories,
  cateSSS,
  DEL,
  CanShu,
  goodS,
} from "../../api/goods";
export default {
  data() {
    return {
      form: {},
      dialogImageUrl: "",
      dialogVisible: false,
      checkList: ["选中且禁用", "复选框 A"],
      id: [],
      eles: {
        goods_cat: [0],
        goods_name: "",
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0,
      },
      one: [],
      two: [],
      editorOption: {
        theme: "snow", // 默认主题
        placeholder: "请在这里输入", // 默认输入内容
      },
      imageUrl: "",
      active: 0,
      ele: 0,
      arr: ["基本信息", "商品参数", "商品属性", "商品图片", "商品内容"],
      ruleForm: {
        goods_name: "",
        goods_price: "",
        goods_weight: "",
        goods_number: "",
        goods_cat: "",
      },
      rules: {
        goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 3, max: 8, message: "不符合规则", trigger: "blur" },
        ],
        goods_price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
          { min: 3, max: 8, message: "不符合规则", trigger: "blur" },
        ],
        goods_weight: [
          { required: true, message: "请输入商品重量", trigger: "blur" },
          { min: 3, max: 8, message: "不符合规则", trigger: "blur" },
        ],
        goods_number: [
          { required: true, message: "请输入商品数量", trigger: "blur" },
          { min: 3, max: 8, message: "不符合规则", trigger: "blur" },
        ],
      },
      value: [],
      num: 0,
      state: {
        label: "cat_name",
        children: "children",
        value: "cat_id",
      },
      cityOptions: [],
    };
  },
  methods: {
    changeProvince() {},
    async getDate() {
      const arr = await Categories();
      this.cityOptions = arr;
      console.log(this.cityOptions);
      // this.cityOptions.forEach((item) => {
      //   item.label = item.cat_name;
      //   item.value = item.cat_name;
      //   item.children.forEach((ele) => {
      //     ele.label = ele.cat_name;
      //     ele.value = ele.cat_name;
      //     setTimeout(() => {
      //       ele.children.forEach((ind) => {
      //         ind.label = ind.cat_name;
      //         ind.value = ind.cat_name;
      //       });
      //     }, 20);
      //   });
      // });
    },
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    change(old, newl) {
      console.log(old, newl);
      if (newl == "0") {
        if (this.value.length == 3) {
          this.active = parseInt(old);
          if (old == "2") {
            CanShu({ id: this.values, sel: "only" }).then((res) => {
              this.one = res;
              console.log(res);
            });
          } else if (old == "1") {
            CanShu({ id: this.values, sel: "many" }).then((res) => {
              this.two = res;
              this.num=0
            console.log(this.two, 1111);
            });
          }
        } else {
          this.$message({
            type: "warning",
            message: "只能选择三级商品分类!",
          });
          return false;
        }
      } else {
        this.active = parseInt(old);
        if (old == "2") {
          CanShu({ id: this.values, sel: "only" }).then((res) => {
            this.one = res;
            // this.one.length > 0
            //   ? ( this.one.forEach((item) => item.attr_vals.splice()))
            //   : (this.one = []);
            console.log(this.one, 1111);
          });
        } else if (old == "1") {
          CanShu({ id: this.values, sel: "many" }).then((res) => {
            this.two = res;
              this.num=0
            console.log(this.two, 1111);
          });
        }
      }

      // if (e == '1') {
      //   let index = this.cityOptions.findIndex((item) =>
      //     item.value.includes(this.value[0])
      //   );
      //   CanShu({ id: this.cityOptions[index].cat_id, sel: "only" }).then(
      //     (res) => {
      //       this.one = res;
      //     }
      //   );
      // } else if (e == '2') {
      //   let index = this.cityOptions.findIndex((item) =>
      //     item.value.includes(this.value[0])
      //   );
      //   this.eles = this.ruleForm;
      //   this.eles.goods_cat = [this.cityOptions[index].cat_id];
      //   this.eles.goods_cat.push(this.cityOptions[index].children[0].cat_id);
      //   this.eles.goods_cat.push(
      //     this.cityOptions[index].children[0].children[0].cat_id
      //   );
      //   console.log(this.eles);

      //   CanShu({ id: this.cityOptions[index].cat_id, sel: "many" }).then(
      //     (res) => {
      //       this.two = res;
      //     }
      //   );
      //   //    CanShu().then(res=>{
      //   //       console.log(res);
      //   //   })
      // }

      // console.log(e);

      // this.active = parseInt(e);
      // console.log(this.active);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // st(e) {
    //   this.two.forEach((item) => {
    //     console.log(item);
    //     item.attr_vals = item.attr_vals.splice();
    //   });
    //   console.log(this.two);
    // },
    adds() {
      this.eles = this.ruleForm;
      //   this.eles.goods_cat = [this.cityOptions[index].cat_id];
      this.eles.goods_cat = this.value.join();
      console.log(this.eles);
      goodS(this.eles).then((res) => {
        this.$router.push("../goods");
      });
    },
  },
  components: {
    quillEditor,
  },
  computed: {
    values() {
      return this.value[this.value.length - 1];
    },
    twos() {
      if (this.two.length > 0 && this.num == 0) {
        this.two.forEach((item) => {
          if (typeof item.attr_vals !== Object) {
            item.attr_vals = item.attr_vals.split(",");
            console.log(typeof item.attr_vals);
            console.log(item.attr_vals);
            this.num = 1;
          }
        });
      }
      return this.two;
    },
  },
  watch: {},
  created() {
    this.getDate();
  },
};
</script>
<style lang="scss">
.add {
  background: #fff;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: auto;
  border-radius: 5px;
}
:deep(.avatar-uploader .el-upload) {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
