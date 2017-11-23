// pages/storeDetail/storeDetail.js
var { APIS } = require('../../const');
var { request } = require('../../libs/request');
import Util from '../../libs/Utils'; 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentType: 'entry',
  	toView: 'red',
    scrollTop: 100,
    shareImg:'https://legostatic.teown.com/product-088d828e-b1c7-48c9-99e5-6881979ca0d6.jpg',
  	detailPictureUrls:[],
		content:'',
		cmindexId:'',
		pictureUrl:'',
		imageWidth:0, 
    imageHeight:0 
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
  	 that.setData({
		     cmindexId:options.cmindexId
		    });
   that.getDetail()
  },
   imageLoad: function (e) {  
    //获取图片的原始宽度和高度 
    let originalWidth = e.detail.width; 
    let originalHeight = e.detail.height; 
    //let imageSize = Util.imageZoomHeightUtil(originalWidth,originalHeight); 
  
      let imageSize = Util.imageZoomHeightUtil(originalWidth,originalHeight); 
//  let imageSize = Util.imageZoomWidthUtil(originalWidth,originalHeight,145); 
  
    this.setData({imageWidth:imageSize.imageWidth,imageHeight:imageSize.imageHeight});  
 } ,
   getDetail: function() {
   	var that=this;
   	var cmindexId=that.data.cmindexId;
   	console.log(cmindexId)
   	 wx.showLoading({
        title: '正在加载',
      })
    request({
      url: APIS.GET_BANNERDETAIL+'/'+cmindexId,
      method: 'GET',
      realSuccess: function (data) {
      	 that.setData({
		      pictureUrl:data
		    });
		    wx.hideLoading()
      },
      realFail: function (msg, code) {
        console.log(msg,code)
      }
    });

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
 onShareAppMessage: function (res) {
  	var cmindexId=this.data.cmindexId;
    return {
      title: 'LEGO乐高',
      path: '/pages/bannerIntroduct/bannerIntroduct?cmindexId='+cmindexId,
      imageUrl:this.data.shareImg,
      success: function(res) {
        console.log('转发成功')
      },
      fail: function(res) {
        console.log("转发失败")
      }
    }
  }
})