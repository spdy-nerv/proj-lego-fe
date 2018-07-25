var { APIS } = require('../../const.js');
var { request } = require('../../libs/request');
var user = require('../../libs/user');
Page({
  data: {
    giftButton:'',
    giftImg: '',
    giftSharedImage: '',
  },
  onLoad: function (options) {
    console.log(options.nextGiftImg)
    this.setData({
      nextGiftImg: options.nextGiftImg
    })
    this.getIndexResource();
    this.videoContext = wx.createVideoContext('myVideo')
   
  
  },
  onReady: function () {
    
  
  },
  onShow: function () {
    this.videoContext.pause();
  
  },  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },
  onReachBottom: function () {
  
  },

  onShareAppMessage: function () {
  
  },
  toCarDetail(){
    wx.navigateTo({
      url: '../carDetail/carDetail',
    })
  },
  getIndexResource: function () {
    wx.request({
      url: APIS.GET_INDEX_RESOURCE,
      method: 'GET',
      success: res => {
        console.log(res.data.data);
        const datas = res.data.data;
        this.setData({
          giftImg: datas.giftImg.pictureUrl,
          videoUrl: datas.giftVedio.pictureUrl,
          additiveUrl: datas.giftVedio.additiveUrl,
          giftButton: datas.giftButton.pictureUrl,
          giftImg: datas.giftImg.pictureUrl,
          giftSharedImage: datas.giftSharedImage.pictureUrl,
          giftVedio: datas.giftVedio.pictureUrl


        })
      },
      fail: (res) => {
        wx.showToast({
          title: res
        });
      }
    })
  }
})