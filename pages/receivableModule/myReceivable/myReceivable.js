import esRequest from '../../../utils/esRequest';

Page({
	data: {
		syn_url: '',
		requestURL: '',
		profile: {},
		triggered: true,
		sliptype: 1,
		reachTimer: null,
		total: 0,
		currentPage: 1,
		slipData: []
	},

	onLoad: function (option) {
		this.setData({
			syn_url: option.url,
			requestURL: option.url + '/vouchers/getreceivableaccount',
			profile: wx.getStorageSync('profile')
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

	// 应收列表
	getDataList: function () {
		let _this = this
		wx.showLoading({
			title: '加载中',
		})
		wx.request({
			url: unescape(this.data.requestURL),
			method: 'GET',
			data: {
				page: this.data.currentPage,
				clerk_id: this.data.profile.id
			},
			header: {
				Authorization: `Bearer ${wx.getStorageSync('token')}`,
				'Content-Type': 'application/json'
			},
			success: function (res) {
				console.log(res.data.result, res.data.data.list, res.data.data.pagination.total_items);
				if (res.data.result === 'success') {
					_this.data.slipData = _this.data.slipData.concat(res.data.data.list)
					_this.setData({
						total: res.data.data.pagination.total_items,
						slipData: _this.data.slipData
					})
				}
			},
			fail: function (err) {
				wx.showToast({
					title: JSON.stringify(err),
					icon: 'none'
				})
			},
			complete: function () {
				wx.hideLoading();
			}
		});
	},

	// 页面跳转 - 公告详情
	goReceivableList: function (e) {
		wx.setStorageSync('receivableOrders', e.currentTarget.dataset.item.orders)
		wx.navigateTo({
			url: `/pages/receivableModule/receivableList/receivableList?url=${this.data.syn_url}`,
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