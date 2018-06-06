// pages/mine/game_club/game_club.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    club_list: [],
    windowWidth: 0,
    windowHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.requestMyGameClub()
    that.setData({
      windowWidth: app.globalData.windowWidth,
      windowHeight: app.globalData.windowHeight
    })
  },

  /**
 * 修改个人信息后更新数据
 */
  changeData: function (data) {
    this.setData({
      'app.globalData.userInfo': data
    })
  },

  user_info_press: function (res) {
    var that = this
    for (var i = 0; i < that.data.club_list.length; i++) {
      if (res.currentTarget.dataset.id == that.data.club_list[i].id) {
        var data = that.data.club_list[i].user
      }
    }
    wx.navigateTo({
      url: '/pages/mine/other/other?item=' + JSON.stringify(data),
    })
  },

  game_club_press: function (res) {
    var that = this
    for (var i = 0; i < that.data.club_list.length; i++) {
      if (res.currentTarget.dataset.id == that.data.club_list[i].id) {
        var data = that.data.club_list[i]
      }
    }
    wx.navigateTo({
      url: '/pages/mine/game_club_detail/game_club_detail?item=' + JSON.stringify(data),
    })
  },

  requestMyGameClub: function () {
    var that = this
    app.func.requestPost('/ball/gameclublist/', {}, function (res) {
      console.log(res)
      that.setData({
        club_list: res.data.club_list,
      })
    })
  },

  club_btn_press: function (res) {
    wx.navigateTo({
      url: '/pages/mine/create_game_club/create_game_club',
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

  game_btn_press: function (res) {

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