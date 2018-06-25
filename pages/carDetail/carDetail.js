
Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    indicatorColor:'#fff',
    autoplay: false,
    interval: 5000,
    duration: 1000,
    goodsList:[1,1,1,11,1,1,111,1,1,1,1,1,1],
    scrollX:true,
    showModel:false,
    scrollToItem:'item0'
  },
  onLoad: function (options) {
  
  },
  onShareAppMessage: function () {
  
  },
    showModel(e) {
    this.setData({
      showModel: !this.data.showModel
    })
  },
  selectGood(e){
    console.log(e.currentTarget.dataset.index)
      this.setData({
        currentIndex: e.currentTarget.dataset.index
      })
    },
  rightScroll(e){
  let goodsListLength = this.data.goodsList.length;
  let scrollToItem = this.data.scrollToItem;
  let num = parseInt(scrollToItem.replace(/[^0-9]/ig, ""))+3;
  if(num>goodsListLength) return;
  console.log(num)
  this.setData({
    scrollToItem: 'item'+num
  })
  },
  leftScroll(e){
    let goodsList = this.data.goodsList;
    let scrollToItem = this.data.scrollToItem;
    let num = parseInt(scrollToItem.replace(/[^0-9]/ig, "")) - 3;
    console.log(num)
    if(num<=0) return;
    this.setData({
      scrollToItem: 'item' + num
    })
  }
})