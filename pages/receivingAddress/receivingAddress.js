const { APIS } = require('../../const');
const { request } = require('../../libs/request');
const util = require('../../utils/util');
const user = require('../../libs/user');
const { validate } = require('../../libs/validate');
var app = getApp();
Page({
  data: {
    luckDrawId:'',
    nameValue:'',
    addressValue:'',
    mobileValue:'',
    disabled:false   
  },
  onLoad: function (options) {
    new app.WeToast(); 
    this.setData({
      luckDrawId:options.luckDrawId
    })
    this.getDeliveryInfo();
  },
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var data = e.detail.value;
    try{
      if(!data.name) throw '请输入姓名';
      if(validate.phone(data.tel) == '') throw '请输入正确电话号码';
      if(!data.address) throw '请输入地址';
    }
    catch(err){
      this.wetoast.toast({
        title: err
      })
      return;
    }
    wx.showLoading({
      title:'提交中...'
    })
    request({
      url: APIS.ADD_DELIVERY_INFO,
      method: 'POST',
      header: {
        auth: wx.getStorageSync('token')
      },
      data:{
        "address": data.address,
        "luckDrawId": this.data.luckDrawId,
        "mobile": data.tel,
        "realname": data.name
      },
      realSuccess: (res) => {
        console.log(res);
        wx.showModal({
          content:'提交成功',
          showCancel:false,
          success:()=>{
            wx.redirectTo({
              url: '../home/home'
            })
          }
        })
       
     
      }, loginCallback: this.formSubmit,
      realFail: (res) => {
        wx.hideLoading();
        this.wetoast.toast({
          title:res
        })
      }
    }, true, this)
  },
  //获取收货地址
  getDeliveryInfo(){
    request({
      url: APIS.GET_DELIVERY_INFO+'?luckDrawId='+this.data.luckDrawId,
      method:'GET',
      header: {
        auth: wx.getStorageSync('token')
      },
      realSuccess: (res) => {
        if(res.realname){
          this.setData({
            nameValue:res.realname,
            addressValue:res.address,
            mobileValue:res.mobile,
            disabled:true
          })
        }
    
        if(res.realname&&res.address&&res.mobile){
          wx.showModal({
            title:'已提交收货信息',
            showCancel:false,
            success:()=>{
              wx.navigateTo({
                url: '../home/home',
              })
            }
          })
        return;
        }
      }, loginCallback: this.getDeliveryInfo,
      realFail: (res) => {
       console.log(res)
      }
    }, true, this)

  }
})