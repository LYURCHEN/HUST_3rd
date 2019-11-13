// pages/me/posted/posted.js

const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
    postList:[],
    showList:[]

  },
  
  //获取上传商品列表
  getPostList:function(){
    var that=this;
    console.log(app.globalData.userInfo)
    var userID = app.globalData.userInfo.openid;
    
    db.collection("emall").where({
      userID:userID
    })
    .get({
      success: res=>{
        console.log(res.data)
        that.setData({
          postList:res.data
        })
        console.log(that.data.postList)
      }
    })
  },

  deleteGood:function(e){
    var id = e.target.id;
    var that= this;
    wx.showModal({
      title: '提示',
      content: '确定下架商品',
      success: res=>{
        if(res.confirm){
          db.collection("emall").doc(id).remove({
            success:res=>{
              that.getPostList()
              wx.showToast({
                title: '成功',
              })
            },
            fail:console.error
          })

        }
      }
    })
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo){
      this.getPostList()
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})