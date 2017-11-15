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
        timestamp: ''
        
    },
    onLoad:function(options){
       console.log(options)
       this.setData({
           orderId:options.orderId,
           orderTime:options.orderTime
       })
       this.getOrderDetail();
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
        request({
            url: APIS.GET_ORDER_DETAIL+that.data.orderId,
            method:'GET',
            header: {
              auth: wx.getStorageSync('token')
            },
            realSuccess: (res) => {
              console.log(res);
              that.setData({
                deliveryNo:res.deliveryInfo.deliveryNo,
                orderStatus:res.orderStatus,
                orderStatusLabel:res.orderStatusLabel,
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
          
            },loginCallback:this.payOrder,
            realFail:(res)=>{
                console.log(res)
                wx.showToast({
                  title: res
              });
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
                this.getOrderDetail();
                wx.showToast({
                  title: res
              });
              }
          }, true, this)

    }
});