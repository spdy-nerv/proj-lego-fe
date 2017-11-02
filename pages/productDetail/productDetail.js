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
    productId:4,
    leftStock: 0,
    headimgPath:'../../images/list.png',
    pictureUrls:[
    	'../../images/list_1.png',
    	'../../images/list_2.png',
    	'../../images/list_3.png'
    ],
    isStartToSell: false,       // 是否已经开启支付
		hasSignUp: false           // 当前用户是否已经登记报名
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  	user.login(this.getProduct,true,this);
    var that = this;
  	
    that.getProduct()
  },
 //获取门店
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
        that.setData({
//        headimgPath:data.headimgPath,
          pictureUrls: data.pictureUrls,
          name :data.name ,
          price :data.price ,
        });
         wx.hideLoading()
      },
      realFail: function (msg, code) {
        console.log(msg,code)
      }
    });

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