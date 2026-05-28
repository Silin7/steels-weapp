import esRequest from '../../../utils/esRequest';

Page({
  data: {
    inventoryStorage: {},
    page: 1,
    total: 0,
    loading: false,
    reachTimer: null,
    inventoryList: []
  },

  onLoad(options) {

  },

  onShow() {
    const inventoryStorage = wx.getStorageSync('inventoryStorage')
    this.setData({
      inventoryStorage: inventoryStorage,
      page: 1,
      total: 0,
      inventoryList: []
    })
    this.getDataList()
  },

  getDataList: function () {
    if (this.data.loading) return

    this.setData({ loading: true })
    wx.showLoading({
      title: '加载中',
    })
    esRequest('srchstock', {
      page: this.data.page,
      ...this.data.inventoryStorage,
    }).then(res => {
      if (res && res.data.status) {
        this.data.inventoryList = this.data.inventoryList.concat(res.data.data.data)
        this.setData({
          total: res.data.data.total,
          inventoryList: this.data.inventoryList
        })
      } else {
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 2000
        })
      }
      setTimeout(() => {
        wx.hideLoading()
        this.setData({ loading: false })
      }, 500)
    }).catch(() => {
      setTimeout(() => {
        wx.hideLoading()
        this.setData({ loading: false })
      }, 500)
    })
  },

  onReachBottom: function () {
    const _this = this
    clearTimeout(this.data.reachTimer)
    this.data.reachTimer = setTimeout(function () {
      if (_this.data.loading) return
      if (_this.data.inventoryList.length < _this.data.total) {
        _this.data.page += 1
        _this.getDataList()
      }
    }, 1000)
  }
})
