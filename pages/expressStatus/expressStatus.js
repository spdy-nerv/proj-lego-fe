
const { request } = require('../../libs/request');
const util = require('../../utils/util');
const user = require('../../libs/user');
Page({
    data: {
        deliveryNo:'',
        deliveryCompany:'',
        detailList:{
            "Traces": [
            ]
        },
        state:['在途','揽件','疑难','已签收','退签','派件','退回'],
        list:[],
        stateData:'',
        nu:'',
        types:'',
        queryParam:''
    },
    onLoad: function (options) {
        wx.showLoading({
            title: '加载中',
        })
        console.log(options);
       
        let data = options;
        this.setData({
            deliveryNo:options.deliveryNo,
            deliveryCompany:options.deliveryCompany
        });
        this.getExpressType();
        wx.setNavigationBarTitle({
            title: '物流详情'
        })
    },
    getExpressType:function(queryParam){
        var that =this;
        wx.request({
            url: 'https://legowxapp.oss-cn-shanghai.aliyuncs.com/delivery.json',
            method: 'GET',
            success:function(res){
                console.log(res.data);
                that.setData({
                    types:res.data,
                    queryParam:res.data[that.data.deliveryCompany]
                })
              if(that.getExpressDetail){that.getExpressDetail()}
            },
            fail:function(res){
                wx.showToast({
                    title:res.errMsg
                })
            }
        })
  },
    getExpressDetail: function (queryParam) {
        var that = this;
        wx.request({
            url:'https://www.kuaidi100.com/query',
            data: {
                 type:that.data.queryParam,
                 postid:that.data.deliveryNo
            },
            method: 'GET',
            success: function(res){
                console.log(res);
                if(res.data.data){
                    wx.hideLoading();
                }
                that.setData({
                    list:res.data.data,
                    stateData:res.data.state,
                    nu:res.data.nu
                })
            },
            fail: function(res) {
                wx.showToast({
                    title:res.message
                })
            },
        })
      
    },

    onPullDownRefresh: function () {
    },
   

    onShow: function () {
    }
})