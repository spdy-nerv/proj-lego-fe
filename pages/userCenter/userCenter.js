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
    personCenterBg:'../../images/personCenterBg.png',
    headImg:'../../images/homeTopLogo.png',
    name:'LeGo Toys',
    couponType:'现金抵用券',
    couponDate:'2017年2月30日-6月30日',
    giftCardType:'伦敦巴士礼品卡',
    receivepeople:'王大胖已领取',
    price:'199'
  },
  onLoad: function (options) {
    this.getOrderList();
  
  },
  getOrderList:()=>{
    request({
      url: APIS.GET_ORDER_LIST,
      header: {
        auth: wx.getStorageSync('token')
      },
      data: {},
      method: 'POST',
      realSuccess: (res) => {
        console.log(res.data);
      }
    }, true, this)
  }

})