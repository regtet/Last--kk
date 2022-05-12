<template>
  <div class="categories">
    <MBX label1="商品管理" label2="商品分类"></MBX>
    <el-card>
      <el-button type="primary" @click="add">添加分类</el-button>
      <el-table
        class="mt"
        :data="tableData"
        row-key="cat_id"
        border
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        stripe
        style="width: 100%"
      >
        <el-table-column type="index" label="#" width="50">
          <template slot-scope="scope">
            {{ scope.row.index != undefined ? scope.row.index + 1 : '' }}
          </template>
        </el-table-column>
        <el-table-column prop="cat_name" label="分类名称"> </el-table-column>
        <el-table-column label="是否有效">
          <template>
            <i style="color: #48d80e" class="el-icon-success"> </i>
          </template>
        </el-table-column>
        <el-table-column prop="cat_level" label="排序">
          <template slot-scope="scope">
            <el-tag
              effect="dark"
              size="mini"
              :type="
                scope.row.cat_level == 0
                  ? ''
                  : scope.row.cat_level == 1
                  ? 'success'
                  : 'warning'
              "
            >
              {{
                scope.row.cat_level == 0
                  ? '一级'
                  : scope.row.cat_level == '1'
                  ? '二级'
                  : '三级'
              }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="updates(scope.row)"
              >编辑</el-button
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
      <!-- 分页 -->
      <el-pagination
        class="mt"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="GoodsData.pagenum"
        :page-sizes="[5, 10, 20]"
        :page-size="GoodsData.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="GoodsData.total"
      >
      </el-pagination>
      <!-- 模态框 -->
      <el-dialog
        :title="title ? '添加分类' : '编辑分类'"
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
          <el-form-item label="分类名称" prop="cat_name">
            <el-input v-model="ruleForm.cat_name"></el-input>
          </el-form-item>
          <el-form-item v-show="title" label="父级分类">
            <el-cascader
              v-model="value"
              :options="options"
              :props="{
                checkStrictly: true,
                label: 'cat_name',
                value: 'cat_id',
                children: 'children',
                emitPath: true
              }"
              clearable
            ></el-cascader>
          </el-form-item>
        </el-form>

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
  AddCategories,
  SetCategories,
  DelCategories
} from '../../api/goods'
export default {
  data() {
    return {
      dialogVisible: false,
      query: '',
      title: true,
      //表单
      ruleForm: {
        cat_name: ''
      },
      rules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 1, max: 16, message: '', trigger: 'blur' }
        ]
      },
      options: [],
      //   表格
      value: [],
      tableData: [],
      GoodsData: {
        pagenum: 1, //当前页码
        pagesize: 5, //每页显示个数
        total: 10
      },
      id: 0
    }
  },
  methods: {
    //渲染页面
    async send() {
      const data = await GetCategories(this.GoodsData)
      this.GoodsData.total = data.total
      this.GoodsData.pagenum = data.pagenum + 1
      this.GoodsData.pagesize = data.pagesize
      data.result.forEach((item, index) => {
        item.index = index
      })
      this.tableData = data.result
      this.options = data.result
    },
    //添加
    async add() {
      this.title = true
      this.dialogVisible = true
      const data = await GetCategories()
      console.log(data)
      this.options = data
    },
    out() {
      //点击取消
      this.$refs.ruleForm.resetFields()
      this.value = []
      this.dialogVisible = false
    },
    ok() {
      //点击确定
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          if (this.title) {
            let cat_pid =
              this.value.length == 0 ? 0 : this.value[this.value.length - 1]
            console.log(cat_pid, 1111)
            const data = AddCategories({
              cat_pid,
              cat_name: this.ruleForm.cat_name,
              cat_level: this.value.length
            })
            this.dialogVisible = false
            this.$refs.ruleForm.resetFields()
            this.value = []
            this.send()
          } else {
            const data = await SetCategories({
              id: this.id,
              cat_name: this.ruleForm.cat_name
            })
            this.dialogVisible = false
            this.$refs.ruleForm.resetFields()
            this.send()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    //编辑
    updates(ele) {
      console.log(ele)
      this.id = ele.cat_id
      this.title = false
      this.dialogVisible = true
      this.ruleForm.cat_name = ele.cat_name
    },
    //删除
    del(ele) {
      this.id = ele.cat_id
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const data = await DelCategories(ele.cat_id)
          this.send()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleSizeChange(val) {
      this.GoodsData.pagesize = val
      this.send()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.GoodsData.pagenum = val
      this.send()
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
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
.categories {
  box-sizing: border-box;
  width: 100%;
  height: calc(100% - 30px);
  ::v-deep .el-cascader-panel div:nth-child(3) {
    display: none !important;
  }
}
</style>
