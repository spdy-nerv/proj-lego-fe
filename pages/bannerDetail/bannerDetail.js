// pages/productDetail/productDetail.js
var { APIS } = require('../../const.js');
var { request } = require('../../libs/request');
var user = require('../../libs/user');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pictureUrls: [],
    name: '',
    description: '',
    seckillStartTime: 0,
    seckillEndTime: 0,
    serverTime: 0,
    price: 0,
    format: '',
    productId:null,
    leftStock: 0,
    headimgPath:'',
    pictureUrls:[],
    isStartToSell: false,       // 是否已经开启支付
    hasSignUp: false,
    description:'' ,
    signupStatus:'',
    seckillSkuStatus:'',
    centerLongitude:'',
    centerLatitude:'',
    name:'',
    address:'',
    currentType: 'entry',
    latitude:'',
    longitude:'',
    nearStoreImg:'',
    distance:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  	console.log(options)
  	 this.setData({
          productId :options.productId ,
        });
  // user.login(this.getProduct,true,this);
    this.getProduct();
    this.getLocaltion();
  },
  //点击图片放大
   onPreviewSlider: function(e) {
   	console.log(e)
		wx.previewImage({
		  current: e.target.dataset.url, // 当前显示图片的链接，不填则默认为 urls 的第一张
		  urls: this.data.pictureUrls
		});
	},
 //获取数据
   getProduct: function() {
   	var that=this;
   	var productId=that.data.productId;
   	console.log(wx.getStorageSync('token'))
   	   wx.showLoading({
        title: '正在加载',
      })
    request({
      url: APIS.GET_PRODUCT,
      method: 'GET',
      data: { 
      	seckillSkuId:productId
        },
        header: {
            auth: wx.getStorageSync('token')
         },
      realSuccess: function (data) {
      	console.log(data)
      	  wx.setNavigationBarTitle({
			      title: data.seckillTitle//页面标题为路由参数
			    })
        that.setData({
          headimgPath:data.headimgPath,
          pictureUrls: data.pictureUrls,
          name :data.name ,
          price :data.price ,
          description:data.description,
          signupStatus:data.signupStatus,
          seckillSkuStatus:data.seckillSkuStatus
        });
         wx.hideLoading()
      },
      loginCallback:this.getProduct,
      realFail: function (msg, code) {
        console.log(msg,code)
      }
    },true,this);

  },
  //确认购买
  signUp:function(){
    var that = this;
    console.log(111)
    request({
      url:APIS.SIGN_UP+'?productId='+that.data.productId,
      method: 'POST',
        header: {
            auth: wx.getStorageSync('token')
         },
      realSuccess: function (data) {
        wx.showModal({
          title: '提示',
          content: '预约成功',
          showCancel:false
        });
        that.getProduct();
      },
      loginCallback:this.signUp,
      realFail: function (msg) {
        wx.showToast({
          title:msg
        })
      }
    },true,this);
  },
  //获取当前经纬度
  getLocaltion:function(){
  	var that=this;
  	wx.getLocation({
      type: 'gcj02',
      success: function (res) {
      	console.log(res)
        that.setData({
          centerLongitude: res.longitude,
          centerLatitude: res.latitude,
        })
        if(that.nearListStore){
          that.nearListStore();
        }

      },
      fail: function (err) {
        console.log(err)
      },
    })
  },
  //获取附件所有门店
  nearListStore:function(){
    var that = this;
    request({
      url:APIS.GET_LIST_STORE,
      method: 'GET',
      data:{pageSize:1,pageNum:1,latitude:that.data.centerLatitude,longitude:that.data.centerLongitude},
      realSuccess: function (data) {
       console.log(data);
       that.setData({
         name:data.list[0].name,
         address:data.list[0].address,
         longitude:data.list[0].longitude,
         latitude:data.list[0].latitude
       })
       const distance = data.list[0].distance;
       if(distance < 1000){
         that.setData({
           distance:distance+'米'
         })
       }
       else if(distance > 1000)
       that.setData({
         distance:(Math.round(distance/100)/10).toFixed(1) + "公里"
       })
      },
      realFail: function (msg) {
        wx.showToast({
          title:msg
        })
      }
    },false,this);
  }
})