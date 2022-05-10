<template>
  <div class="roles">
    <el-button
      type="primary"
      style="margin: 0 0 15px 0"
      @click="
        oneBox = true;
        oneBoxState = true;
        ruleForm = {};
      "
      >骑士身份添加</el-button
    >

    <!-- 表格 -->
    <template>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <!-- 第一块 -->
              <el-row
                v-for="(item, i) in props.row.children"
                :key="i"
                style="border: 1px solid #000; height: 100%; position: relative"
              >
                <el-col
                  :span="4"
                  style="
                    text-align: center;
                    height: 100%;
                    transform: translateY(25%);
                    position: absolute;
                  "
                >
                  <div class="grid-content bg-purple">
                    <el-tag
                      @close="ggg=item.id;close(props.row, props.row.id);"
                      closable
                      effect="dark"
                    >
                      {{ item.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i></div
                ></el-col>

                <el-col
                  :span="20"
                  style="border: 1px solid skyblue; float: right"
                  ><div class="grid-content bg-purple-light">
                    <!-- 第二块 -->

                    <el-row
                      v-for="(ele, ind) in item.children"
                      :key="ind"
                      style="border: 1px solid #ccc; height: auto"
                    >
                      <el-col
                        :span="4"
                        style="margin: 35px auto; text-align: center;"
                        ><div class="grid-content bg-purple">
                          <el-tag
                             @close="ggg=ele.id;close(props.row, props.row.id);"
                            closable
                            effect="success"
                          >
                            {{ ele.authName }}</el-tag
                          >
                          <i class="el-icon-caret-right"></i></div
                      ></el-col>

                      <el-col :span="20"
                        ><div class="grid-content bg-purple-light">
                          <!-- 第三块 -->
                          <div class="grid-content bg-purple" style="border:1px solid #ccc">
                            <el-tag
                              style="margin: 10px"
                              closable
                              effect="warning"
                             @close="ggg=obj.id;close(props.row, props.row.id);"
                              v-for="(obj, index) in ele.children"
                              :key="index"
                            >
                              {{ obj.authName }}</el-tag
                            >
                          </div>
                        </div></el-col
                      >
                    </el-row>
                  </div></el-col
                >
              </el-row>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="#" type="index" width="50px"> </el-table-column>
        <el-table-column label="角色名称" prop="roleName"> </el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="update(scope.row)"
              icon="el-icon-edit"
              >编辑</el-button
            >

            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="del(scope.row)"
              >删除</el-button
            >
            <el-button
              type="warning"
              size="mini"
              icon="el-icon-s-tools"
              @click="set(scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </template>

    <!-- 添加 -->
    <el-dialog
      :title="oneBoxState ? '骑士登记处' : '骑士信息更正'"
      :visible.sync="oneBox"
      :before-close="handleClose"
    >
      <span slot="footer" class="dialog-footer">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
        >
          <el-form-item label="骑士姓名" prop="roleName">
            <el-input v-model="ruleForm.roleName"> </el-input>
          </el-form-item>
          <el-form-item label="骑士信息" prop="roleDesc">
            <el-input v-model="ruleForm.roleDesc"> </el-input>
          </el-form-item>
        </el-form>
        <el-button @click="oneBox = false">驳 回 </el-button>
        <el-button type="primary" @click="go">{{
          oneBoxState ? "通 过 验 证" : "确 认 修 改"
        }}</el-button>
      </span>
    </el-dialog>

    <!-- 分配权限 -->
    <el-dialog
      title="为骑士授予官职"
      :visible.sync="twoBox"
      :before-close="handleClose"
    >
      <el-tree
        :data="TwoData"
        ref="tree"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="checkedArr"
        :props="defaultProps"
      >
      </el-tree>

      <span slot="footer" class="dialog-footer">
        <el-button @click="twoBox = false">取 消</el-button>
        <el-button type="primary" @click="twoBoxOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  roles,
  Add,
  UpdA,
  Dell,
  GetList,
  SetDa,
  closes,
} from "../../api/rights";
export default {
  data() {
    return {
      ggg:5,
      tableData: [],
      arr: [],
      checkedArr:[],
      oneBox: false,
      oneBoxState: false,
      twoBox: false,
      ruleForm: {
        roleName: "",
        roleDesc: "",
        id: 0,
      },
      rules: {
        roleName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 3, max: 8, message: "请输入真实信息", trigger: "blur" },
        ],
        roleDesc: [
          { required: true, message: "请输入信息", trigger: "blur" },
          { min: 3, max: 16, message: "请输入真实信息", trigger: "blur" },
        ],
      },
      TwoData: [],
      defaultProps: {
        children: "children",
        label: "authName",
      },
    };
  },
  methods: {
    handleClose() {},
    set(row) {
      console.log(row);
      this.ruleForm.id = row.id;
      this.twoBox = true;
      // console.log(row,this.checkedArr);
      this.getLists(row,this.checkedArr)
      GetList().then((res) => {
        console.log(res);
        this.TwoData = res;
      });
    },
    getLists(row,checkedArr){
      if(!row.children){
       return checkedArr.push(row.id)
      }
      row.children.forEach(item=>{
        this.getLists(item,checkedArr)
      })
    },
    twoBoxOk() {
      this.twoBox = false;
      let arr = this.$refs.tree.getHalfCheckedKeys();
      let arr2=this.$refs.tree.getCheckedKeys()
      let arrs=[...arr,...arr2]
      SetDa({ id: this.ruleForm.id, rids: arrs.join(",") }).then((res) => {
        this.tableData=[]
        this.checkedArr=[]
          this.send();
        GetList().then((res) => {
        console.log(res);
        this.TwoData = res;
      });
      });
    },
    update(row) {
      this.ruleForm = row;
      this.ruleForm.id = row.id;

      this.oneBox = true;
      this.oneBoxState = false;
    },
    del(row) {
      console.log(row);
      this.ruleForm.id = row.id;
      Dell({ id: this.ruleForm.id }).then((res) => {
        this.send();
      });
    },
    send() {
      roles().then((res) => {
        this.tableData = res;
      });
    },
    go() {
      if (this.oneBoxState) {
        Add(this.ruleForm).then((res) => {
          this.send();
          this.oneBox = false;
        });
      } else {
        UpdA(this.ruleForm).then((res) => {
          this.send();
          this.oneBox = false;
          this.oneBoxState = false;
        });
      }
    },
    close(e, ee) {
      // console.log(e.id, ee);
      console.log(e,ee);
      console.log(this.ggg);
      closes({ e: this.ggg, ee: ee }).then((res) => {
        console.log(res);
        e.children=res
        // this.send();
      });
    },
  },
  components: {},
  computed: {},
  watch: {},
  created() {
    this.send();
    //  GetList().then((res) => {
    //     console.log(res);
    //     this.TwoData = res;
    //   });
  },
};
</script>
<style lang="scss" scoped>
.roles {
  height: 100%;
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: auto;
  border-radius: 5px;
  overflow-x: none;
  .el-tag {
    padding: 0 15px;
  }
}
</style>
