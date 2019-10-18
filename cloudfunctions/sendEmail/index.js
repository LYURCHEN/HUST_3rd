const cloud = require('wx-server-sdk')
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})
//引入发送邮件的类库
var nodemailer = require('nodemailer')
// 创建一个SMTP客户端配置
var config = {
  host: 'smtp.qq.com', //
  port: 465, //
  auth: {
    user: '1772329807@qq.com', //邮箱账号
    pass: 'roeqspstduaweggj' //邮箱的授权码
  }
};
// 创建一个SMTP客户端对象
var transporter = nodemailer.createTransport(config);
// 云函数入口函数
exports.main = async (event, context) => {
  // 创建一个邮件对象
  var mail = {
    // 发件人
    from: '1772329807@qq.com',
    // 主题
    subject: '验证码',
    // 收件人
    to: event.email,
    // 验证码
    text: event.code 
  };
  let res = await transporter.sendMail(mail);//发送邮件
  return res;
}