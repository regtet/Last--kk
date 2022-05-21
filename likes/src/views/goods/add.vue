<template>
  <div class="mt">
    <el-alert
      class=""
      title="customized close-text"
      type="info"
      close-text="Gotcha"
    />
    <el-steps :active="active" finish-status="success">
      <el-step title="基本信息" />
      <el-step title="Step 2" />
      <el-step title="Step 3" />
      <el-step title="Step 4" />
      <el-step title="Step 5" />
      <el-step title="Step 6" />
    </el-steps>
    <el-tabs
      :before-leave="before"
      tab-position="left"
      style="height: 200px"
      class="demo-tabs"
    >
      <el-tab-pane label="UStep 1ser">
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
          <el-form-item label="name" prop="name">
            <el-input v-model="ruleForm.goods_name" /> </el-form-item
          ><el-form-item label="goods_price" prop="name">
            <el-input v-model="ruleForm.goods_price" /> </el-form-item
          ><el-form-item label="goods_number" prop="name">
            <el-input v-model="ruleForm.goods_number" /> </el-form-item
          ><el-form-item label="goods_weight" prop="name">
            <el-input v-model="ruleForm.goods_weight" />
            <el-cascader
              v-model="value"
              :options="options"
              :props="props"
              @change="handleChange"
            />
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="CStep 2onfig">Step 2</el-tab-pane>
      <el-tab-pane label="RStep 3ole"> Step 3</el-tab-pane>
      <el-tab-pane label="TStep 4ask">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button type="primary">Click to upload</el-button>
          <template #tip>
            <div class="el-upload__tip">
              jpg/png files with a size less than 500KB.
            </div>
          </template>
        </el-upload>
      </el-tab-pane>
      <el-tab-pane label="TStep 5ask"
        >我是文本域
        <el-button @click="adds">添加</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { GetDataS, AddSSS } from "../../api/ffff";
import { ref, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
export default {
  setup(props) {
    const router = useRouter();
    const data = reactive({
      active: 0,
      ruleForm: {
        goods_name: "Hello",
        goods_price: 1,
        goods_number: 1,
        goods_weight: 1,
        goods_price: 1,
        goods_cat: [],
      },
      rules: {
        name: [
          {
            message: "Please input Activity name",
            trigger: "blur",
          },
          {
            min: 0,
            max: 55,
            message: "Length should be 3 to 5",
            trigger: "blur",
          },
        ],
      },
      value: [],
      options: [],
      props: {
        value: "cat_id",
        label: "cat_name",
        children: "children",
      },
      before: (e, ee) => {
        console.log(e, ee, data.value.length);
        if (data.value.length < 2) {
          return false;
        }
        data.active = e;
      },
      send: async () => {
        const arr = await GetDataS();
        console.log(arr.data.data);
        data.options = arr.data.data;
      },
      adds: async () => {
        console.log(data);

        const arr = await AddSSS({
          goods_name: data.ruleForm.goods_name,
          goods_cat: data.value.join(","),
          goods_price: data.ruleForm.goods_price,
          goods_number: data.ruleForm.goods_number,
          goods_weight: data.ruleForm.goods_weight,
        });
        console.log(arr);
        router.push("/goods");
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
