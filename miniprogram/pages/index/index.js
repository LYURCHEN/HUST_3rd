//index.js
// 获取应用实例
const app = getApp()
// 获取数据库实例
const db = wx.cloud.database();

Page({
  data: {
    // avatarUrl: './user-unlogin.png',
    userInfo: {},
    // logged: false,
    // takeSession: false,
    // requestResult: '',
    list:[],
    tops:[],
    search:null
  },
  
  //获取热门商品
  getTop(){
    db.collection('emall').orderBy("click","desc").limit(4).get({
      success:res=>{
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
  onReachBottom(){
    this.page +=1
    this.getList()
  },

  // redirectToDetail(event,x){
  //   wx.navigator({
  //     url: "/pages/detail/detail?id=" + event.currentTarget.id,
  //   })
  // },

  //跳转到详情页
  toDetail(e){
    const id = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,  
    })
    console.log(e)
  },

  //下拉获取新商品
  getList(isInit){
    //每次获取1页
    const PAGE = 5
    wx.showLoading({
      title: '加载中',
    })
    db.collection("emall").skip(this.page * PAGE).limit(PAGE).get({
      success: res =>{
        if(isInit){
          this.setData({
            list:res.data
          })
        }
        else{
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
  
  
  getSearch(e){
    this.setData({
      search:e.detail.value
    })
    //console.log(e)    
  },

  toSearch(){
    wx.navigateTo({
      url: '/pages/search/search?search='+ this.data.search,
    })
  },
  
  onLoad: function(){
    wx.showLoading({
      title: '加载中',
    })
    //this.page=0
    this.getList("true")
    console.log(this.data.list)
    wx.hideLoading()
    this.getTop()
    console.log(this.data.tops)
  }
})
