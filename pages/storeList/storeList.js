// pages/storeList/storeList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 专卖店
    regularChainList: [
      {
        storeId: '123ddasd2',     // 店铺id
        pictureUrl: '',  // 店铺图片
        name: '店铺名称',
        distance: 1000,           // 店铺距离，米为单位
        address: '店铺地址',
        latitude: 10.123,         // 店铺经度
        longitude: 108.123        // 店铺纬度
      }
		],
    // 经销店
    chainStoreList: [],
    pageSize: 20,
    pageNum: 1,
    hasMore: true
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