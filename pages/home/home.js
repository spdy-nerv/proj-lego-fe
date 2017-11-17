// pages/home/home.js
const { APIS } = require('../../const');
const { request } = require('../../libs/request');
const util = require('../../utils/util');
const user = require('../../libs/user');
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
    list:''
  },
  onLoad: function (options) {
    user.login();
    this.getSliderList();
    this.getModelBg({positionType:'INDEX_SECKILL'});
    this.getModelBg({positionType:'INDEX_GIFT'});
    this.getModelBg({positionType:'INDEX_SHARED_IMAGE'});
  },
  getSliderList:function(){
    wx.request({
      url: APIS.GET_SLIDER_LIST,
      method: 'GET', 
      success:res=>{
        console.log(res.data)
        this.setData({
          pictureUrl:res.data.data
        })
      },
      fail:(res)=> {
        wx.showToast({
          title: res
      });
      }
    })

  },getModelBg:function(data){
    wx.request({
      url: APIS.GET_MODEL_BG,
      method: 'GET',
      data:data, 
      success:res=>{
        if(data.positionType=='INDEX_SECKILL'){
          this.setData({reserveImg:res.data.data.pictureUrl})
        }else if(data.positionType=='INDEX_GIFT'){
          this.setData({giftImg:res.data.data.pictureUrl})
        }else if(data.positionType=='INDEX_SHARED_IMAGE'){
          this.setData({shareImg:res.data.data.pictureUrl})
        }
      },
      fail:res=> {
        wx.showToast({
          title: res
      });
      }
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