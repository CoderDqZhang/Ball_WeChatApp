// pages/home/unread_message/unread_message.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    unread_message:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestUnreadMessage()
  },

  requestUnreadMessage: function () {
    var that = this;
    var data = { 'openid': app.globalData.userInfo.openid }
    app.func.requestPost('/ball/unreadmessage/', data, function (res) {
      console.log(res)
      that.setData({
        unread_message: res.data.unread_message
      })
    });
  },

  accpet: function (res) {
    console.log(res)
    var that = this;
    var data = { 'unread_id': res.currentTarget.dataset.id,'status':1 }
    app.func.requestPost('/ball/gameclubstatus/', data, function (res) {
      console.log(res)
    });
  },

  reject: function(res){
    console.log(res)
    var that = this;
    var data = { 'unread_id': res.currentTarget.dataset.id, 'status': 0 }
    app.func.requestPost('/ball/gameclubstatus/', data, function (res) {
      console.log(res)
    });
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
    that.requestUnreadMessage()
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