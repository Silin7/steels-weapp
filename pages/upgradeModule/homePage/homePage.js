import {
  baseURL
} from '../../../utils/baseURL';
import esRequest from '../../../utils/esRequest';

Page({
  data: {
    baseURL,
    swiperList: ['/uploads/202404/1714306620.png', '/uploads/202404/1714306931.png'],
    swiperCurrent: 0,
    noticetype: '1',
    noticeData: [],
    activeArea: '茌平区',
    areaData: ['东昌府区', '阳谷县', '临清市', '茌平区', '东阿县', '冠县', '高唐县', '莘县'],
  },

  onLoad: function () {
    this.getSystemPosts()
    this.getSystemRegions()
  },

  // 切换banner
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current,
    })
  },

  // 信息公示 - 列表
  getSystemPosts: function () {
    let _this = this
    this.data.noticeData = []
    esRequest('systemPosts', {
      type: this.data.noticetype,
      page: 1
    }).then(async res => {
      if (res && res.data.status) {
        await res.data.data.items.forEach((item, index) => {
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

  // 获取已开通区县 - 列表
  getSystemRegions: function () {
    let _this = this
    this.data.noticeData = []
    esRequest('systemRegions', {
    }).then(async res => {
      if (res && res.data.status) {
        console.log(res);
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