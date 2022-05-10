<template>
  <div class="rights">
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index" label="#"> </el-table-column>
      <el-table-column prop="authName" label="权限名称"> </el-table-column>
      <el-table-column prop="path" label="路径"> </el-table-column>
      <el-table-column prop="level" label="权限等级">
        <template slot-scope="scope">
          <el-tag :type="scope.row.level==0?'':scope.row.level==1?'success':'warning'" effect="plain">
            {{ scope.row.level==0?'一级':scope.row.level==1?'二级':'三级' }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { GetTree } from "../../api/rights";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    send() {
      GetTree().then((res) => {
        this.tableData = res;
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
.rights {
  width: 100%;
  height: 100%;
  overflow: scroll;
  padding: 5px;
  box-sizing: border-box;
  overflow-x: hidden; overflow-y: auto; 
  border: 5px solid pink;
  border-radius: 5px;
}
</style>
