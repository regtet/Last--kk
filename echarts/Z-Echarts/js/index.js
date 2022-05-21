const exs = document.querySelector("body .itemBox .itemLast .exs");
const myChart = echarts.init(exs);
const exs2 = document.querySelector(".exs2");

const exs3 = document.querySelector(".exs3");
const myChart3 = echarts.init(exs3);
const exs4 = document.querySelector(".exs4");
const myChart4 = echarts.init(exs4);
const exs5 = document.querySelector(".exs5");
const myChart5 = echarts.init(exs5);

var option = {
  title: {
    left: "center",
  },
  tooltip: {
    trigger: "item",
  },
  legend: {
    orient: "vertical",
    top: 0,
    left: 0,
    textStyle: {
      color: "#fff",
    },
  },

  grid: {
    top: 5,
  },
  series: [
    {
      name: "属于",
      type: "pie",
      radius: "50%",
      data: [
        { value: 1048, name: "卖淫嫖娼" },
        { value: 735, name: "经侦嫌疑" },
        { value: 580, name: "重点人口" },
        { value: 484, name: "刑侦重点" },
        { value: 5000, name: "吸毒人口" },
      ],
      top: 5,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
};
// var option2 = {
//   backgroundColor: "#FFFFFF",
//   title: {
//     text: "全国地图",
//     subtext: "纯属虚构",
//     x: "center",
//   },
//   tooltip: {
//     trigger: "item",
//   },
//   visualMap: {
//     show: false,
//     x: "left",
//     y: "bottom",
//     splitList: [
//       { start: 500, end: 600 },
//       { start: 400, end: 500 },
//       { start: 300, end: 400 },
//       { start: 200, end: 300 },
//       { start: 100, end: 200 },
//       { start: 0, end: 100 },
//     ],
//     color: ["#66CC33", "#00FF00", "#66FF33", "#339900", "#33CC00", "#00CC00"],
//   },
//   series: [
//     {
//       name: "随机数据",
//       type: "map",
//       mapType: "china",
//       roam: true,
//       label: {
//         normal: {
//           show: false,
//         },
//         emphasis: {
//           show: false,
//         },
//       },
//       data: mydata,
//     },
//   ],
// };
var option3 = {
  title: {
    text: "单位：岁",
    right: 80,
    textStyle: {
      color: "#fff",
      fontWeight: "normal",
    },
  },
  tooltip: {
    trigger: "item",
  },
  legend: {
    orient: "vertical",
    left: 0,
    textStyle: {
      color: "#fff",
    },
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: "40",
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: "18-30" },
        { value: 735, name: "31-40" },
        { value: 580, name: "41-50" },
        { value: 4840, name: "51-60" },
        { value: 300, name: "65岁以上" },
        { value: 66, name: "未标明" },
      ],
    },
  ],
};
var option4 = {
  xAxis: {
    type: "category",
    data: ["河北", "天津", "北京", "新疆", "内蒙", "宁夏", "海南"],
  },
  yAxis: {
    type: "value",
  },

  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: "bar",
    },
  ],
};
var option5 = {
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: "line",
      smooth: true,
    },
  ],
};
myChart.setOption(option);
// myChart2.setOption(option2);
myChart3.setOption(option3);
myChart4.setOption(option4);
myChart5.setOption(option5);
