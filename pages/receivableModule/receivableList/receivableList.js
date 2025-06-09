Page({
	data: {
		syn_url: '',
		receivableOrders: []
	},

	onLoad: function (options) {
		this.setData({
			syn_url: unescape(options.url),
			receivableOrders: wx.getStorageSync('receivableOrders')
		})
	},

	ckdxxBtn: function (e) {
		const webUrl = `${this.data.syn_url}/deliverydetail/${e.currentTarget.dataset.item.id}`
		wx.navigateTo({
			url: `/pages/webModule/webView/webView?webUrl=${webUrl}`
		})
	}
})