// pages/mine/game_club/game_club.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    game_list: [],
    normal_game_list: [],
    imagePath: '',
    imagePaths: '/images/gloable/avatar.jpg',
    club: {
      "openid": null,
      "ball_id": null,
      "club_slogan": '',
      "club_desc": '',
      'club_title': '',
      "club_grade": 0,
      "club_project": '',
      "club_number": 0,
    },
    windowWidth: 0,
    windowHeight: 0,
    isCreateGameClub:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (options.item != null) {
      that.setData({
        isCreateGameClub:false,
        club: JSON.parse(options.item), 
        windowWidth: app.globalData.windowWidth,
        windowHeight: app.globalData.windowHeight,
      })
      that.setData({
        imagePaths:that.data.club.club_post
      })
    }else{
      this.requestGame()
      that.setData({
        game_club: JSON.parse(options.item),
        windowWidth: app.globalData.windowWidth,
        windowHeight: app.globalData.windowHeight
      })
    }
  },

  requestGame: function (res) {
    var that = this;
    app.func.requestGet('/ball/balllist/', {}, function (res) {
      for (var i = 0; i < res.data.length; i++) {
        var urls = res.data[i].image
        res.data[i].image = urls
      }
      var tempList = []
      for (var i = 0; i < res.data.length; i++) {
        tempList.push(res.data[i].name)
      }
      that.setData({
        normal_game_list: res.data,
        game_list: tempList
      })
    });
  },

  choose_postimage: function (res) {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          imagePath: res.tempFiles,
          imagePaths: res.tempFilePaths,
        })
      }
    })
  },

  club_btn_change_press:function (res){
    var that = this
    var data = {
      'club_id': that.data.club.id,
      'openid': app.globalData.userInfo.openid,
      'club_title': that.data.club.club_title,
      'club_slogan': that.data.club.club_slogan,
      'club_desc': that.data.club.club_desc,
      'club_grade': that.data.club.club_grade,
      'club_number': that.data.club.club_number,
      'club_project': that.data.club.club_project,
    }
    if (that.data.imagePath == "") {
      app.func.requestPost('/ball/gameclub/updateinfo/', data, function (res) {
        console.log(res)
        if (res.msg != null && res.msg.errors != null) {
          wx.showModal({
            title: res.msg.errors[0].error,
            content: "",
          })
        } else {
          wx.showToast({
            title: res.data.message,
          })
          var pages = getCurrentPages();
          if (pages.length > 1) {
            //上一个页面实例对象
            var prePage = pages[pages.length - 2];
            //关键在这里
            prePage.changeDataGameClubData(that.data.club)
          }
          wx.navigateBack({
            delta: 1
          })
        }
      })
    }else{
      app.func.requestUpload('/ball/gameclub/updateinfo/', data, that.data.imagePath, 'club_post', function (res) {
        console.log(res)
        res = JSON.parse(res)
        if (res.msg != null && res.msg.errors != null) {
          wx.showModal({
            title: res.msg.errors[0].error,
            content: "",
          })
        } else {
          wx.showToast({
            title: res.data.message,
          })
          that.setData({
            'club.club_post':res.data.image
          })
          var pages = getCurrentPages();
          if (pages.length > 1) {
            //上一个页面实例对象
            var prePage = pages[pages.length - 2];
            //关键在这里
            prePage.changeDataGameClubData(that.data.club)
          }
          wx.navigateBack({
            delta: 1
          })
        }
      })
    }
    
  },

  game_type_press: function (e) {
    var that = this
    that.setData({
      'club.ball_id': that.data.normal_game_list[parseInt(e.detail.value)].id,
      'game_name': that.data.game_list[parseInt(e.detail.value)]
    })
  },

  input_club_title: function (e) {
    this.setData({
      'club.club_title': e.detail.value
    })
  },

  input_club_slogan: function (e) {
    this.setData({
      'club.club_slogan': e.detail.value
    })
  },

  input_club_desc: function (e) {
    this.setData({
      'club.club_desc': e.detail.value
    })
  },

  club_input_project: function (e) {
    this.setData({
      'club.club_project': e.detail.value
    })
  },

  club_btn_press: function (res) {
    var that = this
    var data = {
      'openid': app.globalData.userInfo.openid,
      'club_ball': that.data.club.ball_id,
      'club_title': that.data.club.club_title,
      'club_slogan': that.data.club.club_slogan,
      'club_desc': that.data.club.club_desc,
      'club_grade': that.data.club.club_grade,
      'club_number': that.data.club.club_number,
      'club_project': that.data.club.club_project,
    }
    console.log(data)
    app.func.requestUpload('/ball/creategameclub/', data, that.data.imagePath, 'club_post', function (res) {
      console.log(res)
      if (res.msg != null && res.msg.errors != null) {
        wx.showModal({
          title: res.msg.errors[0].error,
          content: "",
        })
      } else {
        wx.navigateBack({
          delta: 2
        })
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