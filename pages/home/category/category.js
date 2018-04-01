// pages/home/category/category.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:{},
    windowWidth:0,
    windowHeight:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      item:JSON.parse(options.item),
      windowWidth: app.globalData.windowWidth,
      windowHeight: app.globalData.windowHeight
    })
    that.reqeuestData(that.data.item)
    wx.setNavigationBarTitle({
      title: that.data.item.name
    })
  },

  input_search: function (e){

  },

  ball_info_press: function (e) {
    var that = this
    var data = that.data.item[e.currentTarget.dataset.index]
    wx.navigateTo({
      url: '/pages/home/detail/detail?item=' + JSON.stringify(data),
    })
  },

  reqeuestData: function(res){
    var that = this
    var data = {'ball_id':res.id}
    app.func.requestPost('/ball/gameList/', data, function (res) {
        that.setData({
          item:res.data.game_list
        })
    })
  },

  appointment_btn_press:function (res) {
    wx.navigateTo({
      url: '/pages/home/create_game/create_game',
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