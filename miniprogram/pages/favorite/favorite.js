wx.cloud.init()
const db = wx.cloud.database()
const app= getApp()
Page({

  

  /**
   * 页面的初始数据
   */
  data: {
    favoriteList:[],
    isempty:false,
    goodsList: [
      {
        id: "001",
        imgUrl: "http://img5.imgtn.bdimg.com/it/u=2906541843,1492984080&fm=23&gp=0.jpg",
        name: "女装T恤中长款大码摆裙春夏新款",
        price: "67.00",
        isSelect: false,
        count: 1,
        category:"衣服"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    //this.getList()
    wx.hideLoading()
  },

  getList: function(){
    var goodsList=this.data.goodsList
    var favoriteList = db.collection('users').doc('favoriteList')
    if (favoriteList.length == 0) {
      this.setData({
        isempty: true
      })
    }
    for (var i in favoriteList) {
      
      var good = db.collection('emall').doc(favoriteList[i])
      goodsList.push(good)
    }
    this.setData({
      favoriteList: favoriteList,
      isempty: false,
      goodsList:goodsList
    })
  },

  onPullDownRefresh() {
    this.getList()
  },

  delGoods: function (e){
    var favoriteList=this.data.favoriteList
    for(var i in favoriteList){
      if(favoriteList[i]==e.target.id)
        favoriteList.splice(i,1)
    }
    if(favoriteList.length==0){
      this.setData({
        isempty: true
      })
    }
    //更新收藏列表
  },

  
})