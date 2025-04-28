import esRequest from '../../../utils/esRequest';

Page({

	data: {
		voucherId: '',
		dataForm: {},
	},

	onLoad: function (options) {
		this.setData({
			voucherId: options.id || ''
		})
		esRequest('voucherdetail', {
			id: this.data.voucherId
		}).then(res => {
			if (res && res.data.status) {
				res.data.data.data.OrderDetails = JSON.parse(res.data.data.data.OrderDetails) || []
				this.setData({
					dataForm: res.data.data.data
				})
			}
		})
	},

})