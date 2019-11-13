// pages/wxid/wxid.js

// 获取应用实例
const app = getApp()
// 获取数据库实例
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxid:null

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id
    var that = this;
    db.collection("user").doc(id).get({
    }).then(res =>{
        console.log(res.data)
        var wxid = res.data.wxID
        console.log(wxid)
        that.setData({
          wxid: wxid,
          success: ret => {
            console.log(that.data.wxid)
          }
        })
      }
    )
    console.log(that.data.wxid)
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