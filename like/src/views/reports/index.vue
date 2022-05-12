<template>
  <div id="reports">
    <MBX label1="数据统计" label2="数据报表"></MBX>
    <el-card>
      <div id="sss" ref="omg"></div>
    </el-card>
  </div>
</template>
<script>
import { Reports } from '../../api/api'
import * as echarts from 'echarts'
import MBX from '@/components/MBX.vue'
export default {
  data() {
    return {}
  },
  methods: {},
  components: { MBX },
  computed: {},
  watch: {},
  mounted() {
    Reports().then((res) => {
      var myChart = echarts.init(document.getElementById('sss'))
      res.title = {
        text: '用户来源',
        textStyle: {
          fontFamily: '华文彩云',
          color: '#b404a7'
        }
      }
      res.tooltip = {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      }
      res.toolbox = {
        feature: {
          saveAsImage: {}
        }
      }
      res.grid = {
        left: '0%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      }
      res.xAxis[0].boundaryGap = false

      myChart.setOption(res)
      window.onresize = () => {
        myChart.resize() //自适应
      }
    })
  }
  // created() {
  //   setTimeout(() => {}, 1000)
  // }
  //   created() {
  //     Reports().then((res) => {
  //       this.option = res;
  //     });
  //     setTimeout(() => {
  //     //   this.option.title = {
  //     //     text: "超级棒棒糖",
  //     //   };
  //     //   this.option.tooltip = {
  //     //     trigger: "axis",
  //     //     axisPointer: {
  //     //       type: "cross",
  //     //       label: {
  //     //         backgroundColor: "#6a7985",
  //     //       },
  //     //     },
  //     //   };
  //     //   this.option.toolbox = {
  //     //     feature: {
  //     //       saveAsImage: {},
  //     //     },
  //     //   };
  //     //   this.option.grid = {
  //     //     left: "0%",
  //     //     right: "4%",
  //     //     bottom: "3%",
  //     //     containLabel: true,
  //     //   };
  //     //   this.option.xAxis[0].boundaryGap = false;

  //       var myChart = echarts.init(document.getElementById("reports"));

  //       myChart.setOption(this.option);
  //     }, 500);
  //   },
}
</script>
<style lang="scss" scoped>
#reports {
  width: 100%;
  height: 100%;
  ::v-deep .el-card__body {
    background: linear-gradient(skyblue, pink);
  }
  #sss {
    height: 75vh;
  }
}
</style>
