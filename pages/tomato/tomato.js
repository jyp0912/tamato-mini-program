const { http }  = require('../../lib/http.js')

Page({
  timer:null,
  data: {
    defaultSec:1500,
    time:"",
    timeStatus:'start',
    confirmVisible:false,
    againVisible:false,
    finishConfirmVisible:false,
    tomato:''
  },
  onShow:function(){
    this.countDown()
    http.post('/tomatoes').then(res =>{
      this.setData({tomato:res.data.resource})
    })
  },
  countDown(){
    this.setData({timeStatus:'stop'})
    this.changeTime()
    this.timer =setInterval(() => {
      this.data.defaultSec -- 
      this.changeTime()
      if (this.data.defaultSec <= 0){
        this.setData({againVisible:true})
        this.setData({finishConfirmVisible:true})
        return this.clearTimer()
      }
    }, 1000);
  },
  clearTimer(){
    clearInterval(this.timer)
    this.timer=null,
    this.setData({timeStatus:'start'})
  },
  againTimer(){
    this.data.defaultSec=10
    this.countDown()
    this.setData({againVisible:false})
  },
  changeTime(){
    let min = Math.floor(this.data.defaultSec/60)
    let sec = Math.floor(this.data.defaultSec%60)
    if (sec === 0){
      sec = "00"}
    if((sec+"").length === 1){
      sec = "0" + sec
    }
    if((min+"").length === 1){
      min = "0" + min
    }
    this.setData({time:`${min}:${sec}`})
    },
  confirmFinish(event){
      let content = event.detail
      this.setData({ finishConfirmVisible: false })
    },
  confirmCancel(){
      this.setData({ finishConfirmVisible: false })
    },
  confirmAbandon(event){
      let content = event.detail
      http.put(`/tomatoes/${this.data.tomato.id}`,{
        description:content,
        aborted:true
      })
      .then(res=>{
        wx.navigateBack({
          to:-1
        })
      })
    },
  showConfirm(){
      this.setData({confirmVisible:true})
      this.clearTimer()
    },
 hideConfirm(){
      this.setData({confirmVisible:false})     
      this.countDown()
    }
  ,
  onHide: function () {
    this.clearTimer()
    http.put(`/tomatoes/${this.data.tomato.id}`,{
      description:"退出放弃",
      aborted:true
    })
  },
  onUnload: function () {
    this.clearTimer()
    http.put(`/tomatoes/${this.data.tomato.id}`,{
      description:"退出放弃",
      aborted:true
    })
  },
})