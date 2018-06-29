var { monthFormatList, dayFormatList, APIS } = require('../../const');
var util = require('../../utils/util');
var user = require('../../libs/user');
var { request } = require('../../libs/request');
var app = getApp();
Page({
  data: {
    nickName:'',
    avatarUrl:'',
    buttonText:'点击授权'
  },

  onLoad: function (options) {
  
  },
  getUser(e){
    wx.showLoading({
      title: '登录中',
    })
    var that =this;
    this.setData({
      buttonTextL:'登录中'
    })
    wx.setStorageSync('userInfo', e.detail.userInfo);
     wx.login({
       success:(res)=>{
        if(res.code){
          var code = res.code;
          wx.getUserInfo({
            success: function (res) {
              console.log(res);
              var d = {
                code: code,
                user_raw: res.userInfo,
                signature: res.signature,
                encryptedData: res.encryptedData,
                iv: res.iv,
                clientType:'user'
              }
              that.doAppLogin(d);
            }
          });
        }else{
          wx.showToast({
            title: '登录失败',
          })
        }
       },fail:(res)=>{
          wx.showToast({
            title: '登录失败',
          })
       }
     })
   
  },

  // app的登录
  doAppLogin(data, cb, ctx) {
    var that = this;
  wx.request({
      url: APIS.LOGIN,
      header: { Authorization: wx.getStorageSync('Authorization') },
      data: data,
      method: 'POST',
      success: function (res) {
        console.log(res);
        var d = res.data;
        if (d.code == 'SUCCESS' && d.data) {
          var token = d.data.token;
          wx.setStorageSync('token', token);
          that.setData({
            nickName: wx.getStorageSync('userInfo').nickName,
            avatarUrl: wx.getStorageSync('userInfo').avatarUrl,
            buttonText: '授权成功',
            disabled:true
          })
          // let pages = getCurrentPages();
          // let currPage = pages[pages.length - 1];
          // let prevPage = pages[pages.length - 2];
          // wx.navigateBack({
          //   delta: 1
          // })
         
          // prevPage.onShow();
          wx.hideLoading();
          typeof cb == "function" && cb.call(ctx);
        } else if (d.code == 'WECHAT_USER_STATUS_ERR') {
          wx.showToast({ title: '用户登陆异常！', icon: 'loading', duration: 2000 })
          return;
        } else {
          wx.showToast({
            title: '登录失败！' + d.resultMsg
          });
        }
       
      },
      fail: function (res) {
        // fail
        wx.showToast({
          title: '登录失败！'
        });
      }
    })
  }

})