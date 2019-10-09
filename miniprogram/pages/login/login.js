const app = getApp()
//获取句柄，app实例

Page({
  getUserInfo: function(e){
    wx.cloud.callFunction({
      name: "login",
      data:{
        a: 10,
        b: 20
      },
      success: res=>{
        console.log(res.result.wxContext)
        e.detail.userInfo.openid = res.result.wxContext.OPENID
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
          userInfo: e.detail.userInfo,
          //hasUserInfo: true
        })
        wx.setStorageSync("userInfo",e.detail.userInfo)
      }
    })
  }
})