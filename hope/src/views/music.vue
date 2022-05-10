<template>
  <div class="music">
    <i
      style="
        position: fixed;
        right: 140px;
        bottom: 80px;
        font-size: 50px;
        color: rebeccapurple;
        margin: 30px;
      "
      class="iconfont icon-24gf-nextSquare"
      @click="change"
    ></i>
    <br />
    <video
      autoplay
      v-if="index == 0"
      src="../assets/MV/杨沛宜 - 左手右手.mp4"
      type="video/mp4"
    ></video>
    <video
      autoplay
      v-if="index == 1"
      src="../assets/MV/阿狸.mp4"
      type="video/mp4"
    ></video>
    <video
      autoplay
      v-if="index == 2"
      src="../assets/MV/柯南.mp4"
      type="video/mp4"
    ></video>
    <video
      autoplay
      v-if="index == 3"
      src="../assets/MV/开心超人.mp4"
      type="video/mp4"
    ></video><video
      autoplay
      v-if="index == 4"
      src="../assets/MV/果宝特攻.mp4"
      type="video/mp4"
    ></video><video
      autoplay
      v-if="index == 5"
      src="../assets/MV/汤姆.mp4"
      type="video/mp4"
    ></video><video
      autoplay
      v-if="index == 6"
      src="../assets/MV/派大星.mp4"
      type="video/mp4"
    ></video><video
      autoplay
      v-if="index == 7"
      src="../assets/MV/熊出没.mp4"
      type="video/mp4"
    ></video><video
      autoplay
      v-if="index == 8"
      src="../assets/MV/猪猪侠.mp4"
      type="video/mp4"
    ></video><video
      autoplay
      v-if="index == 9"
      src="../assets/MV/神奇阿呦.mp4"
      type="video/mp4"
    ></video><video
      autoplay
      v-if="index == 10"
      src="../assets/MV/章鱼哥.mp4"
      type="video/mp4"
    ></video><video
      autoplay
      v-if="index == 11"
      src="../assets/MV/超兽武装.mp4"
      type="video/mp4"
    ></video><video
      autoplay
      v-if="index == 12"
      src="../assets/MV/进化.mp4"
      type="video/mp4"
    ></video>
  </div>
</template>
<script>
export default {
  data() {
    return {
      index: 0,
    };
  },
  methods: {
    change() {
      this.index++;
      if (this.index >= 13) {
        this.index = 0;
      }
    },
  },
  components: {},
  computed: {},
  watch: {},
  created() {},
};
</script>
<style lang="scss" scoped>
.music {
  width: 100%;
  height: 100%;
  text-align: center;
  margin: auto;
  video {
    width: 855px;
    height: 610px;
  }
}
</style>
