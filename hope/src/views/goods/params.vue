<template>
  <div class="params">
    <el-alert
      title="注意：只允许为第三级分类设置相关参数！"
      type="warning"
      name="456"
      effect="dark"
    >
    </el-alert>
    <div style="margin: 15px">
      选择商品分类：<el-cascader
        style="width: 300px"
        v-model="value"
        :options="cityOptions"
        @change="changeProvince"
        :props="state"
      ></el-cascader>
      <el-tabs type="border-card" v-model="index" @tab-click="e">
        <!-- 第一 -->
        <el-tab-pane label="动态参数">
          <el-button
            type="primary"
            @click="
              oneBox = true;
              flag = 0;
            "
            >添加参数</el-button
          >

          <template>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form
                    label-position="left"
                    inline
                    class="demo-table-expand"
                  >
                    <!-- 第一块 -->
                    <el-row
                      v-for="(item, i) in props.row.children"
                      :key="i"
                      style="border: 1px solid #000; height: auto"
                    >
                      <el-col
                        :span="4"
                        style="text-align: center; margin-top: 120px"
                        ><div class="grid-content bg-purple">
                          <el-tag
                            @close="close(item, props.row.id)"
                            closable
                            effect="dark"
                          >
                            {{ item.authName }}</el-tag
                          >
                          <i class="el-icon-caret-right"></i></div
                      ></el-col>

                      <el-col :span="20"
                        ><div class="grid-content bg-purple-light">
                          <!-- 第二块 -->

                          <el-row
                            v-for="(ele, ind) in item.children"
                            :key="ind"
                            style="border: 1px solid #ccc; height: auto"
                          >
                            <el-col
                              :span="4"
                              style="margin: 35px auto; text-align: center"
                              ><div class="grid-content bg-purple">
                                <el-tag
                                  @close="close(ele, props.row.id)"
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
                                <div class="grid-content bg-purple">
                                  <el-tag
                                    style="margin: 10px"
                                    closable
                                    effect="warning"
                                    @close="close(obj, props.row.id)"
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
              <el-table-column label="#" type="index" width="50px">
              </el-table-column>
              <el-table-column label="参数名称" prop="attr_name">
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
        </el-tab-pane>
        <el-tab-pane label="静态属性">
          <!-- 第二 -->
          <el-button
            type="primary"
            @click="
              oneBox = true;
              flag = 1;
            "
            >静态属性</el-button
          >
    <template>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form
                    label-position="left"
                    inline
                    class="demo-table-expand"
                  >
                    <!-- 第一块 -->
                    <el-row
                      v-for="(item, i) in props.row.children"
                      :key="i"
                      style="border: 1px solid #000; height: auto"
                    >
                      <el-col
                        :span="4"
                        style="text-align: center; margin-top: 120px"
                        ><div class="grid-content bg-purple">
                          <el-tag
                            @close="close(item, props.row.id)"
                            closable
                            effect="dark"
                          >
                            {{ item.authName }}</el-tag
                          >
                          <i class="el-icon-caret-right"></i></div
                      ></el-col>

                      <el-col :span="20"
                        ><div class="grid-content bg-purple-light">
                          <!-- 第二块 -->

                          <el-row
                            v-for="(ele, ind) in item.children"
                            :key="ind"
                            style="border: 1px solid #ccc; height: auto"
                          >
                            <el-col
                              :span="4"
                              style="margin: 35px auto; text-align: center"
                              ><div class="grid-content bg-purple">
                                <el-tag
                                  @close="close(ele, props.row.id)"
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
                                <div class="grid-content bg-purple">
                                  <el-tag
                                    style="margin: 10px"
                                    closable
                                    effect="warning"
                                    @close="close(obj, props.row.id)"
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
              <el-table-column label="#" type="index" width="50px">
              </el-table-column>
              <el-table-column label="参数名称" prop="attr_name">
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
        
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      :title="flag == 0 ? '添加参数' : '静态属性'"
      :visible.sync="oneBox"
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
        <el-form-item :label="flag == 0 ? '添加参数' : '静态属性'" prop="name">
          <el-input v-model="ruleForm.name"></el-input> </el-form-item
      ></el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="oneBox = false">取 消</el-button>
        <el-button type="primary" @click="ok">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { categories, DDA } from "../../api/categories";
import { CanShu } from "../../api/goods";
export default {
  data() {
    return {
      cityOptions: [],
      value: [],
       state: {
        label: "cat_name",
        children: "children",
        value: "cat_id",
      },
      index: 0,
      flag: 0,
      id: 0,
      attr_sel: "many",
      tableData: [],
      oneBox: false,
      dialogVisible: false,
      ruleForm: {
        name: "",
      },
      rules: {
        name: [
          { required: true, message: "动态参数", trigger: "blur" },
          { min: 3, max: 5, message: "不符规格", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    ok() {
      this.oneBox = false;
      console.log(this.id);
      console.log(this.ruleForm.name);
      if (this.flag == 0) {
        console.log(this.id, this.attr_sel, this.ruleForm.name);
        DDA({
          id: this.id,
          sel: "many",
          attr_sel: this.attr_sel,
          attr_name: this.ruleForm.name,
        }).then((res) => {
          console.log(res);
        });
      } else {
      }
    },
    send() {
      categories({}).then((res) => {
        this.cityOptions = res;
        // this.cityOptions.forEach((item) => {
        //   item.label = item.cat_name;
        //   item.value = item.cat_name;
        //   setTimeout(() => {
        //     item.children.forEach((ele) => {
        //       ele.label = ele.cat_name;
        //       ele.value = ele.cat_name;
        //       ele.children.forEach((ind) => {
        //         ind.label = ind.cat_name;
        //         ind.value = ind.cat_name;
        //       });
        //     });
        //   });
        // });
      });
    },
    e(e) {
      console.log(e.index);
      this.flag = e.index;

      if (e.index == 0) {
        // this.attr_sel = "many";
        // console.log(this.value);
        // let index = this.cityOptions.findIndex((item) =>
        //   item.value.includes(this.value[0])
        // );
        // this.id = this.cityOptions[index].cat_id;
        CanShu({ id: this.cat_id, sel: "many" }).then(
          (res) => {
            this.tableData = res;
            console.log(this.tableData);
          }
        );
      } else if (e.index == 1) {
        // this.attr_sel = "only";
        // let index = this.cityOptions.findIndex((item) =>
        //   item.value.includes(this.value[0])
        // );
        // console.log(this.ruleForm.name);
        // this.id = this.cityOptions[index].cat_id;
        CanShu({ id: this.cat_id, sel: "only" }).then(
          (res) => {
            this.tableData = res;
            console.log(this.tableData);
          }
        );
      }
    },
    changeProvince() {},
    handleClose() {},
    add() {
      console.log(this);
    },
    update(){

    },
    del(){

    },
    set(){}
  },
  components: {},
  computed: {
    cat_id(){
      return this.value[this.value.length-1]
    }
  },
  watch: {},
  created() {
    this.send();
    setTimeout(() => {
      console.log(this.cityOptions);
    }, 2000);
  },
};
</script>
<style lang="scss" scoped>
.params {
  padding: 20px;
  box-sizing: border-box;
  ::v-deep .el-cascader-panel {
    background: red;
  }
}
</style>
