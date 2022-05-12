<template>
  <div class="users">
    <MBX label1="用户管理" label2="用户列表"></MBX>

    <el-card>
      <!-- 头部搜索 -->
      <el-input
        style="width: 400px"
        placeholder="请输入内容"
        v-model="current.query"
        class="input-with-select"
        clearable
        @clear="clear"
        @input="input"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="search"
        ></el-button>
      </el-input>
      <el-button class="ml" type="primary" @click="add">添加用户</el-button>

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
          <el-table-column prop="username" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="email" label="邮箱"> </el-table-column>
          <el-table-column prop="mobile" label="电话"> </el-table-column>
          <el-table-column prop="role_name" label="角色"> </el-table-column>
          <el-table-column prop="mg_state" label="状态">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.mg_state"
                @change="change(scope.row)"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
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
              <el-button
                size="mini"
                type="warning"
                icon="el-icon-s-tools"
                @click="set(scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页 -->
      <div class="block mt">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="current.pagenum"
          :page-sizes="[3, 5, 8, 10]"
          :page-size="current.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
      <!-- 模态框 -->
      <el-dialog
        :title="title == 0 ? '添加用户' : title == 1 ? '编辑用户' : '分配角色'"
        :visible.sync="dialogVisible"
        :before-close="handleClose"
      >
        <el-form
          v-show="title != 2"
          :model="form"
          :rules="rules"
          ref="form"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input :disabled="title == 1" v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item v-if="title == 0" label="密码" prop="password">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="mobile">
            <el-input v-model="form.mobile"></el-input>
          </el-form-item>
        </el-form>
        <div v-show="title == 2">
          <li>当前的用户 : {{ userBox.username }}</li>
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
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import _ from 'lodash'
import {
  AddUsers,
  GetList,
  UpArr,
  Del,
  Search,
  State,
  Roles,
  SetUser
} from '../api/api'
import MBX from '@/components/MBX.vue'

export default {
  data() {
    return {
      title: 0, //控制模态框标题
      _: _,
      form: {
        //表单信息
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在6 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern:
              /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,20}$/,
            message:
              '请输入6-20位英文字母、数字或者符号（除空格），且字母、数字和标点符号至少包含两种',
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            pattern: /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/,
            message: '请输入正确的邮箱',
            trigger: 'blur'
          }
        ],
        mobile: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          {
            pattern: /^[1][3-9][0-9]{9}$/,
            message: '请输入正确的电话号码',
            trigger: 'blur'
          }
        ]
      },
      tableData: [],
      tableDataS: [],
      current: {
        query: '', //输入框
        pagenum: 1, //当前页
        pagesize: 3 //每页几个
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
    input: _.debounce(function () {
      this.send()
    }, 300),
    //渲染页面
    async send() {
      const List = await GetList(this.current)
      this.current.pagenum = List.pagenum
      this.total = List.total
      this.tableData = List.users
      this.tableDataS = this.tableData
    },
    //点击添加用户按钮，弹出模态框
    add() {
      //   for (const key in this.form) {
      //     this.form[key] = "";
      //     debugger
      //   }
      this.form = {}
      this.dialogVisible = true
      this.title = 0
      this.$refs.form ? this.$refs.form.resetFields() : ''
    },
    // 添加用户
    async submitForm() {
      if (this.title == 2) {
        if (this.id == 500) {
          this.$message({
            type: 'info',
            message: '不允许修改admin'
          })
          return false
        }
        const data = await SetUser({ id: this.id, rid: this.value[0] })
        this.dialogVisible = false
        this.send()
        return false
      }
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.title == 0) {
            const Add = await AddUsers(this.form) //添加
            this.dialogVisible = false
            this.send()
          } else {
            console.log(this.form) //编辑
            UpArr({
              id: this.id,
              email: this.form.email,
              mobile: this.form.mobile
            }).then((res) => {
              this.dialogVisible = false
              this.send()
            })
          }
        } else {
          return false
        }
      })
    },
    handleSizeChange(val) {
      this.current.pagesize = val
      this.send()
    },
    handleCurrentChange(val) {
      this.current.pagenum = val
      this.send()
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
      this.id = ele.id
      this.dialogVisible = true
      this.title = 1
      this.form = JSON.parse(JSON.stringify(ele))
      console.log(this.form)
    },
    // 删除
    del(ele) {
      this.id = ele.id
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const Data = await Del({ id: this.id })
          this.send()
        })
        .catch(() => {
          this.$message({
            type: 'warning',
            message: '已取消删除'
          })
        })
    },
    //分配角色
    async set(ele) {
      this.id = ele.id
      const data = await Roles()
      this.options = data
      this.title = 2
      this.dialogVisible = true
      this.userBox = ele
    },
    //搜索
    search() {
      // if (parseFloat(this.current.query).toString() !== 'NaN') {
      //   // const data = await Search({ id: this.current.query });
      //   Search({ id: this.current.query })
      //     .then((res) => {
      //       this.tableData = [res]
      //     })
      //     .catch((res) => {
      //       this.tableData = []
      //     })
      // } else {
      //   this.tableData = this.tableDataS.filter((item) => {
      //     return item.username.includes(this.current.query.trim())
      //   })
      // }
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
  }
}
</script>
<style lang="scss" scoped>
.users {
  min-width: 1140px;
  ::v-deep .has-gutter th {
    font-weight: 700;
  }
}
</style>
