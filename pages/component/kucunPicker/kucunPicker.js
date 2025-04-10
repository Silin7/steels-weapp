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
		inventory_name: '',
		length: '',
		outer_diameter: '',
		wall_thickness: '',
		reachTimer: null,
		inventoryList: [],
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
			esRequest('srchcurrentstock', {
				inventory_name: this.data.inventory_name,
				length: this.data.length,
				outer_diameter: this.data.outer_diameter,
				wall_thickness: this.data.wall_thickness,
			}).then(async res => {
				if (res && res.data.status) {
					await res.data.data.data.forEach((item) => {
						item.value = item.InventoryCode
						item.text = item.InventoryName + ' ' + item.Specification
					})
					this.setData({
						inventoryList: res.data.data.data
					})
				}
			})
		},

		// 存货名
		nameChange: function (e) {
			this.setData({
				inventory_name: e.detail
			})
		},

		// 长度
		lengthChange: function (e) {
			this.setData({
				length: e.detail
			})
		},

		// 外径
		diameterChange: function (e) {
			this.setData({
				outer_diameter: e.detail
			})
		},

		// 壁厚
		thicknessChange: function (e) {
			this.setData({
				wall_thickness: e.detail
			})
		},

		// 查询列表
		queryBtn() {
			let _this = this
			// if (!this.data.inventory_name) {
			// 	wx.showToast({
			// 		title: '请输入存货名',
			// 		icon: 'none',
			// 	})
			// 	return
			// }
			// if (!this.data.length) {
			// 	wx.showToast({
			// 		title: '请输入长度',
			// 		icon: 'none',
			// 	})
			// 	return
			// }
			// if (!this.data.outer_diameter) {
			// 	wx.showToast({
			// 		title: '请输入外径',
			// 		icon: 'none',
			// 	})
			// 	return
			// }
			// if (!this.data.wall_thickness) {
			// 	wx.showToast({
			// 		title: '请输入壁厚',
			// 		icon: 'none',
			// 	})
			// 	return
			// }
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