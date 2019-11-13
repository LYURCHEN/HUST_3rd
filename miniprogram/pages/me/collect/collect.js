wx.cloud.init()
const db = wx.cloud.database()
const app = getApp()
Page({



  /**
   * 页面的初始数据
   */
  data: {
    favoriteList: [],
    isempty: false,
    goodsList: [],
    resultid: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  getList: function () {
    var goodsList = []
    var favoriteList = this.data.favoriteList
    console.log(favoriteList)
    if (favoriteList.length == 0) {
      this.setData({
        isempty: true
      })
    }
    else{
      this.setData({
        isempty: false
      })
    }
    console.log(favoriteList.length)
    var i=0
    var len=favoriteList.length
    var that=this
    for (;i<len;i++) {
      console.log(favoriteList[i])
      db.collection('emall').doc(favoriteList[i]).get({
        success: res => {
          var good=res.data
          if (goodsList.push(good)==len){
            this.setData({
              goodsList:goodsList
            })
          }
          
      },
        fail: err => {
        }
      })
    }
    
    
  },


  onPullDownRefresh:function() {
    this.getList()
  },

  onShow:function(){
    if (app.globalData.userInfo){
      wx.showLoading({
        title: '加载中',
      })
      db.collection('user').where({
        _openid: app.globalData.userInfo.openid
      }).get({
        success: res => {
          this.setData({
            favoriteList: res.data[0].favoriteList,
            resultid: res.data[0]._id
          })
          console.log("查询成功", this.data.resultid)
          this.getList()
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '加载失败'
          })
        }
      })
      wx.hideLoading()
    }
    
  },

  delGoods: function (e) {
    var favoriteList = this.data.favoriteList
    console.log(favoriteList)
    var k=0
    var that = this
    for (var i in favoriteList) {
      if (favoriteList[i] == e.target.id){
        console.log(favoriteList[i])
        this.data.favoriteList.splice(i, 1)
        k=1
      }
      if (k == 1) {
        console.log(favoriteList)
        this.setData({
          favoriteList: favoriteList
        })
        this.getList()    //更新收藏列表
      }
      //if (k == 1)that.onLoad()
    }
    
    db.collection('user').doc(this.data.resultid).update({
      data: {
        favoriteList: favoriteList
      },
      success: res=>{
       // that.onLoad()
        //that.onShow()
        //that.onReady()
      },
      fail: err=>{
        console.log("fail")
      }
    })

    

  },


})