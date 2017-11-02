// pages/storeList/storeList.js
var { APIS } = require('../../const.js');
var { request } = require('../../libs/request');
var Q = require('../../libs/q/q');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  	centerLongitude: '',
    centerLatitude: '',
    qrCodeUrl:'',
  	toView: 'red',
    scrollTop: 0,
  	pictureUrls: [
      '../../images/banner0.jpg',
      '../../images/banner0.jpg',
      '../../images/banner0.jpg',
      '../../images/banner0.jpg'
    ],
    img_store:'../../images/store.jpg',
    img_Chain:'../../images/banner0.jpg',
    pictureUrls: [
      '../../images/banner0.jpg',
      '../../images/banner0.jpg',
      '../../images/banner0.jpg',
      '../../images/banner0.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
    navigateUrl: '',
  	currentTab: 0, 
  	reserveImg:'../../images/reserve.png',
    giftImg:'../../images/gift.png',
    currentType: 'entry',
    // 专卖店
    regularChainList: [
      
		],
    // 经销店
    chainStoreList: [
    	
    ],
    pageSize: 20,
    pageNum: 1,
    hasMore: true,
    hidden:false
  },
  //点击切换专卖店跟经销店
  swichNav: function( e ) {  
  console.log(e.target.dataset.current)
    var that = this;  
    that.setData( { currentTab: e.target.dataset.current }); 
    console.log(that.data.currentTab)
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  	var that = this;
  	
      that.getLocaltion()
  },
  //获取当前经纬度
  getLocaltion:function(){
  	var that=this;
  	wx.getLocation({
      type: 'gcj02',
      success: function (res) {
      	console.log(res)
        that.setData({
          centerLongitude: res.longitude,
          centerLatitude: res.latitude,
        })
        that.getAllRegularChain(),
        that.getNearbyChainStore()
      },
      fail: function (err) {
        console.log(err)
      },
    })
  },
  //获取门店
   getAllRegularChain: function() {
   	var that=this;
   	   wx.showLoading({
        title: '正在加载',
      })
    request({
      url: APIS.GET_ALL_REGULARCHAIN,
      method: 'GET',
      data: {
          longitude: that.data.centerLongitude,
          latitude:that.data.centerLatitude,
          pageSize:that.data.pageSize,
          pageNum:that.data.pageNum
        },
      realSuccess: function (data) {
        that.setData({
          regularChainList: data.list,
          hasMore: data.hasMore,
          qrCodeUrl:data.hasMore,
        });
         wx.hideLoading()
      },
      realFail: function (msg, code) {
        console.log(msg,code)
      }
    });

  },

 //获取附近经销店
   getNearbyChainStore: function() {
   	var that=this;
   	   wx.showLoading({
        title: '正在加载',
      })
    request({
      url: APIS.GET_NEARBY_CHAINSTORE,
      method: 'GET',
      data: {
          longitude: that.data.centerLongitude,
          latitude:that.data.centerLatitude,
          pageSize:that.data.pageSize,
          pageNum:that.data.pageNum
        },
      realSuccess: function (data) {
        console.log(data)
         var chainStoreList = that.data.chainStoreList;
		      for(var i = 0;i<data.list.length;i++){
		          chainStoreList.push(data.list[i]);
		      }
         that.setData({
          chainStoreList: chainStoreList,
          hasMore: data.hasMore,
          qrCodeUrl:data.hasMore,
        });
          that.data.pageNum ++;
	     wx.hideLoading()
      },
      realFail: function (msg, code) {
        console.log(msg,code)
      }
    });
  },
  bindDownLoad:function(){
  	console.log('上拉')
    var that = this;
    that.getNearbyChainStore();
},
  lower: function(e) {
    console.log(e)
    var that = this;
    that.getNearbyChainStore();
    console.log(that.data.chainStoreList)
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
  	console.log('上拉啊')
      var that = this;
    that.data.getNearbyChainStore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})