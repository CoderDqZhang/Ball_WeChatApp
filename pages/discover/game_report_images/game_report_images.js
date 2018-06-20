// pages/discover/game_report_images/game_report_images.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    game_report_images: null,
    game_club: null,
    windowWidth: 0,
    windowHeight: 0,
    item:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    this.setData({
      item: JSON.parse(options.item),
      windowWidth: app.globalData.windowWidth,
      windowHeight: app.globalData.windowHeight
    })
    this.requestImages()
  },

  requestImages: function (res) {
    var that = this
    var data = { "game_report_id": that.data.item.id }
    app.func.requestPost('/ball/gamereport/getimages/', data, function (res) {
      console.log(res)
      var tempImages = []
      for (var i = 0; i < res.data.images.length; i++) {
        if (res.data.images[i].image != 'error') {
          tempImages.push(res.data.images[i].image)
        }
      }
      that.setData({
        game_report_images: tempImages
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