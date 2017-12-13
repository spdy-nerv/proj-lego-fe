// pages/orderDetail/orderDetail.js
var { APIS } = require('../../const.js');
var { request } = require('../../libs/request');
var user = require('../../libs/user');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prodcutId: 0,
    productList: [],
    totalPrice: 1000,     // 订单金额
    delieryType: 0 / 1,     // 0为上门自提，1为邮寄配送
    deliveyInfo: {
			userName: '',
      telNumber: '',
      address: '',
      province: '',
      city: '',
      county: '',
      nationalCode: '',
      street: ''
    },
    deliveryInfo:'',
    needFapiao: false,   // 是否需要发票
    fapiaoInfo: {
      type: 0,      // 0为个人，1为公司
      title: '',
      address: '',
      bank: '',
      bankAccount: '',
      code: '',
      tel: '',
      token:''
    },
    qrCodeUrl: '',    // 线下核销二维码，如果deliveyType为1，此字段可缺省
		expressCode: '',     // 快递单号，如果deliveyType为0，此字段可缺省
    status: 0 ,
    selectedNum:'2',
    items: [
      {name: '个人', value: '0',placeholder:'请填写个人信息', checked: false,inputValue: ''},
      {name: '公司', value: '1',placeholder:'请填写公司信息', checked: false,inputValue: ''},
    ],
    onlyOne:false
  
  },
  onLoad: function (options) {
    this.setData({
      productId: options.productId
    });
    this._getSelectedProduct();
    this.getOrderToken();
    this.isPaying = false;
  },

  _getSelectedProduct: function() {
    wx.showLoading({title:'数据加载中'});
    var that = this;
    var productId = this.data.productId;
    request({
      url: APIS.GET_PRODUCT,
      method: 'GET',
      data: {
        seckillSkuId: productId
      },
      header: {
        auth: wx.getStorageSync('token')
      },
      realSuccess: function (data) {
        that.setData({
          headimgPath: data.headimgPath,
          productName: data.name,
          price: data.price,
        });
        wx.hideLoading();
      },
      loginCallback: this._getSelectedProduct,
      realFail: function (msg) {
        wx.showToast({
          title: msg
        });
      }
    }, true, this);
  },

  onOpenAddressBook: function() {
    var that = this;
    wx.getSetting({
      success(res) {
      	console.log(res)
        if (!res.authSetting['scope.address']) {
          wx.authorize({
            scope: 'scope.address',
            success() {
              that._openAddressBook();
            }
          })
        } else {
          that._openAddressBook();
        }
      }
    })
  },

  _openAddressBook: function() {
    var that = this;
    wx.chooseAddress({
      success: function (res) {
        console.log(res);
        that.setData({
          deliveryInfo: {
            userName: res.userName,
            telNumber: res.telNumber,
            address: res.provinceName + res.cityName + res.countyName + res.detailInfo,
            province: res.provinceName,
            city: res.cityName,
            county: res.countyName,
            nationalCode: res.nationalCode
          }
        });
      }
    });
  },

  onRadioChange: function(e) {
    var index = +e.detail.value;
    var items = this.data.items;
    items.forEach(function(item, i) {
      if (i == index) {
        item.checked = true;
      } else {
        item.checked = false;
      }
    });
    this.setData({
      items: items
    });
  },

  onChangeFapiaoTitle: function(e) {
    var index = +e.currentTarget.dataset.index;
    var value = e.detail.value;
    var items = this.data.items;
    items.forEach(function (item, i) {
      if (i == index) {
        item.inputValue = value;
      }
    });
    this.setData({
      items: items
    });
  },

  onInput: function(e) {
    var val = e.detail.value;
    var name = e.currentTarget.dataset.name;
    var fapiaoInfo = this.data.fapiaoInfo;
    fapiaoInfo[name] = val;
    this.setData({
      fapiaoInfo: fapiaoInfo
    });
  },

  onPay: function() {
    var deliveryInfo = this.data.deliveryInfo;
    if (!deliveryInfo.userName || !deliveryInfo.telNumber || !deliveryInfo.address) {
      wx.showToast({
        title: '未选择收货地址'
      });
      return;
    }

    if (this.isPaying) return;
    this.isPaying = true;
    var that = this;
    console.log(that._buildPayData())
    var payData = that._buildPayData();
    that.setData({onlyOne:true})
    request({
      url: APIS.ADD_ORDER,
      method: 'POST',
      data: payData,
      header: {
        auth: wx.getStorageSync('token')
      },
      realSuccess: function (res) {
        console.log(res);
        // TODO
        that.setData({orderId:res.orderId})
        that.isPaying = false;
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
          },complete:function(){
          }
       })
      },
      loginCallback: this.onPay,
      realFail: function (msg,code) {
        console.log(msg);
        if(code=='STOCK_LACK'||code=='SALABLE_STOCK_LACK'){
          wx.showModal({
            title:'提示',
            content: msg+'，返回上一页！',
            showCancel:false,
            success: function(res) {
              if (res.confirm) {
                wx.navigateBack();
              } 
            }
          });
        }else{
          wx.showLoading({
            title:msg
          })
          setTimeout(function(){
            wx.navigateBack({
              delta: 1
            })
          },2500)
        }
        that.isPaying = false;
    
      }
    }, true, this);
  },

  _buildPayData: function() {
    var d = this.data;
    var isNeedInvoice = false;
    var invoiceType = 'PERSONAL';
    d.items.forEach(function(item, i) {
      if (item.checked) {
        isNeedInvoice = true;
        if (i == 0) {
          invoiceType = 'PERSONAL';
        } else if (i == 1) {
          invoiceType = 'COMPANY';
        }
      }
    });
    console.log(d)
    var data = {
      "address": d.deliveryInfo.address,
      "city": d.deliveryInfo.city,
      "county": d.deliveryInfo.county,
      "invoiceAddress": d.fapiaoInfo.address,
      "invoiceBank": d.fapiaoInfo.bank,
      "invoiceBankAccount": d.fapiaoInfo.bankAccount,
      "invoiceCode": d.fapiaoInfo.code,
      "invoiceTel": d.fapiaoInfo.tel,
      "invoiceTitle": d.fapiaoInfo.title,
      "invoiceType": invoiceType,
      "isNeedInvoice": isNeedInvoice,
      "orderItems": [
        {
          "productCount": 1,
          "secKillSkuId": d.productId
        }
      ],
      "payType": "WXPAY",
      "phone": d.deliveryInfo.telNumber,
      "province": d.deliveryInfo.province,
      "realname": d.deliveryInfo.userName,
      "remark": '',
      "token":this.data.token
    }
		console.log(data)
    return data;
  }
,
getOrderToken:function(){
  var that = this;
  request({
    url: APIS.GET_ORDER_TOKEN+'?skuId='+that.data.productId,
    method: 'GET',
    header: {
      auth: wx.getStorageSync('token')
    },
    realSuccess: function (res) {
      console.log(res.token);
      that.setData({
        token:res.token
      });
    },
    loginCallback: this.getOrderToken,
    realFail: function (msg, code) {
      wx.showToast({
        title: msg
      });
    }
  }, true, this);
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