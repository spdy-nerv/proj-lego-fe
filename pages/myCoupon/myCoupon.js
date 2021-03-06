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
    myCouponList:[],
    couponType:'现金抵用券',
    couponDate:'2017年2月30日-6月30日',
    cardId:'',
    code:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 // this.getMyCouponList();
  
  },
  getMyCouponList:function(){
    request({
      url: APIS.GET_RECEIVED_CARD_LIST,
      method:'GET',
      header: {
        auth: wx.getStorageSync('token')
      },
      realSuccess: (res) => {
        console.log(res);
        this.setData({
        "cardId": res.cardId,
        "code": res.code,
        })
        wx.openCard({
          cardList: [
            {
              cardId:res.cardId,
              code:res.code
            }
          ],
          success: function(res) {
          }
        })
      },
      loginCallback:this.getMyCouponList,
      realFail:(res)=>{
        wx.showToast({
          title: res
      });
      }
    }, true, this)
  }, 
 
})