<template>
  <div class="home">
    <div class="common-layout">
      <el-container>
        <el-header>
          <div>
            <img src="../assets/img/ali0.png" alt="" />
            <small>后台管理系统</small>
          </div>
          <div>
            <el-button @click="login">登录 {{ $route.name }} </el-button>
            <el-button type="info">退出</el-button>
          </div>
        </el-header>
        <el-container>
          <el-aside :width="isCollapse ? '64px' : '200px'">
            <p @click="isCollapse = !isCollapse">|||</p>
            <el-menu
              :default-active="'/' + $route.name"
              class="el-menu-vertical-demo"
              :collapse="isCollapse"
              @open="handleOpen"
              @close="handleClose"
              unique-opened="true"
              router="true"
            >
              <el-sub-menu
                :index="item.path"
                v-for="(item, i) in data.arr"
                :key="i"
              >
                <template #title>
                  <el-icon><location /></el-icon>
                  <span>{{ item.authName }} </span>
                </template>

                <el-menu-item-group v-for="ele in item.children" :key="ele">
                  <el-menu-item
                    @click="click(ele.authName, item.authName)"
                    :index="'/' + ele.path"
                    >{{ ele.authName }}</el-menu-item
                  >
                </el-menu-item-group>
              </el-sub-menu>
            </el-menu>
          </el-aside>
          <el-main>
            <!-- 坑 -->
            <el-breadcrumb :separator-icon="ArrowRight">
              <el-breadcrumb-item :to="{ path: '/' }">{{
                data.ee
              }}</el-breadcrumb-item>
              <el-breadcrumb-item>{{ data.e }}</el-breadcrumb-item>
            </el-breadcrumb>

            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>
<script setup>
import { Login, CaiDan } from "../api/res";
import { ref, reactive, toRefs, onMounted } from "vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";

const isCollapse = ref(true);
const data = reactive({
  arr: [],
  e: "用户管理",
  ee: "用户列表",
});
const handleOpen = (key, keyPath) => {};
const handleClose = (key, keyPath) => {};
const click = (e, ee) => {
  data.e = e;
  data.ee = ee;
};
const login = () => {
  Login({ username: "admin", password: "123456" }).then((res) => {
    sessionStorage.setItem("token", res.data.data.token);
  });
};
onMounted(() => {
  CaiDan().then((res) => {
    data.arr = res.data.data;
  });
});
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  :deep(.common-layout) {
    height: 100%;
    box-sizing: border-box;
    border: 1px solid red;
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #999;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 15px;
      }
      div {
        display: flex;
        align-items: center;
      }
      small {
        font-family: "华文彩云";
        font-weight: 700;
        font-size: 30px;
      }
    }
    .el-aside {
      background: pink;
      p {
        text-align: center;
        background: rgb(78, 78, 78);
        color: #fff;
      }
      .el-menu-item-group__title {
        display: none;
      }
    }
    .el-main {
      background: skyblue;
    }
    section {
      height: 100%;
      border: 1px solid skyblue;
    }
  }
}
</style>
