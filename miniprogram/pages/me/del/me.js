//获取app实例
const app = getApp()

//获取数据库实例
const db = wx.cloud.database();

Page({
  data:{
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
          //hasUserInfo: true
        })
        wx.setStorageSync("userInfo", e.detail.userInfo)
        console.log(app.globalData.userInfo)
      }
    })
  },
  
  //发布商品
  addMall(){
    wx.chooseImage({
      count:1,
      success: function(res) {
        const filePath = res.tempFilePaths[0]
        const tempFile = filePath.split('.')
        const cloudPath = 'commodity-imag-'+tempFile[tempFile.length-2]
        wx.cloud.upLoadFile({
          cloudPath,
          filePath,
          success:res=>{
            db.collection("emall").add({
              data:{
                name:"商品1",
                price:18.0,
                clicks:0,
                category:"书籍资料",
                discription:"实用图书",
                indexImage:res.fileID
              },
              success: ret=>{
                console.log(ret)
                wx.showToast({
                  title: '新增成功',
                })
              }
            })
            console.log(res)
          }
        })
      },
    })
  },
  //跳转到发布页
  toAddMall: function(e){
    const id = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
    console.log(e)
  },
    
  onLoad: function(optinons){
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },
  

})
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
    
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
    
//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {
    
//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {
    
//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {
    
//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {
    
//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {
    
//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {
    
//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {
    
//   }
// })