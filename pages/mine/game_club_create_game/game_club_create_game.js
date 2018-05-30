// pages/home/create_game/create_game.js
var qqmapsdk;

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    game_list: [],
    normal_game_list: [],
    game_referee: ["是", "否"],
    game_number: ["3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22"],
    game: {
      "ball_id": null,
      "game_title": null,
      "game_subtitle": null,
      'openid': null,
      "game_location": '',
      "game_location_detail": null,
      "game_price": 0,
      "game_end_date_time": '',
      "game_start_date_time": '',
      "game_start_time": '',
      "game_end_time": '',
      "game_referee": '',
      "game_number": '3',
      'lat': '1',
      'lng': '1',
      "game_place_condition": '',
      "number": 1
    },
    game_name: "",
    windowWidth: 0,
    windowHeight: 0,
    game_club:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this
    that.setData({
      game_club: JSON.parse(options.item)
    })
    this.requestGame()
    that.setData({
      windowWidth: app.globalData.windowWidth,
      windowHeight: app.globalData.windowHeight
    })

    qqmapsdk = new app.globalData.map({
      key: 'ERCBZ-NKZKJ-W7YFI-KY4SB-62JEV-O4FSB'
    });
  },

  appointment_btn_press: function (res) {
    var that = this;
    if (Date.parse((that.data.game.game_start_date_time + " " + that.data.game.game_start_time).replace(/-/g, '/')) / 1000 > Date.parse((that.data.game.game_end_date_time + " " + that.data.game.game_end_time).replace(/-/g, '/')) / 1000) {
      wx.showModal({
        title: '结束时间必须大于开始时间',
        content: "",
      })
      return
    }
    var data = {
      'openid': app.globalData.userInfo.openid,
      'ball_id': that.data.game.ball_id,
      'game_title': that.data.game.game_title,
      'game_subtitle': that.data.game.game_subtitle,
      'ball_id': that.data.game.ball_id,
      'game_location': that.data.game.game_location,
      'game_location_detail': that.data.game.game_location_detail,
      'game_price': that.data.game.game_price,
      'game_start_time': Date.parse((that.data.game.game_start_date_time + " " + that.data.game.game_start_time).replace(/-/g, '/')) / 1000,
      'game_end_time': Date.parse((that.data.game.game_end_date_time + " " + that.data.game.game_end_time).replace(/-/g, '/')) / 1000,
      'game_referee': that.data.game.game_referee == '是' ? 1 : 0,
      'game_number': that.data.game.game_number,
      'game_place_condition': that.data.game.game_place_condition,
      'lat': that.data.game.lat,
      'lng': that.data.game.lng,
      'number': 1
    }

    app.func.requestPost('/ball/gamecreate/', data, function (res) {
      console.log(res)
      if (res.msg.errors != null) {
        wx.showModal({
          title: res.msg.errors[0].error,
          content: "",
        })
      } else {
        that.senderBallInvete(res.msg.game)
      }
    })
  },

  senderBallInvete: function (res){
    var that = this
    var data = { 'openid': app.globalData.userInfo.openid, 'game_id': res.id, 'club_id': that.data.game_club.id, 'message_type': 3 }
    app.func.requestPost('/ball/gamesendgameinvate/', data, function (res) {
      console.log(res)
      wx.showToast({
        title: res.data.message,
      })
      wx.navigateBack({
        delta: 2
      })
    })
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

  game_type_press: function (e) {
    var that = this
    that.setData({
      'game.ball_id': that.data.normal_game_list[parseInt(e.detail.value)].id,
      'game_name': that.data.game_list[parseInt(e.detail.value)]
    })
  },

  input_game_subtitle: function (e) {
    this.setData({
      'game.game_subtitle': e.detail.value
    })
  },

  input_game_title: function (e) {
    this.setData({
      'game.game_title': e.detail.value
    })
  },

  input_place_condition: function (e) {
    this.setData({
      'game.game_place_condition': e.detail.value
    })
  },

  input_detail_location: function (e) {
    this.setData({
      'game.game_location_detail': e.detail.value
    })

  },

  input_price: function (e) {
    this.setData({
      'game.game_price': e.detail.value
    })
  },

  choose_location: function (res) {
    var that = this
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          'game.game_location': res.address
        })
        // 调用接口
        qqmapsdk.geocoder({
          address: res.address,
          success: function (res) {
            console.log(res);
            that.setData({
              'game.lat': res.result.location.lat,
              'game.lng': res.result.location.lng
            })
          },
          fail: function (res) {
            console.log(res);
          },
          complete: function (res) {
            console.log(res);
          }
        })
      },
    })

  },


  game_referee_press: function (e) {
    var that = this
    that.setData({
      'game.game_referee': that.data.game_referee[parseInt(e.detail.value)],
    })
  },

  date_start_date_press: function (e) {
    var that = this
    that.setData({
      'game.game_start_date_time': e.detail.value,
      'game.game_end_date_time': e.detail.value,
    })
  },

  date_start_time_press: function (e) {
    var that = this
    that.setData({
      'game.game_start_time': e.detail.value,
    })
  },

  game_end_date_time_press: function (e) {
    var that = this
    that.setData({
      'game.game_end_date_time': e.detail.value,
    })
  },

  game_end_time_press: function (e) {
    var that = this
    that.setData({
      'game.game_end_time': e.detail.value,
    })
  },

  game_number_press: function (e) {
    var that = this
    that.setData({
      'game.game_number': that.data.game_number[parseInt(e.detail.value)],
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