### 写在最前面

以下定义接口的返回数据结构统一封装如下：

		{
			"resultCode": "0000",
			"resultMsg": "success",
			"resultData": {
				以下所有接口定义中的“输出”部分放在这里
			}
		}
		
### 需要明确的问题
1. 抢购商品，是否会存在一个订单多种商品的情况？建议不要做拆单，线下对订单核销，不对商品核销
2. 亲测礼品卡流程，礼品卡的购买记录和赠送都是以订单作为最小单元的
3. 个人中心的购买记录，建议也已订单作为最小单元展现，而不是以商品或单张礼品卡
4. 需要与微众确认，调用微众的收单接口生成预订单，但最终没有成功支付。该订单在微众作何处理？我们是否需要保留订单未支付的状态，还是即便支付未成功，再次支付就再生成一个预订单？
5. 抢购商品是否需要实现退货退款？（礼品卡目前是不支持退款的）
6. 都在个人中心汇聚礼品卡的购买记录是否妥当？对于未赠送的礼品卡，是否可以实现在乐高小程序上转发赠送？与微众如何对接？

------------------

### 1. 首页
#### 1.1 获取轮播列表 home/getSliderList

	输入：无
	
	输出：
	{
		list: [
			{
				pictureUrl: '图片地址',
				navigateUrl: '跳转的page地址'
			},
			...
		]
	}
	
### 2.抢购相关
#### 2.1 抢购商品详情 seckill/getProductDetail

	输入：
	{
		token: '用户token，置于header',
		productId: '商品id'
	}
	
	输出：
	{
		pictureUrls: [
			'url1',
			'url2',
			...
		],
		name: '商品名称',
		description: '商品描述',
		seckillStartTime: '抢购开始时间',
		seckillEndTime: '抢购结束时间',
		serverTime: '当前的服务器时间',
		price: '价格',
		format: '规格',
		leftStock: '剩余库存量',
		isStartToSell: true/false       // 是否已经开启支付
		hasSignUp: true/false           // 当前用户是否已经登记报名
	}
	
#### 2.2 登记报名 seckill/signUp

	输入：
	{
		token: '用户token，置于header',
		productId: '商品id'
	}
	
	输出：无
	
	
### 3.门店相关
#### 3.1 获取附近的经销店列表 store/getNearbyChainStore

	输入：
	{
		latitude: 10.123     // 定位中心经度
		longitude: 108.213   // 定位中心纬度
		pageSize: 20         // 分页每次取数量
		pageNum: 1           // 分页页数，1开始递增
	}
	
	输出：
	{
		list: [
			{
				storeId: '123ddasd2',     // 店铺id
				pictureUrl: 'http://xx',  // 店铺图片
				name: '店铺名称',
				distance: 1000,           // 店铺距离，米为单位
				address: '店铺地址',
				latitude: 10.123,         // 店铺经度
				longitude: 108.123        // 店铺纬度
			},
			...
		],
		hasMore: true/false               // 是否还有分页数据
	}
	
#### 3.2 获取所有专卖店列表 store/getAllRegularChain

	输入：无
	
	输出：
	{
		list: [
			{
				storeId: '123ddasd2',     // 店铺id
				pictureUrl: 'http://xx',  // 店铺图片
				name: '店铺名称',
				distance: 1000,           // 店铺距离，米为单位
				address: '店铺地址',
				latitude: 10.123,         // 店铺经度
				longitude: 108.123        // 店铺纬度
			},
			...
		]
	}
	
#### 3.3 获取店铺详情 sotre/getStoreDetail

	输入：
	{
		storeId: '213ad1'         // 店铺id
	}
	
	输出：
	{
		storeId: '123ddasd2',     // 店铺id
		pictureUrls: [            // 店铺图片
			'url1',
			'url2',
			...
		],
		name: '店铺名称',
		description: '店铺描述',
		distance: 1000,           // 店铺距离，米为单位
		address: '店铺地址',
		latitude: 10.123,         // 店铺经度
		longitude: 108.123        // 店铺纬度
		openTime: '07:00'         // 开门时间
		closeTime: '20:00'        // 关门时间
	}
	
#### 3.4 店铺签到 store/signinStore

	输入：
	{
		token: '用户token，置于header',
		storeId: '213asdas'      // 店铺id
	}
	
	输出：无
	
#### 3.5 获取店铺小程序码 store/getStoreQrCode

	输入：
	{
		storeId: 'sad123'       // 店铺id
	}
	
	输出：
	{
		qrCodeUrl: 'http://xxx'   // 店铺码图片链接地址
	}
	
### 4. 优惠券相关

#### 4.1 获取优惠券列表 coupon/getAllCouponList

参考资料：

https://mp.weixin.qq.com/debug/wxadoc/dev/api/card.html#wxaddcardobject

http://blog.csdn.net/zhourenfei17/article/details/77714600

https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141229


	输入：无
	
	输出：
	{
		list: [
			{
				cardId: 'ausnd23j2qjr',      // 微信卡券id
				name: '优惠券名称',
				dateLimit: '2017.10.10-2017.10.20',     // 有效期文案
				nonceStr: 'aaunsda234213',              // 由服务端生成的随机字符串
				timestamp：142349304，                   // 由服务端生成的时间戳
				signature: 'asdasdasd213edwadf'         // 卡券签名
			},
			...
		]
	}
	
#### 4.2  获取我已经领取的优惠券列表 coupon/getMyCouponList

参考资料：

https://mp.weixin.qq.com/debug/wxadoc/dev/api/card.html#wxopencardobject

（如何对加密code解码）https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025239

	输入：
	{
		token: '用户token，置于header'
	}
	
	输出：
	{
		list: [
			{
				cardId: 'ausnd23j2qjr',      // 微信卡券id
				pictureUrl: 'http://xxx',    // 优惠券图片
				name: '优惠券名称',
				dateLimit: '2017.10.10-2017.10.20',     // 有效期文案
				code: '12qsdasdfa'                      // 已解密的code
			},
			...
		]
	}
	
#### 4.3 领取优惠券 coupon/addCoupon

	输入：
	{
		token: '用户token，置于header'
		cardId: 'ausnd23j2qjr',      // 微信卡券id
		code: 'asd213rq'             // 小程序端成功领取优惠券后，微信返回的加密code
		
	}
	
	输出：无
	
### 5. 订单相关

#### 5.1 确认订单&收单 order/prepay

参考资料：

https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-pay.html#wxrequestpaymentobject

微众接口2.10.2

	输入：
	{
		token: '用户token，置于header',
		productList: [
			{
				productId: '商品id',
				count: 10,            // 要货数量
			},
			...
		],
		deliveryType: 0/1,     // 0为上门自提，1为邮寄配送
		deliveryInfo: {        // deliveryType为1时，必须提供
			userName: '收货人姓名',
			telNumber: '手机号码',
			address: '详细收货地址'
		},
		needFapiao: true/false,   // 是否需要发票
		fapiaoInfo: {
			type: 0/1,      // 0为个人，1为公司
			title: '发票抬头'
		}
	}
	
	输出（这些数据需要持久化存储，以防支付不成功时的再次发起）：
	{
		orderId: '业务订单id',
		"timeStamp" : " 1395712654", //时间戳 
		"nonceStr" : "e61463f8efa94090b1f366cc cfbbb444", //随机串 
		"package" : "prepay_id=u802345jgfjsdfgsdg888",		"signType" : "MD5", //微信签名方式		"paySign" : "70EA570631E4BB79628FBCA9 0534C63FF7FADD89" //微信签名
	}
	
#### 5.2 如果调用了收单，但没有支付成功，可以通过订单id再次获取支付信息 order/getPayInfoByOrderId

	输入；
	{
		token: '用户token，置于header',	
		orderId: '订单id'
	}
	
	输出：
	{
		isInvalid: true/false,       // 未支付订单是否已经过期
		"timeStamp" : " 1395712654", //时间戳 
		"nonceStr" : "e61463f8efa94090b1f366cc cfbbb444", //随机串 
		"package" : "prepay_id=u802345jgfjsdfgsdg888",		"signType" : "MD5", //微信签名方式		"paySign" : "70EA570631E4BB79628FBCA9 0534C63FF7FADD89" //微信签名
	}
	
#### 5.3 获取历史购买商品的订单列表 order/getOrderList

	输入；
	{
		token: '用户token，置于header',	
	}
	
	输出：
	{
		list: [
			{
				orderId: '业务订单id',
				totalPrice: 2000.23,              // 订单金额
				orderTime: '2017.10.01 10:00:00'  // 下单时间
				status: 0                         // 0未支付（要考虑有效时间），1未发货，2已发货，3已收货，4已过期，5已退货退款
			}
		]
	}
	
#### 5.4 获取购买订单详情 order/getOrderDetail

	输入：
	{
		token: '用户token，置于header',
		orderId: '业务订单id'
	}
	
	输出：
	{
		productList: [
			{
				productId: '商品id',
				pictureUrl: 'http://xxx'     // 商品图片（考虑一下，是取第一张图片，还是专门维护一个小图）
				count: 10,            // 要货数量
				unitPrice: 100        // 商品单价
				
			},
			...
		],
		totalPrice: 1000,     // 订单金额
		deliveryType: 0/1,     // 0为上门自提，1为邮寄配送
		deliveryInfo: {        deliveryType为1时，必须提供
			userName: '收货人姓名',
			telNumber: '手机号码',
			address: '详细收货地址'
		},
		needFapiao: true/false,   // 是否需要发票
		fapiaoInfo: {
			type: 0/1,      // 0为个人，1为公司
			title: '发票抬头'
		},
		qrCodeUrl: 'http://xx'    // 线下核销二维码，如果deliveyType为1，此字段可缺省
		expressCode: '123123'     // 快递单号，如果deliveyType为0，此字段可缺省
		status: 0                 // 0未支付（要考虑有效时间），1未发货，2已发货，3已收货，4已过期，5已退货退款
	}
	
#### 5.5 获取订单的物流信息 order/getExpressInfo

	输入：
	{
		token: '用户token，置于header',
		orderId: '业务订单id'
	}
	
	输出：
	{
		infoList: [
			{
				date: '2017.10.10',
				day: 1        // 1-7
				time: '14:00',
				event: '在xxx仓库出库',
				name: '操作人名字',
				phone: '操作人联系方式'
			},
			...
		]
	}
	
### 6. 礼品卡相关

#### 6.1 获取我从乐高小程序领取的所有礼品卡列表 card/getRecieveCardList

	输入：
	{
		token: '用户token，置于header'
	}
	
	输出：
	{
		list: [
			{
				cardId: 'ausnd23j2qjr',      // 微信卡券id
				pictureUrl: 'http://xxx',    // 礼品卡图片
				name: '礼品卡名称',
				dateLimit: '2017.10.10-2017.10.20',     // 有效期文案
				code: '12qsdasdfa'                      // 已解密的code
			},
			...
		]
	}
	
#### 6.2 获取我购买的所有礼品卡购买记录列表 card/getCardOrderList

	输入：
	{
		token: '用户token，置于header'
	}
	
	输出：
	{
		list: [
			{
				orderId: '订单id'
				description: 'xxx礼品卡 2张',
				pictureUrl: 'http://xxx',             // 订单商品图片
				totalPrice: 12,                       // 订单价格
				orderTime: '2017.10.10 10:23:00',     // 购买时间
				cardList: [
					{
						cardName: 'xxx礼品卡',
						price: 10                  // 单张礼品卡金额
					}
				]
			},
			...
		]
	}
	
### 7. 个人中心相关

#### 7.1 获取公告消息提醒 usercenter/getNotice

	输入：无
	
	输出：
	{
		text: '抢购xxx开始'
		link: 'page/xxx'         // 跳转界面，非必填
	}
	