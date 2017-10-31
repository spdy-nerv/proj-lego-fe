// pages/home/home.js
const { APIS } = require('../../const');
const { request } = require('../../libs/request');
const util = require('../../utils/util');
const user = require('../../libs/user');
Page({
  data: {
    pictureUrl: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
    navigateUrl: '',
    reserveImg:'../../images/reserve.png',
     giftImg:'../../images/gift.png',
   // reserveImg:'',
   // giftImg:'',
    list:''
  },
  onLoad: function (options) {
    this.getSliderList();
    //this.getModelBg('INDEX_SECKILL');
    //this.getModelBg('INDEX_GIFT');
  },
  getSliderList:function(){
    wx.request({
      url: APIS.GET_SLIDER_LIST,
      method: 'GET', 
      success:res=>{
        console.log(res.data)
        this.setData({
          pictureUrl:res.data
        })
      },
      fail:res=> {
        wx.showToast({
          title: res.errMsg
      });
      }
    })

  },
  getModelBg:function(data){
    wx.request({
      url: APIS.GET_MODEL_BG,
      method: 'GET',
      data:{positionType:data}, 
      success:res=>{
        console.log(res);
        this.setData({
          reserveImg:res.data.pictureUrl,
          giftImg:res.data.pictureUrl
        })
      },
      fail:res=> {
        wx.showToast({
          title: res.errMsg
      });
      }
    })
  },
  onShareAppMessage: function () {
  },
  //跳转小程序
  openProgram: () => {
    wx.showModal({
      title: '精选好礼',
      showCancel: false,
      content: '敬请期待！',
    })
    wx.navigateToMiniProgram({
      appId: '',
      path: 'pages/index/index?id=123',
      extraData: {
        foo: 'bar'
      },
      envVersion: 'develop',
      success(res) {
        console.log(res);
      }
    })
  }
})