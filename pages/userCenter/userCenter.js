// pages/userCenter/userCenter.js
const { APIS } = require('../../const');
const { request } = require('../../libs/request');
const util = require('../../utils/util');
const user = require('../../libs/user');
Page({
  data: {
    star: 0,
    notice: {
      text: '',
      link: ''
    },
    revieceCardList: [],
    myCouponList: [],
    cardOrderList: [],
    productOrderList: [],
    nickName:'',
    avatarUrl:'',
    personCenterBg:'../../images/personCenterBg.png',
    couponType:'现金抵用券',
    couponDate:'2017年2月30日-6月30日',
    giftCardType:'伦敦巴士礼品卡',
    receivepeople:'',
    price:'199'
  },
  onLoad: function (options) {
    user.login(this.getOrderList,true,this);
    this.getMyCouponList();
    const userInfo = wx.getStorageSync('userInfo');
    this.setData({
      nickName:userInfo.nickName,
      avatarUrl:userInfo.avatarUrl
    })
  },
  getOrderList:function(){
    wx.showLoading({
      title:'数据加载中'
    })
    request({
      url: APIS.GET_ORDER_LIST,
      method:'GET',
      header: {
        auth: wx.getStorageSync('token')
      },
      data: {
        pageSize:'10',
        pageNum:'1'
      },
      realSuccess: (res) => {
        if(res.list){
          wx.hideLoading();
        }
        console.log(res.list);
        this.setData({
          myCouponList:res.list
        })
      },realFail:(res)=>{
        wx.showToast({
          title: res.message
      });
      }
    }, true, this)
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
  }

})