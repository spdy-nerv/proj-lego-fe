// pages/productDetail/productDetail.js
const { APIS } = require('../../const');
const { request } = require('../../libs/request');
const util = require('../../utils/util');
const user = require('../../libs/user');
const app = getApp();
Page({
  data: {
    pictureUrls: [],
    headerImg:'',//顶部图片
    navigateUrl: '',//顶部图片跳转路径
    name: '',
    description: '',
    seckillStartTime: 0,
    seckillEndTime: 0,
    serverTime: 0,
    price: 0,
    format: '',
    leftStock: 0,
    isStartToSell: false,       // 是否已经开启支付
    hasSignUp: false,
    goodsList:[],
    productId:'',
    skuid:'',
    isNull:true,         // 当前用户是否已经登记报名
  },
  onLoad: function (options) {
    wx.showLoading({title:'数据加载中'});  
    this.setData({
      headerImg:app.globalData.pictureUrl,
      navigateUrl:app.globalData.navigateUrl
    })
  },
  onReady: function () {
  },
  onShow:function(){
    this.getSeckillSkuList();
  },
 getSeckillSkuList:function(){
  request({
    url: APIS.GET_SECKILLSKU_LIST,
    method:'GET',
    header: {
      auth: wx.getStorageSync('token')
    },
    realSuccess: (res) => {
      console.log(res);
      this.setData({
      goodsList:res,
      isNull:false
      })
      wx.hideLoading();
    },
    loginCallback: this.getSeckillSkuList,
    realFail:(res)=>{
    console.log(res);
    }
  }, true, this)

 },
 toProductDetail:function(e){
     const isCurrentMystery = e.currentTarget.dataset.ismystery;
     const id = e.currentTarget.id;
     const skuid = e.currentTarget.dataset.skuid;
     if(isCurrentMystery==true){
      wx.showModal({
        title:'神秘商品，指定的时间内才能购买。',
        showCancel:false
      })
     }else{
       wx.navigateTo({
         url:'../bannerDetail/bannerDetail?productId='+id+'&skuid='+skuid,
       })
     }
 }
})