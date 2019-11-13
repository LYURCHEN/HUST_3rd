// 获取数据库实例
const db = wx.cloud.database();

Page({
  data:{
    search:null,
    searchList:[]
  },
  onLoad: function (options) {
    this.setData({
      search: options.search
    })
    //console.log(this.data.search)
    db.collection("emall").where({
      title: new db.RegExp({
        regexp: options.search,
        options:'i'
      })
    }).get({
      success: res=>{
        this.setData({
          searchList:res.data
        })
      }
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



})