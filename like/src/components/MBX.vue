<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/stimulate' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ label1 }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ label2 }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  props: ['label1', 'label2'],
  data() {
    return {}
  },
  methods: {},
  components: {},
  computed: {},
  watch: {},
  created() {}
}
</script>
<style lang="scss" scoped></style>
