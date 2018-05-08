//app.js
var http = require('gloable/network/http.js');
var address = require('gloable/until/city.js')

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.globalData.windowWidth = res.windowWidth
        that.globalData.windowHeight = res.windowHeight
      }
    })
    wx.setStorageSync('logs', logs)

    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        that.globalData.locationInfo = res
      }
    })
    // 登录
    wx.login({
      success: res => {
        console.log(res)
        wx.getUserInfo({
          success:function(ress){
            console.log(ress)
            var data = { 
              'code': res.code,
              'avatar':ress.userInfo.avatarUrl,
              'gender':ress.userInfo.gender,
              'nickname':ress.userInfo.nickName,
              'city':ress.userInfo.city,
              'province': ress.userInfo.province
               }
               console.log(data)

            http.requestPost('/ball/wechatlogin/', data, function (res) {
              console.log(res)
                if (res != false) {
                  that.globalData.userInfo = res.data.user
                }
            })
          }
        })
        
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    windowWidth:null,
    windowHeight:null,
    locationInfo:null,
    gameStars: [
      '/images/gloable/star_normal.png',
      '/images/gloable/star_normal.png',
      '/images/gloable/star_normal.png',
      '/images/gloable/star_normal.png',
      '/images/gloable/star_normal.png'
    ],
    userStars: [
      '/images/gloable/star_normal.png',
      '/images/gloable/star_normal.png',
      '/images/gloable/star_normal.png',
      '/images/gloable/star_normal.png',
      '/images/gloable/star_normal.png'
    ],
  },

  func: {
    requestPost: http.requestPost,
    requestUpload: http.requestUpload,
    requestGet: http.requestGet,
    requestPut: http.requestPut,
    requestDelete: http.requestDelete,
    requestSessionIDGet: http.requestSessionIDGet
  },

  city_data:{
    provinces: address.provinces,
    citys: address.citys,
    areas: address.areas,
  }

  
})