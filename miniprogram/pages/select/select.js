// pages/select/select.js

const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categorynum: 13,
    categoryList: [
      "未选择","书籍资料", "宿舍用品", "电子设备", "乐器", "运动健身", "男装", "女装", "代步工具", "鞋帽配饰", "美妆护肤", "虚拟产品", "其他"
    ],
    categoryInd: 0, //类别
    category:"",
    selectList:[]
  },

  getCategory(e) {
    var that = this;
    var categoryInd = e.detail.value;
    that.setData({
      category:that.data.categoryList[categoryInd]
      },()=>{
        console.log(that.data.category)
        that.getSelectList();
    })
    
  },

  //跳转到详情页
  toDetail(e) {
    const id = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
    console.log(e)
  },

    getSelectList(){
      wx.showLoading({
        title: '搜索中',
      })
      var category = this.data.category;
      var that = this;
      
      db.collection("emall").where({
        category: category
      }).get({
        success: res => {
          that.setData({
            selectList: res.data
          })
          console.log(that.data.selectList)
          wx.hideLoading()
        },
        fail: err => {
          console.log("未找到")
          wx.hideLoading()
        }
      })

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