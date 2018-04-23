// pages/mine/command_other/command_other.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:{},
    commond: {
      "openid": '18363899723',
      "targid": '16601131280',
      "content": "这家伙贼6",
      "rank": 9
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      item: JSON.parse(options.item),
    })
    that.data.commond.targid =that.data.item.openid
  },

  input_game_subtitle: function (e) {
    var that = this
    that.setData({
      'commond.content':e.detail.value
    })
  },

  appointment_btn_press: function (res) {
    var that = this
    var data = that.data.commond
    app.func.requestPost('/ball/Commond/', data, function (res) {
      console.log(res)
      wx.showToast({
        title: '评价成功',
        icon: 'success',
        duration: 2000
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