// var rootDocment = 'https://yq.topveda.cn';//你的域名  
var rootDocment = 'http://127.0.0.1:8000';//你的域名 
function requestPost(url,data,cb){ 
  console.log(url,data) 
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