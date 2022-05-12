<template>
  <div class="add">
    <MBX label1="商品管理" label2="添加商品"></MBX>
    <el-card>
      <el-alert
        :closable="false"
        center
        title="添加商品信息"
        type="info"
        show-icon
      >
      </el-alert>
      <!-- 步骤条 -->
      <el-steps
        align-center
        style="padding: 20px 250px 20px 50px; font-size: 16px"
        :active="active"
        finish-status="success"
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <!-- tab栏 -->
      <template>
        <el-tabs
          @tab-click="ClickChange"
          tab-position="left"
          :before-leave="tabChange"
        >
          <el-tab-pane label="基本信息">
            <!-- 表单 -->
            <el-form :model="add" :rules="rules" ref="add" class="demo-add">
              <el-form-item label="商品名称" prop="goods_name">
                <el-input v-model="add.goods_name"></el-input>
              </el-form-item>
              <el-form-item label="商品价格" prop="goods_price">
                <el-input type="number" v-model="add.goods_price"></el-input>
              </el-form-item>
              <el-form-item label="商品重量" prop="goods_weight">
                <el-input type="number" v-model="add.goods_weight"></el-input>
              </el-form-item>
              <el-form-item label="商品数量" prop="goods_number">
                <el-input type="number" v-model="add.goods_number"></el-input>
              </el-form-item>
              <el-form-item label="商品分类">
                <el-cascader
                  v-model="add.value"
                  :options="options"
                  :props="{
                    expandTrigger: 'hover',
                    value: 'cat_id',
                    label: 'cat_name',
                    children: 'children'
                  }"
                  @change="handleChange"
                ></el-cascader>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="商品参数">
            <div v-for="(item, attr_id) in CanShu" :key="attr_id">
              <el-checkbox-group ref="group" v-model="checkList">
                <el-checkbox
                  @change="delChange(ele)"
                  v-for="(ele, i) in item.attr_vals == ''
                    ? []
                    : item.attr_vals.split(',')"
                  :key="i"
                  :label="ele"
                  border
                ></el-checkbox>
              </el-checkbox-group>
            </div>
          </el-tab-pane>
          <el-tab-pane label="商品属性">
            <div style="padding: 10px" v-for="(item, i) in ShuXing" :key="i">
              <li>{{ item.attr_name }}</li>
              <el-input disabled class="mt" v-model="item.attr_vals"></el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="商品图片">
            <el-upload
              ref="upload"
              action="http://www.ysqorz.top:8888/api/private/v1/upload"
              list-type="picture-card"
              :auto-upload="true"
              :headers="{ Authorization: token }"
              :on-success="successPics"
            >
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{ file }">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url"
                  alt=""
                />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)"
                  >
                    <i class="el-icon-download"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-tab-pane>
          <el-tab-pane label="商品内容">
            <quill-editor
              class="editor"
              v-model="content"
              ref="myQuillEditor"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @change="onEditorChange($event)"
            >
            </quill-editor>
            <el-button class="mt" type="primary" @click="AddDate"
              >添加商品</el-button
            >
          </el-tab-pane>
        </el-tabs>
      </template>
    </el-card>
  </div>
</template>
<script>
import { GetCategories, StateCategories, AddsCategories } from '../../api/goods'
import { quillEditor } from 'vue-quill-editor'
import MBX from '@/components/MBX.vue'
export default {
  data() {
    return {
      checkList: [],
      content: null,
      editorOption: {}, //富文本
      active: 0,
      ruleForm: {
        name: ''
      },
      options: [], //级联选择器数据
      rules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { pattern: /^[0-9]*$/, message: '只能输入数字', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { pattern: /^[0-9]*$/, message: '只能输入数字', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { pattern: /^[0-9]*$/, message: '只能输入数字', trigger: 'blur' }
        ]
      },
      add: {
        goods_name: '',
        goods_cat: '', //字符串的分类列表
        goods_price: '',
        goods_number: '', //数量
        goods_weight: '', //重量
        goods_introduce: '', //介绍
        pics: [], //图片
        attrs: [], //商品参数
        value: [] //选中的数据
      },
      CanShu: [], //商品参数
      ShuXing: [], //商品参数
      checked1: '',
      //图片的
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      file: [],
      token: sessionStorage.getItem('touken')
    }
  },
  methods: {
    //富文本
    onEditorBlur() {},
    onEditorFocus() {
      //获得焦点事件
    },
    onEditorChange() {
      //内容改变事件
    },
    //富文本

    handleRemove(file) {
      console.log(file)
    },
    handlePictureCardPreview(file) {
      console.log(file)
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
      console.log(file)
    },
    change(e) {
      console.log(e)
    },
    tabChange(i, ii) {
      if (this.add.value.length < 3 && ii !== undefined) {
        this.$message({
          message: '警告哦，请先选择三级分类',
          type: 'warning'
        })
        return false
      }
      this.active = i * 1
      if (i == 1) {
        StateCategories({
          sel: 'many',
          id: this.add.value[this.add.value.length - 1]
        }).then((res) => {
          this.CanShu = res
        })
      } else if (i == 2) {
        StateCategories({
          sel: 'only',
          id: this.add.value[this.add.value.length - 1]
        }).then((res) => {
          this.ShuXing = res
        })
      }
    },
    ClickChange(e) {
      console.log(e)
    },
    async send() {
      const data = await GetCategories()
      this.options = data
    },
    //选择分类的时候
    handleChange() {
      console.log(this.add.value)
    },
    async AddDate() {
      console.log(this.checkList, this.CanShu)
      console.log(this.$refs.upload.uploadFiles)
      const data = {
        goods_cat: this.add.value.join(','),
        goods_introduce: this.content,
        goods_name: this.add.goods_name,
        goods_number: this.add.goods_number,
        goods_price: this.add.goods_price,
        goods_weight: this.add.goods_weight,
        pics: this.add.pics //加图片就是商品名称不正确
      }
      let ele = await AddsCategories(data)
      console.log(ele)
      this.content = ''
      this.add.goods_name = ''
      this.add.goods_number = ''
      this.add.goods_price = ''
      this.add.goods_weight = ''
      this.send()
      this.$router.push('/goods')
    },
    //复选框改变时
    delChange(e) {
      console.log(e)
    },
    successPics(data) {
      console.log(data)
      this.add.pics.push(data.data.tmp_path)
    }
  },

  components: { MBX },
  computed: {},
  watch: {},
  created() {
    this.send()
  }
}
</script>
<style lang="scss" scoped>
.add {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  ::v-deep .el-checkbox {
    margin: 10px 0;
    p {
      height: 200px;
    }
  }
  ::v-deep .el-step__title {
    font-size: 14px !important;
  }
  ::v-deep .el-tab-pane p {
    height: 200px;
  }
}
</style>
