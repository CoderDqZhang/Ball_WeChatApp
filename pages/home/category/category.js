// pages/home/category/category.js
var app = getApp()

//by函数接受一个成员名字符串做为参数
//并返回一个可以用来对包含该成员的对象数组进行排序的比较函数
var bymin = function (name) {
  return function (o, p) {
    var a, b;
    if (typeof o === "object" && typeof p === "object" && o && p) {
      a = o[name];
      b = p[name];
      if (a === b) {
        return 0;
      }
      if (typeof a === typeof b) {
        return a < b ? -1 : 1;
      }
      return typeof a < typeof b ? -1 : 1;
    }
    else {
      throw ("error");
    }
  }
}
/**
   * 排序算法
   */
var bymax = function (name) {
  return function (o, p) {
    var a, b;
    if (typeof o === "object" && typeof p === "object" && o && p) {
      a = o[name];
      b = p[name];
      if (a === b) {
        return 0;
      }
      if (typeof a === typeof b) {
        return a > b ? -1 : 1;
      }
      return typeof a > typeof b ? -1 : 1;
    }
    else {
      throw ("error");
    }
  }
}



Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {},
    ball_id:"1",
    sort_price: 'normal',
    sort_time: 'normal',
    sort_location:'normal',
    windowWidth: 0,
    windowHeight: 0,
    userInfo:{},
    animationAddressMenu: {},
    addressMenuIsShow: false,
    value: [0, 0, 0],
    provinces: [],
    citys: [],
    areas: [],
    areaInfo: '',
    address:{},
    selectCity:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      item: JSON.parse(options.item),
      windowWidth: app.globalData.windowWidth,
      windowHeight: app.globalData.windowHeight,
      userInfo: app.globalData.userInfo
    })
    that.reqeuestData(that.data.item)
    wx.setNavigationBarTitle({
      title: that.data.item.name
    })

    // 初始化动画变量
    var animation = wx.createAnimation({
      duration: 500,
      transformOrigin: "50% 50%",
      timingFunction: 'ease',
    })
    this.animation = animation;

    // 默认联动显示北京
    that.setData({
      address: app.city_data,
      selectCity: that.data.userInfo.city
    })
    var id = that.data.address.provinces[0].id
    this.setData({
      provinces: that.data.address.provinces,
      citys: that.data.address.citys[id],
      areas: that.data.areas[that.data.address.citys[id][0].id],
    })
  },

  updataGame: function (res) {
    var that = this
    that.reqeuestData(res)
    // var pages = getCurrentPages();
    // if (pages.length > 1) {
    //   //上一个页面实例对象
    //   var prePage = pages[pages.length - 2];
    //   //关键在这里
    //   prePage.updataGame()
    // }
  },

  // 点击所在地区弹出选择框
  selectDistrict: function (e) {
    var that = this
    // 如果已经显示，不在执行显示动画
    if (that.data.addressMenuIsShow) {
      return
    }
    // 执行显示动画
    that.startAddressAnimation(true)
  },
  // 执行动画
  startAddressAnimation: function (isShow) {
    console.log(isShow)
    var that = this
    if (isShow) {
      // vh是用来表示尺寸的单位，高度全屏是100vh
      that.animation.translateY(0 + 'vh').step()
    } else {
      that.animation.translateY(40 + 'vh').step()
    }
    that.setData({
      animationAddressMenu: that.animation.export(),
      addressMenuIsShow: isShow,
    })
  },
  // 点击地区选择取消按钮
  cityCancel: function (e) {
    this.startAddressAnimation(false)
  },
  // 点击地区选择确定按钮
  citySure: function (e) {
    var that = this
    var city = that.data.city
    var value = that.data.value
    that.startAddressAnimation(false)
    // 将选择的城市信息显示到输入框
    var areaInfo = that.data.provinces[value[0]].name + ',' + that.data.citys[value[1]].name + ',' + that.data.areas[value[2]].name
    that.setData({
      areaInfo: areaInfo,
      selectCity: that.data.areas[value[2]].name
    })

  },
  // 点击蒙版时取消组件的显示
  hideCitySelected: function (e) {
    console.log(e)
    this.startAddressAnimation(false)
  },
  // 处理省市县联动逻辑
  cityChange: function (e) {
    console.log(e)
    var that = this
    var value = e.detail.value
    var provinces = this.data.provinces
    var citys = this.data.citys
    var areas = this.data.areas
    var provinceNum = value[0]
    var cityNum = value[1]
    var countyNum = value[2]
    // 如果省份选择项和之前不一样，表示滑动了省份，此时市默认是省的第一组数据，
    if (this.data.value[0] != provinceNum) {
      var id = provinces[provinceNum].id
      this.setData({
        value: [provinceNum, 0, 0],
        citys: that.data.address.citys[id],
        areas: that.data.address.areas[that.data.address.citys[id][0].id],
      })
    } else if (this.data.value[1] != cityNum) {
      // 滑动选择了第二项数据，即市，此时区显示省市对应的第一组数据
      var id = citys[cityNum].id
      this.setData({
        value: [provinceNum, cityNum, 0],
        areas: that.data.address.areas[citys[cityNum].id],
      })
    } else {
      // 滑动选择了区
      this.setData({
        value: [provinceNum, cityNum, countyNum]
      })
    }
    console.log(this.data)
  },
  /**
     * 搜索框查询某个人创建的球约
     */
  input_search: function (e) {
    console.log(e.detail.value)
    var that = this
    that.reqeuestSearchData(e.detail.value)
  },

  ball_info_press: function (e) {
    var that = this
    var data = that.data.item[e.currentTarget.dataset.index]
    wx.navigateTo({
      url: '/pages/home/detail/detail?item=' + JSON.stringify(data),
    })
  },
  /**
     * 请求列表
     */
  reqeuestData: function (res) {
    var that = this
    var data = { 'ball_id': res.id }
    that.setData({
      ball_id: res.id
    })
    app.func.requestPost('/ball/gamelist/', data, function (res) {
      for (var i = 0; i < res.data.game_list.length; i++) {
        res.data.game_list[i].game_start_times = Date.parse(new Date(res.data.game_list[i].game_start_time))
        if (app.globalData.locationInfo.latitude != null){
          res.data.game_list[i].game_distance = that.getDistance(app.globalData.locationInfo.latitude, app.globalData.locationInfo.longitude, res.data.game_list[i].game_latitude, res.data.game_list[i].game_longitude)
        }
      }
      console.log(res)
      that.setData({
        item: res.data.game_list

      })
      wx.stopPullDownRefresh();
    })
  },

  /**
     * 请求列表
     */
  reqeuestSearchData: function (res) {
    var that = this
    var data = { 'keyword': res,'ball_id':that.data.ball_id }
    app.func.requestPost('/ball/gamesearch/', data, function (res) {
      for (var i = 0; i < res.data.game_list.length; i++) {
        res.data.game_list[i].game_start_times = Date.parse(new Date(res.data.game_list[i].game_start_time))
      }
      that.setData({
        item: res.data.game_list
      })
    })
  },
  /**
     * 根据时间排序
     */
  sort_time: function (res) {
    var that = this
    if ((that.data.sort_time == 'normal') || (that.data.sort_time == 'max')) {
      var newArray = that.data.item.sort(bymin('game_start_times'))
      that.setData({
        item: newArray,
        sort_time: 'min'
      })
    } else {
      var newArray = that.data.item.sort(bymax('game_start_times'))
      that.setData({
        item: newArray,
        sort_time: 'max'
      })
    }
  },

  sort_location: function(res) {
    var that = this
    if ((that.data.sort_location == 'normal') || (that.data.sort_location == 'max')) {
      var newArray = that.data.item.sort(bymin('game_distance'))
      that.setData({
        item: newArray,
        sort_location: 'min'
      })
    } else {
      var newArray = that.data.item.sort(bymax('game_distance'))
      that.setData({
        item: newArray,
        sort_location: 'max'
      })
    }
  },
  /**
     * 根据价格排序
     */
  sort_price: function (res) {
    var that = this
    if ((that.data.sort_price == 'normal') || (that.data.sort_price == 'max')) {
      var newArray = that.data.item.sort(bymin('game_price'))
      that.setData({
        item: newArray,
        sort_price: 'min'
      })
    } else {
      var newArray = that.data.item.sort(bymax('game_price'))
      that.setData({
        item: newArray,
        sort_price: 'max'
      })
    }
  },

  /**
   * 修改个人信息后更新数据
   */
  changeData: function (data) {
    this.setData({
      'app.globalData.userInfo': data
    })
  },

  appointment_btn_press: function (res) {
    var that = this
    if (app.globalData.userInfo.phone == '') {
      wx.showModal({
        title: '请您完善个人信息',
        showCancel: true,
        confirmColor: "#4bd4c5",
        success: function (e) {
          wx.navigateTo({
            url: '/pages/mine/info/info?item=' + JSON.stringify(app.globalData.userInfo),
          })
        }
      })
      return
    }
    wx.navigateTo({
      url: '/pages/home/create_game/create_game',
    })
  },


  getDistance: function (lat1, lng1, lat2, lng2) {
    lat1 = lat1 || 0;
    lng1 = lng1 || 0;
    lat2 = lat2 || 0;
    lng2 = lng2 || 0;

    var rad1 = lat1 * Math.PI / 180.0;
    var rad2 = lat2 * Math.PI / 180.0;
    var a = rad1 - rad2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;

    var r = 6378137;
    return r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this
    that.reqeuestData({'id':that.data.ball_id})
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})