<template>
  <div class="goods">
    <div
      style="
        margin-top: 15px;
        width: 400px;
        display: flex;
        justify-content: space-between;
      "
    >
      <el-input
        placeholder="请输入内容"
        clearable
        v-model="obj.query"
        class="input-with-select"
        @clear="dd"
      >
        <el-button
          slot="append"
          style="font-size: 25px; color: red"
          class="iconfont icon-maomi1"
          @click="seatch"
        ></el-button>
      </el-input>
      <el-button
        type="primary"
        style="margin-left: 20px"
        @click="$router.push('/add')"
        >添加小怪兽</el-button
      >
    </div>
    <template style="margin-top: 30px; width: 100%">
      <el-table :data="tableData" border>
        <el-table-column fixed type="index" label="#"> </el-table-column>
        <el-table-column fixed prop="goods_name" width="500px" label="商品名称">
        </el-table-column>
        <el-table-column fixed prop="goods_price" label="商品价格（元）">
        </el-table-column>
        <el-table-column fixed prop="goods_number" label="商品重量">
        </el-table-column>
        <el-table-column fixed prop="add_time" label="创建时间">
          <template slot-scope="scope">
            {{ new Date(scope.row.add_time).toLocaleString() }}
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
      :title="updates ? '编辑商品' : '添加商品'"
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
        <el-form-item label="商品名称" prop="goods_name">
          <el-input
            v-model="ruleForm.goods_name"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="goods_price">
          <el-input v-model="ruleForm.goods_price"></el-input>
        </el-form-item>
        <el-form-item label="商品数量">
          <el-input v-model="ruleForm.goods_number"></el-input>
        </el-form-item>
        <el-form-item label="商品重量">
          <el-input v-model="ruleForm.goods_weight"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>

  </div>
</template>
<script>
import { number } from 'echarts';
import {
  getTable,
  add,
  del,
  updE,
  upSta,
  FindTagID,
  FindUID,
} from "../../api/goods";
export default {
  data() {
    return {
      updates: false,
      goods_id: 0,
      oneBox: false,
      select: "",
      name: "",
      user: "",
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
        goods_name: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
      },
      rules: {
        goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 2, max: 1200, message: "不符合规则", trigger: "blur" },
        ],
        goods_price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
          { min: 3, max: 15, message: "不符合规则", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    getData() {
      getTable(this.obj).then((res) => {
          console.log(res,11111111);
        this.obj.pagenum = parseInt(res.pagenum);
        this.total = res.total;
        this.tableData = res.goods;
        this.tableDatas = res.goods;
      });
    },
    dd() {
      this.getData();
    },
    seatch() {
      if (this.obj.query !== "") {
        if (typeof -this.obj.query === number) {
          FindTagID({ goods_id: this.obj.query }).then((res) => {
            this.tableData = [res];
            this.pagesize = 1;
            this.total = 1;
          });
        } else {
          this.tableData = this.tableDatas.filter((item) =>
            item.goods_name.includes(this.obj.query)
          );
        }
      } else {
        this.getData();
      }
    },
    del(row) {
      console.log(row);
      del({ goods_id: row.goods_id }).then((res) => {
        this.getData();
      });
    },
    change(e) {
      const { goods_id, mg_state: type } = e;
      upSta({ goods_id, type }).then((res) => {
        this.getData();
      });
    },
    update(row) {
      console.log(row);
      this.updates = true;
      this.ruleForm = row;
      this.dialogVisible = true;
      this.goods_id = row.goods_id;
    },
    set(row) {
        console.log(row);
      this.oneBox = true;
      this.name = row.username;
      this.user = row.role_name;
      this.goods_id = row.goods_id;
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
        console.log(formName);
      if (this.updates) {
          console.log(this.ruleForm);
        let { goods_name,goods_price,goods_number,goods_weight,goods_id } = this.ruleForm;
        console.log(goods_name,goods_price,goods_number,goods_weight,goods_id);
        updE({ goods_name,goods_price,goods_number,goods_weight,goods_id }).then((res) => {
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
    ok(row) {
      this.select = parseInt(this.select);
      FindUID({ goods_id: this.goods_id, rid: this.select + 0 }).then((res) => {
        this.oneBox = false;
      });
    },
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
.goods {
height: 100%;
  overflow: scroll; 
  overflow-x: hidden; overflow-y: auto; 
  border-radius: 5px;
  .el-table {
    margin-top: 30px;
  }
}
</style>
