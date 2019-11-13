//获取数据库实例
const db = wx.cloud.database()
const app = getApp()
Page({
  data: {
    id: "",
    isfocused: false,
    favorimg: '/images/sc_1.png',
    favoriteList:[],
    resultid:""
  },

  //获取微信ID
  toWxid(e) {
    const id = e.target.id;
    console.log(id)
    wx.navigateTo({
      url: '/pages/wxid/wxid?id=' + id,
    })
  },

  checkfocus: function (id) {
    console.log(app.globalData.userInfo.openid)
    var favoriteList =this.data.favoriteList
    var k=1
    var i=0
    var len = favoriteList.length
    for (;i<len;i++) {//判断用户是否收藏了该商品
      console.log(id)
      if (favoriteList[i] == id) {
        this.setData({
          isfocused: true,
          favorimg: '/images/sc_2.png'
        });
        k=0;
      }
    }
    if(k==1){
      this.setData({
      isfocused: false,
      favorimg: '/images/sc_1.png'
    });
    }
  },
  onLoad: function (options) {
    db.collection('user').where({
      _openid: app.globalData.userInfo.openid
    }).get({
      success: res => {
        this.setData({
          favoriteList: res.data[0].favoriteList,
          resultid: res.data[0]._id
        })
        this.checkfocus(options.id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '收藏失败'
        })
      }
    })
    this.setData({
      id: options.id,
      info: {}
    })
    const ins = db.collection('emall').doc(options.id)
    ins.update({
      data: {
        //每次点击详情页则商品权值增1
        clicks: db.command.inc(1)
      }
    })
    ins.get({
      success: res => {
        this.setData({
          info: res.data
        })
        console.log(res)
      }
    })
    
  },
  
  addFavorite: function (e) {
    var favoriteList = []; 
    var isfocused = this.data.isfocused;//
    favoriteList=this.data.favoriteList
    console.log(favoriteList)
    var id = this.data.id
    console.log(id);
    if (isfocused) {
      for (var i in favoriteList) {//将该商品从收藏列表中删除
        if (favoriteList[i] == id) {
          favoriteList.splice(i, 1);
        }
      }
      this.setData({
        isfocused: false,
        favorimg: '/images/sc_1.png'
      })
    }
    else {//在列表中增添该商品
      
      this.setData({
        isfocused: true,
        favorimg: '/images/sc_2.png'
      })
      favoriteList.push(id)
    }
    db.collection('user').doc(this.data.resultid).update({
      data: {
       favoriteList: favoriteList
      },
      success: console.log,
      fail: console.error
    })
  },
})