import {
	baseURL
} from '../../../utils/baseURL';
import esRequest from '../../../utils/esRequest';

Page({
	data: {
		userInfo: {
			name: '',
			avatar: '',
			phone: '',
			registertime: '',
		}
	},

	onShow() {
		// this.getCurrentDateTime()
		this.setData({
			userInfo: wx.getStorageSync('profile') || {}
		})
	},

	// 用户名
	nicknameInput: function (e) {
		this.setData({
			'userInfo.name': e.detail.value
		})
	},

	// 头像
	onChooseAvatar: function (e) {
		console.log("123", e.detail.avatarUrl);
		let _this = this
		wx.showLoading({
			title: '上传中',
		})
		wx.uploadFile({
			url: `${baseURL}/uploadimg`,
			filePath: e.detail.avatarUrl,
			name: 'file',
			dataType: 'json',
			header: {
				'Authorization': `Bearer ${wx.getStorageSync('token')}`
			},
			success(res) {
				setTimeout(() => {
					const data = JSON.parse(res.data)
					if (data && data.status) {
						console.log(data.data.url);
						_this.setData({
							'userInfo.avatar': data.data.url
						})
					} else {
						wx.showToast({
							title: data.message,
						})
					}
				}, 200)
			},
			complete() {
				wx.hideLoading()
			}
		})
	},

	// 姓名
	usernameInput: function (e) {
		this.setData({
			'userInfo.username': e.detail.value
		})
	},

	// 保存资料
	baocunziliao: function () {
		esRequest('profilepost', {
			nickname: this.data.userInfo.name,
			avatar: this.data.userInfo.avatar,
		}).then(res => {
      if (res && res.data.status) {
				wx.setStorageSync('profile', res.data.data.profile)
        wx.showToast({
          title: '操作成功',
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      } else {
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 2000
        })
      }
    })
	},

	// // 手机号
	// phoneInput: function (e) {
	// 	this.setData({
	// 		'userInfo.phone': e.detail.value
	// 	})
	// },

	// // 当前日期
	// getCurrentDateTime: function () {
	// 	const now = new Date();
	// 	const year = now.getFullYear();
	// 	const month = String(now.getMonth() + 1).padStart(2, '0');
	// 	const day = String(now.getDate()).padStart(2, '0');
	// 	const hours = String(now.getHours()).padStart(2, '0');
	// 	const minutes = String(now.getMinutes()).padStart(2, '0');
	// 	const seconds = String(now.getSeconds()).padStart(2, '0');
	// 	this.setData({
	// 		'userInfo.registertime': `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
	// 	})
	// },
})