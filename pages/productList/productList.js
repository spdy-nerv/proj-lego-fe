// pages/productDetail/productDetail.js
const { APIS } = require('../../const');
const { request } = require('../../libs/request');
const util = require('../../utils/util');
const user = require('../../libs/user');
Page({

  /**
   * 页面的初始数据
   */
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSeckillSkuList();
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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