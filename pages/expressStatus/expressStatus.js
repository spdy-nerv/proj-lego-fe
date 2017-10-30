
Page({
    data: {
        expressName: "",
        expressOrder: "",
        expressCode: "",
        detailList:{
            "Traces": [
                {
                    "AcceptTime": "2017-01-18 10:32:20",
                    "AcceptStation": "【安徽省合肥市政务区柏堰工业园公司】 派件人 : 王耐富 派件中 派件员电话18755105463"
                },
                {
                    "AcceptTime": "2017-01-18 10:52:16",
                    "AcceptStation": "【江西省赣州市赣县区公司】 派件人 : 曾鸣 派件中 派件员电话18720121499"
                },
                {
                    "AcceptTime": "2017-01-18 11:23:01",
                    "AcceptStation": "【云南省曲靖市宣威市公司】 派件人 : 余凤芹 派件中 派件员电话15687439152"
                },
                {
                    "AcceptTime": "2017-01-18 12:55:11",
                    "AcceptStation": "【黑龙江省鸡西市虎林市公司】 派件人 : 付厚君 派件中 派件员电话"
                },
                {
                    "AcceptTime": "2017-01-18 13:58:23",
                    "AcceptStation": "【河南省南阳市新野县施庵镇公司】 派件人 : 张彩平 派件中 派件员电话18338335206"
                }
            ]
        }
    },
    onLoad: function (options) {
        wx.showLoading({
            title: '加载中',
        })

        let data = options;
        this.setData({
            expressName: data.ShipperName,
            expressOrder: data.LogisticCode,
            expressCode: data.ShipperCode
        });
        this.getExpressDetail(data);
        wx.setNavigationBarTitle({
            title: '物流详情'
        })
    },

    getExpressDetail: function (data) {
      
    },

    onPullDownRefresh: function () {
        let self = this;
        let data = {
            ShipperName: self.data.expressName,
            LogisticCode: self.data.expressOrder,
            ShipperCode: self.data.expressCode
        }
        this.getExpressDetail(data)
        wx.showLoading({
            title: "正在加载中"
        })
    },

    onShow: function () {
        setTimeout(function () {
            wx.hideLoading()
        }, 100);
    }
})