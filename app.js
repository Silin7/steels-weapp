import esRequest from './utils/esRequest';

App({
  onLaunch: function () {
    // 获取openid和session_key
    wx.login({
      success: (res) => {
        if (res.code) {
          esRequest('authLogin', {
            code: res.code,
          }).then(res => {
            // if (res.data && res.data.status) {
            //   wx.setStorageSync('has_registered', res.data.data.has_registered)
            //   if (!res.data.data.has_registered) {
            //     wx.setStorageSync('openid', res.data.data.open_id)
            //   } else {
            //     wx.setStorageSync('token', res.data.data.token)
            //     wx.setStorageSync('openid', res.data.data.profile.open_id)
            //   }
            // } else {
            //   console.warn('fail' + JSON.stringify(err))
            // }
          })
        }
      }
    })
  }
})