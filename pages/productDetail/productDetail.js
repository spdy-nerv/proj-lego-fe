// pages/productDetail/productDetail.js
var { APIS } = require('../../const.js');
var { request } = require('../../libs/request');
var user = require('../../libs/user');
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
    seckillSkuId:null,
    seckillId:null,
    leftStock: 0,
    headimgPath:'',
    pictureUrls:[],
    isStartToSell: false,       // 是否已经开启支付
		hasSignUp: false,           // 当前用户是否已经登记报名
    
    /*
    ## 登记状态
    signupStatus
    - NOT_STARTED: 未开始
    - STARTED: 进行中
    - SIGNUPED: 已登记过
    - END: 已结束
    */
    signupStatus: 'END',

    /*
    ## 秒杀状态
    seckillStatus
    - NO_SIGNUP:没有登记
    - NO_QUALIFY:没有资格，没有收到购买入口消息的
    - ORDERED:已下单，未支付。订单表里有“未支付”状态订单的用户
    - PURCHASED:已购买过。支付表里有“已支付成功”状态订单的用户
    - INVALID_TIME:商品不在秒杀有效期内，如未开始或已结束
    - QUALIFIED:有资格购买。上面所有约束均通过的用户
    */
    seckillSkuStatus: 'QUALIFIED'

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
  	 this.setData({
      seckillSkuId :options.seckillSkuId,
        });
  	//user.login(this.getProduct,true,this);
    //var that = this;
  	
   //this.getProduct()
  },
  onShow:function(){
      this.getProduct();
    
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
   	var that=this;
     var seckillSkuId=that.data.seckillSkuId;
   	   wx.showLoading({
        title: '正在加载',
      })
    request({
      url: APIS.GET_PRODUCT,
      method: 'GET',
      data: { 
      	seckillSkuId:seckillSkuId
        },
        header: {
            auth: wx.getStorageSync('token')
         },
      realSuccess: function (data) {
      	console.log(data)
      	if(data.name){
      		wx.setNavigationBarTitle({
			      title: data.name//页面标题为路由参数
			    })
      	}
      	  
        that.setData({
          headimgPath:data.headimgPath,
          pictureUrls: data.pictureUrls,
          seckillId:data.seckillId,
          name :data.name,
          price :data.price ,
          seckillSkuStatus:data.seckillSkuStatus
        });
         wx.hideLoading()
      },
      loginCallback: this.getProduct,
      realFail: function (msg, code) {
        console.log(msg,code);
        that.setData({
          seckillSkuStatus:'INVALID_TIME'
        })
        wx.showToast({
          title: msg
        });
      }
    }, true, this);

  },
  //确认购买
 Orders: function(e) {
	 	var that=this;
	 	var seckillId=that.data.seckillId;
	 	console.log(seckillId)
     wx.navigateTo({
			  url: '../orderConfirm/orderConfirm?productId='+seckillId
			});
  },
  onReady: function () {
  
  },
  onHide: function () {
  
  },
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})