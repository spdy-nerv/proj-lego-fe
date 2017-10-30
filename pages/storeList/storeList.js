// pages/storeList/storeList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  	toView: 'red',
    scrollTop: 0,
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
      {
        storeId: '123ddasd2',     // 店铺id
        pictureUrl: '../../images/reserve.png',  // 店铺图片
        name: '乐高玩具专卖店1',
        distance: '1000米',           // 店铺距离，米为单位
        address: '店铺地址干涉公司公司',
        latitude: 10.123,         // 店铺经度
        longitude: 108.123        // 店铺纬度
      },
      {
        storeId: '123ddasd2',     // 店铺id
        pictureUrl: '../../images/reserve.png',  // 店铺图片
        name: '乐高玩具专卖店2',
        distance: '100千米',           // 店铺距离，米为单位
        address: '店铺地址废区分区分',
        latitude: 10.123,         // 店铺经度
        longitude: 108.123        // 店铺纬度
      },
      {
        storeId: '123ddasd2',     // 店铺id
        pictureUrl: '../../images/reserve.png',  // 店铺图片
        name: '乐高玩具专卖店3',
        distance: '1000千米',           // 店铺距离，米为单位
        address: '店铺地址废区分区分',
        latitude: 10.123,         // 店铺经度
        longitude: 108.123        // 店铺纬度
      },
       {
        storeId: '123ddasd2',     // 店铺id
        pictureUrl: '../../images/reserve.png',  // 店铺图片
        name: '乐高玩具专卖店1',
        distance: '1000米',           // 店铺距离，米为单位
        address: '店铺地址干涉公司公司',
        latitude: 10.123,         // 店铺经度
        longitude: 108.123        // 店铺纬度
      },
      {
        storeId: '123ddasd2',     // 店铺id
        pictureUrl: '../../images/reserve.png',  // 店铺图片
        name: '乐高玩具专卖店2',
        distance: '100千米',           // 店铺距离，米为单位
        address: '店铺地址废区分区分',
        latitude: 10.123,         // 店铺经度
        longitude: 108.123        // 店铺纬度
      },
      {
        storeId: '123ddasd2',     // 店铺id
        pictureUrl: '../../images/reserve.png',  // 店铺图片
        name: '乐高玩具专卖店3',
        distance: '1000千米',           // 店铺距离，米为单位
        address: '店铺地址废区分区分',
        latitude: 10.123,         // 店铺经度
        longitude: 108.123        // 店铺纬度
      }
		],
    // 经销店
    chainStoreList: [
    	{
        storeId: '123ddasd2',     // 店铺id
        pictureUrl: '../../images/gift.png',  // 店铺图片
        name: '乐高玩具经销店1',
        distance: '1000米',           // 店铺距离，米为单位
        address: '分起飞起飞前往',
        latitude: 23.135552,         // 店铺经度
        longitude: 113.223111        // 店铺纬度
     },
     {
        storeId: '123ddasd2',     // 店铺id
        pictureUrl: '../../images/gift.png',  // 店铺图片
        name: '乐高玩具经销店2',
        distance: '1000米',           // 店铺距离，米为单位
        address: '费无法请吩咐帝企鹅',
        latitude: 23.135552,         // 店铺经度
        longitude: 113.223111       // 店铺纬度
     },
     {
        storeId: '123ddasd2',     // 店铺id
        pictureUrl: '../../images/gift.png',  // 店铺图片
        name: '乐高玩具经销店3',
        distance: '1000米',           // 店铺距离，米为单位
        address: 'fqefqefq',
        latitude: 23.135552,         // 店铺经度
        longitude: 113.223111        // 店铺纬度
      }
    ],
    pageSize: 20,
    pageNum: 1,
    hasMore: true
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