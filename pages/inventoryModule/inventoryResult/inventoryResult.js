import esRequest from '../../../utils/esRequest';

Page({
  data: {
		inventoryList: []
  },

  onLoad(options) {

  },

  onShow() {
		const inventoryStorage = wx.getStorageSync('inventoryStorage')
		esRequest('srchstock', inventoryStorage).then(async res => {
			if (res && res.data.status) {
				this.setData({
					inventoryList: res.data.data.data
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
})