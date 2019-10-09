//index.js
// 获取应用实例
const app = getApp()
// 获取数据库实例
const db = wx.cloud.database();

Page({
  data: {
    // avatarUrl: './user-unlogin.png',
    userInfo: {},
    // logged: false,
    // takeSession: false,
    // requestResult: '',
    list:[]
  },

  redirectToDetail(event,x){
    wx.navigator({
      url: "/pages/detail/detail?id=" + event.currentTarget.id,
    })
    console.log(event.currentTarget.id)
  },

  toDetail(e){
    const id = e.currentTarget.id
    wx.navigateTo({
      url: 'pages/detail/detail?id=' + id,
    })
    console.log(e)
  },

  // 登录模块
  getUserInfo: function (e) {
    wx.cloud.callFunction({
      name: "login",
      data: {
        a: 10,
        b: 20
      },
      success: res => {
        console.log(res.result.wxContext)
        e.detail.userInfo.openid = res.result.wxContext.OPENID
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
          userInfo: e.detail.userInfo,
          //hasUserInfo: true
        })
        wx.setStorageSync("userInfo", e.detail.userInfo)
      }
    })
  },

  // 上架商品
  addMall:function(){
    wx.chooseImage({
      success: function(res) {
        const filePath = res.tempFilePaths[0]
        const tempFile = filePath.split('.')
        const cloudPath = "commodity-image-" + tempFile[tempFile.length-2] 
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success:res=>{
            db.collection("emall").add({
              data:{
                title:"算法竞赛入门经典",
                price:28,
                tags:["book","acm"],
                image:res.fileID
              },
              success: ret=>{
                console.log(ret)
                wx.showToast({
                  title:"新增成功"
               })
              }
            })
            console.log(res)
          }
        })
      },
    })
  },

  //获取商品
  getMall:function(){
    db.collection("emall").get({
      success: res=>{
        console.log(res)
      }
    })
  },
  
  onLoad: function(){
    wx.showLoading({
      title: '加载中',
    })
    db.collection("emall").get({
      success: res=>{
        this.setData({
          list: res.data
        })
        console.log(res)
        wx.hideLoading()
      }
    })
  }


  // onLoad: function() {
  //   if (!wx.cloud) {
  //     wx.redirectTo({
  //       url: '../chooseLib/chooseLib',
  //     })
  //     return
  //   }

  //   // 获取用户信息
  //   wx.getSetting({
  //     success: res => {
  //       if (res.authSetting['scope.userInfo']) {
  //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
  //         wx.getUserInfo({
  //           success: res => {
  //             this.setData({
  //               avatarUrl: res.userInfo.avatarUrl,
  //               userInfo: res.userInfo
  //             })
  //           }
  //         })
  //       }
  //     }
  //   })
  // },

  // onGetUserInfo: function(e) {
  //   if (!this.data.logged && e.detail.userInfo) {
  //     this.setData({
  //       logged: true,
  //       avatarUrl: e.detail.userInfo.avatarUrl,
  //       userInfo: e.detail.userInfo
  //     })
  //   }
  // },

  // onGetOpenid: function() {
  //   // 调用云函数
  //   wx.cloud.callFunction({
  //     name: 'login',
  //     data: {},
  //     success: res => {
  //       console.log('[云函数] [login] user openid: ', res.result.openid)
  //       app.globalData.openid = res.result.openid
  //       wx.navigateTo({
  //         url: '../userConsole/userConsole',
  //       })
  //     },
  //     fail: err => {
  //       console.error('[云函数] [login] 调用失败', err)
  //       wx.navigateTo({
  //         url: '../deployFunctions/deployFunctions',
  //       })
  //     }
  //   })
  // },

  // // 上传图片
  // doUpload: function () {
  //   // 选择图片
  //   wx.chooseImage({
  //     count: 1,
  //     sizeType: ['compressed'],
  //     sourceType: ['album', 'camera'],
  //     success: function (res) {

  //       wx.showLoading({
  //         title: '上传中',
  //       })

  //       const filePath = res.tempFilePaths[0]
        
  //       // 上传图片
  //       const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
  //       wx.cloud.uploadFile({
  //         cloudPath,
  //         filePath,
  //         success: res => {
  //           console.log('[上传文件] 成功：', res)

  //           app.globalData.fileID = res.fileID
  //           app.globalData.cloudPath = cloudPath
  //           app.globalData.imagePath = filePath
            
  //           wx.navigateTo({
  //             url: '../storageConsole/storageConsole'
  //           })
  //         },
  //         fail: e => {
  //           console.error('[上传文件] 失败：', e)
  //           wx.showToast({
  //             icon: 'none',
  //             title: '上传失败',
  //           })
  //         },
  //         complete: () => {
  //           wx.hideLoading()
  //         }
  //       })

  //     },
  //     fail: e => {
  //       console.error(e)
  //     }
  //   })
  // },

})
