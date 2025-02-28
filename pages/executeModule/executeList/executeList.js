import esRequest from '../../../utils/esRequest';

Page({
  data: {
    triggered: true,
    reachTimer: null,
    total: 0,
    currentPage: 1,
    executeList: []
  },

  onShow: function () {
    this.initFunction()
  },

  // 初始化函数
  initFunction: function () {
    this.setData({
      total: 0,
      currentPage: 1,
      executeList: [],
    })
    this.getDataList()
  },

  // 执法列表
  getDataList: function () {
    wx.showLoading({
      title: '加载中',
    })
    esRequest('executePage', {
      page: this.data.currentPage,
    }).then(res => {
      if (res && res.data.status) {
        this.data.executeList = this.data.executeList.concat(res.data.data.items)
        this.setData({
          total: res.data.data.total,
          executeList: this.data.executeList
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
  goExecuteUpdate: function (e) {
    wx.navigateTo({
      url: '/pages/executeModule/executeUpdate/executeUpdate?id=' + e.currentTarget.dataset.item.id
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
      if (_this.data.executeList.length < _this.data.total) {
        _this.data.currentPage += 1
        _this.getDataList()
      }
    }, 1000)
  },
})