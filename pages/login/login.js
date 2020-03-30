
const { http }  = require('../../lib/http.js')
const app = getApp()
const {app_id,app_secret} = app.globalData

Page({
  data: {

  },
  login(event){
    console.log('ssss')
    let encrypted_data = event.detail.encrypted_data
    let iv = event.detail.iv
    this.wxLogin(encrypted_data,iv)
    console.log('2')
  },
  wxLogin(encrypted_data,iv){
    wx.login({
      success:(res)=> this.loginMe(res.code,iv,encrypted_data)      
    })
  },
  loginMe(code,iv,encrypted_data){
    console.log(http.post)
    http.post('/sign_in/mini_program_user',{
      code,
      iv,
      encrypted_data,
      app_id,
      app_secret
    })
    .then(res => {
      this.saveMessage(res)
      console.log('4')
      wx.reLaunch({
        url: "/pages/home/home",
      })
    })
  },
  saveMessage(res){
    wx.setStorageSync('me', res.data.resource)
    wx.setStorageSync('X-token', res.header["X-token"])
  }
})