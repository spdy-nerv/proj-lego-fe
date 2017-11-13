// pages/storeDetail/storeDetail.js
var { APIS } = require('../../const');
var { request } = require('../../libs/request');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  	centerLongitude:'',
    centerLatitude:'',
  	latitude:'',
    longitude:'',
    address:'',
    currentType: 'entry',
  	toView: 'red',
    scrollTop: 100,
  	detailPictureUrls:[],
		content:'',
    activity:{
   		hearder:'10月店内活动',
   		activities:[
   			{
   				openTime: '9.28',
   				closeTime: '10.8',
   				title:'十一黄金周活动',
   				pictureUrl:'../../images/ceshi.png',
   			},
   			{
   				openTime: '10.9',
   				closeTime: '10.30',
   				title:'十一黄金周活动',
   				pictureUrl:'../../images/ceshi.png',
   			},
   			{
   				openTime: '10.9',
   				closeTime: '10.30',
   				title:'十一黄金周活动',
   				pictureUrl:'../../images/ceshi.png',
   			},
   			{
   				openTime: '10.10',
   				closeTime: '10.17',
   				title:'十一黄金周活动',
   				pictureUrl:'../../images/ceshi.png',
   			}  
    ] 
   }
  },
  //返回上一页
  back:function(e) {
  	wx.navigateBack({
			delta: 1
	  })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  	var that=this;
  	console.log(wx.getStorageSync('coordinate'))
  	var res=wx.getStorageSync('coordinate');
  	if(res){
  		that.setData({
          centerLongitude: res.longitude,
          centerLatitude: res.latitude,
           storeId: options.storeId,
        })
  	}else{
  		that.setData({
	        storeId: options.storeId,
	   });
  	}
  	
   that.getDetail()
  },
  //获取店铺详情
   getDetail: function() {
   	var that=this;
   	var storeId=that.data.storeId;
   	   	console.log(that.data.longitude)
    request({
      url: APIS.GET_STORE_DETAIL+'/'+storeId,
      method: 'GET',
      data: {
          latitude: that.data.latitude,
          longitude:that.data.longitude,
        },
      realSuccess: function (data) {
      	console.log(data)
        that.setData({
          content: data.content,
          detailPictureUrls:data.detailPictureUrls,
       		latitude:data.latitude,
			    longitude:data.longitude,
			    address:data.name,
        })
      },
      realFail: function (msg, code) {
        console.log(msg,code)
      }
    });

  },
//扫描签到
  Sign:function(e){
    wx.scanCode({
		  success: (res) => {
		    console.log(res)
		  }
		})
  },
  /**
   * 生命周期函数--监听页面初次渲染完成s
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