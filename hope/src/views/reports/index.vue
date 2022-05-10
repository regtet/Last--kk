<template>
  <div id="reports">123</div>
</template>
<script>
import * as echarts from "echarts";
import { GetReports } from "../../api/api";
export default {
  data() {
    return {
      option: {},
    };
  },
  methods: {},
  components: {},
  computed: {},
  watch: {},
  created() {
    this.option = {
      title: {
        text: "Stacked Area Chart",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
      },
      legend: {
        data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Email",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: "Union Ads",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: "Video Ads",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: [150, 232, 201, 154, 190, 330, 410],
        },
        {
          name: "Direct",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
          name: "Search Engine",
          type: "line",
          stack: "Total",
          label: {
            show: true,
            position: "top",
          },
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: [820, 932, 901, 934, 1290, 1330, 1320],
        },
      ],
    };
    GetReports().then((res) => {
      this.option = res;
    });
    setTimeout(() => {
      this.option.title = {
        text: "超级棒棒糖",
      };
      this.option.tooltip = {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
      };
      this.option.toolbox = {
        feature: {
          saveAsImage: {},
        },
      };
      this.option.grid = {
        left: "0%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      };
      this.option.xAxis[0].boundaryGap = false;

      var myChart = echarts.init(document.getElementById("reports"));

      myChart.setOption(this.option);
    }, 500);
  },
};
</script>
<style lang="scss" scoped>
#reports {
  width: 1000px;
  height: 500px;
}
</style>
