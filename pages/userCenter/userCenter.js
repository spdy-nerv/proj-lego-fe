// pages/userCenter/userCenter.js
const { APIS } = require('../../const');
const { request } = require('../../libs/request');
const util = require('../../utils/util');
const user = require('../../libs/user');
const app = getApp();
Page({
  data: {
    star: 0,
    notice: {
      text: '',
      link: ''
    },
    revieceCardList: [],
    myCouponList: [1],
    cardOrderList: [],
    productOrderList: [],
    nickName:'',
    avatarUrl:'',
    personCenterBg:'../../images/personCenterBg.png',
    giftCardType:'伦敦巴士礼品卡',
    receivepeople:'',
    price:'199',
    pageNum:1,
    pageSize:6,
    hasMore: true,
    contentlist: []
  },
  onLoad: function (options) {
    const userInfo = app.globalData.userInfo;
    console.log(userInfo)
     this.setData({
      nickName:userInfo.nickName,
      avatarUrl:userInfo.avatarUrl
    })
  },
  getOrderList: function(){
    var that = this;
    request({
      url: APIS.GET_ORDER_LIST,
      method:'GET',
      header: {
        auth: wx.getStorageSync('token')
      },
      data: {
        pageSize:that.data.pageSize,
        pageNum:that.data.pageNum
      },
      realSuccess: (res) => {
        console.log(res.list);
        var orderListItem = that.data.productOrderList;
        var productOrderList = res.list;
        if(productOrderList.length<that.data.pageSize){
          that.setData({
            productOrderList:orderListItem.concat(productOrderList),
            hasMore:false,
          })
        }else{
          that.setData({
            productOrderList:orderListItem.concat(productOrderList),
            hasMore:true,
            pageNum:that.data.pageNum +1,
          })
        }
        wx.hideLoading();
      },realFail:(res)=>{
        wx.showToast({
          title: res.message
      });
      }
    }, true, this)
  },
  toMyOrder:function(){
    wx.navigateTo({
      url: '../myOrder/myOrder',
    })
  },
  toMyCoupon:function(){
    wx.navigateTo({
      url: '../myCoupon/myCoupon',
    })
  },
  toMyBuyRecord:function(){
  wx.navigateTo({
    url: '../myBuyRecord/myBuyRecord',
  })
  },
  toMyGiftCard:function(){
    wx.navigateTo({
      url: '../myGiftCard/myGiftCard',
    })
  }

})