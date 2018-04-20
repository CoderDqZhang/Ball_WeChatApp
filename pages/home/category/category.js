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
    item:{},
    sort_price:'normal',
    sort_time: 'normal',
    windowWidth:0,
    windowHeight:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      item:JSON.parse(options.item),
      windowWidth: app.globalData.windowWidth,
      windowHeight: app.globalData.windowHeight
    })
    that.reqeuestData(that.data.item)
    wx.setNavigationBarTitle({
      title: that.data.item.name
    })
  },

  input_search: function (e){

  },

  ball_info_press: function (e) {
    var that = this
    var data = that.data.item[e.currentTarget.dataset.index]
    wx.navigateTo({
      url: '/pages/home/detail/detail?item=' + JSON.stringify(data),
    })
  },

  reqeuestData: function(res){
    var that = this
    var data = {'ball_id':res.id}
    app.func.requestPost('/ball/gameList/', data, function (res) {
        that.setData({
          item:res.data.game_list
        })
    })
  },

  sort_time: function (res) {

  },

  sort_price: function (res) {
      var that = this
      if ((that.data.sort_price == 'normal') || (that.data.sort_price == 'max')) {
        var newArray = that.data.item.sort(bymin('game_price'))
        that.setData({
          item: newArray,
          sort_price:'min'
        })
      }else{
        var newArray = that.data.item.sort(bymax('game_price'))
        that.setData({
          item: newArray,
          sort_price: 'max'
        })
      }
  },

  appointment_btn_press:function (res) {
    wx.navigateTo({
      url: '/pages/home/create_game/create_game',
    })
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