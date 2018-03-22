// pages/home/detail/detail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowWidth: 0,
    windowHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      windowWidth: app.globalData.windowWidth,
      windowHeight: app.globalData.windowHeight
    })
  },


  phone_press: function(e){
    wx.makePhoneCall({
      phoneNumber: '16601131280',
    })
  },

  location_press: function (e) {
    wx.navigateTo({
      url: '/pages/home/map/map',
    })
  },

  appointment_btn_press: function (e) {
    wx.showModal({
      title: '现在人数10个差5个，确定赴约吗？',
      showCancel:true,
      confirmColor:"#4bd4c5",
      success: function (e) {
        if (e.confirm) {
          wx.requestPayment({
            timeStamp: '',
            nonceStr: '',
            package: '',
            signType: '',
            paySign: '',
          })
        }else{

        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  user_info_press: function (e) {
      wx.navigateTo({
        url: '/pages/mine/other/other',
      })
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