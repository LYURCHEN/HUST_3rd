//获取数据库实例
const db = wx.cloud.database()
Page({
  data: {
    id:""
  },
  onLoad: function (options) {
    this.setData({
      id : options.id,
      info:{}
    })
    const ins = db.collection('emall').doc(options.id)
    ins.update({
      data:{
        //每次点击详情页则商品权值增1
        clicks: db.command.inc(1)
      }
    })
    ins.get({
      success: res=>{
        this.setData({
          info:res.data
        })
        console.log(res)
      }
    })
  },
})