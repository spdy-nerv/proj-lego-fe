// const.js
var config = require('./config.js');

var monthFormatList = [
  { arabic: 1, eng: 'January', simpleEng: 'Jan' },
  { arabic: 2, eng: 'February', simpleEng: 'Feb' },
  { arabic: 3, eng: 'March', simpleEng: 'Mar' },
  { arabic: 4, eng: 'April', simpleEng: 'Apr' },
  { arabic: 5, eng: 'May', simpleEng: 'May' },
  { arabic: 6, eng: 'June', simpleEng: 'Jun' },
  { arabic: 7, eng: 'July', simpleEng: 'Jul' },
  { arabic: 8, eng: 'August', simpleEng: 'Aug' },
  { arabic: 9, eng: 'September', simpleEng: 'Sep' },
  { arabic: 10, eng: 'October', simpleEng: 'Oct' },
  { arabic: 11, eng: 'November', simpleEng: 'Nov' },
  { arabic: 12, eng: 'December', simpleEng: 'Dec' },
];

var dayFormatList = [
  { chi: '周日', eng: 'Sunday', simpleEng: 'Sun' },
  { chi: '周一', eng: 'Monday', simpleEng: 'Mon' },
  { chi: '周二', eng: 'Tuesday', simpleEng: 'Tues' },
  { chi: '周三', eng: 'Wednesday', simpleEng: 'Wed' },
  { chi: '周四', eng: 'Thursday', simpleEng: 'Thur' },
  { chi: '周五', eng: 'Friday', simpleEng: 'Fri' },
  { chi: '周六', eng: 'Saturday', simpleEng: 'Sat' }
];
var reqHost = config.domainPrefix;
var APIS = {
  // ----------- lego --------------------
  LOGIN: '/uc/login',
  GET_INDEX_RESOURCE:'/common/home/getIndexResource',//获取首页所有图片资源
  GET_SLIDER_LIST: '/common/home/getSliderList', //获取首页轮播列表
  GET_BANNERDETAIL:'/common/home/getCmIndexImage',//获取banner图大图
  GET_OPTION:'/common/option/getOption/',//根据参数名获取参数值
  GET_ORDER_LIST: '/order/list', //获取历史购买商品的订单列表 
  GET_ORDER_DETAIL: '/order/detail/',//获取购买订单详情
  GET_MY_COUPON_LIST: '/promo/coupon/getMyCouponList',//获取用户所有优惠券列表
  GET_MODEL_BG: '/common/home/getModelBackground',
  GET_SECKILLSKU_LIST: '/product/seckill/getSecKillSkuList',//获取所有抢购商品列表
  SIGN_UP:'/product/seckill/signUp',   //登记报名秒杀活动
  GET_LIST_STORE:'/store/listStore',  //获取附近所有门店
  GET_PRODUCT: '/product/seckill/getProductDetail',//获取商品详情
  GET_PRODUCT_DETAIL:'/product/productinfo/getProductDetail',//根据spu的ID获取抢购商品详情
  PAY_ORDER:'/order/payOrder',//支付订单
  CANCEL_ORDER:'/order/cancelOrder',//取消订单
  GET_ORDER_STATUS:'/order/orderStatus',//获取订单状态
  GET_ORDER_TOKEN:'/order/addOrderToken',//新增订单前获取token

  GET_NEARBY_CHAINSTORE: '/store/getNearbyChainStore',//获取附近的经销店列表
  GET_ALL_REGULARCHAIN: '/store/getAllRegularChain',//获取所有专卖店列表
  GET_STORE_DETAIL: '/store/detail',//获取店铺详情
  SIGNIN_STORE: '/store/signinStore',//店铺签到
  GET_STORE_QRCODE: '/store/getStoreQrCode',//获取店铺小程序码

  ADD_ADDRESS: '/uc/address',
  GET_ADDRESS_LIST: '/uc/address/listAddress',
  DELETE_ADDRESS: '/uc/address/${addressId}',
  EDIT_ADDRESS: '/uc/address/${addressId}',

  ADD_ORDER: '/order/addOrder'


}

for (var i in APIS) {
  if (Object.prototype.hasOwnProperty.call(APIS, i)) { //过滤
    APIS[i] = reqHost + APIS[i];
  }
}

var config = {
  mapkey: '52d76099cd5124c5e891ec8df55cc2d3'
}

module.exports = {
  monthFormatList: monthFormatList,
  dayFormatList: dayFormatList,
  APIS: APIS,
  config: config
}
