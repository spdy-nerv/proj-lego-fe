var user = require('./user');
var app = getApp();
/**
 * 对wx.request进行二次封装，统一处理登录、跳转、错误提示等问题
 * obj
 *  url
 *  data
 *  method
 *  realSuccess(resultData)
 *  loginCallback()
 *  realFail(toastMsg)
 * needLogin 接口是否需要登录认证，默认为true
 * ctx 回调函数上下文
 */
function request(obj, needLogin = true, ctx) {
  const header = {
    "x-client-tag": "v1.2",
    "x-canary": "FORCE"
  }
  obj.header = Object.assign(header, obj.header || {})

  obj.success = function (res) {
    var d = res.data;
    if (d.success || d.code == 'success') {
      typeof obj.realSuccess == "function" && obj.realSuccess(d.data);
    } else if (needLogin && (d.code == 'CM_SESSION_EXPIREATION' || d.code == 'CM_ERROR_TOKEN')) {
      user.login(obj.loginCallback, ctx);
    }
    else {
      if (needLogin && (d.code == 'ACT_TOKEN_FAILURE' || d.code == 'CM_NOT_LOGIN' || d.code == 'CLIENT_ACCESS_TOKEN_NOT_FOUND')) {
        wx.hideLoading();
        if (app.globalData.isLoginIng == true)
          return;
        app.globalData.isLoginIng = true;
        wx.removeStorageSync('userInfo');
        wx.removeStorageSync('token');
        wx.showModal({
          title: '提示',
          content: '请先登录！',
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../authorizedLogin/authorizedLogin',
              })
              app.globalData.isLoginIng = false
              return;
            } else if (res.cancel) {
              app.globalData.isLoginIng = false
            }
          }, complete: function () {
            app.globalData.isLoginIng = false
          }
        })

        // user.login(obj.loginCallback, ctx);

      } else {
        typeof obj.realFail == "function" && obj.realFail(d.message || '', d.code);
      }
    }
  };
  obj.fail = function (res) {
    typeof obj.realFail == "function" && obj.realFail(res.errMsg);
  };
  wx.request(obj);
}

module.exports = {
  request: request
};