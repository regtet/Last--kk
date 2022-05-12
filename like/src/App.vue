<template>
  <div
    id="app"
    v-loading="$store.state.loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {}
}
</script>

<style></style>
