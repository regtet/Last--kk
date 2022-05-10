<template>
  <div class="roles">
    <MBX label1="权限管理" label2="角色列表"></MBX>
    <el-card>
      <el-button type="primary" @click="add">添加角色</el-button>
      <template>
        <el-table class="mt" border :data="tableData" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <div class="box">
                <el-row
                  border
                  v-for="tag in scope.row.children"
                  :key="tag.id"
                  style="border: 1px solid #e9e9e9"
                >
                  <el-col :span="5"
                    ><div class="grid-content bg-purple">
                      <el-tag
                        closable
                        @close="close(tag.id, scope.row)"
                        type=""
                        effect="dark"
                      >
                        {{ tag.authName }}
                      </el-tag>
                      <i class="el-icon-caret-right"></i></div
                  ></el-col>
                  <el-col :span="19">
                    <el-row
                      border
                      v-for="tagS in tag.children"
                      :key="tagS.id"
                      style="border: 1px solid #e9e9e9"
                    >
                      <el-col :span="6"
                        ><div class="grid-content bg-purple">
                          <el-tag
                            closable
                            @close="close(tagS.id, scope.row)"
                            type="success"
                            effect="dark"
                          >
                            {{ tagS.authName }}
                          </el-tag>
                          <i class="el-icon-caret-right"></i></div
                      ></el-col>
                      <el-col :span="18">
                        <el-tag
                          v-for="tagES in tagS.children"
                          :key="tagES.id"
                          closable
                          @close="close(tagES.id, scope.row)"
                          type="warning"
                          effect="dark"
                        >
                          {{ tagES.authName }}
                        </el-tag>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-empty
                  v-show="scope.row.children.length == 0"
                  image="/ali0.png"
                  description="暂无数据"
                ></el-empty>
              </div>
            </template>
          </el-table-column>
          <el-table-column type="index" label="#"> </el-table-column>
          <el-table-column prop="roleName" label="角色名称"> </el-table-column>
          <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
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
              <el-button
                size="mini"
                type="warning"
                icon="el-icon-s-tools"
                @click="set(scope.row)"
                >分配权限</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>

      <!-- 模态框 -->
      <el-dialog
        :title="title == 0 ? '添加角色' : title == 1 ? '编辑角色' : '分配权限'"
        :visible.sync="dialogVisible"
        :before-close="handleClose"
      >
        <el-form
          v-show="title != 2"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
          label-width="80px"
        >
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="ruleForm.roleName"></el-input> </el-form-item
          ><el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="ruleForm.roleDesc"></el-input> </el-form-item
        ></el-form>
        <el-tree
          v-show="title == 2"
          ref="tree"
          :data="treeData"
          show-checkbox
          node-key="id"
          default-expand-all
          :default-checked-keys="checkArr"
          :props="defaultProps"
        >
        </el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="out">取 消</el-button>
          <el-button type="primary" @click="adds">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import MBX from '@/components/MBX.vue'
import {
  Roles,
  AddRoles,
  UpdateList,
  DelList,
  Rights,
  SetRoles,
  DelRoles
} from '../../api/api'
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      dialogVisible: false,
      ruleForm: {
        roleName: '',
        roleDesc: ''
      },
      title: 0,
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          {
            min: 2,
            max: 8,
            message: '角色名称长度在2~8个字符之间',
            trigger: 'blur'
          }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
          { message: '请输入角色描述', trigger: 'blur' }
        ]
      },
      //tree数据
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      checkArr: [], //勾选的
      id: 0 //当前行ID
    }
  },
  methods: {
    async send() {
      const data = await Roles()
      console.log(data)
      this.tableData = data
    },
    updates(e) {
      console.log(e)
      this.title = 1
      this.dialogVisible = true
      this.ruleForm = JSON.parse(JSON.stringify(e))
    },
    async set(e) {
      console.log(e)
      this.id = e.id
      this.checkArr = []
      this.getArr(e.children, this.checkArr)
      this.title = 2
      this.dialogVisible = true
      const data = await Rights({ type: 'tree' })
      this.treeData = data
    },
    getArr(arr, checked) {
      arr.forEach((item) => {
        if (item.children) {
          this.getArr(item.children, this.checkArr)
        } else {
          this.checkArr.push(item.id)
        }
      })
    },
    del(e) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const data = await DelList({ id: e.id })
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
    add() {
      console.log(this.$refs.ruleForm)
      this.dialogVisible = true
      this.ruleForm = {}
      this.title = 0
    },
    out() {
      this.dialogVisible = false
      if (this.title == 2) {
        return false
      }
      this.$refs.ruleForm.resetFields()
    },
    async adds() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          if (this.title == 0) {
            const data = await AddRoles(this.ruleForm)
          } else if (this.title == 1) {
            const { id, roleName, roleDesc } = this.ruleForm
            const data = await UpdateList({ id, roleName, roleDesc })
          }
          this.$refs.ruleForm.resetFields()
          this.send()
          this.dialogVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
      if (this.title == 2) {
        let arr = [
          ...this.$refs.tree.getCheckedKeys(),
          ...this.$refs.tree.getHalfCheckedKeys()
        ]
        const data = await SetRoles({ id: this.id, rids: arr.join(',') })
        this.dialogVisible = false
        this.send()
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    close(rightId, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const data = await DelRoles({ rightId, roleId: row.id })
          console.log(data)
          console.log(row)
          row.children = data
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
.roles {
  height: calc(100% - 30px);
  ::v-deep .has-gutter th {
    font-weight: 700;
  }

  ::v-deep .el-row {
    .el-col-5,
    .el-col-6 {
      text-align: center;
    }
    .el-col-18 {
      padding: 5px 0;
      .el-tag {
        margin: 5px 10px 5px 0;
      }
    }
    .el-col {
      padding: 5px 0 !important;
    }
    .el-col-19 {
      padding: 0 !important;
    }
    display: flex;
    align-items: center;
  }
}
table {
  border-collapse: collapse;
}

.box {
  padding: 20px 50px !important;
}
</style>
