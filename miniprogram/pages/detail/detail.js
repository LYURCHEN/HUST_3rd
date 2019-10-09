Page({
  data: {
    id:""
  },
  onLoad: function (options) {
    this.setData({
      id : options.id
    })
    console.log(options)
  },
})