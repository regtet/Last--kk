<template>
  <div class="stimulate">
    <el-button
      @click="
        flag = 0;
        index = 0;
      "
      type="primary"
      >听音乐</el-button
    >
    <el-button
      @click="
        flag = 1;
        index = 0;
      "
      type="success"
      >看动画</el-button
    >

    <div v-if="flag == 0" class="ShowBox">
      <div class="TopList">
        <el-tooltip
          content="点我选择你要听的歌"
          placement="bottom"
          effect="light"
        >
          <i
            @click="TopList = !TopList"
            class="el-icon-s-order"
            style="font-size: 30px"
          ></i>
        </el-tooltip>
        <el-button
          v-show="TopList"
          plain
          @click="index = i"
          :type="hope > 5 ? 'danger' : 'primary'"
          size="small"
          v-for="(item, i) in arr"
          :key="i"
          >{{ item }}</el-button
        >
      </div>
      <li v-if="index == 0">
        <h3 class="text">晴天</h3>
        <audio class="ww" style="display: none" controls autoplay loop>
          <source src="../assets/music/QingTian.flac" type="audio/mpeg" />
        </audio>
        <div>
          <i @click="left" class="iconfont icon-play-previous"></i>
          <i @click="click" class="iconfont icon-play"></i>
          <i @click="clicks" class="iconfont icon-pause"></i>
          <i @click="right" class="iconfont icon-play-next"></i>
        </div>
        <div class="imgs">
          <img  :style="'transform:rotate(' + Time + 'deg)'" v-if="hope > 5" src="../assets/img/ali0.png" alt="" />
          <img  :style="'transform:rotate(' + Time + 'deg)'" v-else src="../assets/img/bumei.jpeg" alt="" />
        </div>
      </li>
      <li v-if="index == 1">
        <h3 class="text">城南花已开</h3>
        <audio class="ww" style="display: none" controls autoplay loop>
          <source src="../assets/music/cn.mp3" type="audio/mpeg" />
        </audio>
        <div>
          <i @click="left" class="iconfont icon-play-previous"></i>
          <i @click="click" class="iconfont icon-play"></i>
          <i @click="clicks" class="iconfont icon-pause"></i>
          <i @click="right" class="iconfont icon-play-next"></i>
        </div>
        <div class="imgs" :style="'transform:rotate(' + Time + 'deg)'">
          <img v-if="hope > 5" src="../assets/img/ali0.png" alt="" />
          <img v-else src="../assets/img/bumei.jpeg" alt="" />
        </div>
      </li>
      <li v-if="index == 2">
        <h3 class="text">AGA</h3>
        <audio class="ww" style="display: none" controls autoplay loop>
          <source src="../assets/music/Aga.flac" type="audio/mpeg" />
        </audio>
        <div>
          <i @click="left" class="iconfont icon-play-previous"></i>
          <i @click="click" class="iconfont icon-play"></i>
          <i @click="clicks" class="iconfont icon-pause"></i>
          <i @click="right" class="iconfont icon-play-next"></i>
        </div>
        <div class="imgs" :style="'transform:rotate(' + Time + 'deg)'">
          <img v-if="hope > 5" src="../assets/img/ali0.png" alt="" />
          <img v-else src="../assets/img/bumei.jpeg" alt="" />
        </div>
      </li>
      <li v-if="index == 3">
        <h3 class="text">理想三旬</h3>
        <audio class="ww" style="display: none" controls autoplay loop>
          <source src="../assets/music/sx.flac" type="audio/mpeg" />
        </audio>
        <div>
          <i @click="left" class="iconfont icon-play-previous"></i>
          <i @click="click" class="iconfont icon-play"></i>
          <i @click="clicks" class="iconfont icon-pause"></i>
          <i @click="right" class="iconfont icon-play-next"></i>
        </div>
        <div class="imgs" :style="'transform:rotate(' + Time + 'deg)'">
          <img v-if="hope > 5" src="../assets/img/ali0.png" alt="" />
          <img v-else src="../assets/img/bumei.jpeg" alt="" />
        </div>
      </li>
      <li v-if="index == 4">
        <h3 class="text">云烟成雨</h3>
        <audio class="ww" style="display: none" controls autoplay loop>
          <source src="../assets/music/fd.mp3" type="audio/mpeg" />
        </audio>
        <div>
          <i @click="left" class="iconfont icon-play-previous"></i>
          <i @click="click" class="iconfont icon-play"></i>
          <i @click="clicks" class="iconfont icon-pause"></i>
          <i @click="right" class="iconfont icon-play-next"></i>
        </div>
        <div class="imgs" :style="'transform:rotate(' + Time + 'deg)'">
          <img v-if="hope > 5" src="../assets/img/ali0.png" alt="" />
          <img v-else src="../assets/img/bumei.jpeg" alt="" />
        </div>
      </li>
      <li v-if="index == 5">
        <h3 class="text">喜羊羊与灰太狼</h3>
        <audio class="ww" style="display: none" controls autoplay loop>
          <source src="../assets/music/yy.mp3" type="audio/mpeg" />
        </audio>
        <div>
          <i @click="left" class="iconfont icon-play-previous"></i>
          <i @click="click" class="iconfont icon-play"></i>
          <i @click="clicks" class="iconfont icon-pause"></i>
          <i @click="right" class="iconfont icon-play-next"></i>
        </div>
        <div class="imgs" :style="'transform:rotate(' + Time + 'deg)'">
          <img v-if="hope > 5" src="../assets/img/ali0.png" alt="" />
          <img v-else src="../assets/img/bumei.jpeg" alt="" />
        </div>
      </li>
      <li v-if="index == 6">
        <h3 class="text">枯木不逢春</h3>
        <audio class="ww" style="display: none" controls autoplay loop>
          <source src="../assets/music/fc.flac" type="audio/mpeg" />
        </audio>
        <div>
          <i @click="left" class="iconfont icon-play-previous"></i>
          <i @click="click" class="iconfont icon-play"></i>
          <i @click="clicks" class="iconfont icon-pause"></i>
          <i @click="right" class="iconfont icon-play-next"></i>
        </div>
        <div class="imgs" :style="'transform:rotate(' + Time + 'deg)'">
          <img v-if="hope > 5" src="../assets/img/ali0.png" alt="" />
          <img v-else src="../assets/img/bumei.jpeg" alt="" />
        </div>
      </li>
      <li v-if="index == 7">
        <h3 class="text">山楂树</h3>
        <audio class="ww" style="display: none" controls autoplay loop>
          <source src="../assets/music/sz.mp3" type="audio/mpeg" />
        </audio>
        <div>
          <i @click="left" class="iconfont icon-play-previous"></i>
          <i @click="click" class="iconfont icon-play"></i>
          <i @click="clicks" class="iconfont icon-pause"></i>
          <i @click="right" class="iconfont icon-play-next"></i>
        </div>
        <div class="imgs" :style="'transform:rotate(' + Time + 'deg)'">
          <img v-if="hope > 5" src="../assets/img/ali0.png" alt="" />
          <img v-else src="../assets/img/bumei.jpeg" alt="" />
        </div>
      </li>
      <li v-if="index == 8">
        <h3 class="text">像鱼</h3>
        <audio class="ww" style="display: none" controls autoplay loop>
          <source src="../assets/music/x.flac" type="audio/mpeg" />
        </audio>
        <div>
          <i @click="left" class="iconfont icon-play-previous"></i>
          <i @click="click" class="iconfont icon-play"></i>
          <i @click="clicks" class="iconfont icon-pause"></i>
          <i @click="right" class="iconfont icon-play-next"></i>
        </div>
        <div class="imgs" :style="'transform:rotate(' + Time + 'deg)'">
          <img v-if="hope > 5" src="../assets/img/ali0.png" alt="" />
          <img v-else src="../assets/img/bumei.jpeg" alt="" />
        </div>
      </li>
    </div>
    <div v-if="flag == 1" class="ShowBox">
      <div class="TopList">
        <el-tooltip content="点我看动画" placement="bottom" effect="light">
          <i
            @click="TopList = !TopList"
            class="el-icon-s-order"
            style="font-size: 30px"
          ></i>
        </el-tooltip>
        <el-button
          v-show="TopList"
          plain
          @click="index = i"
          :type="hope > 5 ? 'danger' : 'primary'"
          size="small"
          v-for="(item, i) in Arr"
          :key="i"
          >{{ item }}</el-button
        >
      </div>
      <li v-if="index == 0">
        <video
          controls
          autoplay
          loop
          src="../assets/MV/ali/001.mp4"
          type="video/mp4"
          width="700"
          height="500"
        ></video>
        <div class="last">
          <i @click="Twoleft" class="iconfont icon-play-previous"></i>
          <i @click="Tworight" class="iconfont icon-play-next"></i>
        </div>
      </li>
      <li v-if="index == 1">
        <video
          controls
          autoplay
          loop
          src="../assets/MV/ali/002.mp4"
          type="video/mp4"
          width="700"
          height="500"
        ></video>
        <div class="last">
          <i @click="Twoleft" class="iconfont icon-play-previous"></i>
          <i @click="Tworight" class="iconfont icon-play-next"></i>
        </div>
      </li>
      <li v-if="index == 2">
        <video
          controls
          autoplay
          loop
          src="../assets/MV/ali/003.mp4"
          type="video/mp4"
          width="700"
          height="500"
        ></video>
        <div class="last">
          <i @click="Twoleft" class="iconfont icon-play-previous"></i>
          <i @click="Tworight" class="iconfont icon-play-next"></i>
        </div>
      </li>
      <li v-if="index == 3">
        <video
          controls
          autoplay
          loop
          src="../assets/MV/ali/004.mp4"
          type="video/mp4"
          width="700"
          height="500"
        ></video>
        <div class="last">
          <i @click="Twoleft" class="iconfont icon-play-previous"></i>
          <i @click="Tworight" class="iconfont icon-play-next"></i>
        </div>
      </li>
      <li v-if="index == 4">
        <video
          controls
          autoplay
          loop
          src="../assets/MV/ali/005.mp4"
          type="video/mp4"
          width="700"
          height="500"
        ></video>
        <div class="last">
          <i @click="Twoleft" class="iconfont icon-play-previous"></i>
          <i @click="Tworight" class="iconfont icon-play-next"></i>
        </div>
      </li>
      <li v-if="index == 5">
        <video
          controls
          autoplay
          loop
          src="../assets/MV/ali/006.mp4"
          type="video/mp4"
          width="700"
          height="500"
        ></video>
        <div class="last">
          <i @click="Twoleft" class="iconfont icon-play-previous"></i>
          <i @click="Tworight" class="iconfont icon-play-next"></i>
        </div>
      </li>
      <li v-if="index == 6">
        <video
          controls
          autoplay
          loop
          src="../assets/MV/chsz.mp4"
          type="video/mp4"
          width="700"
          height="500"
        ></video>
        <div class="last">
          <i @click="Twoleft" class="iconfont icon-play-previous"></i>
          <i @click="Tworight" class="iconfont icon-play-next"></i>
        </div>
      </li>
      <li v-if="index == 7">
        <video
          controls
          autoplay
          loop
          src="../assets/MV/gbtg.mp4"
          type="video/mp4"
          width="700"
          height="500"
        ></video>
        <div class="last">
          <i @click="Twoleft" class="iconfont icon-play-previous"></i>
          <i @click="Tworight" class="iconfont icon-play-next"></i>
        </div>
      </li>
      <li v-if="index == 8">
        <video
          controls
          autoplay
          loop
          src="../assets/MV/jh.mp4"
          type="video/mp4"
          width="700"
          height="500"
        ></video>
        <div class="last">
          <i @click="Twoleft" class="iconfont icon-play-previous"></i>
          <i @click="Tworight" class="iconfont icon-play-next"></i>
        </div>
      </li>
      <li v-if="index == 9">
        <video
          controls
          autoplay
          loop
          src="../assets/MV/kxcr.mp4"
          type="video/mp4"
          width="700"
          height="500"
        ></video>
        <div class="last">
          <i @click="Twoleft" class="iconfont icon-play-previous"></i>
          <i @click="Tworight" class="iconfont icon-play-next"></i>
        </div>
      </li>
      <li v-if="index == 10">
        <video
          controls
          autoplay
          loop
          src="../assets/MV/sqay.mp4"
          type="video/mp4"
          width="700"
          height="500"
        ></video>
        <div class="last">
          <i @click="Twoleft" class="iconfont icon-play-previous"></i>
          <i @click="Tworight" class="iconfont icon-play-next"></i>
        </div>
      </li>
      <li v-if="index == 11">
        <video
          controls
          autoplay
          loop
          src="../assets/MV/zzx.mp4"
          type="video/mp4"
          width="700"
          height="500"
        ></video>
        <div class="last">
          <i @click="Twoleft" class="iconfont icon-play-previous"></i>
          <i @click="Tworight" class="iconfont icon-play-next"></i>
        </div>
      </li>
      <li v-if="index == 12">
        <video
          controls
          autoplay
          loop
          src="../assets/MV/xcm.mp4"
          type="video/mp4"
          width="700"
          height="500"
        ></video>
        <div class="last">
          <i @click="Twoleft" class="iconfont icon-play-previous"></i>
          <i @click="Tworight" class="iconfont icon-play-next"></i>
        </div>
      </li>
      <li v-if="index == 13">
        <video
          controls
          autoplay
          loop
          src="../assets/MV/zs.mp4"
          type="video/mp4"
          width="700"
          height="500"
        ></video>
        <div class="last">
          <i @click="Twoleft" class="iconfont icon-play-previous"></i>
          <i @click="Tworight" class="iconfont icon-play-next"></i>
        </div>
      </li>
      <li v-if="index == 14">
        <video
          controls
          autoplay
          loop
          src="../assets/MV/mhls.mp4"
          type="video/mp4"
          width="700"
          height="500"
        ></video>
        <div class="last">
          <i @click="Twoleft" class="iconfont icon-play-previous"></i>
          <i @click="Tworight" class="iconfont icon-play-next"></i>
        </div>
      </li>
      <li v-if="index == 15">
        <video
          controls
          autoplay
          loop
          src="../assets/MV/pdx.mp4"
          type="video/mp4"
          width="700"
          height="500"
        ></video>
        <div class="last">
          <i @click="Twoleft" class="iconfont icon-play-previous"></i>
          <i @click="Tworight" class="iconfont icon-play-next"></i>
        </div>
      </li>
      <li v-if="index == 16">
        <video
          controls
          autoplay
          loop
          src="../assets/MV/tm.mp4"
          type="video/mp4"
          width="700"
          height="500"
        ></video>
        <div class="last">
          <i @click="Twoleft" class="iconfont icon-play-previous"></i>
          <i @click="Tworight" class="iconfont icon-play-next"></i>
        </div>
      </li>
      <li v-if="index == 17">
        <video
          controls
          autoplay
          loop
          src="../assets/MV/cat.mp4"
          type="video/mp4"
          width="700"
          height="500"
        ></video>
        <div class="last">
          <i @click="Twoleft" class="iconfont icon-play-previous"></i>
          <i @click="Tworight" class="iconfont icon-play-next"></i>
        </div>
      </li>
      <li v-if="index == 18">
        <video
          controls
          autoplay
          loop
          src="../assets/MV/kn.mp4"
          type="video/mp4"
          width="700"
          height="500"
        ></video>
        <div class="last">
          <i @click="Twoleft" class="iconfont icon-play-previous"></i>
          <i @click="Tworight" class="iconfont icon-play-next"></i>
        </div>
      </li>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      index: 0, //小音乐的
      flag: 0, //大盒子
      hope: 1,
      Time: 0, //角度
      TopList: false,
      items: [
        { type: "", label: "晴天" },
        { type: "success", label: "标签二" },
        { type: "info", label: "标签三" },
        { type: "danger", label: "标签四" },
        { type: "warning", label: "标签五" },
      ],
      arr: [
        "晴天",
        "城南花已开",
        "AGA",
        "理想三旬",
        "云烟成雨",
        "喜羊羊与灰太狼",
        "枯木不逢春",
        "山楂树",
        "像鱼",
      ],
      Arr: [
        "阿狸第一集",
        "阿狸第二集",
        "阿狸第三集",
        "阿狸第四集",
        "阿狸第五集",
        "阿狸第六集",
        "超兽第一集武装",
        "果宝特攻",
        "数码宝贝",
        "开心宝贝",
        "神奇阿呦",
        "猪猪侠",
        "头出没",
        "左手右手",
        "猫和老鼠",
        "派大星",
        "汤姆",
        "猫",
        "柯南",
      ],
    };
  },
  methods: {
    change() {
      this.index++;
      if (this.index >= 9) {
        this.index = 0;
      }
    },
    clicks() {
      setInterval(() => {
        this.Time += 0.2;
      }, 10);
      document.querySelector(".ww").pause();
    },
    click() {
      document.querySelector(".ww").play();
        setInterval(() => {
        this.Time -= 0.2;
      }, 10);
    },
    left() {
      this.hope = Math.random() * 10;
      this.Time = 0;
      this.index--;
      if (this.index < 0) {
        this.index = 8;
      }
    },
    right() {
      this.hope = Math.random() * 10;
      this.Time = 0;
      this.index++;
      if (this.index > 8) {
        this.index = 0;
      }
    },

    Twochange() {
      this.index++;
      if (this.index >= 19) {
        this.index = 0;
      }
    },
    Twoleft() {
      this.hope = Math.random() * 10;
      this.Time = 0;
      this.index--;
      if (this.index < 0) {
        this.index = 18;
      }
    },
    Tworight() {
      this.hope = Math.random() * 10;
      this.Time = 0;
      this.index++;
      if (this.index > 18) {
        this.index = 0;
      }
    },
  },
  components: {},
  computed: {},
  watch: {},
  created() {
    setInterval(() => {
      this.Time -= 0.2;
    }, 10);
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.stimulate {
  width: 100%;
  height: calc(100% - 30px);
  padding: 20px;
  background: linear-gradient(#17d7e7, #22f40075);
  .music {
    position: fixed;
    top: 123px;
    left: 450px;
    height: 682px;
    width: 972px;
    text-align: center;
    margin: auto;
    background: transparent url(../assets/img/DSJ.png) no-repeat -308px -475px;
    background-size: 1520px auto;
    overflow: hidden;

    video {
      display: none;
      position: absolute;
      top: 40px;
      left: 110px;
      width: 755px;
      height: 610px;
    }
  }
  .text {
    display: inline-block;
    font-size: 25px;
    background: linear-gradient(#00f48675, #e71717);
    font-family: 华文彩云;
  }
  .ShowBox {
    padding: 20px;
  }
  .TopList {
    display: flex;
    flex-wrap: wrap;
    padding: 0 20px;
    box-sizing: border-box;
    align-items: center;
    color: blue;
    ::v-deep .el-button {
      margin: 5px 10px;
    }
  }
  li {
    display: flex;
    margin: 15px 0;
    flex-wrap: wrap;
    width: 40%;
    align-items: center;
    justify-content: space-between;
    h3 {
      box-shadow: 0 4px 4px 0px red;
    }

    i {
      font-size: 18px;
      margin: 0 5px !important;
      font-size: 30px;
      color: rgb(0 119 255);
    }

    img {
      border-radius: 50%;
      height: 150px;
      width: 150px;
      box-shadow: 0 0px 8px 5px #0dabe2;
    }
  }
  .last {
    padding-right: 155px;
    flex: 1;
    display: flex;
    justify-content: right;
  }
}
</style>
