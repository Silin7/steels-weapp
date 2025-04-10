import esRequest from '../../../utils/esRequest';

Page({
	data: {
		allcompanyShow: false,
		allcompanyList: [],
		cangkuShow: false,
		cangkuList: [],
		inventoryShow: false,
		caigoukehuShow: false,
		slipAddForm: {
			order_type: '0',
			supplier_id: '1',
			supplier_name: '山东信誉添城物资有限公司',
			TransVehicleInfo: '鲁A12345',
			TransDriverPhone: '18812345678',
			warehouse_id: '04',
			warehouse_name: '聊城库',
			Trans_type: '0',
			Trans_fee: '998',
			pay_type: '0',
			jiage: '999',
			caigoukehu_code: '0010163',
			caigoukehu_name: '陕西五岳工贸有限公司',
			reason: '123123123123212',
		},
		productIndex: 0,
		products: [{
			inventory_max: '1.9480',
			inventory_code: '0303001',
			inventory_name: '祛筋焊管Q195A',
			outer_diameter: '1',
			wall_thickness: '2',
			length: '3',
			Quantity: '4',
			Quantity2: '5',
			OrigTaxPrice: '6',
		}, {
			inventory_max: '6.4340',
			inventory_code: '02011563',
			inventory_name: '焊管Q235B',
			outer_diameter: '11',
			wall_thickness: '22',
			length: '33',
			Quantity: '44',
			Quantity2: '55',
			OrigTaxPrice: '66',
		}]
	},

	onLoad: function () {
		// // 获取部门列表
		// esRequest('customers', {
		// 	companycode: '04',
		// 	customername: '陕西'
		// }).then(async res => {
		//   console.log(res);
		// })
		this.getAllcompany()
		this.getdictionaryList()
	},

	// 销货单类型
	xiaohuodanleixingChange: function (e) {
		this.setData({
			'slipAddForm.order_type': e.detail.value
		})
	},

	// 销售公司 - 列表
	getAllcompany: function () {
		esRequest('allcompany').then(async res => {
			if (res && res.data.status) {
				await res.data.data.company.forEach((item) => {
					item.value = item.code
					item.text = item.name
				})
				this.setData({
					allcompanyList: res.data.data.company,
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

	// 销售公司 - 弹出
	allcompanyShowFunction: function () {
		this.setData({
			allcompanyShow: true
		})
	},

	// 销售公司 - 选中
	confirmAllcompany: function (e) {
		this.setData({
			'slipAddForm.supplier_id': e.detail.value.id,
			'slipAddForm.supplier_name': e.detail.value.name,
		})
	},

	// 车牌
	chepaiInput: function (e) {
		this.setData({
			'slipAddForm.TransVehicleInfo': e.detail.value
		})
	},

	// 物流电话
	wuliudianhuaInput: function (e) {
		this.setData({
			'slipAddForm.TransDriverPhone': e.detail.value
		})
	},

	// 新增产品
	chanpinAdd: function () {
		this.data.products.push({
			inventory_max: '',
			inventory_code: '',
			inventory_name: '',
			outer_diameter: '',
			wall_thickness: '',
			length: '',
			Quantity: '',
			Quantity2: '',
			OrigTaxPrice: '',
		})
		this.setData({
			products: this.data.products
		})
	},

	// 删除产品
	chanpinDel: function (e) {
		this.data.products.splice(e.currentTarget.dataset.index, 1)
		this.setData({
			products: this.data.products
		})
	},

	// 产品名称 - 弹出
	inventoryShowFunction: function (e) {
		this.setData({
			productIndex: e.currentTarget.dataset.index,
			inventoryShow: true
		})
	},

	// 产品名称 - 弹框确认
	inventoryConfirmFunction: function (e) {
		this.data.products[this.data.productIndex].inventory_max = e.detail.value.AvailableQuantity
		this.data.products[this.data.productIndex].inventory_code = e.detail.value.InventoryCode
		this.data.products[this.data.productIndex].inventory_name = e.detail.value.InventoryName
		this.setData({
			products: this.data.products
		})
	},

	// 外径
	waijingInput: function (e) {
		const index = e.currentTarget.dataset.index
		this.data.products[index].outer_diameter = e.detail.value
		this.setData({
			products: this.data.products
		})
	},

	// 壁厚
	bihouInput: function (e) {
		const index = e.currentTarget.dataset.index
		this.data.products[index].wall_thickness = e.detail.value
		this.setData({
			products: this.data.products
		})
	},

	// 长度
	changduInput: function (e) {
		const index = e.currentTarget.dataset.index
		this.data.products[index].length = e.detail.value
		this.setData({
			products: this.data.products
		})
	},

	// 数量
	shuliangInput: function (e) {
		const index = e.currentTarget.dataset.index
		this.data.products[index].Quantity = e.detail.value
		this.setData({
			products: this.data.products
		})
	},

	// 支数
	zhishuInput: function (e) {
		const index = e.currentTarget.dataset.index
		this.data.products[index].Quantity2 = e.detail.value
		this.setData({
			products: this.data.products
		})
	},

	// 税前价格
	OrigTaxPriceInput: function (e) {
		const index = e.currentTarget.dataset.index
		this.data.products[index].OrigTaxPrice = e.detail.value
		this.setData({
			products: this.data.products
		})
	},

	// // 仓库
	// cangkuInput: function (e) {
	//   this.setData({
	//     'slipAddForm.cangku': e.detail.value
	//   })
	// },

	// 选择仓库 - 列表
	getdictionaryList: function () {
		esRequest('getdictionary').then(async res => {
			if (res && res.data.status) {
				await res.data.data.cangku.forEach((item) => {
					item.value = item.code
					item.text = item.name
				})
				this.setData({
					cangkuList: res.data.data.cangku,
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

	// 选择仓库 - 弹出
	cangkuShowFunction: function () {
		this.setData({
			cangkuShow: true
		})
	},

	// 选择仓库 - 选中
	confirmCangku: function (e) {
		this.setData({
			'slipAddForm.warehouse_id': e.detail.value.code,
			'slipAddForm.warehouse_name': e.detail.value.name,
		})
	},

	// 运输方式
	yunshufangshiChange: function (e) {
		this.setData({
			'slipAddForm.Trans_type': e.detail.value
		})
	},

	// 运费
	yunfeiInput: function (e) {
		this.setData({
			'slipAddForm.Trans_fee': e.detail.value
		})
	},

	// 付款类型
	fukuanleixingChange: function (e) {
		this.setData({
			'slipAddForm.pay_type': e.detail.value
		})
	},

	// 价格
	jiageInput: function (e) {
		this.setData({
			'slipAddForm.jiage': e.detail.value
		})
	},

	// // 采购客户
	// caigoukehuInput: function (e) {
	// 	this.setData({
	// 		'slipAddForm.caigoukehu': e.detail.value
	// 	})
	// },

	// 采购客户 - 弹出
	caigoukehuShowFunction: function (e) {
		this.setData({
			caigoukehuShow: true
		})
	},

	// 采购客户 - 弹框确认
	caigoukehuConfirmFunction: function (e) {
		console.log('弹框确认', e.detail.value);
		this.setData({
			'slipAddForm.caigoukehu_code': e.detail.value.value,
			'slipAddForm.caigoukehu_name': e.detail.value.text
		})
	},

	// 备注
	beizhuInput: function (e) {
		this.setData({
			'slipAddForm.reason': e.detail.value
		})
	},

	// 确定提交
	quedingtijiao: function () {
		let _this = this
		// if (!this.data.classForm.cityId) {
		// 	wx.showToast({
		// 		title: '请选择学校所在地',
		// 		icon: 'none'
		// 	});
		// 	return
		// }
		wx.showModal({
			title: '提交',
			content: '确定要提交保存数据吗？',
			success(res) {
				if (res.confirm) {
					_this.submitRequest()
				}
			}
		})
	},

	// 确定要提交保存数据吗？
	submitRequest: function () {
		wx.showLoading({
			title: '加载中',
		})
		this.data.slipAddForm.products = this.data.products
		esRequest('postSaleOrderDetails', this.data.slipAddForm).then(res => {
			console.log(res);
			// wx.showToast({
			// 	title: '操作成功',
			// 	icon: 'none'
			// })
			// wx.hideLoading()
			// setTimeout(() => {
			// 	wx.navigateBack({
			// 		delta: 1
			// 	})
			// }, 500)
		})
	},
})