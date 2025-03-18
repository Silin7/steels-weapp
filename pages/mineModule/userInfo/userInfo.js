import {
	baseURL
} from '../../../utils/baseURL';

Page({
	data: {
		userInfo: {
			nickname: '白晓生',
			avatar: '/images/mineModule/avatar.png',
			username: '秦墨',
			phone: '18888888888',
			registertime: '',
		}
	},

	onShow() {
		this.getCurrentDateTime()
	},

	// 用户名
	nicknameInput: function (e) {
		this.setData({
			'userInfo.nickname': e.detail.value
		})
	},

	// 头像
	onChooseAvatar: function (e) {
		let _this = this
		wx.uploadFile({
			url: `${baseURL}/weapp/session/avatar`,
			filePath: e.detail.avatarUrl,
			name: 'file',
			header: {
				'Authorization': `Bearer ${wx.getStorageSync('token')}`
			},
			success() {
				setTimeout(() => {
					_this.getUser()
				}, 200)
			}
		})
	},

	// 姓名
	usernameInput: function (e) {
		this.setData({
			'userInfo.username': e.detail.value
		})
	},

	// 手机号
	phoneInput: function (e) {
		this.setData({
			'userInfo.phone': e.detail.value
		})
	},

	// 当前日期
	getCurrentDateTime: function () {
		const now = new Date();
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, '0');
		const day = String(now.getDate()).padStart(2, '0');
		const hours = String(now.getHours()).padStart(2, '0');
		const minutes = String(now.getMinutes()).padStart(2, '0');
		const seconds = String(now.getSeconds()).padStart(2, '0');
		this.setData({
			'userInfo.registertime': `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
		})
	},
})