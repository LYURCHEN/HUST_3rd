const app = getApp()

Page({
  data:{
    info: null
  },

  onLoad:function(){
    this.setData({
      info:app.globalData.userInfo
    })
    console.log(info)
  }

})