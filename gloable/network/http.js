// var rootDocment = 'https://yq.topveda.cn';//你的域名  
var rootDocment = 'http://127.0.0.1:8000';//你的域名 

import md5 from '../until/md5.js';
// var webim = require('../../../utils/wechat_im/webim.js');
function requestPost(url,data,cb){ 
  data['sign'] = sign(data)
    wx.request({  
      url: rootDocment + url,  
      data: data,  
      method: 'post',  
      header: {'Content-Type': 'application/json'},  
      success: function(res){  
        return typeof cb == "function" && cb(res.data)  
      },  
      fail: function(res){ 
        console.log(res) 
        return typeof cb == "function" && cb(false)  
      }  
    })  
}

function requestGet(url,data,cb){  
  data['sign'] = sign(data)
    wx.request({  
      url: rootDocment + url,  
      data: data,  
      method: 'get',  
      success: function(res){  
        return typeof cb == "function" && cb(res.data)  
      },  
      fail: function(){  
        return typeof cb == "function" && cb(false)  
      }  
    })  
}

function requestUpload(url,data,filePath,fileName,cb){
  data['sign'] = sign(data)
  for (var i=0; i < filePath.length; i ++) {
    wx.uploadFile({
      url: rootDocment + url,
      filePath: filePath[i].path,
      name: fileName,
      formData: data,
      success: function (res) {
        if (i == filePath.length) {
          return typeof cb == "function" && cb(res.data)
        }
      },
      fail: function (res) {
        console.log(res)
        if (i == filePath.length) {
          return typeof cb == "function" && cb(false)
        }
      }
    })
  }
}

module.exports.requestPost = requestPost
module.exports.requestGet = requestGet
module.exports.requestUpload = requestUpload

function sign(data){
  var strs = ''
  for (var index in data) {
    if (index != 'sign'){
      strs = strs + index + data[index]
    }
  }
  console.log(strs)
  "openidowfcA5f3YCeZlTkXamyvq_AVqk6gnicknameDIYage0signgender1weight0height0game_age0good_pointphoneprovinceChinacityChaoyangavatarhttps://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKRBpdVAWaVsKzAvYMFLicbrYuwcs6aiagVibt3aFuQ5GFPpx0fxlowTZSRHicBUqFwlMj3bZOPc3IW5A/132"
  return md5(strs + 'wx8df2ccb21a4fd773')
}