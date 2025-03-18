import {
	baseURL
} from '../../../utils/baseURL';
import esRequest from '../../../utils/esRequest';

Page({
	data: {
		baseURL,
		triggered: true,
		reachTimer: null,
		total: 0,
		currentPage: 1,
		noticeData: []
	},

	onLoad: function () {
		this.initFunction()
	},

	// 初始化函数
	initFunction: function () {
		this.setData({
			total: 0,
			currentPage: 1,
			noticeData: [],
		})
		this.getDataList()
	},

	// 公告列表
	getDataList: function () {
		wx.showLoading({
			title: '加载中',
		})
		esRequest('systemPosts', {
			page: this.data.currentPage,
		}).then(res => {
			if (res && res.data.status) {
				this.data.noticeData = this.data.noticeData.concat(res.data.data.items)
				this.setData({
					total: res.data.data.total,
					noticeData: this.data.noticeData
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
	goNoticeDetail: function (e) {
		wx.navigateTo({
			url: '/pages/noticeModule/noticeDetail/noticeDetail?id=' + e.currentTarget.dataset.item.id,
		})
	},

  // 公告列表
  getDataList: function () {
    wx.showLoading({
      title: '加载中',
    })
    esRequest('articlelist', {
      page: this.data.currentPage,
    }).then(res => {
      if (res && res.data.status) {
        this.data.noticeData = this.data.noticeData.concat(res.data.data.data)
        this.setData({
          total: res.data.data.total,
          noticeData: this.data.noticeData
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

	// 滚动到底部
	onScrollBottom: function () {
		let _this = this
		clearTimeout(this.data.reachTimer)
		this.data.reachTimer = setTimeout(function () {
			if (_this.data.noticeData.length < _this.data.total) {
				_this.data.currentPage += 1
				_this.getDataList()
			}
		}, 1000)
	},

})