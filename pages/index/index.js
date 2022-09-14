import * as echarts from '../../ec-canvas/echarts';
var dayChart = '', hourChart = ''
var _self
function dayChartFun(canvas, width, height, dpr) {
  dayChart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr //解决小程序视图模糊的问题，必写
  });
  canvas.setChart(dayChart);

  var option = {
    color: ["#FB7821", "#1B9DFF"],
    grid: {
      containLabel: true,
      x: -11,
      x2: 15,
      top: 14,
      bottom: 15
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      show: false,
      axisLabel: {
        interval: 49
      }
    },
    yAxis: {
      min: 'dataMin',
      show: false
    },
    series: [{
      itemStyle: {
        normal: {
          label: {
            show: true,
            position: [-5, -11],
            textStyle: {
              color: 'black'
            },
            formatter: function (params) {
              return params.value + '°'
            }
          }
        }
      },
      type: 'line',
      symbolSize: '4',
      smooth: true,
      data: []
    }, {
      itemStyle: {
        normal: {
          label: {
            show: true,
            position: [-5, 7],
            textStyle: {
              color: 'black'
            },
            formatter: function (params) {
              return params.value + '°'
            }
          }
        }
      },
      type: 'line',
      symbolSize: '4',
      smooth: true,
      data: []
    }]
  };

  dayChart.setOption(option);
  return dayChart;
}

function hourChartFun(canvas, width, height, dpr) {
  // console.log(canvas, width, height)
  hourChart = echarts.init(canvas, null, {
    width: width - 4,
    height: height,
    devicePixelRatio: dpr //解决小程序视图模糊的问题，必写
  });
  canvas.setChart(hourChart);

  var option = {
    color: ["#16C95D"],
    grid: {
      containLabel: true,
      x: -13,
      x2: 15,
      top: 17,
      bottom: 15
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      show: false,
      axisLabel: {
        interval: 49
      }
    },
    yAxis: {
      min: 'dataMin',
      show: false,
    },
    series: [{
      itemStyle: {
        normal: {
          label: {
            show: true,
            position: [0, -13],
            textStyle: {
              color: 'black'
            },
            formatter: function (params) {
              return params.value + '°'
            }
          }
        }
      },
      type: 'line',
      // symbol: "none",
      symbolSize: '4',
      smooth: true,
      data: []
    }]
  };

  hourChart.setOption(option);
  return hourChart;
}
let di = 0, hi = 0
const app = getApp()

Page({
  data: {
    hourArrs: [],
    dayArrs: [],
    ec: {
      onInit: dayChartFun
    },
    ecH: {
      onInit: hourChartFun
    },
    /** 日期 */
    date: '',

    /** 天气数据 */
    weatherInfo: {},

    /** 输入框内容 */
    inputContent: '',
  },

  dayWeather() {
    setTimeout(() => {
      let dayArrs = [{
        week: "周一",
        date: "08-11",
        high: "32",
        low: "26",
        wind_scale: "2",
        wether: "小雨",
        wind_direction: "北"
      },
      {
        week: "周一",
        date: "08-12",
        high: "35",
        low: "26",
        wind_scale: "2",
        wether: "多云",
        wind_direction: "东南"
      },
      {
        week: "周一",
        date: "08-13",
        high: "34",
        low: "25",
        wind_scale: "1",
        wether: "小雨",
        wind_direction: "北"
      },
      {
        week: "周一",
        date: "08-14",
        high: "31",
        low: "25",
        wind_scale: "1",
        wether: "中雨",
        wind_direction: "北"
      },
      {
        week: "周一",
        date: "08-15",
        high: "30",
        low: "23",
        wind_scale: "2",
        wether: "小雨",
        wind_direction: "东北"
      }]
      _self.setData({
        dayArrs
      })
      var maxArry = dayArrs.map(item => {
        return item.high;
      });
      var minArry = dayArrs.map(item => {
        return item.low;
      });
      _self.dayLine(maxArry, minArry)
    }, 1000)
  },
  dayLine(maxArry, minArry) {
    ++di
    setTimeout(function () {
      if (dayChart) {
        var option = dayChart.getOption();
        option.series[0].data = maxArry
        option.series[1].data = minArry
        dayChart.setOption(option, true);
        di = 0
      } else {
        // 两秒内没画出来就不调了
        if (di < 20) _self.dayLine(maxArry, minArry)
        else console.log('五日天气失败')
      }
    }, 100)
  },
  hourWeather() {
    setTimeout(() => {
      let hourArrs = [{
        bjTime: "08:00",
        temperature: "32",
        wether: "小雨",
        wind_direction: "北",
        wind: "2级"
      }, {
        bjTime: "08:00",
        temperature: "35",
        wether: "小雨",
        wind_direction: "北",
        wind: "2级"
      }, {
        bjTime: "08:00",
        temperature: "30",
        wether: "小雨",
        wind_direction: "北",
        wind: "2级"
      }, {
        bjTime: "08:00",
        temperature: "28",
        wether: "小雨",
        wind_direction: "北",
        wind: "2级"
      }, {
        bjTime: "08:00",
        temperature: "31",
        wether: "小雨",
        wind_direction: "北",
        wind: "2级"
      }, {
        bjTime: "08:00",
        temperature: "26",
        wether: "小雨",
        wind_direction: "北",
        wind: "2级"
      }, {
        bjTime: "08:00",
        temperature: "29",
        wether: "小雨",
        wind_direction: "北",
        wind: "2级"
      }, {
        bjTime: "08:00",
        temperature: "32",
        wether: "小雨",
        wind_direction: "北",
        wind: "2级"
      }]
      _self.setData({
        hourArrs
      })
      var d = hourArrs.map(v => { return v.temperature })
      _self.hourLine(d)
    }, 1000)
  },
  hourLine(d) {
    ++hi
    setTimeout(function () {
      if (hourChart) {
        var option = hourChart.getOption();
        option.series[0].data = d
        hourChart.setOption(option, true);
        hi = 0
      } else {
        if (hi < 20) _self.hourLine(d)
        else console.log('小时天气失败')
      }
    }, 100)
  },
  /** 本地城市 */
  localCity: null,

  /** 当前查看的城市 */
  currentCity: null,
  /**
   * 更新时间
   */
  updateTime() {
    var time = new Date();
    console.log(time);                     // 时间戳
    this.setData({
      date: `${time.toLocaleString()}`,
    });
  },

  /**
   * 请求数据
   */
  requestWeather() {

  },
  
  onLoad: function (options) {
    this.updateTime();
    di = 0
    hi = 0
    _self = this
    this.dayWeather()
    this.hourWeather()
  },
  onSearchInputChanged(event) {
    // 更新数据
    this.setData({
      inputContent: event.detail.value,
    });
  }

})
