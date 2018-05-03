// pages/mine/info/info.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{
      nickName:"",
      gender:"",
      weight:0,
      phone:"",
      height:0,
      age:"",
      good:"",
      location:"",
    },
    gender_list:["女","男","其他"],
    weight_list:[],
    height_list:[],
    age_list:[],
    index:0,
    balls_list: [["足球", "棒球", "篮球", "保龄球", "冰球", "乒乓球", "橄榄球", "网球", "排球"], ["中锋", "二前锋", " 边锋", " 前腰", "前卫", "边前卫", "后腰", "边后卫", "中后卫", "清道夫", "门将"]],
    sub_ball_list: [["中锋", "二前锋", " 边锋", " 前腰", "前卫", "边前卫", "后腰", "边后卫", "中后卫", "清道夫", "门将"], ["投手", "捕手", "1垒手", "2垒手", "3垒手", "游击手", "左外野手", "中坚手", "右外野手"], ["控球后卫（PG）", "得分后卫（SG）", "中锋（C）", "小前锋（SF）", "大前锋（PF）"], ["大神", "中级", "初级"], ["守门员", "左后卫", "右后卫", "左前锋", "右前锋", "中锋"], ["大神", "中级", "初级"], ["支柱（1，3号)", "勾球队员（2号）", "锁球队员（4，5号）", "侧翼球员（6，7号）", "八号球员（8号）", "传球前卫（9号）", "接球前卫（10号）", "内侧中卫（12号）", "外侧中卫（13号）", "边卫（11，14号）", "最后卫（15号)"], ["大神", "中级", "初级"], ["二传手", "自由人", "副攻手","主攻手"]]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: JSON.parse(options.item)
    })
    this.normalData()

    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
      }
    })
  },

  normalData: function (e){
    var that = this
    var item_list = []
    for (var i = 30; i < 100; i++) {
      item_list.push(String(i))
    }
    that.setData({
      weight_list: item_list
    })
    item_list = []
    for (var i = 150; i < 200; i++) {
      item_list.push(String(i))
    }
    that.setData({
      height_list: item_list
    })
    item_list = []
    for (var i = 0; i < 20; i++) {
      item_list.push(String(i))
    }
    that.setData({
      age_list: item_list
    })
    console.log("res")
  },

  gender_press: function (e){
    var that = this
    that.setData({
      'userInfo.gender': that.data.gender_list[parseInt(e.detail.value)] == "女" ? "0" : that.data.gender_list[parseInt(e.detail.value)] == "男" ? "1":"2",
    })
    that.save_userInfo(that.data.userInfo)
  },

  weight_press: function (e) {
    var that = this
    that.setData({
      'userInfo.weight': that.data.weight_list[parseInt(e.detail.value)],
    })
    that.save_userInfo(that.data.userInfo)
  },

  height_press: function (e) {
    var that = this
    that.setData({
      'userInfo.height': that.data.height_list[parseInt(e.detail.value)],
    })
    that.save_userInfo(that.data.userInfo)
  },
/**
 * 修改年龄
 */
  age_press: function (e) {
    var that = this
    that.setData({
      'userInfo.age': that.data.age_list[parseInt(e.detail.value)],
    })
    that.save_userInfo(that.data.userInfo)
  },

  bindMultiPickerColumnChange: function (e) {
    var that = this
    if (e.detail.column == 0) {
      var temp_list = that.data.sub_ball_list[e.detail.value]
      that.setData({
        'balls_list[1]': temp_list
      })
    }
    that.save_userInfo(that.data.userInfo)
  },
/**
 * 修改个性签名
 */
  input_sign: function (res) {
    var that = this
    that.setData({
      'userInfo.sign':res.detail.value
    })
  },
/**
 * 修改电话号码
 */
  input_phone: function (res){
    var that = this
    that.setData({
      'userInfo.phone': res.detail.value
    })
  },

  /**
   * 输入框失去焦点直接保存数据
   */
  input_end: function (res) {
    this.save_userInfo(this.data.userInfo)
  },

  good_press: function (e) {
    var that = this
    that.setData({
      'userInfo.good_point': that.data.balls_list[0][e.detail.value[0]] + "  " + that.data.balls_list[1][e.detail.value[1]]
    })
    that.save_userInfo(that.data.userInfo)
  },

  save_userInfo: function(res) {
    var that = this 
    var data = {
      "openid": res.openid,
      "nickname": res.nickname,
      "age": res.age,
      "gender": res.gender,
      "weight": res.weight,
      "height": res.height,
      "game_age": res.game_age,
      "good_point": res.good_point,
      "phone": res.phone,
      "province": res.province,
      "city": res.city,
      "avatar": res.avatar,
      "sign":res.sign
    }
    app.func.requestPost('/ball/updateuserinfo/', data, function (res) {
      console.log(res)
      that.setData({
        userInfo: res.data.user
      })
      var pages = getCurrentPages();
      if (pages.length > 1) {
        //上一个页面实例对象
        var prePage = pages[pages.length - 2];
        //关键在这里
        prePage.changeData(res.data.user)
      }
      app.globalData.userInfo = res.data.user
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