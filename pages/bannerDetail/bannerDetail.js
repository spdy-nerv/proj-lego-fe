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
    productId:null,
    leftStock: 0,
    headimgPath:'',
    pictureUrls:[],
    isStartToSell: false,       // 是否已经开启支付
    hasSignUp: false,
    description:''           // 当前用户是否已经登记报名
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  	console.log(options)
  	 this.setData({
          productId :options.productId ,
        });
   //user.login(this.getProduct,true,this);
    this.getProduct();
    var that = this;
  	
    //that.getProduct()
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
   	var productId=that.data.productId;
   	console.log(wx.getStorageSync('token'))
   	   wx.showLoading({
        title: '正在加载',
      })
    request({
      url: APIS.GET_PRODUCT,
      method: 'GET',
      data: { 
      	productId:productId
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
          description:data.description
        });
         wx.hideLoading()
      },
      loginCallback:this.getProduct,
      realFail: function (msg, code) {
        console.log(msg,code)
      }
    },true,this);

  },
  //确认购买
 Orders: function(e) {
	 	var that=this;
	 	var productId=that.data.productId;
     wx.navigateTo({
			  url: '../orderConfirm/orderConfirm?productId='+productId
			});
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
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