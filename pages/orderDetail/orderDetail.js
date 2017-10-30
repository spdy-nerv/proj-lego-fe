// pages/orderDetail/orderDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList: [],
    totalPrice: 1000,     // 订单金额
    delieryType: 0 / 1,     // 0为上门自提，1为邮寄配送
    deliveyInfo: {
			userName: '',
      telNumber: '',
      address: ''
    },
    needFapiao: false,   // 是否需要发票
    fapiaoInfo: {
      type: 0,      // 0为个人，1为公司
      title: ''
    },
    qrCodeUrl: '',    // 线下核销二维码，如果deliveyType为1，此字段可缺省
		expressCode: '',     // 快递单号，如果deliveyType为0，此字段可缺省
    status: 0 ,
    selectedNum:'2',
    name:'王二胖',
    tel:'18188188232',
    address:'上海市普陀区桃浦镇百丽路99弄165号',
    items: [
      {name: 'USA', value: '个人',inputValue:'请填写个人信息'},
      {name: 'CHN', value: '公司',inputValue:'请填写公司信息'},
    ]
  
  },
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