// pages/productDetail/productDetail.js
var { APIS } = require('../../const.js');
var { request } = require('../../libs/request');
var user = require('../../libs/user');
var WxNotificationCenter = require('../../libs/WxNotificationCenter.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pictureUrls: [],
    name: '',
    description: '',
    seckillStartTime: 0,
    seckillEndTime: 0,
    serverTime: 0,
    price: 0,
    format: '',
    productId:null,
    leftStock: 0,
    headimgPath:'',
    pictureUrls:[],
    isStartToSell: false,       // 是否已经开启支付
    hasSignUp: false,
    description:'' ,
    signupStatus:'',
    seckillSkuStatus:'',
    centerLongitude:'',
    centerLatitude:'',
    name:'',
    address:'',
    currentType: 'entry',
    latitude:'',
    longitude:'',
    nearStoreImg:'',
    distance:'',
    showModal:'',
    disabled:'true'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(wx.getStorageSync('coordinate'))
  	var res=wx.getStorageSync('coordinate');
  	if(res){
  		that.setData({
          centerLongitude: res.longitude,
          centerLatitude: res.latitude,
        })
  	}
  	console.log(options);
  	 this.setData({
          productId :options.productId ,
        });
  // user.login(this.getProduct,true,this);
       that.getProduct();
       console.log(that.data.signupStatus)
      //  if(that.data.signupStatus=="NOT_STARTED"||that.datasignupStatus == "END"){
      //   that.getLocaltion();
      // }
  },
  //点击图片放大
   onPreviewSlider: function(e) {
   	console.log(e)
		wx.previewImage({
		  current: e.target.dataset.url, // 当前显示图片的链接，不填则默认为 urls 的第一张
		  urls: this.data.pictureUrls
		});
	},
 //获取数据
   getProduct: function() {
    wx.showLoading({
      title:'数据加载中'
    })
   	var that=this;
   	var productId=that.data.productId;
    request({
      url: APIS.GET_PRODUCT,
      method: 'GET',
      data: { 
      	seckillSkuId:productId
        },
        header: {
            auth: wx.getStorageSync('token')
         },
      realSuccess: function (data) {
         console.log(data)
      	  wx.setNavigationBarTitle({
			      title: data.seckillTitle//页面标题为路由参数
			    })
        that.setData({
          headimgPath:data.headimgPath,
          pictureUrls: data.pictureUrls,
          name :data.name ,
          price :data.price ,
          description:data.description,
          signupStatus:data.signupStatus,
          seckillSkuStatus:data.seckillSkuStatus
        });
        if(that.data.signupStatus=="NOT_STARTED"||that.datasignupStatus == "END"){
          that.getLocaltion();
        }else{
          wx.hideLoading();
        }
      },
      loginCallback:this.getProduct,
      realFail: function (msg, code) {
        console.log(msg,code)
      }
    },true,this);

  },
  //预约登记
  signUp:function(){
    var that = this;
    console.log('点击了预约登记');
    request({
      url:APIS.SIGN_UP+'?productId='+that.data.productId,
      method: 'POST',
        header: {
            auth: wx.getStorageSync('token')
         },
      realSuccess: function (data) {
        wx.showModal({
          title: '预约成功',
          content: '下一步，将引导你关注我们公众号。只有关注我们公众号后，才能收到抢购提醒消息，并从消息链接进入购买页面。',
          cancelText:'去关注',
          confirmText:'离开',
          success:(res)=>{
            console.log('成功回调')
            WxNotificationCenter.postNotificationName('NotificationName', {productId:that.data.productId})
            if (res.confirm) {
              wx.navigateBack();
            } else if (res.cancel) {
              wx.navigateTo({
                url: '../payAttentionTo/payAttentionTo',
              })
            }
          },
          fail:(res)=>{
            console.log('失败回调')
          }
        });
        that.getProduct();
        wx.hideLoading();
      },
      loginCallback:this.signUp,
      realFail: function (msg) {
        wx.showToast({
          title:msg
        })
      }
    },true,this);
 
  },
  //获取当前经纬度
  getLocaltion:function(){
  	var that=this;
  	wx.getLocation({
      type: 'gcj02',
      success: function (res) {
      	wx.setStorageSync('coordinate', res);
      	console.log(res)
        that.setData({
          centerLongitude: res.longitude,
          centerLatitude: res.latitude,
        })
        if(that.nearListStore){
          that.nearListStore();
        }
        
      },
      fail: function (err) {
        console.log(err);
        wx.showLoading({
          title:'获取定位失败!'
        })
        setTimeout(function(){
          wx.hideLoading();
        },3000);
        
      },
      complete:function(){

      }
    })
  },
  //获取附件所有门店
  nearListStore:function(){
    var that = this;
    request({
      url:APIS.GET_LIST_STORE,
      method: 'GET',
      data:{pageSize:1,pageNum:1,latitude:that.data.centerLatitude,longitude:that.data.centerLongitude},
      realSuccess: function (data) {
        wx.hideLoading();
       console.log(data);
       that.setData({
         name:data.list[0].name,
         address:data.list[0].address,
         longitude:data.list[0].longitude,
         latitude:data.list[0].latitude
       })
       const distance = data.list[0].distance;
       if(distance < 1000){
         that.setData({
           distance:distance+'米'
         })
       }
       else if(distance > 1000)
       that.setData({
         distance:(Math.round(distance/100)/10).toFixed(1) + "公里"
       })
      },
      realFail: function (msg) {
        wx.showToast({
          title:msg
        })
      }
    },false,this);
  },
  // 弹窗
  showDialogBtn: function() {
    this.setData({
      showModal: true
    })
  }, //此处空的方法勿删
  preventTouchMove: function () {},
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

  onConfirm: function () {
    this.hideModal();
    this.signUp()
  }
})