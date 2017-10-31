const { APIS } = require('../../const');
const { request } = require('../../libs/request');
const util = require('../../utils/util');
const user = require('../../libs/user');
Page({
    data:{
        orderId:'',
        orderTime:'',
        deliveryInfo:{},
        orderItems:{}
        
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
            url: '../expressStatus/expressStatus?deliveryNo='+this.data.deliveryNo,
        })
    },
    getOrderDetail:function(){
        var that = this;
        request({
            url: APIS.GET_ORDER_DETAIL+this.data.orderId,
            method:'GET',
            header: {
              auth: wx.getStorageSync('token')
            },
            realSuccess: (res) => {
              console.log(res);
              this.setData({
                deliveryNo:res.deliveryInfo.deliveryNo,
                orderStatus:res.orderStatus,
                orderItems:res.orderItems[0]

              })
            }
          }, true, this)
    }

});