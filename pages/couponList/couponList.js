
var { APIS } = require('../../const.js');
var { request } = require('../../libs/request');
var user = require('../../libs/user');
Page({
  data: {
    couponArgumentList: [
      {
        cardId: 'ausnd23j2qjr',      // 微信卡券id
        name: '优惠券名称',
        dateLimit: '2017.10.10-2017.10.20',     // 有效期文案
        nonceStr: 'aaunsda234213',              // 由服务端生成的随机字符串
        timestamp: 142349304,                   // 由服务端生成的时间戳
        signature: 'asdasdasd213edwadf'         // 卡券签名
      },
    ],
    couponList:[]
  },
  onLoad: function (options) {
    this.getWxCardList();
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  getWxCardList(){ 
    wx.showLoading({
      title:'数据加载中'
    })
    request({
      url:APIS.GET_WX_CARD_LIST,
      header: {auth: wx.getStorageSync('token')},
      method: 'GET',
      realSuccess:res=>{
        console.log(res);
        this.setData({
          couponList:res
        })
        wx.hideLoading();
      },
      loginCallback:this.getWxCardList,
      realFail:res=>{
        wx.showToast({title:res});
      }
    },true,this);

  },
  //获取领取优惠券所需要的参数
  getAddWxCardArguments(e){
    console.log(e.currentTarget.dataset.cardid);
    const cardId = e.currentTarget.dataset.cardid;
    request({
      url:APIS.GET_ADDWXCARD_ARGUMENTS+'?cardIds='+cardId,
      header: {auth: wx.getStorageSync('token')},
      method: 'GET',
      realSuccess:res=>{
        console.log(res[0]);
        //添加卡券
        const cardList =JSON.stringify(res[0]);
        console.log(cardList);
        wx.addCard({
          cardList: [
            {cardId,cardExt:cardList}],
          success:res=>{
            console.log(res.cardList) // 卡券添加结果
            console.log('领取成功')
          },fail(){
            console.log('领取失败')
          }
        })
      },
      loginCallback:this.getAddWxCardArguments,
      realFail:res=>{
        wx.showToast({title:res});
      }
    },true,this);
  },
  onPullDownRefresh: function () {
  
  },
  onReachBottom: function () {
  
  },
  onShareAppMessage: function () {
  
  }
})