import esRequest from '../../../utils/esRequest';
Page({
  data: {
    triggered: true,
    reachTimer: null,
    total: 0,
    currentPage: 1,
    reportList: []
  },

  onShow: function () {
    this.initFunction()
  },

  // 初始化函数
  initFunction: function () {
    this.setData({
      total: 0,
      currentPage: 1,
      reportList: [],
    })
    this.getDataList()
  },

  // 投诉列表
  getDataList: function () {
    wx.showLoading({
      title: '加载中',
    })
    esRequest('complainsList', {
      page: this.data.currentPage,
    }).then(res => {
      if (res && res.data.status) {
        this.data.reportList = this.data.reportList.concat(res.data.data.items)
        this.setData({
          total: res.data.data.total,
          reportList: this.data.reportList
        })
      } else {
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 2000
        })
      }
      setTimeout(() => {
        wx.hideLoading();
      }, 500)
    })
  },

  // 页面跳转 - 详情
  goReportDetail: function (e) {
    wx.navigateTo({
      url: '/pages/reportModule/reportDetail/reportDetail?id=' + e.currentTarget.dataset.item.id
    })
  },

  // 自定义下拉刷新被触发
  permessagerePull: function () {
    this.setData({
      triggered: true,
    })
    this.initFunction()
    setTimeout(() => {
      this.setData({
        triggered: false,
      })
    }, 1000)
  },

  // 滚动到底部
  onScrollBottom: function () {
    let _this = this
    clearTimeout(this.data.reachTimer)
    this.data.reachTimer = setTimeout(function () {
      if (_this.data.reportList.length < _this.data.total) {
        _this.data.currentPage += 1
        _this.getDataList()
      }
    }, 1000)
  },
})