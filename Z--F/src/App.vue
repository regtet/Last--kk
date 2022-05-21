<template>
  <div id="app">
    <zqk-button class="ml" >偶买噶</zqk-button>
    <zqk-button class="ml"  type="info">我爱你</zqk-button>
    <zqk-button class="ml"  type="primary">我爱你</zqk-button>
    <zqk-button class="ml"  type="success">我爱你</zqk-button>
    <zqk-button class="ml"  type="warning">我爱你</zqk-button>
    <zqk-button class="ml"  type="danger">我爱你</zqk-button>
    <router-view />
  </div>
</template>

<style lang="scss">
#app,
body,
html {
  width: 100%;
  height: 100%;
  background: #e9e9e9;
  padding: 15px;
}
* {
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: border-box;
}
.ml{
  margin-left: 15px !important;
}
</style>
