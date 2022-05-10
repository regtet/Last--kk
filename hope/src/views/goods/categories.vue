<template>
  <div class="categories">
    <el-button style="margin: 0 0 20px 0" @click="oneBox = true"
      >添加分类</el-button
    >
    <el-table
      :data="tableData"
      :default-expand-all="false"
      style="width: 100%"
      row-key="cat_id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      >
      <el-table-column label="#" type="index" width="50px">
        <template slot-scope="scope">
          <!-- {{Object.keys(tableData)}} -->
          <i>
            {{
              index > 3
                ? (index = 0)
                : scope.row.cat_level == 0
                ? (index += 1)
                : ""
            }}</i
          >
        </template>
      </el-table-column>
      <el-table-column prop="cat_name" label="分类名称"> </el-table-column>
      <el-table-column prop="cat_deleted" label="是否有效">
        <template slot-scope="scope">
          <i
            :style="'color:green'"
            :class="
              !scope.row.cat_deleted ? 'el-icon-success' : 'el-icon-error'
            "
          ></i>
        </template>
      </el-table-column>
      <el-table-column prop="cat_level" label="排序">
        <template slot-scope="scope">
          <el-button
            style="padding: 5px"
            size="mini"
            :type="
              scope.row.cat_level == 0
                ? 'primary'
                : scope.row.cat_level == 1
                ? 'success'
                : 'warning'
            "
            >{{
              scope.row.cat_level == 0
                ? "一级"
                : scope.row.cat_level == 1
                ? "二级"
                : "三级"
            }}</el-button
          >
        </template>
      </el-table-column>
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
            @click="del(scope.row)"
            icon="el-icon-delete"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[3, 20, 300]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <!-- 添加 -->
    <el-dialog
      title="添加商品分类"
      :visible.sync="oneBox"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
      >
        <el-form-item label="分类名称" prop="roleName">
          <el-input v-model="ruleForm.roleName"> </el-input>
        </el-form-item>
        <el-form-item label="父级分类" prop="roleDesc">
          <div class="block">
            <el-cascader
              v-model="title"
              :options="cityOptions"
              @change="changes"
              :props="{
                value: 'cat_id',
                label: 'cat_name',
                children: 'children',
                checkStrictly: true,
              }"
              clearable
            ></el-cascader>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="oneBox = false">取消 </el-button>
        <el-button type="primary" @click="go"> 确 认 </el-button>
      </span>
    </el-dialog>

    <!-- 编辑 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="45%"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
      >
        <el-form-item label="分类名称" prop="roleName">
          <el-input v-model="ruleForm.roleName"> </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="SSS">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { categories, cateAdd, cateSSS, DEL } from "../../api/categories";

export default {
  data() {
    return {
      dialogVisible: false,
      oneBox: false,
      index: 0,
      cityOptions: [],
      title: [],
      tableData: [
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          children: [
            {
              id: 31,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄",
            },
            {
              id: 32,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄",
            },
          ],
        },
      ],
      pagenum: 1,
      value: [],
      pagesize: 3,
      total: 3,
      id: 0,
      ruleForm: {
        roleName: "",
        roleDesc: "",
        id: 0,
      },
      rules: {
        roleName: [
          { required: true, message: "请输入分类名", trigger: "blur" },
          { min: 3, max: 8, message: "请输入真实信息", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    changeProvince() {},
    changes() {
      console.log(this.title);
      console.log(this.ruleForm.roleName);
    },
    send() {
      categories({
        type: 3,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
      }).then((res) => {
        this.tableData = res.result;
        this.total = res.total;
        this.cityOptions = res.result;
        // this.cityOptions.forEach((item) => {
        //   item.label = item.cat_name;
        //   item.value = item.cat_name;
        //   item.children.forEach((ele) => {
        //     ele.label = ele.cat_name;
        //     ele.value = ele.cat_name;
        //     ele.children.forEach((ind) => {
        //       ind.label = ind.cat_name;
        //       ind.value = ind.cat_name;
        //     });
        //   });
        // });
      });
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.send();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.send();
      console.log(`当前页: ${val}`);
    },
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 31,
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
          },
          {
            id: 32,
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
          },
        ]);
      }, 1000);
    },
    go() {

      let pid=this.title[this.title.length-1] ||0
      console.log(pid);
               console.log(this.title);
      console.log(this.ruleForm.roleName);

          cateAdd({
          cat_pid:pid,
          cat_name: `${this.ruleForm.roleName}`,
          cat_level: this.value.length,
        }).then((res) => {
          this.send()
          this.dialogVisible=false
        });


      // var index = 0;
      // console.log(this.cityOptions);
      // console.log(this.value);
      // if (this.value.length > 0) {
      //   index = this.cityOptions.findIndex((item) =>
      //     item.value.includes(this.value[0])
      //   );
      // } else {
        // cateAdd({
        //   cat_pid:
        //     this.value.length - 1 == 0 ? 0 : this.cityOptions[index].cat_id,
        //   cat_name: `${this.ruleForm.roleName}`,
        //   cat_level: this.value.length - 1,
        // }).then((res) => {
        //   this.oneBox = false;
        //   this.send();
        // });
      // }
    },
    handleClose() {},
    update(e) {
      this.dialogVisible = true;
      console.log(e);
      this.id = e.cat_id;
      this.ruleForm.roleName = e.cat_name;
    },
    SSS() {
      cateSSS({ id: this.id, cat_name: this.ruleForm.roleName }).then((res) => {
        console.log(res);
        this.send();
      });
      this.dialogVisible = false;
      this.ruleForm.roleName = "";
    },
    del(e) {
      this.id = e.cat_id;
      DEL({ id: this.id }).then((res) => {
        this.send();
      });
    },
  },
  components: {},
  computed: {},
  watch: {},
  created() {
    this.send();
  },
};
</script>
<style lang="scss" scoped>
.categories {
  height: 100%;
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: auto;
  border-radius: 5px;
}
</style>
