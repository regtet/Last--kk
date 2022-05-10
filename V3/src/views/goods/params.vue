<template>
  <div class="params">
    <el-alert
      title="注意：只允许为第三级分类设置相关参数！ "
      type="warning"
      :closable="false"
      effect="dark"
    />

    <div class="mt">
      选择商品分类:
      <el-cascader
        v-model="value"
        :options="arr"
        :props="props"
        @change="handleChange"
      />
    </div>

    <el-tabs v-model="flag" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="动态属性" name="true">
        <el-button :disabled="disabled" @click="click">添加属性</el-button>
        <el-table :data="arrS" style="width: 100%">
          <el-table-column type="expand">
            <template #default="props">
              <el-tag
                v-for="(tag, index) in props.row.attr_vals == ''
                  ? []
                  : props.row.attr_vals.split(',')"
                :key="index"
                class="mx-1"
                closable
                :disable-transitions="false"
                @close="handleClose(props.row, index)"
              >
                {{ tag }}
              </el-tag>
              <el-input
                v-if="props.row.inputVisible"
                v-model="props.row.inputValue"
                class="ml-1 w-20"
                size="small"
                @keyup.enter="handleInputConfirm(props.row, index)"
                @blur="handleInputConfirm(props.row, index)"
              />
              <el-button
                v-else
                class="button-new-tag ml-1"
                size="small"
                @click="showInput(props.row)"
              >
                + New Tag
              </el-button>
            </template>
          </el-table-column>
          <el-table-column type="index" label="#" />
          <el-table-column label="参数名称" prop="attr_name" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="静态参数" name="false">静态参数</el-tab-pane>
    </el-tabs>

    <el-dialog v-model="towBox" title="Tips">
      <el-input v-model="values"></el-input>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="towBox = false">Cancel</el-button>
          <el-button type="primary" @click="adds">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { GetDataS, GetCC, SetUp, ADDUp } from "../../api/ffff";
import { ref, reactive, toRefs } from "vue";
import { watch } from "vue";
export default {
  setup(props) {
    const data = reactive({
      arr: [],
      value: [],
      flag: "true",
      sel: "many",
      arrS: [],
      values: "",
      towBox: false,
      props: {
        expandTrigger: "hover",
        value: "cat_id",
        label: "cat_name",
        children: "children",
      },
      disabled: false,
    });

    // 添加参数
    const click = () => {
      data.towBox = true;
      console.log(66);
    };
    const adds = async () => {
      const dd = await ADDUp({
        id: data.value[data.value.length - 1],
        attr_name: data.values,
        attr_sel: data.sel,
      });
      console.log(dd);
      data.towBox = false;
      send();
    };
    // 改变后更新
    const handleClose = async (e, i) => {
      let arr = e.attr_vals.split(",");
      console.log(arr.splice(i, 1));
      e.attr_vals = arr.join(",");
      console.log(e);
      var id = e.attr_id;
      var cid = e.cat_id;
      var attr_name = e.attr_name;
      const dd = await SetUp({
        id,
        cid,
        attr_name,
        attr_sel: data.sel,
        attr_vals: e.attr_vals,
      });
      console.log(dd);
    };
    const showInput = (e) => {
      e.inputVisible = true;
    };
    const handleInputConfirm = async (e) => {
      console.log(e);
      if (e.inputValue) {
        console.log(e.attr_vals.split(","));
        // let arr = .split(",").push(e.inputValue);
        // e.attr_vals = arr.join(",");
        e.attr_vals = e.attr_vals.concat("," + e.inputValue + "");
      }
      console.log(e);
      var id = e.attr_id;
      var cid = e.cat_id;
      var attr_name = e.attr_name;
      const dd = await SetUp({
        id,
        cid,
        attr_name,
        attr_sel: data.sel,
        attr_vals: e.attr_vals,
      });
      console.log(dd);

      e.inputVisible = false;
      e.inputValue = "";
    };
    watch(
      () => data.value,
      async (newVal, oldVal) => {
        console.log(newVal, oldVal);
        if (newVal.length < 3) {
          data.disabled = true;
        } else {
          data.disabled = false;
          const dd = await GetCC({
            id: data.value[data.value.length - 1],
            sel: data.sel,
          });
          data.arrS = dd.data.data;
          data.arrS.forEach((item) => {
            item.inputValue = "";
            item.inputVisible = false;
          });
        }
      },
      {
        immediate: true, //立即监听
        deep: true, //深度监听
      }
    );

    const send = async () => {
      const arr = await GetDataS();
      data.arr = arr.data.data;
    };
    send();
    return {
      send,
      ...toRefs(data),
      handleClose,
      showInput,
      handleInputConfirm,
      click,
      adds,
    };
  },
};
</script>
<style lang="scss" scoped></style>
<style lang="scss" scoped>
.params {
  box-sizing: border-box;
  padding: 20px;
  width: 100%;
  height: 100%;
  background: #fff;
  ::deep(.el-input__inner) {
    width: 200px !important;
  }
}
</style>
