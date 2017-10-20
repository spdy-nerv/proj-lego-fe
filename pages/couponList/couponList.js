// pages/couponList/couponList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponList: [
      {
        cardId: 'ausnd23j2qjr',      // 微信卡券id
        name: '优惠券名称',
        dateLimit: '2017.10.10-2017.10.20',     // 有效期文案
        nonceStr: 'aaunsda234213',              // 由服务端生成的随机字符串
        timestamp: 142349304,                   // 由服务端生成的时间戳
        signature: 'asdasdasd213edwadf'         // 卡券签名
      },
		]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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