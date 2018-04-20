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
    that.setData({
      item: JSON.parse(options.item),
      windowWidth: app.globalData.windowWidth,
      windowHeight: app.globalData.windowHeight
    })
    that.reqeuestData(that.data.item)
  },

  reqeuestData: function (res) {
    var that = this
    var data = { 'game_id': res.id }
    app.func.requestPost('/ball/gameDetail/', data, function (res) {
      that.setData({
        item: res.data.game_detail
      })
      console.log(that.data.item)
    })
  },


  phone_press: function(e){
    var that = this
    wx.makePhoneCall({
      phoneNumber: that.data.item.user.phone,
    })
  },

  location_press: function (e) {
    wx.navigateTo({
      url: '/pages/home/map/map',
    })
  },

  appointment_btn_press: function (e) {
    var that = this
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

  select_number: function (res) {

  },
  
  appointment: function (e) {
    var data = { 'openid': '16601131280', 'game_id': this.data.item.id, 'number_count':1}
    app.func.requestPost('/ball/gameAppointment/', data, function (res) {
      if (res.data.message != null) {
        wx.showToast({
          title: '您已经赴约过了',
          icon: 'success',
          duration: 2000
        })
      }else{
        wx.showToast({
          title: '赴约成功',
          icon: 'success',
          duration: 2000
        })
      }      
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  user_info_press: function (e) {
    var that = this
    var data = that.data.item.user_list[e.currentTarget.dataset.index]
      wx.navigateTo({
        url: '/pages/mine/other/other?item=' + JSON.stringify(data),
      })
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