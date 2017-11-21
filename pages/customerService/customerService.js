// pages/customerService/customerService.js
var { APIS } = require('../../const.js');
var { request } = require('../../libs/request');
var user = require('../../libs/user');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.getServiceInfo();
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
  
  },
  getServiceInfo:function(){
    var that = this;
    request({
      url:APIS.GET_OPTION+'CUSTOMER_SERVICE_DESCRIPTION',
      method: 'GET',
      realSuccess: function (res) {
       console.log(res.optionValue);
       that.setData({
        getServiceInfo:res.optionValue
       })
    
      },
      realFail: function (msg) {
        wx.showToast({
          title:msg
        })
      }
    },false,this);
  }
})