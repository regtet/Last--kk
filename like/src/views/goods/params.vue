<template>
  <div class="params">
    <MBX label1="商品管理" label2="分类参数"></MBX>
    <el-card>
      <el-alert
        title="注意：只允许为第三级分类设置相关参数！"
        type="warning"
        show-icon
        effect="dark"
        :closable="false"
      >
      </el-alert>
      <div class="mt">
        选择商品分类 :
        <el-cascader
          v-model="value"
          :options="options"
          :props="{
            expandTrigger: 'hover',
            value: 'cat_id',
            label: 'cat_name',
            children: 'children'
          }"
          @change="handleChange"
        ></el-cascader>
      </div>
      <!-- 参数内容 -->
      <el-tabs @tab-click="changeTab" type="border-card" class="mt">
        <el-tab-pane label="动态参数">
          <el-button type="primary" size="mini" :disabled="!flag" @click="add"
            >添加参数</el-button
          >

          <el-table
            class="mt"
            :data="tableData"
            border
            stripe
            style="width: 100%"
          >
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag
                  :key="tag"
                  v-for="tag in new Set(
                    scope.row.attr_vals == ''
                      ? []
                      : scope.row.attr_vals.split(',')
                  )"
                  closable
                  :disable-transitions="false"
                  @close="handleCloses(scope.row, tag)"
                >
                  {{ tag }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputTitle"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column label="#" type="index" width="50px">
            </el-table-column>
            <el-table-column label="参数名称" prop="attr_name">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  @click="updates(scope.row)"
                  >修改</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  @click="del(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性">
          <el-button type="primary" size="mini" :disabled="!flag" @click="adds"
            >添加属性</el-button
          >

          <el-table
            class="mt"
            :data="tableData"
            border
            stripe
            style="width: 100%"
          >
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag
                  :key="tag"
                  v-for="tag in new Set(
                    scope.row.attr_vals == ''
                      ? []
                      : scope.row.attr_vals.split(',')
                  )"
                  closable
                  :disable-transitions="false"
                  @close="handleCloses(scope.row, tag)"
                >
                  {{ tag }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputTitle"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column label="#" type="index" width="50px">
            </el-table-column>
            <el-table-column label="属性名称" prop="attr_name">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  @click="updates(scope.row)"
                  >修改</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  @click="del(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>

      <!-- 模态框 -->
      <el-dialog
        :title="OneTitle"
        :visible.sync="dialogVisible"
        :before-close="handleClose"
      >
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item :label="OneTitles" prop="attr_name">
            <el-input v-model="ruleForm.attr_name"></el-input> </el-form-item
        ></el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="out">取 消</el-button>
          <el-button type="primary" @click="ok">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import MBX from '@/components/MBX.vue'
import {
  GetCategories,
  StateCategories,
  AddStateCategories,
  UpdateStateCategories,
  DelStateCategories
} from '../../api/goods'
export default {
  data() {
    return {
      options: [], //级联选择器数据
      value: [], //选中的数据
      flag: false, //控制状态 为true启用
      sel: 'many', //动态参数，only 静态
      tableData: [],
      OneTitle: '添加动态参数',
      OneTitles: '动态参数',
      ruleForm: {
        attr_name: ''
      },
      dialogVisible: false,
      rules: {
        attr_name: [
          { required: true, message: '参数名称不能为空', trigger: 'blur' },
          { min: 1, max: 16, message: '参数名称不能为空', trigger: 'blur' }
        ]
      },
      id: 0, //当前属性ID
      cid: 0, //cat_id
      attr_vals: '',
      dynamicTags: [], //小标签
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    // 修改
    updates(ele) {
      console.log(ele)
      this.cid = ele.cat_id
      if (this.sel == 'many') {
        this.OneTitle = '编辑动态参数'
        this.OneTitles = '动态参数'
      } else {
        this.OneTitle = '编辑静态属性'
        this.OneTitles = '静态属性'
      }
      this.id = ele.attr_id
      this.attr_vals = ele.attr_vals
      this.ruleForm.attr_name = ele.attr_name
      this.dialogVisible = true
    },
    //删除
    del(ele) {
      this.cid = ele.cat_id
      this.id = ele.attr_id
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const data = DelStateCategories({ id: this.id, cid: this.cid })
          this.handleChange()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          console.log('nothen')
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    //渲染页面
    async send() {
      const data = await GetCategories()
      this.options = data
      console.log(data)
    },
    async handleChange(value) {
      if (this.value.length < 3) {
        this.$message({
          message: '警告哦，这不是三级分类',
          type: 'warning'
        })
        console.log(this.value)
        this.tableData = []
        this.value = []
        this.flag = false
      } else {
        this.flag = true
        console.log(this.sel)
        const data = await StateCategories({
          id: this.value[this.value.length - 1] * 1,
          sel: this.sel
        })
        console.log(data)
        data.forEach((item) => {
          item.inputVisible = false
          item.inputTitle = ''
        })
        this.tableData = data
      }
    },
    // 添加动态参数
    add() {
      this.title = true
      this.sel = 'many'
      this.dialogVisible = true
      if (this.sel == 'many') {
        this.OneTitle = '编辑动态参数'
        this.OneTitles = '动态参数'
      } else {
        this.OneTitle = '编辑静态属性'
        this.OneTitles = '静态属性'
      }
      this.OneTitle = '添加动态参数'
    },
    // 添加静态属性
    adds() {
      this.title = false
      this.sel = 'only'
      this.dialogVisible = true
      this.OneTitle = '添加静态属性'
      this.OneTitles = '静态属性'
    },
    ok() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (this.OneTitle == '编辑动态参数') {
          console.log(
            this.id,
            this.cid,
            this.ruleForm.attr_name,
            this.sel,
            this.attr_vals
          )
          const data = await UpdateStateCategories({
            id: this.id,
            cid: this.cid,
            attr_name: this.ruleForm.attr_name,
            attr_sel: this.sel,
            attr_vals: this.attr_vals
          })
          this.handleChange()
          this.dialogVisible = false
          this.ruleForm.attr_name = ''
        } else {
          if (valid) {
            //   alert("submit!");
            console.log(
              this.value[this.value.length - 1],
              this.ruleForm.attr_name,
              this.sel
            )
            const data = await AddStateCategories({
              id: this.value[this.value.length - 1],
              attr_name: this.ruleForm.attr_name,
              attr_sel: this.sel
            })
            console.log(data)
            this.handleChange()
            this.dialogVisible = false
            //   this.dialogVisible = false;
            this.ruleForm.attr_name = ''
          } else {
            console.log('error submit!!')
            this.ruleForm.attr_name = ''
            return false
          }
        }
      })
    },
    out() {
      this.$refs.ruleForm.resetFields()
      this.dialogVisible = false
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },

    showInput(row) {
      console.log(row)
      row.inputVisible = true
      // setTimeout(() => {
      //   this.$refs.saveTagInput.$refs.input.focus();
      // }, 0);
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    //删除小标签
    async handleCloses(row, tag) {
      let arr = row.attr_vals.split(',')
      let index = arr.findIndex((item) => item == tag)
      console.log(row, tag)
      console.log(index)
      console.log(row.attr_vals, arr)
      arr.splice(index, 1)
      console.log(arr)
      const data = await UpdateStateCategories({
        cid: row.cat_id,
        id: row.attr_id,
        attr_name: row.attr_name,
        attr_sel: this.sel,
        attr_vals: arr.join(',')
      })
      console.log(data)
      row.attr_vals = data.attr_vals
    },
    //添加小标签
    async handleInputConfirm(row) {
      console.log(row)
      if (row.inputTitle) {
        if (row.attr_vals.trim().length == 0) {
          var Tags = [row.inputTitle]
        } else {
          var Tags = [...row.attr_vals.split(','), row.inputTitle]
        }
        console.log(Tags)
        const data = await UpdateStateCategories({
          cid: row.cat_id,
          id: row.attr_id,
          attr_name: row.attr_name,
          attr_sel: this.sel,
          attr_vals: Tags.join(',')
        })
        console.log(data)
        row.attr_vals = data.attr_vals
        console.log(row)
      }
      row.inputVisible = false
      row.inputTitle = ''
    },
    //切换的时候
    async changeTab(e) {
      console.log(e.index)
      if (this.value.length == 0) {
        this.$message({
          message: '警告哦，还没选三级分类呢',
          type: 'warning'
        })
        return false
      }
      if (e.index == 0) {
        this.sel = 'many'
        this.OneTitle = '编辑动态参数'

        const data = await StateCategories({
          id: this.value[this.value.length - 1] * 1,
          sel: this.sel
        })
        console.log(data)
        data.forEach((item) => {
          item.inputVisible = false
          item.inputTitle = ''
        })
        this.tableData = data
      } else if (e.index == 1) {
        this.sel = 'only'
        this.OneTitle = '编辑静态属性'
        this.OneTitles = '静态属性'
        const data = await StateCategories({
          id: this.value[this.value.length - 1] * 1,
          sel: this.sel
        })
        console.log(data)
        data.forEach((item) => {
          item.inputVisible = false
          item.inputTitle = ''
        })
        this.tableData = data
      }
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
.params {
  width: 100%;
  height: calc(100% - 30px);
  box-sizing: border-box;
  ::v-deep .el-tag {
    margin: 5px;
  }
  ::v-deep .has-gutter th {
    font-weight: 700;
  }
  ::v-deep .el-input {
    width: 200px;
  }
  ::v-deep .el-table__expanded-cell {
    padding: 20px 30px !important;
  }
}
</style>
