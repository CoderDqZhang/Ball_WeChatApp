// pages/home/create_game/create_game.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    game_list:[],
    normal_game_list: [],
    game_referee:["是","否"],
    game_number: ["3", "4", "5", "6", "7", "8","9","10","11","12","13","14","15","16","17","18","19","20"],
    game:{
      "ball_id":0,
      "game_title": '',
      "game_subtitle": '',
      'openid':"",
      "game_location":"",
      "game_location_detail":"",
      "game_price":'',
      "game_end_date_time":'',
      "game_start_date_time":'',
      "game_start_time":'',
      "game_end_time":'',
      "game_referee":'',
      "game_number":'3',
      "game_place_condition":'',
      "number":1
    },
    game_name:"",
    windowWidth:0,
    windowHeight:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.requestGame()
    that.setData({
      windowWidth: app.globalData.windowWidth,
      windowHeight: app.globalData.windowHeight
    })
  },

  appointment_btn_press: function (res){
    var that = this; 
    console.log((that.data.game.game_start_date_time + " " + that.data.game.game_start_time).replace(/-/g, '/')) 
    var data = {
      'openid': app.globalData.userInfo.openid,
      'ball_id':that.data.game.ball_id,
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
      'number':1
    }
    console.log(data)
    app.func.requestPost('/ball/gamecreate/', data, function(res) {
        console.log(res)
        wx.navigateBack({
          delta: 2
        })
    })
  },

  requestGame:function (res){
    var that = this;
    app.func.requestGet('/ball/balllist/', {}, function (res) {
      for (var i = 0; i < res.data.length; i++) {
        var urls = res.data[i].image
        res.data[i].image = urls
      }
      var tempList = []
      for (var i=0; i < res.data.length; i ++) {
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
      'game.ball_id': that.data.normal_game_list[parseInt(e.detail.value)] .id,
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
      success: function(res) {
        that.setData({
          'game.game_location': res.address
        })
      },
    })
  },

  input_place_condition: function (e) {
    this.setData({
      'game.game_place_condition': e.detail.value
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
    })
  },

  date_start_time_press:function(e){
    var that = this
    that.setData({
      'game.game_start_time': e.detail.value,
    })
  },

  game_end_date_time_press:function (e){
    var that = this
    that.setData({
      'game.game_end_date_time': e.detail.value,
    })
  },

  game_end_time_press:function(e){
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

  location_press: function (e) {
    // wx.navigateTo({
    //   url: '/pages/home/location_choose/location_choose',
    // })
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