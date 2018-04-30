// pages/mine/invate/invate.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    game_list:{}
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      userInfo: JSON.parse(options.item)
    })
    this.reqeuestData(that.data.userInfo)
  },

  invate_session: function (e) {
    var that = this
    wx.navigateTo({
      url: '/pages/home/detail/detail?item=' + JSON.stringify(that.data.game_list[e.currentTarget.dataset.index]),
    })
  },

  reqeuestData: function (res) {
    var that = this
    var data = { 'openid': res.openid }
    app.func.requestPost('/ball/mygameappoinment/', data, function (res) {
      console.log(res)
      that.setData({
        game_list: res.data.game_list
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