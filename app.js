
import {
  baseURL
} from './utils/baseURL'
// import esRequest from './utils/esRequest';

App({
  onLaunch: function () {
    // 获取openid和session_key
    wx.login({
      success: (res) => {
        if (res.code) {
          wx.request({
            method: 'POST',
            url: baseURL + '/login',
            data: {
              'code': res.code
            },
            success: function (res2) {
              const response = res2.data
              console.log('response ---->', response);
              if (response.status) {
                wx.setStorageSync('registered', response.data.registered)
                wx.setStorageSync('token', response.data.token)
                if (response.data.profile) {
                  wx.setStorageSync('profile', response.data.profile)
                  wx.setStorageSync('open_id', response.data.profile.open_id)
                }
              } else {
                if (response.data && response.data.token) {
                  wx.setStorageSync('registered', response.data.registered)
                  wx.setStorageSync('open_id', response.data.open_id)
                  wx.setStorageSync('session_key', response.data.session_key)
                  wx.setStorageSync('token', response.data.token)
                }
              }
            },
            fail: function (err) {
              console.log('err', err);
            }
          })
        }
      }
    })
  }
})

! function () {
  var PageTmp = Page;
  Page = function (pageConfig) {
    pageConfig = Object.assign({
      onShareAppMessage: function () {
        return {
          title: '国为钢铁',
          path: 'pages/homeModule/homePage',
          imageUrl: '',
        };
      }
    }, pageConfig);
    PageTmp(pageConfig);
  };
}();