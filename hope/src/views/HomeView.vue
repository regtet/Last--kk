<template>
  <div class="home">
    <div class="poa">
      <audio
        id="music"
        src="../assets/QingTian.flac"
        autoplay="autoplay"
        muted="muted"
        type="audio/mpeg"
      ></audio>
    </div>

    <div class="top">
      <div style="display: flex; align-items: center">
        <img
          @click="$router.push('./music')"
          :style="'transform:rotate(' + num + 'deg)'"
          src="../assets/步美.jpeg"
          alt=""
        />
        <h1 style="font-weight: 700; font-size: 20px">电商后台管理系统</h1>
      </div>
      <el-button @click="del">退出</el-button>
    </div>
    <div class="content">
      <el-row class="contentBox">
        <el-col :span="isCollapse ? 2 : 4" style="overflow: hidden"
          ><div class="grid-content bg-purple-dark">
            <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
              <el-button
                @click="change"
                :style="
                  isCollapse
                    ? 'width:125%;margin-bottom:-15px;box-sizing: border-box;background:linear-gradient(pink, skyblue)'
                    : 'width:100%;background:linear-gradient(pink, skyblue)'
                "
                >|||</el-button
              >
            </el-radio-group>
            <el-menu
              :unique-opened="true"
              :default-active="$route.path + ''"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              :collapse="isCollapse"
              style="
                background: linear-gradient(pink, skyblue);
                height: calc(100% - 30px);
              "
              router
            >
              <el-submenu
                :index="item.path + ''"
                v-for="(item, i) in arr"
                :key="i"
              >
                <template slot="title">
                  <i style="margin: 0 15px 0 0" :class="item.icon"></i>
                  <span slot="title">{{ item.authName }}</span>
                </template>
                <el-menu-item
                  :index="'/' + ele.path + ''"
                  v-for="(ele, index) in item.children"
                  :key="index"
                  @click="click(item.authName, ele.authName)"
                >
                  <i style="margin: 0 10px 0 0" :class="ele.iconChildrn"></i
                  >{{ ele.authName }}</el-menu-item
                >
              </el-submenu>
            </el-menu>
          </div></el-col
        >
        <el-col :span="isCollapse ? 22 : 20"
          ><div class="grid-content bg-purple-dark">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/home' }"
                >首页</el-breadcrumb-item
              >
              <el-breadcrumb-item :to="{ path: '/home' }">{{
                name.nameOne
              }}</el-breadcrumb-item>
              <el-breadcrumb-item>{{ name.nameTwo }}</el-breadcrumb-item>
            </el-breadcrumb>
            <div
              class="liveYou"
              :style="$route.path == '/home' ? '' : 'display: none;'"
            >
              <i
                class="iconfont icon-meiguihua"
                :style="'color: rgba(12, 51, 167,.' + index + ');'"
              ></i>
            </div>
            <div class="contentView"><router-view></router-view></div></div
        ></el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { getData } from "../api/api";
export default {
  data() {
    return {
      isCollapse: true,
      num: 0,
      index: 0,
      arr: [],
      name: {
        nameOne: "用户管理",
        nameTwo: "用户列表",
      },
    };
  },
  methods: {
    click(e, ee) {
      console.log(e, ee);
      this.name.nameOne = e;
      this.name.nameTwo = ee;
    },
    change() {
      this.isCollapse = !this.isCollapse;
      console.log(this.isCollapse);
    },
    del() {
      sessionStorage.removeItem("token");
      this.$router.push("/login");
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  components: {},
  computed: {},
  watch: {},
  created() {
    getData().then((res) => {
      this.arr = res;
      let arricon = [
        "icon-xiai",
        "icon-feiji",
        "icon-feiji1",
        "icon-Artboard",
        "icon-mingzhentankenan-",
      ];
      let arriconChildrn = [
        "icon-maomi1",
        "icon-shouhuixiangrikui",
        "icon--sad-",
        "icon-chongwutubiao18",
        "icon-icon-sinian",
        "icon-weixiao",
        "icon-meiguihua",
        "icon-a-weixiaokaixingaoxing-10",
      ];
      this.arr.forEach((item, i) => {
        item.icon = "iconfont " + arricon[i];
        item.children.forEach((ele, index) => {
          ele.iconChildrn = "iconfont " + arriconChildrn[index];
        });
      });
    });
    setInterval(() => {
      this.num++;
      this.index += 0.5;
      if (this.index >= 10) {
        this.index = 1;
      }
      if (this.num >= 360) {
        this.num = 0;
      }
    }, 10000 / 360);
  },
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  background: #333;
  box-sizing: border-box;
  padding-bottom: 20px;
  .poa {
    position: fixed;
    top: 0;
    left: 200px;
    margin: auto;
  }
  .top {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-image: linear-gradient(pink, skyblue);
    div {
      background: -webkit-linear-gradient(red, skyblue);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin: 0 5px;
      }
    }
  }
  .content {
    width: 100%;
    height: calc(100% - 50px);
    background: pink;
    .el-row {
      width: 100%;
      height: 100%;
      background: skyblue;
      .el-col {
        height: 100%;
      }
      .el-col-4 {
        :deep(.el-radio-group) {
          margin-bottom: 0 !important;
          background: red;
        }
        overflow: hidden;
        background-image: linear-gradient(pink, skyblue);
        .el-menu-item-group__title {
          display: none !important;
        }
        .el-radio-group {
          width: 100%;
          margin: 0 !important;
          padding: 0;
          .el-button {
            width: 20%;
            height: 30px;
            padding: 5px;
          }
        }
      }
      .liveYou {
        padding: 20px;
        .iconfont {
          padding: 8px;
          font-size: 60px;
          background-image: linear-gradient(pink, red);
        }
      }
    }
    .grid-content {
      width: 100%;
      height: calc(100%);
    }
    .el-col-20 {
      box-sizing: border-box;
      padding: 20px;
    }
    .contentView {
      padding: 20px;
      width: 100%;
      height: calc(100% - 100px);
      box-sizing: border-box;
      background: linear-gradient(skyblue, pink);
      
      .el-menu-item.is-active {
        background-color: red !important;
      }
    }
  }
}
</style>
