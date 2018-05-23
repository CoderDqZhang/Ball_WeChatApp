// pages/home/detail/detail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowWidth: 0,
    windowHeight: 0,
    item:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    that.setData({
      item: JSON.parse(options.item),
      windowWidth: app.globalData.windowWidth,
      windowHeight: app.globalData.windowHeight
    })
    that.reqeuestData(that.data.item)
  },
/**
 * 详情
 */
  reqeuestData: function (res) {
    var that = this
    var data = { 'game_id': res.id, 'openid': app.globalData.userInfo.openid, }
    app.func.requestPost('/ball/gamedetail/', data, function (res) {
      console.log(res)
      console.log(res.data.game_detail.user_list.length)
      if (res.data.game_detail.user_list.length < 2 && res.data.game_detail.user.openid == app.globalData.userInfo.openid) {
        res.data.game_detail.candelete = true
      }else{
        res.data.game_detail.candelete = false
      }
      that.setData({
        item: res.data.game_detail
      })
      console.log(that.data.item)
    })
  },


/**
 * 拨打电话
 */
  phone_press: function(e){
    var that = this
    wx.makePhoneCall({
      phoneNumber: that.data.item.user.phone,
    })
  },
/**
 * 地图
 */
  location_press: function (e) {
    var that = this
    if (this.data.item.game_latitude == null) {
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          var latitude = res.latitude
          var longitude = res.longitude
          wx.openLocation({
            latitude: latitude,
            longitude: longitude,
          })
        }
      })
    }else{
      wx.openLocation({
        latitude: that.data.item.game_latitude,
        longitude: that.data.item.game_longitude,
      })
    }
    
    // wx.navigateTo({
    //   url: '/pages/home/map/map',
    // })
  },
  /**
 * 修改个人信息后更新数据
 */
  changeData: function (data) {
    this.setData({
      'app.globalData.userInfo': data
    })
  },

/**
 * 删除球约
 */
  time_delete_press: function (e) {
    var that = this
    wx.showModal({
      title: '确定删除球约么？',
      showCancel: true,
      confirmColor: "#4bd4c5",
      success: function (e) {
        var data = { 'game_id': that.data.item.id, 'openid': app.globalData.userInfo.openid, }
        app.func.requestPost('/ball/gamedelete/', data, function (res) {
          console.log(res)
          if (res.msg != null) {
            wx.showToast({
              title: '删除失败',
            })
          }else{
            wx.showToast({
              title: '删除成功',
            })
            var pages = getCurrentPages();
            if (pages.length > 1) {
              //上一个页面实例对象
              var prePage = pages[pages.length - 2];
              //关键在这里
              prePage.updataGame({'id':that.data.item.ball.id})
            }
            wx.navigateBack({
              delta: 1
            })

          }
        })
      }
    })
    
  },

/***
 * 赴约
 */
  appointment_btn_press: function (e) {
    var that = this
    if (app.globalData.userInfo.phone == '') {
      wx.showModal({
        title: '请您完善个人信息',
        showCancel: true,
        confirmColor: "#4bd4c5",
        success: function (e) {
          wx.navigateTo({
            url: '/pages/mine/info/info?item=' + JSON.stringify(app.globalData.userInfo),
          })
        }
      })
      return
    }

    var number_count = 0
    for (var i = 0; i < that.data.item.user_list.length; i ++) {
      number_count = number_count + parseInt(that.data.item.user_list[i].number_count.number)
    }
    if (number_count < that.data.item.game_number){
      wx.showModal({
        title: '现在人数' + number_count + '个差' + (that.data.item.game_number - number_count) + '个，确定赴约吗？',
        showCancel: true,
        confirmColor: "#4bd4c5",
        success: function (e) {
          if (e.confirm) {
            wx.requestPayment({
              timeStamp: '',
              nonceStr: '',
              package: '',
              signType: '',
              paySign: '',
            })
            that.appointment()
          } else {

          }
        }
      })
    }else{
      wx.showModal({
        title: '赴约人数已满',
        showCancel: true,
        confirmColor: "#4bd4c5",
        success: function (e) {
          if (e.confirm) {
            wx.requestPayment({
              timeStamp: '',
              nonceStr: '',
              package: '',
              signType: '',
              paySign: '',
            })
          } else {

          }
        }
      })
    }
  },

/**
 * 取消赴约
 */
  appointment_cancel_press: function (res) {
    var that = this
    wx.showModal({
      title: '确定取消赴约吗？',
      showCancel: true,
      confirmColor: "#4bd4c5",
      success: function (e) {
        that.cancel_appointment()
      }
    })
  },

/**
 * 取消赴约
 */
  cancel_appointment: function (e) {
    var that = this
    var data = { 'openid': app.globalData.userInfo.openid, 'game_id': this.data.item.id}
    app.func.requestPost('/ball/gamecancelappoinment/', data, function (res) {
      console.log(res)
      that.setData({
        item: res.data.game_detail
      })
    })
  },
/**
 * 选择赴约人数
 */
  select_number: function (res) {

  },
/**
 * 赴约
 */
  appointment: function (e) {
    var that = this
    var data = { 'openid': app.globalData.userInfo.openid, 'game_id': this.data.item.id, 'number_count':1}
    app.func.requestPost('/ball/gameappointment/', data, function (res) {
      console.log(res)
      if (res.data.message != null) {
        wx.showToast({
          title: '您已经赴约过了',
          icon: 'success',
          duration: 2000
        })
      }else{
        that.setData({
          item: res.data.game_detail
        })
        wx.showToast({
          title: '赴约成功',
          icon: 'success',
          duration: 2000
        })
      }      
    })
  },

  go_home: function (res) {
    wx.switchTab({
      url: '/pages/home/home/home',
    })
   
  },

  time_cancel_press: function (res) {
    wx.showToast({
      title: '已经过期没法赴约',
      icon: 'faile',
      duration: 2000
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  user_info_press: function (e) {
    var that = this
    var data = that.data.item.user_list[e.currentTarget.dataset.index].user
      wx.navigateTo({
        url: '/pages/mine/other/other?item=' + JSON.stringify(data),
      })
  },

  user_info_tap: function (res) {
    var that = this
    var data = that.data.item.user
    if (that.data.item.user.openid == app.globalData.userInfo.openid) {
      wx.navigateTo({
        url: '/pages/mine/info/info?item=' + JSON.stringify(that.data.item.user),
      })
    }else{
      wx.navigateTo({
        url: '/pages/mine/other/other?item=' + JSON.stringify(data),
      })
    }
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
    var that = this
    return {
      title: that.data.item.game_title,
      path: '/pages/home/detail/detail?item=' + that.options.item,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})