import {
  baseURL
} from '../../../utils/baseURL';
import esRequest from '../../../utils/esRequest';

Page({
  data: {
    has_registered: false,
    profile: {},
  },

  onShow: function () {
    this.setData({
      has_registered: wx.getStorageSync('has_registered'),
    })
    if (this.data.has_registered) {
      this.getUser()
    }
  },

  // 获取用户信息
  getUser: function () {
    esRequest('profile').then(res => {
      if (res && res.data.status) {
        this.data.profile = res.data.data
        if (this.data.profile.profile.avatar) {
          this.data.profile.profile.avatar = baseURL + this.data.profile.profile.avatar
        }
        this.setData({
          profile: this.data.profile
        })
        wx.setStorageSync('profile', this.data.profile)
      } else {
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },


  // 获取头像
  onChooseAvatar: function (e) {
    let _this = this
    wx.uploadFile({
      url: `${baseURL}/weapp/session/avatar`,
      filePath: e.detail.avatarUrl,
      name: 'file',
      header: {
        'Authorization': `Bearer ${wx.getStorageSync('token')}`
      },
      success() {
        setTimeout(() => {
          _this.getUser()
        }, 200)
      }
    })
  },

  // 页面跳转 - 授权
  goEmpowerPage: function () {
    wx.navigateTo({
      url: '/pages/mineModule/empowerPage/empowerPage',
    })
  },

  // 页面跳转 - 我的投诉
  goReportList: function () {
    wx.navigateTo({
      url: '/pages/reportModule/reportList/reportList',
    })
  },

  // 页面跳转 - 我的执法记录
  goExecuteList: function () {
    wx.navigateTo({
      url: '/pages/executeModule/executeList/executeList',
    })
  },
})