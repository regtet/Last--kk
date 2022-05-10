<template>
  <div class="rights">
    <MBX label1="权限管理" label2="权限列表"></MBX>
    <el-card>
      <template>
        <el-table border :data="tableData" stripe style="width: 100%">
          <el-table-column prop="date" type="index" label="#" width="50">
          </el-table-column>
          <el-table-column prop="authName" label="权限名称"> </el-table-column>
          <el-table-column prop="path" label="路径"> </el-table-column>
          <el-table-column prop="level" label="权限等级">
            <template slot-scope="scope">
              <el-tag
                size="mini"
                :type="
                  scope.row.level == 0
                    ? ''
                    : scope.row.level == 1
                    ? 'success'
                    : 'warning'
                "
              >
                {{
                  scope.row.level == 0
                    ? '一级'
                    : scope.row.level == '1'
                    ? '二级'
                    : '三级'
                }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-card>
  </div>
</template>
<script>
import MBX from '@/components/MBX.vue'
import { Rights } from '../../api/api'
export default {
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    //获取
    async send() {
      const data = await Rights({ type: 'list' })
      this.tableData = data
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
.rights {
  height: calc(100% - 30px);
  ::v-deep .has-gutter th {
    font-weight: 700;
  }
}
</style>
