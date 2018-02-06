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
    imageHeight:0 ,
    detailurl:''
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
    console.log(options)
  	 that.setData({
      pictureUrl:options.detailurl,
      shareImg:options.shareurl,
      configId:options.configid
        });
        if(options.configId){
          wx.showModal({
            title:'签到成功',
            content:'长按保存签到卡图片，关注乐高公众号，才能收到中奖消息',
            showCancel:false
          })
        }
      
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
   longTap: function(e) {
    console.log("long tap")
    wx.downloadFile({  
      url:this.data.pictureUrl,  
      success:function(res){  
        console.log(res)
        var path = res;  
        wx.getSetting({
          success:(res)=>{
            var state = res.authSetting['scope.writePhotosAlbum']
            if(state==true){
              wx.showModal({
                title: '提示',
                content: '确认将签到卡保存到本地吗？',
                success: function(res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                    wx.saveImageToPhotosAlbum({  
                      filePath: path.tempFilePath,  
                      success: function (res) {  
                        console.log(res)  
                      wx.showToast({
                        title:'保存成功'
                      })
                       // wx.hideLoading();
                      },  
                      fail: function (res) {  
                        console.log(res)  
                        console.log('fail') 
                        wx.showToast({
                          title:'保存失败！'
                        }) 
                      }  
                    }) 
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                    wx.navigateBack({
                      delta: 1,
                    })
                  }
                }
              })
            }else{
              wx.saveImageToPhotosAlbum({  
                filePath: path.tempFilePath,  
                success: function (res) {  
                  console.log(res)  
                wx.showToast({
                  title:'保存成功'
                })
                },  
                fail: function (res) {  
                  console.log(res.errMsg)
                  if(res.errMsg != 'saveImageToPhotosAlbum:fail auth deny'){
                    wx.showToast({
                      title:'保存失败！'
                    }) 
                  }
                  else{
                    wx.showModal({
                      title:'提示',
                      content:'您点击了拒绝授权，将无法正常使用保存卡片功能，请10分钟后再次发起授权，或者删除小程序重新进入！',
                      showCancel:false
                    })
                  }
                  
                 
                }  
              }) 
            }

      }
        })
      
     
      },  
      fail:function(){  
        console.log('fail')  
      }  
    })  



    // wx.showModal({
    //   title: '提示',
    //   content: '长按事件被触发',
    //   showCancel: false
    // })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: '新年迎新汪',
      path: '/pages/signInActivity/signInActivity',
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