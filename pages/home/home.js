// pages/home/home.js
const { APIS } = require('../../const');
const { request } = require('../../libs/request');
const util = require('../../utils/util');
const user = require('../../libs/user');
const config = require('../../config')
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
    spuListTop:'',
    cacheDataUrl:''
  },
  onLoad: function (options) {
    this.setData({
       channel:options.channel
    })
    this.getCacheData();
    this.getOption();
  },
  onShow:function(){
    if (this.data.channel){
      console.log('开始记录')
      this.addUserChannelLog();
    }
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
        //首页跳转传的图片
        const navigateUrl =this.data.spuListTop.navigateUrl;
        const pictureUrl = this.data.spuListTop.pictureUrl;
        app.globalData.navigateUrl = navigateUrl;
        app.globalData.pictureUrl = pictureUrl;
      },
      fail:(res)=> {
        wx.showToast({
          title: res
      });
      }
    })
  },
  getCacheData:function(){
    if(config.domainPrefix=='https://legominiprogram.teown.com/service/api'){
    this.setData({
      cacheDataUrl:'https://legostatic.teown.com/index_option.json'
    })
    }else{
      this.setData({
        cacheDataUrl:'https://legostatic.teown.com/index_option_test.json'
       // cacheDataUrl:'https://test.microcloudtech.com/service/lego/api/common/home/getIndexResource'
      })
    }
    request({
      url:this.data.cacheDataUrl,
      method: 'GET',
      realSuccess: res=>{
        console.log(res)
        if(res){
          const datas = res;
          this.setData({
            pictureUrl:datas.indexTop,
            reserveImg:datas.indexSeckill.pictureUrl,
            giftImg:datas.indexGift.pictureUrl,
            shareImg:datas.indexSharedImage.pictureUrl,
            spuListTop:datas.spuListTop,
            previewImg: datas.giftVedio.additiveUrl,
            nextGiftImg: datas.giftImg.pictureUrl
          })
          //首页跳转传的图片
          const navigateUrl =this.data.spuListTop.navigateUrl;
          const pictureUrl = this.data.spuListTop.pictureUrl;
          app.globalData.navigateUrl = navigateUrl;
          app.globalData.pictureUrl = pictureUrl;
        }
      },
      realFail:res=> {
        this.getIndexResource();
      },
    },false,this)
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
  openProgram(){
    //打开礼品卡小程序
    // wx.navigateToMiniProgram({
    //   appId: 'wx36f3e821949ce24b',
    //   path: 'pages/index/index',
    //   extraData: {},
    //   envVersion: 'release',
    //   success(res) {
    //     console.log('跳转小程序成功');
    //   }
    // })
    let nextGiftImg = this.data.nextGiftImg;
    if (this.data.optionValue=='true'){
      wx.navigateTo({
        url: `../racingSeries/racingSeries?nextGiftImg=${nextGiftImg}`,
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '敬请期待！',
        showCancel: false
      })
    }
   
   
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
  },
    //用户信息渠道记录
  addUserChannelLog() {
    let channelTag = this.data.channel;
    request({
      url: APIS.ADD_USER_CHANNEL_LOG + `?channelTag=${channelTag}`,
      method: 'PUT',
      header: {
        auth: wx.getStorageSync('token')
      },
      realSuccess: (res) => {
        console.log(res);
        this.setData({
          channel:null
        })
      },
      loginCallback: this.addUserChannelLog,
      realFail: (res) => {
        console.log(res);
      }
    }, true, this)
  },
  getOption(){
   return new Promise((resolve,reject)=>{
     request({
       url: APIS.GET_OPTION +`INDEX_GIFT_SWITCH`,
       method: 'GET',
       realSuccess: (res) => {
         console.log(res);
         resolve(this.setData({
           optionValue: res.optionValue
         }))
        
       },
       loginCallback: this.addUserChannelLog,
       realFail: (res) => {
         console.log(res);
         reject(res)
       }
     }, true, this)
   })
  }
})