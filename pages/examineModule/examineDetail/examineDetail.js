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
				console.log(this.data.dataForm);
			}
		})
	},
	

	// 税前价格
	OrigTaxPriceInput: function (e) {
		const index = e.currentTarget.dataset.index
		this.data.dataForm.OrderDetails[index].OrigTaxPrice = e.detail.value
		this.setData({
			dataForm: this.data.dataForm
		})
	},

})