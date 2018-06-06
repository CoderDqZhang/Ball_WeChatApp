// chat.js
let toast = require('../../../gloable/until/toast.js');
let chatInput = require('../../../modules/chat-input/chat-input');

//获取应用实例
var webim = require('../../../utils/wechat_im/webim.js');
var webimhandler = require('../../../utils/wechat_im/webim_handler.js');
var tls = require('../../../utils/wechat_im/tls.js');

var Config = {
  sdkappid: 1400098651
  , accountType: 28158
  , accountMode: 0 //帐号模式，0-表示独立模式，1-表示托管模式
};

tls.init({
  sdkappid: Config.sdkappid
})
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    friendHeadUrl: '',
    textMessage: '',
    chatItems: [],
    scrollTopTimeStamp: 0,
    motto: 'Hello World',
    userInfo: {},
    msgs: [],
    Identifier: null,
    UserSig: null,
    msgContent: "",
    windowWidth: 0,
    windowHeight: 0,
    chatInfo:null,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData();
    var that = this;
    that.setData({
      chatInfo: JSON.parse(options.item),
      windowWidth: app.globalData.windowWidth,
      windowHeight: app.globalData.windowHeight,
    })
    that.login(function () {
      that.initIM(app.globalData.userInfo);
    });
    that.requestMessage()
  },

  requestMessage:function(){
    // {
    //   "GroupId": "@TGS#15ERQPAER",    //拉取消息的群ID
    //     "ReqMsgNumber": 2      //需要拉取的消息条数
    // }
  },

  /**
   * 创建IM输入框
   */
  initData: function () {
    let that = this;
    let systemInfo = wx.getSystemInfoSync();
    chatInput.init(this, {
      systemInfo: systemInfo,
      minVoiceTime: 1,
      maxVoiceTime: 60,
      startTimeDown: 56,
      extraArr: [{
        picName: 'choose_picture',
        description: '照片'
      }, {
        picName: 'take_photos',
        description: '拍摄'
      }, {
        picName: 'close_chat',
        description: '自定义功能'
      }],
      // tabbarHeigth: 48
    });

    that.setData({
      pageHeight: systemInfo.windowHeight,
    });
    wx.setNavigationBarTitle({
      title: '群聊'
    });
    that.textButton();
    that.extraButton();
    that.voiceButton();
  },
  /**
   * 得到消息文本
   */
  textButton: function () {
    var that = this
    chatInput.setTextMessageListener(function (e) {
      let content = e.detail.value;
      that.bindConfirm(e)
    });
  },
  /**
   * 得到录音文本
   */
  voiceButton: function () {
    chatInput.recordVoiceListener(function (res, duration) {
      let tempFilePath = res.tempFilePath;
      let vDuration = duration;
      console.log(tempFilePath, vDuration);
    });
    chatInput.setVoiceRecordStatusListener(function (status) {
      switch (status) {
        case chatInput.VRStatus.START://开始录音

          break;
        case chatInput.VRStatus.SUCCESS://录音成功

          break;
        case chatInput.VRStatus.CANCEL://取消录音

          break;
        case chatInput.VRStatus.SHORT://录音时长太短

          break;
        case chatInput.VRStatus.UNAUTH://未授权录音功能

          break;
        case chatInput.VRStatus.FAIL://录音失败(已经授权了)

          break;
      }
    })
  },
  extraButton: function () {
    let that = this;
    chatInput.clickExtraListener(function (e) {
      console.log(e);
      let itemIndex = parseInt(e.currentTarget.dataset.index);
      if (itemIndex === 2) {
        that.myFun();
        return;
      }
      wx.chooseImage({
        count: 9, // 默认9
        sizeType: ['compressed'],
        sourceType: itemIndex === 0 ? ['album'] : ['camera'],
        success: function (res) {
          let tempFilePath = res.tempFilePaths[0];
        }
      });
    });
  },
  myFun: function () {
    wx.showModal({
      title: '小贴士',
      content: '这是用于拓展的自定义功能！',
      confirmText: '确认',
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          toast.show('success', '自定义功能')
        }
      }
    })
  },

/**
 * 关闭输入框
 */
  resetInputStatus: function () {
    chatInput.closeExtraView();
  },

  chatInputSendTextMessage:function (){

  },

  /** 
   * 创建IM
  */
  initIM: function (userInfo) {
    var that = this;
    var avChatRoomId = that.data.chatInfo.room;
    webimhandler.init({
      accountMode: Config.accountMode
      , accountType: Config.accountType
      , sdkAppID: Config.sdkappid
      , avChatRoomId: avChatRoomId 
      //默认房间群ID，群类型必须是直播聊天室（AVChatRoom），这个为官方测试ID(托管模式)
      , selType: webim.SESSION_TYPE.GROUP
      , selToID: avChatRoomId
      , selSess: null //当前聊天会话
    });
    // webimhandler.applyJoinBigGroup(avChatRoomId)
    //当前用户身份
    var loginInfo = {
      'sdkAppID': Config.sdkappid, //用户所属应用id,必填
      'appIDAt3rd': Config.sdkappid, //用户所属应用id，必填
      'accountType': Config.accountType, //用户所属应用帐号类型，必填
      'identifier': that.data.Identifier, //当前用户ID,必须是否字符串类型，选填
      'identifierNick': app.globalData.userInfo.nickname, //当前用户昵称，选填
      'userSig': that.data.UserSig, //当前用户身份凭证，必须是字符串类型，选填
    };

    //监听（多终端同步）群系统消息方法，方法都定义在demo_group_notice.js文件中
    var onGroupSystemNotifys = {
      "5": webimhandler.onDestoryGroupNotify, //群被解散(全员接收)
      "11": webimhandler.onRevokeGroupNotify, //群已被回收(全员接收)
      "255": webimhandler.onCustomGroupNotify//用户自定义通知(默认全员接收)
    };

    //监听连接状态回调变化事件
    var onConnNotify = function (resp) {
      switch (resp.ErrorCode) {
        case webim.CONNECTION_STATUS.ON:
          //webim.Log.warn('连接状态正常...');
          break;
        case webim.CONNECTION_STATUS.OFF:
          webim.Log.warn('连接已断开，无法收到新消息，请检查下你的网络是否正常');
          break;
        default:
          webim.Log.error('未知连接状态,status=' + resp.ErrorCode);
          break;
      }
    };


    //监听事件
    var listeners = {
      "onConnNotify": webimhandler.onConnNotify, //选填
      "onBigGroupMsgNotify": function (msg) {
        webimhandler.onBigGroupMsgNotify(msg, function (msgs) {
          that.receiveMsgs(msgs);
        })
      }, //监听新消息(大群)事件，必填
      "onMsgNotify": webimhandler.onMsgNotify,//监听新消息(私聊(包括普通消息和全员推送消息)，普通群(非直播聊天室)消息)事件，必填
      "onGroupSystemNotifys": webimhandler.onGroupSystemNotifys, //监听（多终端同步）群系统消息事件，必填
      "onGroupInfoChangeNotify": webimhandler.onGroupInfoChangeNotify//监听群资料变化事件，选填
    };

    //其他对象，选填
    var options = {
      'isAccessFormalEnv': true,//是否访问正式环境，默认访问正式，选填
      'isLogOn': false//是否开启控制台打印日志,默认开启，选填
    };

    if (Config.accountMode == 1) {//托管模式
      webimhandler.sdkLogin(loginInfo, listeners, options, avChatRoomId);
    } else {//独立模式
      //sdk登录
      webimhandler.sdkLogin(loginInfo, listeners, options, avChatRoomId);
    }
  },

  login: function (cb) {
    var that = this;
    tls.login({
      success: function (data) {
        that.setData({
          Identifier: data.Identifier,
          UserSig: data.UserSig
        })
        cb();
      }
    });
  },


  receiveMsgs: function (data) {
    var chatItems = this.data.chatItems || [];
    chatItems.push(data);

    this.setData({
      chatItems: chatItems
    })
  },

  bindConfirm: function (e) {
    var that = this;
    var content = e.detail.value;
    if (!content.replace(/^\s*|\s*$/g, '')) return;
    webimhandler.onSendMsg(content, function () {
      that.clearInput();
    })
  },

  onUnload: function (e){
    webimhandler.quitBigGroup()

  }


});