<template>
  <div class="orders">
    <div
      style="
        margin-top: 15px;
        width: 300px;
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
          class="iconfont icon-a-weixiaokaixingaoxing-10"
          @click="seatch"
        ></el-button>
      </el-input>
    </div>
    <template style="margin-top: 30px; width: 100%">
      <el-table :data="tableData" border>
        <el-table-column fixed type="index" label="#"> </el-table-column>
        <el-table-column fixed prop="order_number" label="订单编号">
        </el-table-column>
        <el-table-column fixed prop="order_price" label="订单价格">
        </el-table-column>
        <el-table-column fixed prop="pay_status" label="是否付款">
          <template slot-scope="scope">
            <el-button
              style="padding: 5px"
              size="mini"
              :type="scope.row.pay_status ? 'danger' : 'primary'"
              >{{ scope.row.pay_status ? "未付款" : "已付款" }}</el-button
            >
          </template>
        </el-table-column>
        <el-table-column fixed prop="pay_status" label="是否发货">
          <template slot-scope="scope">
            {{ scope.row.pay_status ? "否" : "是" }}
          </template>
        </el-table-column>
        <el-table-column fixed prop="create_time" label="下单时间">
          <template slot-scope="scope">
            {{ new Date(scope.row.create_time).toLocaleString() }}
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
              type="success"
              size="mini"
              @click="set(scope.row)"
              icon="el-icon-location"
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
      title="修改地址"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="省市区/县" prop="username">
          <el-cascader
            style="width: 100%"
            v-model="value"
            :options="cityOptions"
            @change="changeProvince"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
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
      title="物流进度"
      :visible.sync="oneBox"
      width="30%"
      :before-close="handleClose"
    >
      <el-timeline :reverse="reverse">
    <el-timeline-item
      v-for="(activity, index) in activities"
      :key="index"
      :timestamp="activity.timestamp">
      {{activity.content}}
    </el-timeline-item>
  </el-timeline>
      <span slot="footer" class="dialog-footer">
        <el-button @click="oneBox = false">取 消</el-button>
        <el-button type="primary" @click="oneBox=false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { number } from "echarts";
import axios from 'axios'
import cityOptions from "../../../public/city_data2017_element";
import {
  getTable,
  add,
  updE,
  upSta,
  FindTagID,
  dizhi,
  FindUID,
} from "../../api/orders";
export default {
  data() {
    return {
      reverse: true,
        activities: [{
          content: '活动按期开始',
          timestamp: '2018-04-15'
        }, {
          content: '通过审核',
          timestamp: '2018-04-13'
        }, {
          content: '创建成功',
          timestamp: '2018-04-11'
        }],
      cityOptions: cityOptions,
      updates: false,
      id: 0,
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
      value: [],
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
          { required: true, message: "请输入详细地址", trigger: "blur" },
          { min: 3, max: 15, message: "不符合规则", trigger: "blur" },
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
        console.log(res);
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
        if (typeof -this.obj.query == number) {
          FindTagID({ id: this.obj.query }).then((res) => {
            this.tableData = [res];
            this.pagesize = 1;
            this.total = 1;
          });
        } else {
          this.tableData = this.tableDatas.filter((item) =>
            item.order_number.includes(this.obj.query)
          );
        }
      } else {
        this.getData();
      }
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
      this.id = row.order_id;
    },
    set(row) {
      this.oneBox=true
      dizhi().then((res) => {
        console.log(res);
      });
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
      this.dialogVisible = false;
    },
    changeProvince() {},
    ok(row) {
      this.select = parseInt(this.select);
      FindUID({ id: this.id, rid: this.select + 0 }).then((res) => {
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
.orders {
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
   overflow: scroll; 
  overflow-x: hidden; overflow-y: auto; 
  border-radius: 5px;
  .el-table {
    margin-top: 30px;
  }

  .el-cascader-panel {
    height: 200px !important;
  }
}
</style>
