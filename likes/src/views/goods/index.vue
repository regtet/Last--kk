<template>
  <div class="mt">
    <el-button @click="$router.push('/add')">添加</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="#" width="180" />
      <el-table-column prop="goods_name" label="Date" width="180" />
      <el-table-column prop="add_time" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>

    <el-pagination
      v-model="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="pagesize"
      :current-page="pagenum"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
import { GGG } from "../../api/ffff";
import { ref, reactive, toRefs } from "vue";
export default {
  setup(props) {
    const data = reactive({
      tableData: [],
      total: 100,
      pagesize: 1,
      pagenum: 1,
      send: async () => {
        const ww = await GGG({
          pagenum: data.pagenum * 1,
          pagesize: data.pagesize * 1,
        });
        data.tableData = ww.data.data.goods;
      },
      handleSizeChange: (val) => {
        data.pagesize = val;
        data.send();
        console.log(`${val} items per page`);
      },
      handleCurrentChange: (val) => {
        console.log(`current page: ${val}`);
        data.pagenum = val;
        data.send();
      },
    });
    data.send();

    return {
      ...toRefs(data),
    };
  },
};
</script>
<style lang="scss" scoped></style>
