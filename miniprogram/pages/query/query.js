const db = wx.cloud.database();
const _=db.command
Page({
  query:function(){
    console.log("Query")
    db.collection("chatroom")
      .get().then(res =>{
        console.log(res.data[4])
      })
  },
  add:function(){
    db.collection("chatroom").add({
      data:{
        location: db.Geo.Point(100.0012,10.0022)
      }
    }).then(res =>{
      db.collection('chatroom').add({
        data:{
          location:db.Geo.Point(101.0012,10.0022)
        }
      }).then(res =>{
        db.collection("chatroom").add({
          data:{
            location:db.Geo.Point(103.0012,10.0022)
          }
        })
      })
    })
  }
  
})