const { APIS } = require('../../const');
const { request } = require('../../libs/request');
const util = require('../../utils/util');
const user = require('../../libs/user');
const app = getApp();
Page({
  data: {
    imgUrls: [],
    indicatorDots: true,
    indicatorColor:'#fff',
    autoplay: false,
    interval: 5000,
    duration: 1000,
    goodsList:[],
    scrollX:true,
    showModel:false,
    scrollToItem:'item0',
    ShoppingCartList:[],
    currentIndex:0,
    duration:250,
    circular:true,
    autoplay:false,
    interval:3000
  },
  onLoad: function (options) {
    console.log(options.channel)
    this.setData({ 
      optionsId: options.skuId,
      channel:options.channel
    })
    this.getGoodsList();
    // 获取系统信息
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        // 可使用窗口宽度、高度
        console.log('height=' + res.windowHeight);
        console.log('width=' + res.windowWidth);
        // 计算主体部分高度,单位为px
        if (res.windowHeight>700){
          that.setData({
            goodsNameBottom:'466rpx',
            buyButtonBottom:'370rpx'
          })
        }
       
      }
    })
   
  },
  onShow:function(){
    if (this.data.channel!=null) {
      this.addUserChannelLog();
    }
  },
  onShareAppMessage: function () {
    let currentIndex = this.data.currentIndex;
    let goodsList = this.data.goodsList;
    let title = goodsList[currentIndex].productName;
    let shareImg = goodsList[currentIndex].shareImgPath;
    return {
      title: title,
      path: '/pages/carDetail/carDetail',
      imageUrl: shareImg
    }
  
  },
  getGoodsList(){
    request({
      url: APIS.GET_GENERAL_SKU_LIST +`?categoryCode=RACE`,
      method: 'GET',
      header: {
        auth: wx.getStorageSync('token')
      },
      realSuccess: (res) => {
        console.log(res);
       this.setData({
         goodsList:res
       })
       //带有Id进来，跳转到对应商品
       if (this.data.optionsId){
         this.toOneGood();
       }
     
        wx.hideLoading();
      },
      loginCallback: this.getGoodsList,
      realFail: (res) => {
        console.log(res);
      }
    }, true, this)
  },

    showModel(e) {
    this.setData({
      showModel: !this.data.showModel
    })
  },
  selectGood(e){
    console.log(e.currentTarget.dataset.index)
      this.setData({
        currentIndex: e.currentTarget.dataset.index
      })
    },
    //商品向右切换
  rightScroll(e){
  let goodsListLength = this.data.goodsList.length;
  let scrollToItem = this.data.scrollToItem;
  let num = parseInt(scrollToItem.replace(/[^0-9]/ig, ""))+3;
  if(num>goodsListLength) return;
  console.log(num)
  this.setData({
    scrollToItem: 'item'+num
  })
  },
  //加入购物车
  addCartlist(e){
    let currentId = e.currentTarget.dataset.id;
    let goods = e.currentTarget.dataset.goods;
    goods.num=1;
    let index = e.currentTarget.dataset.index;
    let skuId = goods.id
    let ShoppingCartList = this.data.ShoppingCartList;
    if (this.checkOrderSame(skuId)=='first'){
      ShoppingCartList.push(goods)
    }else{
      console.log('购物车里已经有了')
      for (let [key, value] of ShoppingCartList.entries()){
        if (value.id == currentId){
          ShoppingCartList[key].num++;
        }
      }
     
    }
    this.setData({ ShoppingCartList})
  },
  //商品向左切换
  leftScroll(e){
    let goodsList = this.data.goodsList;
    let scrollToItem = this.data.scrollToItem;
    let num = parseInt(scrollToItem.replace(/[^0-9]/ig, "")) - 3;
    console.log(num)
    if(num<0) {return}
    this.setData({
      scrollToItem: 'item' + num
    })
  },
  //购物车中数量增加
  addNum(e){
    console.log(e.currentTarget.dataset.index);
    let index = e.currentTarget.dataset.index;
    let ShoppingCartList = this.data.ShoppingCartList;
    ShoppingCartList[index].num++;
    this.setData({ ShoppingCartList})
     

  },
  //购物车中数量减少
  reduceNum(e){
    console.log(e.currentTarget.dataset.index);
    let index = e.currentTarget.dataset.index;
    let ShoppingCartList = this.data.ShoppingCartList;
    if (ShoppingCartList[index].num==1){
      ShoppingCartList.splice(index,1)
    }else{
      if (ShoppingCartList[index].num>0){
        ShoppingCartList[index].num--;
      }
      
    }
    this.setData({ ShoppingCartList })
  },
  //清空购物车
  clearCartList(){
    this.setData({
      ShoppingCartList: []
    })
  },
  //检查是否购物车有该商品
  checkOrderSame: function (name) {
    var list = this.data.ShoppingCartList;
    for (var index in list) {
      if (list[index].id === name) {
        return index;
      }
    }
    return 'first';
  },
  // to order
  toOrder(){
    let ShoppingCartList = this.data.ShoppingCartList;
    ShoppingCartList = JSON.stringify(ShoppingCartList);
    wx.navigateTo({
      url: `../newOrderConfirm/newOrderConfirm?selectGoods=${ShoppingCartList}`,
    })
  },
  //跳转到某一指定商品
  toOneGood(id){
    let optionsId = parseInt(this.data.optionsId);
    console.log(optionsId)
    let goodsList = this.data.goodsList;
    for (let [key, value] of goodsList.entries()){
      console.log(value)
      if (optionsId == parseInt(value.id) ){
        console.log(key)
        this.setData({
          scrollToItem:'item'+key,
          currentIndex:key
        })
      }
    }

  },
  //用户信息渠道记录
  addUserChannelLog(){
    let channelTag = this.data.channel;
    request({
      url: APIS.ADD_USER_CHANNEL_LOG + `?channelTag=${channelTag}`,
      method: 'PUT',
      header: {
        auth: wx.getStorageSync('token')
      },
      realSuccess: (res) => {
        console.log(res);
        this.setData({
          channel:null
        })
      },
      loginCallback: this.addUserChannelLog,
      realFail: (res) => {
        console.log(res);
      }
    }, true, this)
  }
})