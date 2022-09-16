 
const app = getApp()

Page({
    data: {
        /** 日期 */
        date: '',
        /**实时数据 */
        currentCityData: {},
        /**
         * 实时天气图标
         */
        currentCityImg: '',
        /** 天气数据 */
        weatherInfo: {},

        /** 输入框内容 */
        inputContent: '',
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

    key: "f0db6b9f18ce468ea8565fdd18fd2c47",
    /**
     * 根据经纬度查询
     */
    searchByLocation(latitude, longitude) {
        var uu = 'https://devapi.qweather.com/v7/weather/now?key=' + this.key + '&location=' + longitude + ',' + latitude
        console.log(uu);
        console.log(latitude);
        console.log(longitude);
        var that = this;
        wx.request({
            url: uu,
            success: function (res) {
                wx.hideToast();
                console.log(res.data)
                var imgURL = that.getWeatherIcon(res.data.now.icon)
                that.setData({
                    currentCityData: res.data,
                    currentCityImg: imgURL
                });

            },
            fail: function (err) {
                wx.showToast({
                    title: '失败',
                })('获取数据失败');
                console.log("shibai" + err)
            }
        })
    },

    showLocalCityWeather() {
        wx.showToast({ title: '正在定位...', icon: 'loading', duration: 2000000, });
        // 获取当前经纬度
        wx.getLocation({
            success: (res) => {
                this.searchByLocation(res.latitude, res.longitude);
            },
            fail: () => {
                wx.hideToast();
                wx.showModal({ title: '定位失败', content: '无法获取本地天气', showCancel: false, });
                this.searchByLocation(30.532911454589748, 114.31009646091417);
            },
        });
    },

    getWeatherIcon(code) {
        return 'https://images.weserv.nl/?url=https://a.hecdn.net/img/common/icon/202106d/' + code + '.png'
    },

    onLoad: function (options) {
        this.updateTime();
        console.log(options);
        // 获取天气
        if (options && options.city) {
            this.searchByCity(options.city);
        } else {
            this.showLocalCityWeather();
        }
    },

    onSearchInputChanged(event) {
        // 更新数据
        this.setData({
            inputContent: event.detail.value,
        });
    }

})
