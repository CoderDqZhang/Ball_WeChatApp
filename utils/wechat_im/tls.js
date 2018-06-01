var encrypt = require('encrypt.js');

var sdkappid = 1400098651;
var app = getApp()

function login(opts){
  var openid = app.globalData.userInfo.openid ;
  var data = { 'openid': openid, 'appid': sdkappid}
  app.func.requestPost('/ball/login/tenim/', data, function (res) {
      console.log(res)
      opts.success && opts.success({
        Identifier: openid,
        UserSig: res.data.userSig
      });
  })
}

module.exports = {
    init : function(opts){
        sdkappid = opts.sdkappid;
    },
    login : login
};