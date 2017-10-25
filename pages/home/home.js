// pages/home/home.js
const { APIS } = require('../../const');
const { request } = require('../../libs/request');
const util = require('../../utils/util');
const user = require('../../libs/user');
Page({
  data: {
    pictureUrl: [
      '../../images/ceshi.png'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
    navigateUrl: '',
    reserveImg:'../../images/reserve.png',
    giftImg:'../../images/gift.png',
    list:''
  },
  onLoad: function (options) {
    this.getSliderList();
  },
  getSliderList: () => {
    request({
      url: APIS.GET_SLIDER_LIST,
      header: {
        auth: wx.getStorageSync('token')
      },
      data: {},
      method: 'POST',
      realSuccess: (res) => {
        console.log(res.data);
        this.setData({
          list:res.data.list
        })
      }
    }, true, this)

  },
  onShareAppMessage: function () {
  },
  //跳转小程序
  openProgram: () => {
    wx.showModal({
      title: '精彩好礼',
      showCancel: false,
      content: '即将上线，敬请期待！',
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