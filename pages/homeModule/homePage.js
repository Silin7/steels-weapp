import {
  baseURL
} from '../../utils/baseURL';
import esRequest from '../../utils/esRequest';

Page({
  data: {
    baseURL,
    swiperList: ['/images/homeModule/banner.png', '/images/homeModule/banner.png', '/images/homeModule/banner.png', '/images/homeModule/banner.png'],
    swiperCurrent: 0,
    noticetype: '1',
    noticeData: []
  },

  onLoad: function () {
    this.getSystemPosts()
  },

  // 切换banner
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current,
    })
  },

  // 页面跳转 - 执法部门登记
  goExecuteAdd: function () {
    if (wx.getStorageSync('has_registered')) {
      let role = wx.getStorageSync('profile').profile.role_id
      if (role === 4) {
        wx.navigateTo({
          url: '/pages/executeModule/executeAdd/executeAdd',
        })
      } else {
        wx.showToast({
          title: '您没有权限',
          icon: 'none',
          duration: 2000
        })
      }
    } else {
      wx.showModal({
        title: '登录提醒',
        content: '是否前去登录',
        success(res) {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/mineModule/minePage/minePage',
            })
          }
        }
      })
    }
  },

  // 页面跳转 - 企业投诉
  goReportAdd: function () {
    wx.navigateTo({})
    if (wx.getStorageSync('has_registered')) {
      let role = wx.getStorageSync('profile').profile.role_id
      if (role === 5) {
        wx.navigateTo({
          url: '/pages/reportModule/reportAdd/reportAdd',
        })
      } else {
        wx.showToast({
          title: '您没有权限',
          icon: 'none',
          duration: 2000
        })
      }
    } else {
      wx.showModal({
        title: '登录提醒',
        content: '是否前去登录',
        success(res) {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/mineModule/minePage/minePage',
            })
          }
        }
      })
    }
  },

  // 信息公示 切换Tab
  tabChange: function (e) {
    this.setData({
      noticetype: e.currentTarget.dataset.code
    })
    this.getSystemPosts()
  },

  // 信息公示 - 列表
  getSystemPosts: function () {
    let _this = this
    this.data.noticeData = []
    esRequest('articlelist', {
    }).then(async res => {
      if (res && res.data.status) {
        await res.data.data.data.forEach((item, index) => {
          if (index < 2) {
            _this.data.noticeData.push(item)
          }
        })
        this.setData({
          noticeData: this.data.noticeData
        })
      } else {
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  // 页面跳转 - 公告列表
  goNoticeList: function () {
    wx.switchTab({
      url: '/pages/noticeModule/noticeList/noticeList'
    })
    wx.setStorageSync('noticeLoad', this.data.noticetype)
  },

  // 页面跳转 - 公告详情
  goNoticeDetail: function (e) {
    wx.navigateTo({
      url: '/pages/noticeModule/noticeDetail/noticeDetail?id=' + e.currentTarget.dataset.item.id,
    })
  },
})