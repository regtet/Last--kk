<template>
  <div class="users">
    <div
      style="
        margin-top: 15px;
        width: 400px;
        display: flex;
        justify-content: space-between;
      "
    >
      <el-input
        placeholder="请输入内容" clearable
        v-model="obj.query"
        class="input-with-select"
        @clear="dd"
      >
        <el-button
          slot="append"
          style="font-size: 25px; color: red"
          class="iconfont icon-a-weixiaokaixingaoxing-10"
          @click="seatch"
        ></el-button>
      </el-input>
      <el-button
        type="primary"
        style="margin-left: 20px"
        @click="dialogVisible = true"
        >添加小怪兽</el-button
      >
    </div>
    <template style="margin-top: 30px; width: 100%">
      <el-table :data="tableData" border>
        <el-table-column fixed type="index" label="#"> </el-table-column>
        <el-table-column fixed prop="username" label="姓名"> </el-table-column>
        <el-table-column fixed prop="email" label="邮箱"> </el-table-column>
        <el-table-column fixed prop="mobile" label="电话"> </el-table-column>
        <el-table-column fixed prop="role_name" label="角色"> </el-table-column>
        <el-table-column fixed prop="mg_state" label="状态">
          <template slot-scope="scope">
            <el-switch
              style="display: block"
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="change(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="update(scope.row)"
              icon="el-icon-edit"
            ></el-button>
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="del(scope.row)"
            ></el-button>
            <el-button
              type="warning"
              size="mini"
              @click="set(scope.row)"
              icon="el-icon-setting"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="obj.pagenum"
      :page-sizes="[1, 3, 8, 100]"
      :page-size="obj.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="margin-top: 30px"
    >
    </el-pagination>
    <el-dialog
      :title="updates ? '编辑用户' : '添加用户'"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" :disabled="updates"></el-input>
        </el-form-item>
        <el-form-item
          :style="updates ? 'display:none' : ''"
          label="密码"
          prop="password"
        >
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="ruleForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      title="分配角色"
      :visible.sync="oneBox"
      width="30%"
      :before-close="handleClose"
    >
      <span>当前的用户:{{name}} </span>
     <span style="display:block; margin:15px 0"> 当前的用户:{{user}} </span>
    <div style="margin-top: 15px;">
      分配新角色:
    <el-select style="margin-left:10px" v-model="select" slot="prepend" placeholder="请选择">
      <el-option v-for="(item,i) in arr " :key="i" :label="item.roleName" :value="item.id"></el-option>
    </el-select>
</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="oneBox = false">取 消</el-button>
        <el-button type="primary" @click="ok">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { number } from "echarts";
import { getTable, add, del, updE, upSta, FindTagID,FindUID,GETr } from "../../api/api";
export default {
  data() {
    return {
      updates: false,
      id: 0,
      arr:[],
      oneBox: false,
      select: "",
      name:"",
      user:"",
      obj: {
        query: "",
        pagenum: 1,
        pagesize: 3, //每页个数
      },
      total: 100,
      tableData: [],
      tableDatas: [],
      dialogVisible: false,
      ruleForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 15, message: "不符合用户名规则", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 15, message: "不符合密码规则", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            pattern: /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/,
            message: "不符合邮箱规则",
            trigger: "blur",
          },
        ],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            pattern: /^[1][3-9][0-9]{9}$/,
            message: "不符合手机号规则",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    getData() {
      getTable(this.obj).then((res) => {
        this.obj.pagenum = res.pagenum;
        this.total = res.total;
        this.tableData = res.users;
        this.tableDatas = res.users;
      });
    },
    dd(){
      this.getData()
    },
    seatch() {
      if (this.obj.query !== "") {
        if (typeof -this.obj.query == 'number') {
          FindTagID({ id: this.obj.query }).then((res) => {
            this.tableData = [res];
            this.pagesize = 1;
            this.total = 1;
          });
        } else {
          this.tableData = this.tableDatas.filter((item) =>
            item.username.includes(this.obj.query)
          );
        }
      } else {
        this.getData();
      }
    },
    del(row) {
      del({ id: row.id }).then((res) => {
      });
    },
    change(e) {
      const { id, mg_state: type } = e;
      upSta({ id, type }).then((res) => {
        this.getData();
      });
    },
    update(row) {
      this.updates = true;
      this.ruleForm = row;
      this.dialogVisible = true;
      this.id = row.id;
    },
    set(row) {
      GETr().then(res=>{
        console.log(res);
        this.arr=res
      })
      console.log(row);
      this.oneBox = true;
      this.name=row.username
      this.user=row.role_name
      this.id=row.id
    },
    handleSizeChange(val) {
      this.obj.pagesize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.obj.pagenum = val;
      this.getData();
    },
    handleClose(done) {
      this.dialogVisible = false;
    },
    submitForm(formName) {
      if (this.updates) {
        let { id, mobile, email } = this.ruleForm;
        updE({ id, mobile, email }).then((res) => {
          this.dialogVisible = false;
          this.getData();
        });
      } else {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            add(this.ruleForm).then((res) => {
              this.dialogVisible = false;
              this.getData();
            });
          } else {
          }
        });
      }
    },
    ok(row){
     this.select=parseInt(this.select)
     console.log(this.select);
      FindUID({id:this.id,rid:this.select+0}).then(res=>{
        this.oneBox=false
      })
    }
  },
  components: {},
  computed: {},
  watch: {},
  created() {
    this.getData();
  },
};
</script>
<style lang="scss" scoped>
.users {
  padding: 20px;
  box-sizing: border-box;
  height: 95%;
  overflow: scroll; 
  overflow-x: hidden; overflow-y: auto; 
  border-radius: 5px;
  .el-table {
    margin-top: 30px;
  }
}
</style>
