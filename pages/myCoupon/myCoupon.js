// pages/myCoupon/myCoupon.js
const { APIS } = require('../../const');
const { request } = require('../../libs/request');
const util = require('../../utils/util');
const user = require('../../libs/user');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myCouponList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyCouponList();
  
  },
  getMyCouponList:function(){
    request({
      url: APIS.GET_MY_COUPON_LIST,
      method:'GET',
      header: {
        auth: wx.getStorageSync('token')
      },
      realSuccess: (res) => {
        console.log(res);
        this.setData({
          myCouponList:res.data
        })
      },realFail:(res)=>{
        wx.showToast({
          title: res.message
      });
      }
    }, true, this)
  }, 
})