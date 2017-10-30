Page({
    openConfirm: function () {
        wx.showModal({
            title: '联系客服',
            content: '相关的文字说明，法务条款 \n 联系人：LEGO TOYS \n 电话：9090980 ',
            confirmText: "确定",
            showCancel: false,
            success: function (res) {
                console.log(res);
                if (res.confirm) {
                    console.log('用户点击主操作')
                }else{
                    console.log('用户点击辅助操作')
                }
            }
        });
    },
    expressStatus:()=>{
        wx.navigateTo({
            url: '../expressStatus/expressStatus',
            success: function(res){
                // success
            },
            fail: function() {
                // fail
            },
            complete: function() {
                // complete
            }
        })
    }
});