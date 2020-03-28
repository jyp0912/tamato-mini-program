Page({
  timer:null,
  data: {
    defaultSec:1500,
    time:"",
    timeStatus:'start',
    confirmVisible:false
  },
  onShow:function(){
    this.countDown()
  },
  countDown(){
    this.setData({timeStatus:'stop'})
    this.changeTime()
    this.timer =setInterval(() => {
      if (this.data.defaultSec === 0){
        return this.clearTimer()
      }
      this.data.defaultSec -- 
      this.changeTime()
    }, 1000);
  },
  clearTimer(){
    clearInterval(this.timer)
    this.timer=null,
    this.setData({timeStatus:'start'})
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
    showConfirm(){
      this.setData({confirmVisible:true})
    },
    hideConfirm(){
      this.setData({confirmVisible:false})     
    }
  ,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})