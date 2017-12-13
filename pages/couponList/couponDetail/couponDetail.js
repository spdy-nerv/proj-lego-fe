// pages/couponDetail/couponDetail.js
var { APIS } = require('../../const.js');
var { request } = require('../../libs/request');
var user = require('../../libs/user');
Page({
  data: {
  
  },
  onLoad: function (options) {
  
  },
  onShow: function () {
  
  },
  getWxCardList(){ //获取优惠券详情
    request({
      url:APIS,
      method: 'GET',
      realSuccess: function (res) {
      },
      realFail: function () {
      }
    },true,this);

  },
  onPullDownRefresh: function () {
  
  },
  onReachBottom: function () {
  
  },
  onShareAppMessage: function () {
  
  }
})