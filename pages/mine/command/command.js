// pages/mine/command/command.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userStars: app.globalData.userStars,
    gameStars: app.globalData.gameStars,
    item:{},
    my_commond:true,
    commonds:{},
    windowWidth: 0,
    windowHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      userInfo: JSON.parse(options.item)
    })
    that.setData({
      windowWidth: app.globalData.windowWidth,
      windowHeight: app.globalData.windowHeight
    })
    var that = this
    
    this.my_commond()
  },

  my_commond: function () {
    var that = this
    var data = { 'openid': that.data.userInfo.openid }
    app.func.requestPost('/ball/UserCommond/', data, function (res) {
      console.log(res)
      that.setData({
        commonds: res.data.commonds,
        my_commond:true
      })
    })
  },

  commond_my: function () {
    var that = this
    var data = { 'openid': that.data.userInfo.openid }
    app.func.requestPost('/ball/UserOtherCommond/', data, function (res) {
      console.log(res)
      that.setData({
        commonds: res.data.commonds,
        my_commond: false
      })
    })
  },

  commond_press: function (res){
    var that = this
    var data = that.data.commonds[res.currentTarget.dataset.index].tag_user
    wx.navigateTo({
      url: '/pages/mine/other/other?item=' + JSON.stringify(data),
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