// pages/productDetail/productDetail.js
const { APIS } = require('../../const');
const { request } = require('../../libs/request');
const util = require('../../utils/util');
const user = require('../../libs/user');
const WxNotificationCenter = require('../../libs/WxNotificationCenter.js')
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
    skuid:''           // 当前用户是否已经登记报名
  },
  onLoad: function (options) {
    WxNotificationCenter.addNotification('NotificationName', this.didNotification,this)
    this.getSeckillSkuList();
    this.getbanner();
  },
  onUnload: function () {
    WxNotificationCenter.removeNotification('NotificationName', this)
  },
  //通知处理
  didNotification: function (info) {
    this.setData({
      productId: info.productId
    })
    if(this.data.productId){
      this.getSeckillSkuList();
    }
  },
  onReady: function () {
  },
  getbanner: function() {
   	var that=this;
    request({
      url: APIS.GET_MODEL_BG,
      method: 'GET',
      data: {
         positionType: 'SPU_LIST_TOP',
        },
      realSuccess: function (data) {
      	console.log(data)
        that.setData({
          headerImg: data.pictureUrl,
          navigateUrl:data.navigateUrl
        })
      },
      realFail: function (msg, code) {
        console.log(msg,code)
      }
    });

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
      goodsList:res
      })
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