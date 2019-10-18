var interval=null//定时器
const app = getApp()
//获取句柄，app实例
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled:false,
    time:'获取验证码',
    currentTime:120,  //倒计时时长
    code:'',//最后一次发送的验证码
    email:'',//输入的邮箱
    inputCode:''//输入的验证码
  },

  emailInput: function(e){//实时更新输入的邮箱
    this.setData({
      email:e.detail.value
    })
  },

  codeInput: function (e) {//实时更新输入的验证码
    this.setData({
      inputCode: e.detail.value
    })
  },

  confirmemail: function () {
    var email=this.data.email;
    console.log("email",email);
    var reg = new RegExp('^[a-zA-Z0-9_.-]+@qq.com');//验证输入的邮箱是否是学校邮箱
    var emailVar = reg.test(email);     // 验证得到的值为布尔型

     if(email==''){//输入的邮箱为空提示
       wx.showToast({
         title: '请输入邮箱',
         icon: 'none',
         duration: 2000
       })
       return false
     }
     else{

       if(emailVar){return true}//输入的邮箱是学校邮箱
       else {//输入的邮箱不是学校邮箱
         wx.showToast({
           title: '请输入正确的邮箱',
           icon: 'none',
           duration: 2000
         })
         return false
       }

     }
  },

  getCode: function () {
    var that = this;
    var currentTime = that.data.currentTime;

    interval = setInterval(function () {//获得计时器
      currentTime--;
      that.setData({
        time: currentTime + '秒'
      })
      if (currentTime <= 0) {//计时结束时将发送验证码按钮设为可用
        clearInterval(interval)
        that.setData({
          time: '重新发送',
          currentTime: 60,
          disabled: false
        })
      }
    }, 1000)

  },
  
  sendCode: function () {
    console.log("email2",this.data.email);
    
    wx.cloud.callFunction({//调用云函数将code发送到输入的邮箱中
        name:"sendEmail",
        data:{
          email:this.data.email,
          code:this.data.code
        },
        success(res){
          console.log("发送成功",res)
        },
        fail(res){
          console.log("发送失败",res)
        }
      })

  },

  createCode: function () {//随机生成4位验证码
    var code;
    code = '';//默认code为空字符串
    var codeLength = 4;//设置长度，这里设置为4

    var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');//设置随机字符

    for (var i = 0; i < codeLength; i++) {//循环codeLength 设置的4就是循环4次

       var index = Math.floor(Math.random() * 36);//设置随机数范围,这设置为0 ~ 36

       code += random[index];//字符串拼接 将每次随机的字符 进行拼接

    }

    this.setData({//将拼接好的字符串赋值给展示的code
      code: code
    })
  },

  getVerificationCode() {//按下发送验证码按钮时的操作

    if(this.confirmemail()){//输入的邮箱是学校邮箱则进行下面操作

      this.createCode();//生成随机的验证码
      console.log("code", this.data.code);
      this.sendCode();//发送验证码
      this.getCode();//倒计时

      var that = this
      that.setData({//禁用发送验证码按钮
         disabled: true
      })

    }

  },

  confirm_btn: function () {//按下开始认证按钮
    if (this.confirmemail()){
    var code = this.data.inputCode
    console.log("code",code);

     if(code==this.data.code&&code!=''){//比较验证码是否相等
       wx.showToast({
         title: '认证成功',
         icon: 'success',
         duration: 2000
       })//将邮箱和已注册的信息发送的数据库的用户信息处
     }
     else{
       wx.showToast({
         title: '验证码错误',
         icon: 'none',
         duration: 2000
       })
     }

    }
  }

})