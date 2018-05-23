// pages/home/home/home.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ball_datas: []
  },

  category_press: function(e) {
    wx.navigateTo({
      url: '/pages/home/category/category?item=' + JSON.stringify(e.currentTarget.dataset.item),
    })
  },

  requestData: function () {
    var that = this;
    app.func.requestGet('/ball/balllist/', {}, function (res) {
      console.log(res)
      if (res != false) {
        for (var i = 0; i < res.data.length; i++) {
          var urls = res.data[i].image
          res.data[i].image = urls
        }
        that.setData({
          ball_datas: res.data
        })
        wx.stopPullDownRefresh();
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestData()
    
    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  updataGame: function (res) {
    var that = this
    that.requestData()
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
    that.requestData()
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
    var that = this
    return {
      title: "我们一起约球吧",
      path: '/pages/home/home/home',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})