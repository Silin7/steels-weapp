import {
	baseURL
} from '../../../utils/baseURL';
import esRequest from '../../../utils/esRequest';

Page({
	data: {
		baseURL,
		triggered: true,
		sliptype: 99,
		reachTimer: null,
		total: 0,
		currentPage: 1,
		slipData: []
	},

	onShow: function () {
		if (!wx.getStorageSync('registered')) {
			wx.showModal({
				title: '未注册',
				content: '是否前往注册页面？',
				complete: (res) => {
					if (res.cancel) {
					}
					if (res.confirm) {
						wx.redirectTo({
							url: '/pages/loginModule/loginPage',
						})
					}
				}
			})
			return
		}
		if (!wx.getStorageSync('slipType')) {
			console.log('zou if');
			this.setData({
				sliptype: 99
			})
		} else {
			console.log('zou else');
			this.setData({
				sliptype: wx.getStorageSync('slipType')
			})
		}
		console.log('this.setData.sliptype', this.setData.sliptype);
	
		this.initFunction()
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

	// 销售单列表
	getDataList: function () {
		wx.showLoading({
			title: '加载中',
		})
		esRequest('myvouchers', {
			page: this.data.currentPage,
			status: this.data.sliptype,
		}).then(async res => {
			if (res && res.data.status) {
				await res.data.data.data.forEach(item => {
					item.OrderDetails = JSON.parse(item.OrderDetails)
				})
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
	goSlipDetail: function (e) {
		wx.setStorageSync('slipDetail', e.currentTarget.dataset.item)
		wx.navigateTo({
			url: `/pages/salesModule/slipDetail/slipDetail?id=${e.currentTarget.dataset.item.id}`
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


	onHide: function () {
		wx.removeStorageSync('slipType')
	}

})