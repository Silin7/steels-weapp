import esRequest from '../../../utils/esRequest';

Component({
	properties: {
		pickerShow: {
			type: Boolean,
			value: false,
		},
		defaultValue: {
			type: String,
			value: '',
		}
	},

	data: {
		companycode: '',
		customername: '',
		reachTimer: null,
		customerList: [],
	},

	attached: function () {},

	ready: function () {
		// this.setData({
		//   companyName: this.properties.defaultValue,
		// })
		// this.getDataList()
	},


	methods: {
		getDataList: function () {
			esRequest('customers', {
				// companycode: '04',
				// customername: '陕西'
				companycode: this.data.companycode,
				customername: this.data.customername,
			}).then(async res => {
				if (res && res.data.code === 200) {
					await res.data.data.customer.forEach((item) => {
						item.value = item.Code
						item.text = item.Name
					})
					this.setData({
						customerList: res.data.data.customer
					})
				}
			})
		},

		// 请输入公司编号
		codeChange: function (e) {
			this.setData({
				companycode: e.detail
			})
		},

		// 请输入公司名称
		nameChange: function (e) {
			this.setData({
				customername: e.detail
			})
		},

		// 查询列表
		queryBtn() {
			let _this = this
			console.log('this.data.companycode', this.data.companycode);
			if (!this.data.companycode) {
				wx.showToast({
					title: '请输入公司编号',
					icon: 'none',
				})
				return
			}
			if (!this.data.customername) {
				wx.showToast({
					title: '请输入公司名称',
					icon: 'none',
				})
				return
			}
			_this.getDataList()
			// clearTimeout(this.data.reachTimer)
			// this.data.reachTimer = setTimeout(function () {}, 1000)
		},

		// 取消按钮
		onCancel: function () {
			this.setData({
				pickerShow: false
			})
		},

		// 确定按钮
		onConfirm: function (event) {
			const {
				picker,
				value,
				index
			} = event.detail;
			console.log(picker, value, index);
			this.triggerEvent('confirmItem', event.detail)
			this.onCancel()
		}
	}
})