// pages/mine/game_club_detail/game_club_detail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:null,
    game_club:null,
    windowWidth: 0,
    windowHeight: 0,
    handle:null,
    tempFilePaths:null,
    messageInfo:null,
    club_images:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      game_club: JSON.parse(options.item),
      windowWidth: app.globalData.windowWidth,
      windowHeight: app.globalData.windowHeight
    })
    this.requestGameClubDetail()
    this.requestMessageGroup()
    this.requestImages()
  },

  requestGameClubDetail: function (res){
    var that = this
    var data = { 'openid': app.globalData.userInfo.openid, 'club_id': that.data.game_club.id }
    app.func.requestPost('/ball/clubgamedetail/', data, function (res) {
      console.log(res)
      that.setData({
        item: res.data.club,
      })
      that.changeData(res.data.club)
    })
  },

  requestMessageGroup: function (res) {
    var that = this
    var data = { 'game_id': 0, 'club_id': that.data.game_club.id }
    app.func.requestPost('/ball/im/group/', data, function (res) {
      console.log(res)
      that.setData({
        messageInfo: res.data
      })
    })
  },

  requestImages: function (res) {
    var that = this
    var data = { 'club_id': that.data.game_club.id }
    app.func.requestPost('/ball/gameclub/image', data, function (res) {
      console.log(res)
      var tempImages = []
      for (var i = 0; i < res.data.images.length; i ++) {
        if (res.data.images[i].image != 'error') {
          tempImages.push(res.data.images[i].image)
        }
      }
      that.setData({
        club_images: tempImages
      })
    })
  },

  go_im: function (res) {
    var data = this.data.messageInfo
    wx.navigateTo({
      url: '/pages/home/wechat_im/wechat_im?item=' + JSON.stringify(data),
    })
  },

  more_images: function (e) {
    var data = this.data.game_club
    wx.navigateTo({
      url: '/pages/mine/game_club_images/game_club_images?item=' + JSON.stringify(data),
    })
  },

  changeData:function(res){
    var that = this
    switch (res.user_flag){
      case 'none':
        that.data.handle = ['申请加入'] 
        break
      case 'create':
        that.data.handle = ['解散','发起约球','上传图集','编辑信息','对抗赛'] 
        break
      case 'manager':
        that.data.handle = ['发起约球', '上传图集','退出俱乐部'] 
        break
      case 'user':
        that.data.handle = ['申请管理员', '上传图集','退出俱乐部'] 
        break
    }
  },

  /**
 * 修改俱乐部信息后更新数据
 */
  changeDataGameClubData: function (data) {
    this.setData({
      game_club: data
    })
  },

  club_btn_press: function (res){
    var that = this
      wx.showActionSheet({
        itemList: that.data.handle,
        success: function (res) {
          if (res.cancel){
            return
          }
          console.log(res.tapIndex)
          that.actionSheetTap(res.tapIndex,that.data.item.user_flag)
        },
        fail: function (res) {
          console.log(res.errMsg)
        }
      })
  },

  actionSheetTap:function(res,flag) {
    var that = this
    switch (flag) {
      case 'none':
        that.requestApply()
        break
      case 'create':
          if (res == 0) {
            that.requestDissolve()
          }else if(res == 1) {
            that.requestGameBall()
          }else if(res == 2){
            that.requestUploadImages()
          }else if(res == 3){
            var data = that.data.game_club
            wx.navigateTo({
              url: '/pages/mine/create_game_club/create_game_club?item=' + JSON.stringify(data),
            })
          }else{
            var data = that.data.game_club
            wx.navigateTo({
              url: '/pages/discover/game_report_list/game_report_list?item=' + JSON.stringify(data),
            })
          }
          break
      case 'manager':
        if (res == 0) {
          that.requestGameBall()
        } else if (res == 1) {
          that.requestUploadImages()
        } else {
          that.requestLeaveOut()
        }
        break
      case 'user':
        if (res == 0) {
          that.requestManager()
        } else if (res == 1) {
          that.requestUploadImages()
        } else {
          that.requestLeaveOut()
        }
        break
    }
  },
/**
 * 申请加入俱乐部
 */
  requestApply: function(){
    var that = this
    var data = { 'openid': app.globalData.userInfo.openid, 'tag_openid': that.data.game_club.user.openid, 'unread_club': that.data.game_club.id,'message_type':0 }
    app.func.requestPost('/ball/unread_club/', data, function (res) {
      console.log(res)
      wx.showToast({
        title: res.data.message,
      })
    })
  },

  /**
 * 解散加入俱乐部
 */
  requestDissolve: function () {
    var that = this
    var data = { 'openid': app.globalData.userInfo.openid, 'club_id': that.data.game_club.id,}
    app.func.requestPost('/ball/dissolvegameclub/', data, function (res) {
      console.log(res)
      wx.showToast({
        title: res.data.message,
      })
    })
  },

  /**
* 退出俱乐部
*/
  requestLeaveOut: function () {
    var that = this
    var data = { 'openid': app.globalData.userInfo.openid, 'club_id': that.data.game_club.id,}
    app.func.requestPost('/ball/leavegameclub/', data, function (res) {
      console.log(res)
      wx.showToast({
        title: res.data.message,
      })
    })
  },

  /**
* 申请管理员
*/
  requestManager: function () {
    var that = this
    var data = { 'openid': app.globalData.userInfo.openid, 'club_id': that.data.game_club.id, 'message_type': 1 }
    app.func.requestPost('/ball/gameclumanager/', data, function (res) {
      console.log(res)
      wx.showToast({
        title: res.data.message,
      })
    })
  },

  /**
 * 发起球约
 */
  requestGameBall: function () {
    var that = this
    var data = that.data.game_club
    wx.navigateTo({
      url: '/pages/mine/game_club_create_game/game_club_create_game?item=' + JSON.stringify(data),
    })
  },

  change_post: function(){
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          tempFilePaths: res.tempFiles
        })
        that.choseImage(res.tempFiles)
      }
    })
    
  },
/**
 * upload images
 */
  choseImage:function(res){
    var that = this
    var data = { 'openid': app.globalData.userInfo.openid, 'content': '这是一个测试数据', 'club_id': that.data.game_club.id}
    console.log(data)
    app.func.requestUpload('/ball/upload/gameclub/image/', data, res, 'club_image', function (res) {
      console.log(res)
      if (res.msg != null && res.msg.errors != null) {
        wx.showModal({
          title: res.msg.errors[0].error,
          content: "",
        })
      }
    })
  },

  /**
 * 上传图集
 */
  requestUploadImages: function () {
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