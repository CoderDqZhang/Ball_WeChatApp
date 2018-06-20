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
    show_models:[],
    commonds:[],
    game_report_images:[]
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
    that.requestCommonds()
    that.requestImages()
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
      that.commond()
    } else if (res == 2) {
      that.uploadSocre()
    }
  },

  uploadImage: function (res) {
    var that = this
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.choseImage(res.tempFiles)
      }
    })
  },

  choseImage:function(res){
    var that = this
    var data = { 'game_report_id': that.data.game_report.id, 'content': '这是一个测试数据', "openid": app.globalData.userInfo.openid }
    console.log(data)
    app.func.requestUpload('/ball/gamereport/upload/images/', data, res, 'report_image', function (res) {
      console.log(res)
      if (res.msg != null && res.msg.errors != null) {
        wx.showModal({
          title: res.msg.errors[0].error,
          content: "",
        })
      }
    })
  },

  commond: function (res) {
    var that = this
    var data = JSON.stringify(that.data.game_report)
    wx.navigateTo({
      url: '/pages/discover/game_report_comment/game_report_comment?item=' + data,
    })
  },

  uploadSocre: function (res) {
    var that = this
    var data = { "game_report_id": that.data.game_report.id, "openid": app.globalData.userInfo.openid }
    app.func.requestPost('/ball/gamereport/upload/sorce/', data, function (res) {
      console.log(res)
    })
  },

  requestCommonds:function(res){
    var that = this
    var data = { "game_report_id": that.data.game_report.id}
    app.func.requestPost('/ball/gamereport/getcomment/', data, function (res) {
      console.log(res)
      that.setData({
        commonds: res.data.commonds
      })
    })
  },

  requestImages:function(res){
    var that = this
    var data = { "game_report_id": that.data.game_report.id}
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


  more_images: function(res){
    var data = this.data.game_report
    wx.navigateTo({
      url: '/pages/discover/game_report_images/game_report_images?item=' + JSON.stringify(data),
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