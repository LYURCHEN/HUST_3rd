const app = getApp();

const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    info: "",
    price: 0.0,
    clicks:0,
    categorynum: 12,
    categoryList:[
      "书籍资料", "宿舍用品", "电子设备", "乐器", "运动健身", "男装", "女装", "代步工具", "鞋帽配饰", "美妆护肤", "虚拟产品", "其他"
    ],
    categoryInd: 0, //类别
    userInfo:null,
    banner:null, //主页图片
    bannerImage:null,
    detail: [], //详情图片
    detailImages:[],
    address:null
  },

  //生命周期函数--监听页面加载
  onLoad: function (options) {
    var that = this;
    //获取用户地址
    db.collection("user").doc(app.globalData.userInfo.openid).get({
      success:res=>{
        console.log(res.data)
        that.setData({
          address:res.data.address
        })
      }
    })
  },

  onShow: function () {
    if (!this.data.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }
  },
  
  //获取名称
  getTitle(e) {
    this.setData({
      title: e.detail.value
    })
  },

  //获取商品价格
  getPrice(e) {
    this.setData({
      price: e.detail.value
    })
  },

  //获取商品描述
  getInfo(e) {
    this.setData({
      info: e.detail.value
    })
  },

  //商品价格
  price(e) {
    this.setData({
      price: e.detail.value
    })
  },

  //获取商品类别
  getCategory(e) {
    this.setData({
      categoryInd: e.detail.value
    })
  },

  //发布提交
  formSubmit(e) {
    var that=this;
    if (e.detail.value.title === "") {
      wx.showToast({
        title: '给宝贝起个名呗',
        icon: "none",
        duration: 1000,
        mask: true,
      })
    } else if (e.detail.value.title.length > 60) {
      wx.showToast({
        title: '宝贝名要少于60字哟',
        icon: "none",
        duration: 1000,
        mask: true,
      })
    } else if (that.data.price == 0.0) {
      wx.showToast({
        title: '宝贝是有价值的哦',
        icon: "none",
        duration: 1000,
        mask: true,
      })
    } else if (!that.data.banner) {
      wx.showToast({
        title: '晒个图，秀下宝贝呀',
        icon: "none",
        duration: 1000,
        mask: true,
      })
    } else if (that.data.detail.length === 0) {
      wx.showToast({
        title: '再秀点细节嘛',
        icon: "none",
        duration: 1000,
        mask: true,
      })
    } else {
        wx.showModal({
          title: '提示',
          content: '确定发布商品',
          success(res) {
            if (res.confirm) {
              //确认发布，调用数据库发布
              that.addMall()
            }
          }
        })
      }
    },

  //上传商品到数据库
  addMall() {
    var that = this;
    wx.showLoading({
      title: '上传中',
    })
    var promiseArr = [];
    const banner = that.data.banner;
    let suffix = banner.match(/\.[^.]+?$/)[0];
    const bannerCloud = new Date().getTime() + suffix;
    let s = new Promise((resolve,reject)=>{
      wx.cloud.uploadFile({
        cloudPath: bannerCloud,
        filePath: banner,
        success: res => {
          //wx.hideLoading()
          that.setData({
            bannerImage: res.fileID
          })
          resolve()
          console.log("成功上传主页图片")
        },
        fail: err => {
          wx.hideLoading()
          wx.showToast({
            title: '上传主页图片失败',
          })
          console.log("上传主页图片失败")
          reject()
        }
      })
    });
    promiseArr.push(s)
    for(let i=0; i< that.data.detail.length;i++){
      let p = new Promise((resolve,reject)=>{
        let item = that.data.detail[i];
        let suffix = item.match(/\.[^.]+?$/)[0];
        let itemCloud = new Date().getTime() + suffix;
        // wx.showLoading({
        //   title: '上传中',
        // })
        wx.cloud.uploadFile({
          cloudPath: itemCloud,
          filePath:item,
          success: res=>{
            that.data.detailImages.push(res.fileID)
            resolve()
            console.log("成功上传第" + (i+1) + "张详情图片")
            //wx.hideLoading()
          },
          fail:res=>{
            wx.hideLoading()
            wx.showToast({
              title: '上传失败',
            })
            reject()
          }
        })
      });
      promiseArr.push(p)
    }
    Promise.all(promiseArr).then( res=>{
      console.log("上传完毕")
      that.addTodb()
      })         
  },
  
  //添加到数据库
  addTodb: function(){
    var that = this;
    var d = that.data;
    console.log(d)
    if (that.data.banner && that.data.detail.length > 0) {
      var data = {
        title: d.title,
        price: parseFloat(d.price),
        description: d.info,
        category: d.categoryList[d.categoryInd],
        clicks: d.clicks,
        userID: d.userInfo.openid,
        bannerImage: d.bannerImage,
        detailImage: d.detailImages,
        address: d.address
      }
      db.collection("emall").add({
        data: data,
        success: res => {
          console.log(res)
          wx.showToast({
            title: '发布成功',
          })
        },
        fail: res => {
          wx.showToast({
            title: '发布失败，请稍后再试',
          })
        }
      })
    } else {
      console.log("未上传成功")
    }  

  },

  //添加详情图片
  chooseDetail: function () {
    var detail = this.data.detail;
    var n = 3- this.data.detail.length;
    wx.chooseImage({
      count: n,
      sizeType: ['compressed'],
      success: res => {
        this.setData({
          detail: detail.concat(res.tempFilePaths)
        })
      }
    })
  },

  // 删除详情图片提示
  deleteImvDetail: function (e) {
    var detail = this.data.detail;
    var itemIndex = e.currentTarget.dataset.id;
    detail.splice(itemIndex, 1);
    this.setData({
        detail: detail
    })     
  },

  //查看大图Detail 
  showImageDetail: function (e) {
    var detail = this.data.detail;
    var itemIndex = e.currentTarget.dataset.id;
    wx.previewImage({
      current: detail[itemIndex], // 当前显示图片的http链接
      urls: detail // 需要预览的图片http链接列表
    })
  },

  //选择主页图片
  chooseBanner: function () {
    wx.chooseImage({
      count: 1, //最多选择1张图片
      sizeType: ['compressed'], //压缩图
      success: res=> {
        this.setData({
          banner: res.tempFilePaths[0]
        })
      }
    })
  },

  // 删除图片Banner
  deleteImvBanner: function (e) {
    this.setData({
      banner:null
    })
  },

  //查看大图Banner
  showImageBanner: function (e) {
    var banner=[];
    banner.push(this.data.banner)
    console.log(banner)
    wx.previewImage({
      current: this.data.banner, // 当前显示图片的http链接
      urls: banner // 需要预览的图片http链接列表
    })
  },
})