import {
	baseURL
} from '../../utils/baseURL';
import esRequest from '../../utils/esRequest';

Page({
	data: {
		baseURL,
		swiperList: ['/images/homeModule/banner.png', '/images/homeModule/banner.png', '/images/homeModule/banner.png', '/images/homeModule/banner.png'],
		swiperCurrent: 0,
		noticeData: [{
			title: '钢管钢材标题测试',
			content: '用户分享内容到社交媒体或好友，不应该是一种粗暴的...'
		}, {
			title: '钢管钢材标题测试',
			content: '用户分享内容到社交媒体或好友，不应该是一种粗暴的...'
		}]
	},

	onLoad: function () {},

	// 切换banner
	swiperChange: function (e) {
		this.setData({
			swiperCurrent: e.detail.current,
		})
	},

	// 页面跳转 - 下单
	goSlipList: function () {
		wx.navigateTo({
			url: '/pages/salesModule/slipAdd/slipAdd',
		})
		// if (wx.getStorageSync('has_registered')) {
		//   // let role = wx.getStorageSync('profile').profile.role_id
		// } else {
		//   wx.showModal({
		//     title: '登录提醒',
		//     content: '是否前去登录',
		//     success(res) {
		//       if (res.confirm) {
		//         wx.switchTab({
		//           url: '/pages/mineModule/minePage/minePage',
		//         })
		//       }
		//     }
		//   })
		// }
	},

	// 页面跳转 - 库存
	goInventorySearch: function () {
		wx.navigateTo({
			url: '/pages/inventoryModule/inventorySearch/inventorySearch',
		})
	},

	// 页面跳转 - 应收
	goMyReceivable: function () {
		wx.navigateTo({
			url: '/pages/receivableModule/myReceivable/myReceivable',
		})
	},

	// 信息公示 - 列表
	getSystemPosts: function () {
		let _this = this
		this.data.noticeData = []
		esRequest('systemPosts', {
			page: 1
		}).then(async res => {
			if (res && res.data.status) {
				await res.data.data.items.forEach((item, index) => {
					if (index < 2) {
						_this.data.noticeData.push(item)
					}
				})
				this.setData({
					noticeData: this.data.noticeData
				})
			} else {
				wx.showToast({
					title: res.data.message,
					icon: 'none',
					duration: 2000
				})
			}
		})
	},

	// 页面跳转 - 公告列表
	goNoticeList: function () {
		wx.switchTab({
			url: '/pages/noticeModule/noticeList/noticeList'
		})
	},

	// 页面跳转 - 公告详情
	goNoticeDetail: function (e) {
		wx.navigateTo({
			url: '/pages/noticeModule/noticeDetail/noticeDetail?id=' + e.currentTarget.dataset.item.id,
		})
	},
})