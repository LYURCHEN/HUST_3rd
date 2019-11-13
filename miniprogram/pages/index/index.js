//index.js
// 获取应用实例
const app = getApp()
// 获取数据库实例
const db = wx.cloud.database();

Page({
  data: {
    userInfo: {},
    list: [],
    tops: [],
    search: null
  },

  // 登录模块
  getUserInfo: function (e) {
    wx.cloud.callFunction({
      name: "login",
      success: res => {
        console.log(res.result.wxContext)
        e.detail.userInfo.openid = res.result.wxContext.OPENID
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
          userInfo: e.detail.userInfo,
        })
        wx.setStorageSync("userInfo", e.detail.userInfo)
        console.log(app.globalData.userInfo)
      }
    })
  },
//跳转到筛选页
  toSelect() {
    wx.navigateTo({
      url: '/pages/select/select',
    })
  },

  //获取热门商品
  getTop() {
    db.collection('emall').orderBy("click", "desc").limit(4).get({
      success: res => {
        this.setData({
          tops: res.data
        })
      }
    })
  },

  // //上拉刷新
  // onPullDownRefresh(){
  //   this.getList("true")
  // },

  //下拉刷新
  onReachBottom() {
    this.page += 1
    this.getList()
  },

  //跳转到详情页
  toDetail(e) {
    const id = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
    console.log(e)
  },

  //下拉获取新商品
  getList(isInit) {
    //每次获取1页
    const PAGE = 15
    wx.showLoading({
      title: '加载中',
    })
    db.collection("emall").skip(this.page * PAGE).limit(PAGE).get({
      success: res => {
        if (isInit) {
          this.setData({
            list: res.data
          })
        }
        else {
          //下拉刷新，不能直接覆盖而是累加
          this.setData({
            list: this.data.list.concat(res.data)
          })
          wx.stopPullDownRefresh()
        }
        console.log(res.data)
        wx.hideLoading()
      }
    })
  },


  getSearch(e) {
    this.setData({
      search: e.detail.value
    })
    //console.log(e)    
  },

  toSearch() {
    const search = this.data.search
    wx.navigateTo({
      url: '/pages/search/search?search=' + search,
    })
  },

  onLoad: function () {
    wx.showLoading({
      title: '加载中',
    })
    wx.hideLoading()
    //this.page=0
    
  },

  onShow:function(){
    this.getList("true")
    this.getTop()
  }
})

