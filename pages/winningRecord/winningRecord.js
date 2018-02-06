const { APIS } = require('../../const');
const { request } = require('../../libs/request');
const util = require('../../utils/util');
const user = require('../../libs/user');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.getLuckyInfo();
  },
  getLuckyInfo(){
    request({
      url: APIS.GET_LUCKY_DRWAINFOS,
      method: 'GET',
      header: {
        auth: wx.getStorageSync('token')
      },
      realSuccess: (res) => {
        console.log(res);
        this.setData({
          getLuckyList:res,
          consigneeAddress:res.consigneeAddress,
          consigneeMobile:res.consigneeMobile,
          consigneeName:res.consigneeName,
          productName:res.productName,
          productNo:res.productNo,
          createAt:res.createAt
        })
      wx.hideLoading();
      }, loginCallback: this.getLuckyInfo,
      realFail: (res) => {
        wx.showToast({
          title:res
        })
      }
    }, true, this)
  },
  expressStatus:function(e){
    let deliveryCompany = e.currentTarget.dataset.deliverycompany;
    let deliveryNo = e.currentTarget.dataset.deliveryno;
    wx.navigateTo({
        url: '../expressStatus/expressStatus?deliveryNo='+deliveryNo+'&&deliveryCompany='+deliveryCompany,
    })
},
toFillAddress(e){
  console.log(e.currentTarget.dataset.luckdrawid)
  let luckDrawId = e.currentTarget.dataset.luckdrawid;
  wx.navigateTo({
    url: '../receivingAddress/receivingAddress?luckDrawId='+luckDrawId
  })
}
})