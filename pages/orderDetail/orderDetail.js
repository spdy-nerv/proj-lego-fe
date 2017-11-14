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
        invoiceInfo:''
        
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
    payImmediately:function(){  //微信支付
        console.log(11)
        wx.requestPayment({
            'timeStamp': '',
            'nonceStr': '',
            'package': '',
            'signType': 'MD5',
            'paySign': '',
            'success':function(res){
            },
            'fail':function(res){
            }
         })
    }

});