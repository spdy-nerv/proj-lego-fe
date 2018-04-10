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
    signInSList:[],
    productId:'',
    shareImg2:'',
    skuid:'',
    disabled:true,
    isNull:true,         // 当前用户是否已经登记报名
  },
  onLoad: function (options) {
    wx.showLoading({title:'数据加载中'}); 
    this.getIndexResource();
    this.buyIntroduction();
    this.getSharePic();
    this.setData({
      headerImg:app.globalData.pictureUrl,
      navigateUrl:app.globalData.navigateUrl
    })
    
  },
  onReady: function () {
  },
  onShow:function(){
     this.getSignList();
  },
 getSignList:function(){
  request({
    url: APIS.GET_SIGN_LIST,
    method:'GET',
    header: {
      auth: wx.getStorageSync('token')
    },
    realSuccess: (res) => {
      console.log(res);
      var sortLastList = [];
      var sortStartList = [];
       res = res.map(function (e, i) {
          e.month = e.startTime.substring(5,7);
          e.day = e.startTime.substring(8,10);
          //var date = new Date();
          //时间戳
          // var timestamp1 = Date.parse( new Date());
          // var timestamp2 = new Date(e.endTime);
          // if(timestamp1>timestamp2){
          //   sortLastList.push(e)
          // }else{
          //   sortStartList.push(e)
          // }
          return e;
        });
      // var list = sortStartList.concat(sortLastList)
        console.log(res);
      this.setData({
      signInSList:res,
      isNull:false
      })
      wx.hideLoading();
    },
    loginCallback: this.getSignList,
    realFail:(res)=>{
    wx.showToast({
      title:res
    })
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
 } ,
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
        spuListTop:datas.spuListTop,
        signinListTop:datas.signinListTop  
      })
    },
    fail:(res)=> {
      wx.showToast({
        title: res
    });
    }
  })
},
getSharePic(){
  request({
    url: APIS.GET_MODEL_BG +'?positionType=SIGNIN_LIST_SHARED',
    method: 'GET',
    realSuccess: res => {
      console.log(res);
      
      this.setData({
        shareImg2: res.pictureUrl
      })
    },
    realFail: (res) => {
     console.log(res);
    }
  },false,this)


},
sign(e){
  console.log(e)
  let detailurl =e.currentTarget.dataset.detailurl;
  let shareUrl = e.currentTarget.dataset.shareurl;
  let configId = e.currentTarget.dataset.cofigid;
  let agreeClause =  e.currentTarget.dataset.agreeclause;
    request({
      url: APIS.SIGN_IN+'?configId='+configId,
      method:'POST',
      header: {
        auth: wx.getStorageSync('token')
      },
  
      realSuccess: (res) => {
        console.log(res);
        wx.navigateTo({
          url: '../signInDetail/signInDetail?detailurl='+detailurl+'&shareurl='+shareUrl+'&configId='+configId
        })
         
      },
      loginCallback: this.sign,
      realFail:(res)=>{
      wx.showToast({
        title:res
      })
      }
    }, true, this)
},
toSign(e){
  let detailurl =e.currentTarget.dataset.detailurl;
  let shareUrl = e.currentTarget.dataset.shareurl;
  wx.navigateTo({
    url: '../signInDetail/signInDetail?detailurl='+detailurl+'&shareurl='+shareUrl
  })
} ,  //获取签到细则
buyIntroduction:function(){
  var that = this;
  request({
    url:APIS.GET_OPTION+'CNY_Activativy_Descripe',
    method: 'GET',
    realSuccess: function (res) {
     console.log(res.optionValue);
     that.setData({
      signIntroduction:res.optionValue
     })
  
    },
    realFail: function () {
    }
  },false,this);
},
  // 弹窗
  showDialogBtn: function(e) {
    console.log(e)
    let detailurl =e.currentTarget.dataset.detailurl;
    let shareUrl = e.currentTarget.dataset.shareurl;
    let configId = e.currentTarget.dataset.cofigid;
    this.setData({
      showModal: true,
      detailurl,
      shareUrl,
      configId
    })
  }, //此处空的方法勿删
  preventTouchMove: function (){},
  preventMove:function(){},
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  radioChange: function(e) {
    console.log(e.detail.value)
    if(e.detail.value=='checked'){
      this.setData({
        disabled:false
      })
    }else{
      this.setData({
        disabled:true
      })
    }
  },
  onCancel: function () {
    this.hideModal();
    wx.navigateBack({
      delta: 1,
    })
  },

  onConfirm: function (e) {
    console.log(e)
    let detailurl = this.data.detailurl;
    let shareUrl = this.data.shareUrl;
    let configId = this.data.configId;
    this.setData({
      detailurl,shareUrl,configId
    })
    request({
      url: APIS.AGREE_CLAUSE,
      method:'POST',
      header: {
        auth: wx.getStorageSync('token')
      },
      realSuccess: (res) => {
        console.log(res)
       this.toAgreeSign();
      },
      loginCallback: this.onConfirm,
      realFail:(res)=>{
      wx.showToast({
        title:res
      })
      }
    }, true, this)
    this.hideModal();
  }
  ,
  toAgreeSign(){
    request({
      url: APIS.SIGN_IN+'?configId='+this.data.configId,
      method:'POST',
      header: {
        auth: wx.getStorageSync('token')
      },
      realSuccess: (res) => {
        console.log(res);
        wx.navigateTo({
          url: '../signInDetail/signInDetail?detailurl='+this.data.detailurl+'&shareurl='+this.data.shareUrl+'&configId='+this.data.configId
        })
         
      },
      loginCallback: this.toAgreeSign,
      realFail:(res)=>{
      wx.showToast({
        title:res
      })
      }
    }, true, this)
  },
  //转发
  onShareAppMessage: function (res) {
    return {
      title: 'LEGO乐高',
      path: '/pages/signInActivity/signInActivity',
      imageUrl: this.data.shareImg2,
      success: function (res) {
        console.log('转发成功')
      },
      fail: function (res) {
        console.log("转发失败")
      }
    }
  

  }
})