const { APIS } = require('../../const');
const { request } = require('../../libs/request');
const util = require('../../utils/util');
const user = require('../../libs/user');
const WxNotificationCenter = require('../../libs/WxNotificationCenter.js')
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
        timestamp: ''
        
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
       this.getOrderStatus();
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
                invoiceInfo:res.invoiceInfo

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
        request({
            url: APIS.PAY_ORDER+'?orderId='+this.data.orderId,
            method:'POST',
            header: {
              auth: wx.getStorageSync('token')
            },
            realSuccess: (res) => {
              console.log(res);
              this.wxpay();               
                // wx.requestPayment({    //微信支付
                //     'timeStamp': res.timeStamp,
                //     'nonceStr': res.nonceStr,
                //     'package': res.package,
                //     'signType': 'MD5',
                //     'paySign': res.paySign,
                //     'success':function(res){
                //         console.log(res);
                //     },
                //     'fail':function(res){
                //     }
                //  })
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
    wxpay:function(){  //模拟微信支付
        
        request({
            url: APIS.WXPAY+'?orderId='+this.data.orderId+'&&paySuccess=true',
            method:'POST',
            header: {
              auth: wx.getStorageSync('token')
            },
            data:{
                paySuccess:true,
                orderId:this.data.orderId

            },
            realSuccess: (res) => {
              console.log(1312);
            
              wx.showToast({
                  title:'支付成功'
              })
              this.setData({
                orderStatus:'PAYED'
              })
            //   if(this.getOrderDetail){
            //     this.getOrderDetail();   
            //   }         
            },loginCallback:this.wxpay,
            realFail:(res)=>{
                console.log(res)
               
                wx.showToast({
                  title: res
              });
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
            WxNotificationCenter.postNotificationName('NotificationName', {cancelOrder:'success'})
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
        request({
            url: APIS.GET_ORDER_STATUS+'?orderId='+this.data.orderId,
            method:'GET',
            header: {
              auth: wx.getStorageSync('token')
            },
            realSuccess: (res) => {
              console.log(res);
              this.setData({
                orderStatus:res.orderStatus,
                orderStatusLabel:res.orderStatusLabel
              })
            },loginCallback:this.getOrderStatus,
            realFail:(res)=>{
                wx.showToast({
                  title: res
              });
              }
          }, true, this)
    }
    
    
});