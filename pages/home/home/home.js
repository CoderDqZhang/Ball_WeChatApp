// pages/home/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ball_datas: [
      {
        'image':'/images/gloable/football.png',
        'title':'足球',
        'sub_title':'有最新的消息',
        'id':'1'
      },
      {
        'image': '/images/gloable/baseball.png',
        'title': '棒球', 
        'sub_title': '有最新的消息',
        'id': '2'
      },
      {
        'image': '/images/gloable/basketball.png',
        'title': '篮球', 
        'sub_title': '有最新的消息',
        'id': '3'
      },
       {
        'image': '/images/gloable/bowling-ball.png',
        'title': '保龄球', 
        'sub_title': '有最新的消息',
        'id': '4'
      },
       {
         'image': '/images/gloable/hockey.png',
         'title': '冰球', 
         'sub_title': '有最新的消息',
         'id': '5'
       },
       {
         'image': '/images/gloable/ping-pong.png',
         'title': '乒乓球', 
         'sub_title': '有最新的消息',
         'id': '6'
       },
       {
         'image': '/images/gloable/rugby.png',
         'title': '橄榄球', 
         'sub_title': '有最新的消息',
         'id': '7'
       },
       {
         'image': '/images/gloable/tennis.png',
         'title': '网球', 
         'sub_title': '有最新的消息',
         'id': '8'
       },
       {
         'image': '/images/gloable/volleyball.png',
         'title': '排球', 
         'sub_title': '有最新的消息',
         'id': '9'
       }],
  },

  category_press: function(e) {
    wx.navigateTo({
      url: '/pages/home/category/category?item=' + JSON.stringify(e.currentTarget.dataset.item),
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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