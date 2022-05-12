<template>
  <div class="orders">
    <MBX label1="订单管理" label2="订单列表"></MBX>
    <el-card>
      <!-- 头部搜索 -->
      <el-input
        style="width: 400px"
        placeholder="请输入内容"
        v-model="current.query"
        class="input-with-select"
        clearable
        @clear="clear"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="search"
        ></el-button>
      </el-input>

      <!-- 表格 -->
      <template>
        <el-table
          :data="tableData"
          class="mt"
          border
          stripe
          style="width: 100%"
        >
          <el-table-column type="index" label="#" width="50"> </el-table-column>
          <el-table-column prop="order_number" label="订单编号">
          </el-table-column>
          <el-table-column prop="order_price" label="订单价格">
          </el-table-column>
          <el-table-column prop="pay_status" label="是否付款">
            <template slot-scope="scope">
              <el-button style="padding: 3px" size="mini" type="danger">{{
                scope.row.pay_status == 0 ? '未付款' : '已支付'
              }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="is_send" label="是否发货">
            <template slot-scope="scope">
              {{ scope.row.is_send }}
            </template>
          </el-table-column>
          <el-table-column prop="update_time" label="下单时间">
            <template slot-scope="scope">
              {{
                new Date(scope.row.update_time * 1000)
                  .toLocaleString()
                  .replace(/\//g, '-')
              }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150px">
            <template slot-scope="scope">
              <el-tooltip
                class="item"
                effect="dark"
                content="修改地址"
                placement="top-start"
              >
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  @click="updates(scope.row)"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="查看物流"
                placement="top-start"
              >
                <el-button
                  size="mini"
                  type="success"
                  icon="el-icon-location-information"
                  @click="set(scope.row)"
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页 -->
      <div class="block">
        <el-pagination
          class="mt"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="current.pagenum"
          :page-sizes="[5, 8, 10]"
          :page-size="current.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
      <!-- 模态框 -->
      <el-dialog
        title="修改地址"
        :visible.sync="dialogVisible"
        :before-close="handleClose"
      >
        <el-form
          :model="form"
          :rules="rules"
          ref="form"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="省市区/县" prop="one">
            <el-cascader
              :options="cityOptions"
              v-model="form.one"
              @change="changeProvince"
            >
            </el-cascader>
          </el-form-item>
          <el-form-item label="详细地址" prop="two">
            <el-input v-model="form.two"></el-input>
          </el-form-item>
        </el-form>
        <div v-show="title == 2">
          <li>当前的用户 : {{ userBox.order_number }}</li>
          <li class="mt">当前的角色 : {{ userBox.role_name }}</li>
          <div class="mt">
            分配新角色 :
            <el-cascader
              v-model="value"
              :options="options"
              @change="handleChange"
              :props="defaultParams"
            ></el-cascader>
          </div>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="out">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 地图定位  -->

      <el-dialog :visible.sync="flag" title="查看物流">
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in City"
            :key="index"
            :icon="activity.location"
            :type="activity.type"
            :color="activity.color"
            :size="activity.size"
            :timestamp="activity.timestamp"
          >
            {{ activity.context }}
          </el-timeline-item>
        </el-timeline>
        <span slot="footer" class="dialog-footer">
          <el-button @click="flag = false">取 消</el-button>
          <el-button type="primary" @click="flag = false">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import {
  GetList, //用户列表
  UpArr, //编辑用户
  Search, //搜索用户
  WuLiu //物流状态
} from '../../api/orders'
import City from '../../assets/js/locat'
import cityOptions from '../../assets/js/city_data2017_element'
import MBX from '@/components/MBX.vue'
export default {
  data() {
    return {
      City: City[0].data,
      flag: false,
      title: 0, //控制模态框标题
      cityOptions: cityOptions,
      city: [],
      form: {
        //表单信息
        one: [],
        two: ''
      },
      rules: {
        two: [
          { required: true, message: '请输入详细地址', trigger: 'blur' },
          { min: 1, max: 15, message: '', trigger: 'blur' }
        ]
      },
      tableData: [],
      tableDataS: [],
      current: {
        query: '', //输入框
        pagenum: 1, //当前页
        pagesize: 5 //每页几个
      },
      total: 10, //总页数
      dialogVisible: false, //模态框
      id: 0, //点击当前行的ID
      //分配角色的数据
      userBox: {},
      value: [], //选中的数据
      options: [
        //数据
        {
          value: 'zhinan',
          label: '指南'
        }
      ],
      //级联选择器配置
      defaultParams: {
        label: 'roleName',
        value: 'id',
        children: ''
      }
    }
  },
  methods: {
    changeProvince() {},
    //渲染页面
    async send() {
      const List = await GetList(this.current)
      console.log(List)
      this.current.pagenum = List.pagenum * 1
      this.total = List.total
      this.tableData = List.goods
      this.tableDataS = this.tableData
    },
    // 地图定位
    async set(row) {
      console.log(row)
      this.flag = true
    },
    //点击取消
    out() {
      this.$refs.form.resetFields()
      this.dialogVisible = false
    },
    // 点击确定
    async submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.dialogVisible = false
          this.send()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleSizeChange(val) {
      this.current.pagesize = val
      this.send()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.current.pagenum = val
      this.send()
      console.log(`当前页: ${val}`)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    //编辑
    updates(ele) {
      this.$refs.form ? this.$refs.form.resetFields() : ''
      console.log(ele)
      this.id = ele.id
      this.dialogVisible = true
      this.title = 1
      this.form = JSON.parse(JSON.stringify(ele))
      console.log(this.form)
    },

    //搜索
    search() {
      //   if(this.current.query.length==0){
      //       alert("不能为空")
      //   };
      console.log(parseFloat(this.current.query).toString() !== 'NaN')
      if (parseFloat(this.current.query).toString() !== 'NaN') {
        // const data = await Search({ id: this.current.query });
        Search({ id: this.current.query })
          .then((res) => {
            this.tableData = [res]
          })
          .catch((res) => {
            this.tableData = []
          })
      } else {
        console.log(this.tableDataS)
        console.log(this.current.query)
        this.tableData = this.tableDataS.filter((item) => {
          return item.order_number.includes(this.current.query.trim())
        })
      }
    },
    //清空
    clear() {
      this.send()
    },
    //改变状态
    async change(e) {
      console.log(e)
      const data = await State({ id: e.id, type: e.mg_state })
      this.send()
    },
    handleChange(value) {
      this.value = value
    }
  },
  components: { MBX },
  computed: {},
  watch: {},
  created() {
    this.send()
    this.City[0].location = 'el-icon-sunset'
  }
}
</script>
<style lang="scss" scoped>
.orders {
  width: 100%;
  min-width: 1140px;
  height: calc(100% - 30px);
  ::v-deep .has-gutter th {
    font-weight: 700;
  }
}
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden !important;
}
::v-deep .el-icon-sunset:before {
  color: red;
  font-size: 25px;
  background: pink;
}
</style>
