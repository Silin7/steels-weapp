import {
	baseURL
} from '../../../utils/baseURL';
import esRequest from '../../../utils/esRequest';

Page({
	data: {
		baseURL,
		triggered: true,
		sliptype: 1,
		reachTimer: null,
		total: 0,
		currentPage: 1,
		slipData: []
	},

	onLoad: function (options) {
		this.setData({
			sliptype: options.type
		})
		this.initFunction()
	},

	onShow: function () {
		if (wx.getStorageSync('slipLoad')) {
			this.setData({
				sliptype: wx.getStorageSync('slipLoad')
			})
			wx.removeStorageSync('slipLoad')
		}
	},

	// 切换tab
	tabChange: function (event) {
		this.setData({
			sliptype: event.detail.name,
		})
		this.initFunction()
	},

	// 初始化函数
	initFunction: function () {
		this.setData({
			total: 0,
			currentPage: 1,
			slipData: [],
		})
		this.getDataList()
	},

  // 公告列表
  getDataList: function () {
    wx.showLoading({
      title: '加载中',
    })
    esRequest('myvouchers', {
      page: this.data.currentPage,
    }).then(res => {
      if (res && res.data.status) {
        this.data.slipData = this.data.slipData.concat(res.data.data.data)
        this.setData({
          total: res.data.data.total,
          slipData: this.data.slipData
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

	// 页面跳转 - 公告详情
	goSlipDetail: function () {
		wx.navigateTo({
			url: '/pages/salesModule/slipDetail/slipDetail'
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
			if (_this.data.slipData.length < _this.data.total) {
				_this.data.currentPage += 1
				_this.getDataList()
			}
		}, 1000)
	},

})