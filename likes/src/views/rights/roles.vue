<template>
  <div class="roles">
    <el-button @click="add">添加角色</el-button>

    <el-table class="mt" :data="data.tableData" stripe style="width: 100%">
      <el-table-column type="expand">
        <template #default="props">
          <!-- 第一层 -->
          <el-row v-for="item in props.row.children" :key="item.id">
            <el-col :span="4">
              <el-tag
                @close="close(item, props.row)"
                class="mx-1"
                closable
                effect="dark"
              >
                {{ item.authName }}
              </el-tag>
            </el-col>
            <el-col :span="20">
              <!-- 第二层 -->
              <el-row v-for="ele in item.children" :key="ele.id">
                <el-col :span="5">
                  <el-tag
                    @close="close(ele, props.row)"
                    class="mx-1"
                    closable
                    type="success"
                    effect="dark"
                  >
                    {{ ele.authName }}
                  </el-tag>
                </el-col>
                <el-col :span="19">
                  <el-tag
                    v-for="ooo in ele.children"
                    :key="ooo"
                    @close="close(ooo, props.row)"
                    class="mx-1"
                    closable
                    type="warning"
                    effect="dark"
                  >
                    {{ ooo.authName }}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" label="#" />
      <el-table-column prop="roleName" label="角色名称" />
      <el-table-column prop="roleDesc" label="角色描述" />
      <el-table-column label="操作">
        <template #default="props">
          <el-button type="primary" @click="bianji(props.row)">编辑</el-button>
          <el-button type="danger" @click="DEl(props.row.id)">删除</el-button>
          <el-button type="warning" @click="set(props.row)">分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 模态框 -->
    <el-dialog
      v-model="data.dialogVisible"
      :title="data.flag ? '添加' : '编辑'"
    >
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        :size="formSize"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="ruleForm.roleName" />
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="ruleForm.roleDesc" /> </el-form-item
      ></el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="data.dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="adds">Confirm</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="data.TwoBox" title="Tips">
      <el-tree
        ref="trees"
        default-expand-all
        :data="data.data"
        show-checkbox
        node-key="id"
        :default-checked-keys="data.arr"
        :props="defaultProps"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button
            @click="
              data.TwoBox = false;
              data.arr = [];
            "
            >111</el-button
          >
          <el-button @click="setOk" type="primary">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { User, Delete, Add, Del, Tree, SSS } from "../../api/res";
import { ref, reactive, toRefs } from "vue";
const defaultProps = {
  children: "children",
  label: "authName",
};
const set = async (row) => {
  data.TwoBox = true;
  const d = await Tree();
  data.data = d.data.data;
  filter(data.arr, row.children);
};
const bianji = (row) => {
  data.dialogVisible = true;
  data.flag = false;
  ruleForm.roleDesc = row.roleDesc;
  ruleForm.roleName = row.roleName;
  data.id = row.id;
};
const setOk = () => {
  data.TwoBox = false;
  let trees = ref(null);
  setTimeout(() => {
    console.dir(trees.value);
  }, 1000);
};

const filter = (arr, row) => {
  row.forEach((item) => {
    if (item.children) {
      filter(data.arr, item.children);
    } else {
      data.arr.push(item.id);
    }
  });
};
const ruleForm = reactive({
  roleName: "",
  roleDesc: "",
});
const rules = reactive({
  roleName: [
    {
      required: true,
      message: "不能为空",
      trigger: "blur",
    },
    { min: 1, max: 51, message: "", trigger: "blur" },
  ],
  roleDesc: [
    {
      required: true,
      message: "不能为空",
      trigger: "blur",
    },
    { min: 1, max: 51, message: "", trigger: "blur" },
  ],
});
const add = () => {
  data.dialogVisible = true;
  data.flag = true;
};
const adds = async () => {
  data.dialogVisible = false;
  if (data.flag) {
    const ww = await Add(ruleForm);
  } else {
    const ww = await SSS({ id: data.id, ...ruleForm });
  }
  send();
};
const data = reactive({
  tableData: [],
  dialogVisible: false,
  TwoBox: false,
  data: [],
  arr: [],
  flag: true,
  id: 0,
});
const close = async (e, row) => {
  var e = e.id,
    ee = row.id;
  const data = await Delete(ee, e);
  row.children = data.data.data;
};
const send = () => {
  User().then((res) => {
    data.tableData = res.data.data;
  });
};
const DEl = async (id) => {
  const ff = await Del(id);
  send();
};
send();
</script>
<style lang="scss" scoped>
.roles {
  padding: 20px;
  width: 100%;
  height: calc(100% - 14px);
  ::v-deep .el-row {
    margin: 15px 0;
  }
  ::v-deep .el-col-4 {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  ::v-deep .el-col-5 {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  ::v-deep .el-col-19 .el-tag {
    margin: 5px 10px;
  }
}
</style>
