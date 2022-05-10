<template>
  <div class="goods">
    <MBX label1="商品管理" label2="商品列表"></MBX>
    <el-card>
      <el-input
        clearable
        @clear="clear"
        @input="input"
        style="width: 400px"
        placeholder="请输入搜索内容"
        v-model="GoodsData.query"
        class="input-with-select"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="seatch"
        ></el-button>
      </el-input>
      <el-button class="ml" type="primary" @click="$router.push('/add')"
        >添加商品</el-button
      >
      <!-- 表格 -->
      <template>
        <el-table
          :data="tableData"
          class="mt"
          border
          stripe
          style="width: 100%"
        >
          <el-table-column type="index" label="#" width="50px">
          </el-table-column>
          <el-table-column prop="goods_name" width="700px" label="商品名称">
          </el-table-column>
          <el-table-column
            prop="goods_price"
            label="商品价格（元）"
            width="120px"
          >
          </el-table-column>
          <el-table-column prop="goods_weight" label="商品重量" width="100px">
          </el-table-column>
          <!-- <el-table-column  label="所属分类" width="100px">
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
        </el-table-column> -->
          <el-table-column prop="add_time" label="创建时间">
            <template slot-scope="scope">
              {{
                new Date(scope.row.add_time * 1000)
                  .toLocaleString()
                  .replace(/\//g, '-')
              }}
            </template>
          </el-table-column>
          <el-table-column prop="date" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="updates(scope.row)"
              ></el-button>
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="del(scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
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
        title="编辑商品"
        :visible.sync="dialogVisible"
        :before-close="handleClose"
      >
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          :rules="rules"
        >
          <el-form-item label="商品名称" prop="goods_name">
            <el-input v-model="ruleForm.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="goods_price">
            <el-input v-model="ruleForm.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="goods_number">
            <el-input v-model="ruleForm.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品重量" prop="goods_weight">
            <el-input v-model="ruleForm.goods_weight"></el-input>
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
import _ from 'lodash'
import MBX from '@/components/MBX.vue'
import { GetGoods, UpSetCategories, DelState, Search } from '../../api/goods'
export default {
  data() {
    return {
      query: '', //输入框
      tableData: [],
      _: _,
      GoodsData: {
        query: '',
        pagenum: 1, //当前页码
        pagesize: 5, //每页显示个数
        total: 10
      },
      id: 0, //当前行ID
      ruleForm: {
        goods_name: '' //名称
      },
      dialogVisible: false,
      rules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 3, max: 8, message: '', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { pattern: /^[0-9]*$/, message: '只能输入数字', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { pattern: /^[0-9]*$/, message: '只能输入数字', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { pattern: /^[0-9]*$/, message: '只能输入数字', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.GoodsData.pagesize = val
      this.send()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.GoodsData.pagenum = val
      this.send()
      console.log(`当前页: ${val}`)
    },
    // 渲染页面
    async send() {
      console.log(this.GoodsData)
      const data = await GetGoods(this.GoodsData)
      console.log(data)
      this.tableData = data.goods
      this.tableDataS = this.tableData
      this.GoodsData.pagenum = data.pagenum * 1
      this.GoodsData.total = data.total
    },
    //清空
    clear() {
      this.send()
    },
    input: _.debounce(function () {
      this.send()
    }, 300),

    //编辑
    async updates(ele) {
      console.log(ele, 1111111111)
      this.ruleForm = JSON.parse(JSON.stringify(ele))
      this.dialogVisible = true
      const data = await Search({ id: ele.goods_id })
      this.id = data.goods_cat
    },
    //删除
    del(ele) {
      this.id = ele.goods_id
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const data = await DelState(this.id)
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
          let {
            goods_name,
            goods_price,
            goods_number,
            goods_weight,
            goods_id
          } = this.ruleForm
          console.log(
            goods_name,
            goods_price,
            goods_number,
            goods_weight,
            goods_id
          )
          console.log(goods_id)
          UpSetCategories({
            goods_name,
            goods_price,
            goods_number,
            goods_weight,
            goods_id,
            goods_cat: this.id
          }).then((res) => {
            this.dialogVisible = false
            this.send()
          })
        } else {
          console.log('error submit!!')
          return false
        }
        this.$refs.ruleForm.resetFields()
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    //搜索
    seatch() {
      console.log(this.GoodsData.query)
      console.log(parseFloat(this.GoodsData.query).toString() !== 'NaN')
      if (parseFloat(this.GoodsData.query).toString() !== 'NaN') {
        // const data = await Search({ id: this.GoodsData.query });
        Search({ id: this.GoodsData.query })
          .then((res) => {
            this.tableData = [res]
          })
          .catch((res) => {
            this.tableData = []
          })
      } else {
        console.log(this.tableDataS)
        console.log(this.GoodsData.query)
        this.tableData = this.tableDataS.filter((item) => {
          return item.goods_name.includes(this.GoodsData.query.trim())
        })
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
.goods {
  width: 100%;
  height: calc(100% - 30px);
  min-width: 1350px;
  box-sizing: border-box;
  ::v-deep .has-gutter th {
    font-weight: 700;
  }
}
</style>
