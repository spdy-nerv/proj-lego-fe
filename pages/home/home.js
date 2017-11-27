// pages/home/home.js
const { APIS } = require('../../const');
const { request } = require('../../libs/request');
const util = require('../../utils/util');
const user = require('../../libs/user');
const app = getApp();
Page({
  data: {
    pictureUrl: [],
    indicatorDots: true,
    circular:true,
    autoplay: true,
    interval: 5000,
    duration: 500,
    navigateUrl: '',
    reserveImg:'',
    giftImg:'',
    list:'',
    shareImg:'',
    spuListTop:''
  },
  onLoad: function (options) {
    this.getIndexResource();
    user.login();
  },
  getIndexResource:function(){
    wx.request({
      url: APIS.GET_INDEX_RESOURCE,
      method: 'GET', 
      success:res=>{
        console.log(res.data.data);
        const datas = res.data.data;
        this.setData({
          pictureUrl:datas.indexTop,
          reserveImg:datas.indexSeckill.pictureUrl,
          giftImg:datas.indexGift.pictureUrl,
          shareImg:datas.indexSharedImage.pictureUrl,
          spuListTop:datas.spuListTop  
        })
      },
      fail:(res)=> {
        wx.showToast({
          title: res
      });
      }
    })
  },
  toProductList:function(){
    const navigateUrl =this.data.spuListTop.navigateUrl;
    const pictureUrl = this.data.spuListTop.pictureUrl;
    app.globalData.navigateUrl = navigateUrl;
    app.globalData.pictureUrl = pictureUrl;
    wx.navigateTo({
      url: '../productList/productList'
  })
}
, //跳转小程序
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
  },
  onShareAppMessage: function (res) {
    return {
      title: '玩的快乐',
      path: '/pages/home/home',
      imageUrl:this.data.shareImg,
      success: function(res) {
        console.log('转发成功')
      },
      fail: function(res) {
        console.log("转发失败")
      }
    }
  }
})