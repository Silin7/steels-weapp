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
			has_registered: wx.getStorageSync('registered') || false,
		})
		if (this.data.has_registered && wx.getStorageSync('profile')) {
			this.setData({
				profile: wx.getStorageSync('profile') || {}
			})
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

	// 页面跳转 - 下单
	goSlipList: function (e) {
		wx.setStorageSync('slipType', e.currentTarget.dataset.type)
		setTimeout(() => {
			wx.switchTab({
				url: '/pages/salesModule/slipList/slipList',
			})
		}, 500)
	},

	// 页面跳转 - 应收
	goMyReceivable: function () {
		wx.navigateTo({
			url: '/pages/receivableModule/myReceivable/myReceivable',
		})
	},

	// 页面跳转 - 审核
	goExamineList: function () {
		wx.navigateTo({
			url: '/pages/examineModule/examineList/examineList',
		})
	},

	// 页面跳转 - 用户资料
	goUserInfo: function () {
		if (!this.data.has_registered || !wx.getStorageSync('profile')) {
			wx.navigateTo({
				url: '/pages/loginModule/loginPage',
			})
			return
		}
		wx.navigateTo({
			url: '/pages/mineModule/userInfo/userInfo',
		})
	},
})