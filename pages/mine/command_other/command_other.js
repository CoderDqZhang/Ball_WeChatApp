// pages/mine/command_other/command_other.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userStars: app.globalData.userStars,
    gameStars: app.globalData.gameStars,
    item:{},
    commond: {
      "openid": "",
      "targid": '16601131280',
      "content": "这家伙贼6",
      "userrank": 1,
      "skillrank": 1
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
    app.func.requestPost('/ball/commond/', data, function (res) {
      console.log(res)
      wx.showToast({
        title: '评价成功',
        icon: 'success',
        duration: 2000
      })
    })
  },

  // 星星点击事件
  userStarTap: function (e) {
    var index = e.currentTarget.dataset.index; // 获取当前点击的是第几颗星星
    var  that = this
    that.data.commond.userrank = index
    var tempUserStars = this.data.userStars; // 暂存星星数组
    var len = tempUserStars.length; // 获取星星数组的长度
    for (var i = 0; i < len; i++) {
      if (i <= index) { // 小于等于index的是满心
        
        tempUserStars[i] = '/images/gloable/star_select.png'
      } else { // 其他是空心
        tempUserStars[i] = '/images/gloable/star_normal.png'
      }
    }
    // 重新赋值就可以显示了
    this.setData({
      userStars: tempUserStars
    })
  },

  // 星星点击事件
  gameStarTap: function (e) {
    var index = e.currentTarget.dataset.index; // 获取当前点击的是第几颗星星
    var that = this
    that.data.commond.skillrank = index
    var tempUserStars = this.data.gameStars; // 暂存星星数组
    var len = tempUserStars.length; // 获取星星数组的长度
    for (var i = 0; i < len; i++) {
      if (i <= index) { // 小于等于index的是满心
        tempUserStars[i] = '/images/gloable/star_select.png'
      } else { // 其他是空心
        tempUserStars[i] = '/images/gloable/star_normal.png'
      }
    }
    // 重新赋值就可以显示了
    this.setData({
      gameStars: tempUserStars
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