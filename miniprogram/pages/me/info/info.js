const app = getApp()

const db = wx.cloud.database()

Page({
  data:{
    userInfo: null,
    wxID: 12345,
    address: "沁苑",
    user:null,
    openid:null
  },

  onLoad:function(){
    var that = this;
    that.setData({
      userInfo:app.globalData.userInfo,
      openid: app.globalData.userInfo.openid
    })
    // var p= new Promise((resolve,reject)=>{
    db.collection("user").doc(app.globalData.userInfo.openid).get().then(res=>{
      that.setData({
        user:res.data
      })
      console.log(res.data)
    }).catch(err=>{
        console.log("未找到")
      })  
    console.log(this.data.userInfo)
    
  },

  getWxID(e){
    if(e.detail.value==""){
      wx.showToast({
        title: '请输入有效的微信号',
        icon:"none",
      })
    }else{
      this.setData({
        wxID: e.detail.value
      })
    } 
  },

  getAdd(e){
    if (e.detail.value == "") {
      wx.showToast({
        title: '请输入有效的地址',
        icon: "none",
      })
    }else{
      this.setData({
        address: e.detail.value
      })
    }
  },

  alter(){
    var user = this.data.user;
    var wxID = this.data.wxID;
    var address = this.data.address;
    var openid = this.data.openid;

    console.log(this.data)
    wx.showModal({
      title: '提示',
      content: '确认修改',
      success: res=>{
        if(res.confirm){
          if(user){
            if(wxID){
              db.collection("user").doc(openid).update({
                data:{
                  wxID: wxID
                }
              })
            }
            if(address){
              db.collection("user").doc(openid).update({
                data:{
                  address:address
                }
              })
            }
            db.collection("user").doc(openid).get().then(res=>{
              console.log(res.data)
            })            
          }else{
            db.collection("user").add({
              data:{
                _id:openid,
                wxID:wxID,
                address:address
              },
              // success: res=>{
                
              // }
            }).then(res=>{
              console.log(res.data)

            })
          }
          
        }
      }
    })

  },

  onShow: function(){

  }



})