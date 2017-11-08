// pages/productDetail/productDetail.js
const { APIS } = require('../../const');
const { request } = require('../../libs/request');
const util = require('../../utils/util');
const user = require('../../libs/user');
Page({
  data: {
    pictureUrls: [],
    name: '',
    description: '',
    seckillStartTime: 0,
    seckillEndTime: 0,
    serverTime: 0,
    price: 0,
    format: '',
    leftStock: 0,
    isStartToSell: false,       // 是否已经开启支付
    hasSignUp: false,
    goodsList:[]           // 当前用户是否已经登记报名
  },
  onLoad: function (options) {
    this.getSeckillSkuList();
  },
  onReady: function () {
  },
 getSeckillSkuList:function(){
  request({
    url: APIS.GET_SECKILLSKU_LIST,
    method:'GET',
    realSuccess: (res) => {
      console.log(res);
      this.setData({
      goodsList:res
      })
    },realFail:(res)=>{
      wx.showToast({
        title: res.message
    });
    }
  }, false, this)

 },
  toProductDetail:function(){
    wx.navigateTo({
      url:'../productDetail/productDetail'
    })
  }
})