<template>
  <div class="fff">
    <el-button @click="add">添加分类</el-button>

    <el-table
      class="mt"
      :data="arr"
      style="width: 100%"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="cat_name" label="Date" width="180" />
      <el-table-column prop="cat_deleted" label="cat_deleted" width="180" />
      <el-table-column prop="cat_level" label="cat_level" width="180" />
      <el-table-column>
        <template #default>
          <el-button type="text" size="small" @click="handleClick"
            >Detail</el-button
          >
          <el-button type="text" size="small">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="mt"
      :current-page="pagenum"
      :page-sizes="[1, 5, 50, 500]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- 模态框 -->
    <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :model="ruleForm" status-icon class="demo-ruleForm">
        <el-form-item label="cat_name" width="800px">
          <el-input v-model="ruleForm.cat_name" />
        </el-form-item>
        <el-form-item label="分类">
          <el-cascader
            v-model="value"
            :options="arr"
            :props="props"
            @change="handleChange"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="adds">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { GetData, AddS } from "../../api/ffff";
import { ref, reactive, toRefs } from "vue";
export default {
  setup(props) {
    const add = () => {
      data.dialogVisible = true;
    };

    const data = reactive({
      arr: [],
      dialogVisible: false,
      ruleForm: {
        cat_name: "",
      },
      props: {
        expandTrigger: "hover",
        value: "cat_id",
        label: "cat_name",
        children: "children",
      },
      value: [],
      pagenum: 1,
      pagesize: 3,
      total: 10,
    });
    const handleSizeChange = (val) => {
      data.pagesize = val;
      send();
    };
    const handleCurrentChange = (val) => {
      data.pagenum = val;
      send();
    };
    const send = async () => {
      var pagenum = data.pagenum;
      var pagesize = data.pagesize;
      const arr = await GetData({
        pagenum,
        pagesize,
      });
      console.log(arr.data, 1111111111111111111);
      data.arr = arr.data.data.result;
      data.total = arr.data.data.total;
      data.pagesize = arr.data.data.pagesize;
      data.pagenum = arr.data.data.pagenum + 1;
    };
    const adds = async () => {
      data.dialogVisible = false;
      console.log(data.value);
      var cat_pid = data.value[data.value.length - 1] || data.value.length;
      var cat_name = data.ruleForm.cat_name || "";
      var cat_level = data.value.length;
      console.log(cat_pid, cat_name, cat_level);
      const dd = await AddS({ cat_pid, cat_name, cat_level });
      send();
    };
    send();
    return {
      ...toRefs(data),
      send,
      add,
      adds,
      handleSizeChange,
      handleCurrentChange,
    };
  },
};
</script>
<style lang="scss" scoped>
.fff {
  width: 100%;
  height: 100%;
  padding: 20px;
  background: #fff;
}
</style>
