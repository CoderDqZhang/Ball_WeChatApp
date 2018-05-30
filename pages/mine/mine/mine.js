// pages/mine/mine/mine.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    info_datas: ['我的资料', '我的邀约', '我的评价', '俱乐部']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.haseUserInfo() 
  },

  haseUserInfo: function () {
    if (app.globalData.userInfo && app.globalData.userInfo.avatar != "") {
      console.log(app.globalData.userInfo)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  getUserInfo: function (e) {
    console.log(e)
    this.setData({
      "userInfo.openid": app.globalData.userInfo.openid,
        "userInfo.nickname": e.detail.userInfo.nickName,
        "userInfo.age": 0,
        "userInfo.sign": "",
        "userInfo.gender": e.detail.userInfo.gender,
        "userInfo.weight": 0,
        "userInfo.height": 0,
        "userInfo.game_age": 0,
        "userInfo.good_point": "",
        "userInfo.phone": "",
        "userInfo.province": e.detail.userInfo.country,
        "userInfo.city": e.detail.userInfo.city,
        "userInfo.avatar": e.detail.userInfo.avatarUrl,
      hasUserInfo: true
    })
    this.save_userInfo(this.data.userInfo)
    app.globalData.userInfo = this.data.userInfo
  },
/**
 * 修改个人信息后更新数据
 */
  changeData: function (data) {
    this.setData({
      userInfo: data
    })
  },

  reqeuestData: function (res) {
    var that = this
    var data = { 'openid': app.globalData.userInfo.openid }
    app.func.requestPost('/ball/getuserinfo/', data, function (res) {
      console.log(res)
      var avatar = that.data.userInfo.avatarUrl
      that.setData({
        userInfo: res.data.user,
        'userInfo.avatar': avatar
      })
      that.save_userInfo(that.data.userInfo)
    })
  },

  save_userInfo: function (res) {
    var that = this
    var data = {
      "openid": res.openid,
      "nickname": res.nickname,
      "age": res.age,
      "sign": res.sign,
      "gender": res.gender,
      "weight": res.weight,
      "height": res.height,
      "game_age": res.game_age,
      "good_point": res.good_point,
      "phone": res.phone,
      "province": res.province,
      "city": res.city,
      "avatar": res.avatar
    }
    app.func.requestPost('/ball/updateuserinfo/', data, function (res) {
      console.log(res)
      that.setData({
        userInfo: res.data.user
      })
    })
  },

  infos_press: function(e){
    var that = this
    switch (e.currentTarget.dataset.index){
      case 0:
        wx.navigateTo({
          url: '/pages/mine/info/info?item=' + JSON.stringify(that.data.userInfo),
        })
        break;
      case 1:
        wx.navigateTo({
          url: '/pages/mine/invate/invate?item=' + JSON.stringify(that.data.userInfo),
        })
        break;
      case 2:
        wx.navigateTo({
          url: '/pages/mine/command/command?item=' + JSON.stringify(that.data.userInfo),
        })
        break;
      default:
        wx.navigateTo({
          url: '/pages/mine/game_club/game_club',
        })
        break
    }
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