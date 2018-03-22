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
      weight:"",
      phone:"",
      height:"",
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
      userInfo: app.globalData.userInfo,
      'userInfo.age':'10',
      'userInfo.phone': '18363899723',
      'userInfo.weight': '62',
      'userInfo.height': '174',
      'userInfo.good': '前锋',
    })
    this.normalData()
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
  },

  weight_press: function (e) {
    var that = this
    that.setData({
      'userInfo.weight': that.data.weight_list[parseInt(e.detail.value)],
    })
  },

  height_press: function (e) {
    var that = this
    that.setData({
      'userInfo.height': that.data.height_list[parseInt(e.detail.value)],
    })
  },

  age_press: function (e) {
    var that = this
    that.setData({
      'userInfo.age': that.data.age_list[parseInt(e.detail.value)],
    })
  },

  bindMultiPickerColumnChange: function (e) {
    var that = this
    if (e.detail.column == 0) {
      var temp_list = that.data.sub_ball_list[e.detail.value]
      that.setData({
        'balls_list[1]': temp_list
      })
    }
    console.log(e)
  },

  good_press: function (e) {
    console.log(e)
    var that = this
    that.setData({
      'userInfo.good': that.data.balls_list[0][e.detail.value[0]] + "  " + that.data.balls_list[1][e.detail.value[1]]
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