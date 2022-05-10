<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="TopBox">
          <img
            @click="stimulate"
            :style="'transform:rotate(' + -num + 'deg)'"
            src="../assets/img/bumei.jpeg"
            title="步美"
          />
          <strong>电商后台管理系统</strong>
        </div>
        <el-button type="info" @click="out">退出</el-button>
      </el-header>
      <el-container>
        <el-aside :style="flag ? 'width:64px' : 'width:200px'">
          <p @click="flag = !flag">| | |</p>
          <!-- 左侧导航 -->
          <el-menu
            :collapse-transition="false"
            :default-active="$route.path"
            text-color="#08edf0"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :collapse="flag"
            :unique-opened="true"
            router
          >
            <el-submenu
              :index="item.path"
              v-for="(item, i) in LeftList"
              :key="i"
            >
              <template slot="title">
                <i
                  :class="'iconfont ' + icon[i]"
                  style="margin-right: 5px; color: pink"
                ></i>
                <span slot="title">{{ item.authName }} </span>
              </template>
              <el-menu-item
                v-for="(ele, idx) in item.children"
                :key="idx"
                :index="'/' + ele.path"
              >
                <i
                  :class="'iconfont ' + icon2[idx]"
                  style="margin-right: 5px"
                ></i>
                {{ ele.authName }}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container>
          <!-- 右侧内容 -->
          <el-main style="overflow: hidden">
            <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/stimulate' }"
                >首页</el-breadcrumb-item
              >
              <el-breadcrumb-item>{{ arr[1] }}</el-breadcrumb-item>
              <el-breadcrumb-item>{{ arr[0] }}</el-breadcrumb-item>
            </el-breadcrumb> -->
            <span
              style="font-weight: 700; font-size: 28px"
              v-if="$route.name == 'home'"
            >
              Welcome!</span
            >
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { love } from '../assets/js/love'
import { GetMenus } from '../api/api'
import MBX from '@/components/MBX.vue'
export default {
  data() {
    return {
      flag: false, //开关
      LeftList: [], //左侧菜单
      num: 0, //旋转度数
      arr: ['用户列表', '用户管理'],
      icon: [
        'icon-chongwutubiao18',
        'icon-a-weixiaokaixingaoxing-10',
        'icon-feiji',
        'icon-feiji1',
        'icon-xiai'
      ],
      icon2: ['icon-aixin', 'icon-faxian', 'icon-xuehua', 'icon-jita']
    }
  },
  methods: {
    async send() {
      //拿到左侧菜单数据
      const List = await GetMenus()
      this.LeftList = List
    },
    handleOpen(key, keyPath) {
      //展开
      // console.log(key, keyPath, "展开");
    },
    handleClose(key, keyPath) {
      //收起
      // console.log(key, keyPath, "收起");
    },
    out() {
      this.$confirm('你是否将要继续进行退出操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 退出
          sessionStorage.removeItem('token')
          this.$router.replace('/login')
          this.$message({
            type: 'success',
            message: '退出成功'
          })
        })
        .catch(() => {
          this.$message({
            type: 'warning',
            message: '还是舍不得人家啊'
          })
        })
    },
    // 秘密基地
    stimulate() {
      this.$route.name === 'stimulate' ? '' : this.$router.push('./stimulate')
    }
  },
  components: { MBX },
  computed: {},
  watch: {},
  created() {
    this.send()
    setInterval(() => {
      this.num++
      this.index += 0.5
      if (this.index >= 10) {
        this.index = 1
      }
      if (this.num >= 360) {
        this.num = 0
      }
    }, 10000 / 360)
  },
  mounted() {
    setTimeout(() => {
      love()
    }, 500)
  }
}
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  ::v-deep .el-container.is-vertical {
    height: 100%;
    .el-header {
      //头部样式
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #373d41;
      color: #fff;
      .TopBox {
        display: flex;
        align-items: center;
        font-size: 23px;
        font-family: '华文彩云';
        color: aqua;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-right: 15px;
        }
      }
    }

    .el-aside {
      //左侧样式
      width: 200px;
      height: 100%;
      //三道杠
      p {
        cursor: pointer;
        background: #4a5064;
        font-weight: 400;
        color: #fff;
        font-size: 12px;
        padding: 5px 0;
        text-align: center;
        margin-right: 1px;
        box-sizing: border-box;
      }
      .el-menu {
        height: calc(100% - 22px);
        background: #333744;
        .el-menu-item-group__title {
          display: none;
        }
      }
    }
    //右侧样式
    .el-main {
      background: #eaedf1;
      padding: 15px;
      .el-breadcrumb {
        font-size: 12px;
        padding-bottom: 18px;
      }
    }
  }
  ::v-deep .el-menu-item {
    margin-left: -1px;
  }
  ::v-deep .el-submenu__title:hover,
  .el-menu-item.is-active {
    background: linear-gradient(#8c4ab0, #009d9b) !important;
  }
  ::v-deep .el-submenu__title:hover,
  .el-menu-item:hover {
    background: linear-gradient(#8c4ab0, #009d9b) !important;
  }
  ::v-deep .el-menu-item.is-active {
    color: #00ff00;
  }
}
</style>
