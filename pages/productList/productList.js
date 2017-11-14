// pages/productDetail/productDetail.js
const { APIS } = require('../../const');
const { request } = require('../../libs/request');
const util = require('../../utils/util');
const user = require('../../libs/user');
const WxNotificationCenter = require('../../libs/WxNotificationCenter.js')
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
    goodsList:[],
    productId:''           // 当前用户是否已经登记报名
  },
  onLoad: function (options) {
    var that = this
    WxNotificationCenter.addNotification('NotificationName', that.didNotification, that)
    that.getSeckillSkuList();
  },
  onUnload: function () {
    var that = this
    WxNotificationCenter.removeNotification('NotificationName', that)
  },
  //通知处理
  didNotification: function (info) {
    this.setData({
      productId: info.productId
    })
    if(this.data.productId){
      this.getSeckillSkuList();
    }
  },
  onReady: function () {
  },
 getSeckillSkuList:function(){
  request({
    url: APIS.GET_SECKILLSKU_LIST,
    method:'GET',
    header: {
      auth: wx.getStorageSync('token')
    },
    realSuccess: (res) => {
      console.log(res);
      this.setData({
      goodsList:res
      })
    },
    loginCallback: this.getSeckillSkuList,
    realFail:(res)=>{
      wx.showToast({
        title: res
    });
    }
  }, true, this)

 }
})