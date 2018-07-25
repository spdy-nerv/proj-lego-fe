const { APIS } = require('../../const');
const { request } = require('../../libs/request');
const util = require('../../utils/util');
const user = require('../../libs/user');
Page({
    data:{
        orderId:'',
        orderTime:'',
        deliveryInfo:{},
        orderItems:{},
        orderStatusLabel:'',
        orderItems:[],
        deliveryInfo:'',
        payTypeLabel:'',
        invoiceInfo:'', 

        app_id: '', //支付订单
        nonce_str: '',
        package: '',
        pay_sign: '',
        sign_type:'',
        timestamp: '',
        createTime:'',
        onlyOne:'false',
        orderStatusName:'立即支付',
        isDisabled:'',
        showModal:false,
        shareImgUrl:''
        
    },
    onLoad:function(options){
       console.log(options)
       this.setData({
           orderId:options.orderId,
           orderTime:options.orderTime
       })
       this.isPaying = false;
       this.isCanceling = false;
       this.getOrderDetail();
      Promise.all([this.getOrderStatus(), this.getOption()]).then((res)=>{
          console.log('res',res)
        if (res[0] == "PAYED" && res[1].pictureUrl){
          this.setData({
            showModal:true
          })
        }
      })
        
    },
    customerService: function () {
       wx.navigateTo({
           url:'../customerService/customerService',
           success: function(res){
               // success
           },
           fail: function() {
               // fail
           }
       })
    },
    expressStatus:function(){
        wx.navigateTo({
            url: '../expressStatus/expressStatus?deliveryNo='+this.data.deliveryNo+'&&deliveryCompany='+this.data.deliveryCompany,
        })
    },
    getOrderDetail:function(){
        var that = this;
        wx.showLoading({
            title:'数据加载中'
        })
        request({
            url: APIS.GET_ORDER_DETAIL+that.data.orderId,
            method:'GET',
            header: {
              auth: wx.getStorageSync('token')
            },
            realSuccess: (res) => {
              console.log(res);
              wx.hideLoading();
              that.setData({
                deliveryNo:res.deliveryInfo.deliveryNo,
                orderItems:res.orderItems[0],
                deliveryCompany:res.deliveryInfo.deliveryCompany,
                orderItems:res.orderItems,
                deliveryInfo:res.deliveryInfo,
                payTypeLabel:res.payTypeLabel,
                invoiceInfo:res.invoiceInfo,
                createTime:res.createTime,
                orderStatusLabel:res.orderStatusLabel,
                orderItems:res.orderItems


              })
            },loginCallback:this.getOrderDetail,
            realFail:(res)=>{
                wx.showToast({
                  title: res
              });
              }
          }, true, this)
    },
    payOrder:function(){
        if (this.isPaying) return;
        this.isPaying = true;
        const that = this;
        that.setData({ orderStatusName:'正在支付',isDisabled:'disabled'})
        request({
            url: APIS.PAY_ORDER+'?orderId='+this.data.orderId,
            method:'POST',
            header: {
              auth: wx.getStorageSync('token')
            },
            realSuccess: (res) => {
              console.log(res);              
                wx.requestPayment({    //微信支付
                    'timeStamp': res.timestamp+'',
                    'nonceStr': res.nonce_str,
                    'package': res.package,
                    'signType': res.sign_type,
                    'paySign': res.pay_sign,
                    'success':function(res){
                        console.log(res);
                        wx.redirectTo({
                            url:'../orderDetail/orderDetail?orderId='+that.data.orderId
                          })
                    },
                    'fail':function(res){
                        wx.redirectTo({
                            url:'../orderDetail/orderDetail?orderId='+that.data.orderId
                          })
                    },
                    complete:function(){
                    
                    }
                 })
                this.isPaying = false;
          
            },loginCallback:this.payOrder,
            realFail:(res)=>{
                console.log(res)
                wx.showToast({
                  title: res
              });
              this.isPaying = false;
              }
          }, true, this)

    },
    cancelOrder:function(){
        if(this.isCanceling)  return;
        this.isCanceling=true;
        request({
            url: APIS.CANCEL_ORDER+'?orderId='+this.data.orderId,
            method:'POST',
            header: {
              auth: wx.getStorageSync('token')
            },
            realSuccess: (res) => {
              console.log(res);
            wx.showToast({
                title:'取消订单成功'
            })
            this.getOrderDetail();
            this.getOrderStatus();
            this.isCanceling=false;
            },loginCallback:this.cancelOrder,
            realFail:(res)=>{
                wx.showToast({
                  title: res
              });
              this.isCanceling=false;
              }
          }, true, this)

    },
    getOrderStatus:function(){
      return new Promise((resolve,reject)=>{
        request({
          url: APIS.GET_ORDER_STATUS + '?orderId=' + this.data.orderId,
          method: 'GET',
          header: {
            auth: wx.getStorageSync('token')
          },
          realSuccess: (res) => {
            console.log(res);
          
           this.setData({
              orderStatus: res.orderStatus,
              orderStatusLabel: res.orderStatusLabel
            })
            resolve(res.orderStatus)
           
          }, loginCallback: this.getOrderStatus,
          realFail: (res) => {
            reject(res)
            wx.showToast({
              title: res,
              icon:'none'
            });
          }
        }, true, this)
      })
       
    },
  getOption() {
    return new Promise((resolve, reject) => {
      request({
        url: APIS.GET_MODEL_BACK_GROUND + `?positionType=ORDER_POPUP`,
        method: 'GET',
        realSuccess: (res) => {
          console.log(res);
          this.setData({
            showModalImg: res.pictureUrl,
            shareImgUrl: res.shareImgUrl
          })
          resolve(res)

        },
        loginCallback: this.getOption,
        realFail: (res) => {
          console.log(res);
          reject(res)
        }
      }, true, this)
    })
  },
  closeShowMoadel(){
    this.setData({
      showModal:false
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '乐高得宝智能火车来了，快给你家宝贝带上。',
      path: '/pages/racingSeries/racingSeries',
      imageUrl: this.data.shareImgUrl
    }
  }
    
    
});