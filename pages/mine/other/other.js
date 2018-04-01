// pages/mine/other/other.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:{},
    userInfo:{},
    windowWidth: 0,
    windowHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      item: JSON.parse(options.item),
      userInfo: app.globalData.userInfo,
      'userInfo.age': '10',
      'userInfo.phone': '18363899723',
      'userInfo.weight': '62',
      'userInfo.height': '174',
      'userInfo.good': '前锋',
    })
    that.reqeuestData(that.data.item)
    that.setData({
      windowWidth: app.globalData.windowWidth,
      windowHeight: app.globalData.windowHeight
    })
  },

  comment_press: function (e) {
    wx.navigateTo({
      url: '/page/mine/command/command',
    })
  },

  reqeuestData: function (res) {
    var that = this
    var data = { 'openid': res.user.openid }
    app.func.requestGet('/ball/getUserInfo/', data, function (res) {
      console.log(res)
      that.setData({
        userInfo: res.data.user_info
      })
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