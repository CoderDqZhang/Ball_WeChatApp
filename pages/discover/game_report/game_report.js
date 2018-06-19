// pages/discover/game_report/game_report.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    game_report:null,
    windowWidth:0,
    windowHeight:0,
    show_models:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      game_report: JSON.parse(options.item),
      windowWidth: app.globalData.windowWidth,
      windowHeight: app.globalData.windowHeight,
    })
    console.log(that.data)
    that.report_detail()
  },

  report_detail: function(res){
    var that = this
    var data = { "game_report_id": that.data.game_report.id, "openid": app.globalData.userInfo.openid}
    app.func.requestPost('/ball/gamereport/detail/', data, function (res) {
      console.log(res)
      that.setData({
        game_report: res.data.game_report,
      })
      if (that.data.game_report.user_status == 1){
        that.data.show_models = ['上传图集', '添加评论', '上传比分']
      } else if (that.data.game_report.user_status == 2){
        that.data.show_models = ['上传图集', '添加评论']
      }
    })
  },

  game_report_press: function (res){
    var that = this
    wx.showActionSheet({
      itemList: that.data.show_models,
      success: function (res) {
        if (res.cancel) {
          return
        }
        console.log(res.tapIndex)
        that.actionSheetTap(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  actionSheetTap: function(res){
    var that = this
    if (res == 0) {
      that.uploadImage()
    } else if (res == 1) {
      that.requestGameBall()
    } else if (res == 2) {
      that.requestUploadImages()
    }
  },

  uploadImage: function (res) {

  },

  commond: function (res) {

  },

  uploadSocre: function (res) {
    var that = this
    var data = { "game_report_id": that.data.game_report.id, "openid": app.globalData.userInfo.openid }
    app.func.requestPost('/ball/gamereport/upload/sorce/', data, function (res) {
      console.log(res)
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