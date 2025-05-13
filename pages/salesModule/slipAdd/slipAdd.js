import baseURL from "../../../utils/baseURL"
import esRequest from '../../../utils/esRequest';

Page({
	data: {
		allcompanyShow: false,
		allcompanyList: [],
		supplyShow: false,
		supplyList: [],
		cangkuShow: false,
		cangkuList: [],
		inventoryShow: false,
		caigoukehuShow: false,
		slipAddForm: {
      order_type: '',
      syn_url: '',
			supplier_id: '',
			supplier_code: '',
			supplier_name: '',
			supply_type: '',
			supply_name: '',
			deposit: '',
			TransVehicleInfo: '',
			TransDriverPhone: '',
			TransDriverName: '',
			warehouse_id: '',
			warehouse_name: '',
			Trans_type: '',
			Trans_fee: '',
			pay_type: '',
			Customer_code: '',
			Customer_name: '',
			reason: '',
			// order_type: '0',
			// supplier_id: '1',
			// supplier_name: '山东信誉添城物资有限公司',
			// TransVehicleInfo: '鲁A12345',
			// TransDriverPhone: '18812345678',
			// TransDriverName: '司机姓名',
			// warehouse_id: '04',
			// warehouse_name: '聊城库',
			// Trans_type: '0',
			// Trans_fee: '998',
			// pay_type: '0',
			// Customer_code: '0010163',
			// Customer_name: '陕西五岳工贸有限公司',
			// reason: '123123123123212',
		},
		productIndex: 0,
		products: [{
			inventory_max: '',
			inventory_code: '',
			inventory_name: '',
			outer_diameter: '',
			wall_thickness: '',
			length: '',
			Quantity: '',
			Quantity2: '',
			OrigTaxPrice: '',
		}]
		// {
		// 	inventory_max: '1.9480',
		// 	inventory_code: '0303001',
		// 	inventory_name: '祛筋焊管Q195A',
		// 	outer_diameter: '1',
		// 	wall_thickness: '2',
		// 	length: '3',
		// 	Quantity: '1',
		// 	Quantity2: '5',
		// 	OrigTaxPrice: '6',
		// }, {
		// 	inventory_max: '6.4340',
		// 	inventory_code: '02011563',
		// 	inventory_name: '焊管Q235B',
		// 	outer_diameter: '11',
		// 	wall_thickness: '22',
		// 	length: '33',
		// 	Quantity: '1',
		// 	Quantity2: '55',
		// 	OrigTaxPrice: '66',
		// }

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

	onShow: function () {
		if (!wx.getStorageSync('registered')) {
			wx.showModal({
				title: '未注册',
				content: '是否前往注册页面？',
				complete: (res) => {
					if (res.cancel) {
						wx.navigateBack({
							delta: 1
						})
					}
					if (res.confirm) {
						wx.redirectTo({
							url: '/pages/loginModule/loginPage',
						})
					}
				}
			})
		}
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
      'slipAddForm.syn_url': e.detail.value.syn_url,
      'slipAddForm.supplier_id': e.detail.value.id,
			'slipAddForm.supplier_code': e.detail.value.code,
			'slipAddForm.supplier_name': e.detail.value.name,
		})
	},

	// 供货方式 - 弹出
	supplyShowFunction: function () {
		this.setData({
			supplyShow: true
		})
	},

	// 供货方式 - 选中
	confirmSupply: function (e) {
		this.setData({
			'slipAddForm.supply_type': e.detail.value.value,
			'slipAddForm.supply_name': e.detail.value.text,
		})
	},

	// 预付定金
	depositInput: function (e) {
		this.setData({
			'slipAddForm.deposit': e.detail.value
		})
	},

	depositTouchmove: function () {
		if (this.data.slipAddForm.deposit) {
			this.setData({
				'slipAddForm.deposit': Number(this.data.slipAddForm.deposit).toFixed(2)
			})
		}
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

	// 司机名称
	sijimingchengInput: function (e) {
		this.setData({
			'slipAddForm.TransDriverName': e.detail.value
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
		this.data.products[this.data.productIndex].outer_diameter = e.detail.value.outer_diameter
		this.data.products[this.data.productIndex].wall_thickness = e.detail.value.wall_thickness
		this.data.products[this.data.productIndex].length = e.detail.value.length
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
		if (Number(this.data.products[index].inventory_max) > 0) {
			this.data.products[index].Quantity = e.detail.value
		} else {
			this.data.products[index].Quantity = ''
			wx.showToast({
				title: '暂无库存',
				icon: 'none'
			});
		}
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

	// 单价
	OrigTaxPriceInput: function (e) {
		const index = e.currentTarget.dataset.index
		this.data.products[index].OrigTaxPrice = e.detail.value
		this.setData({
			products: this.data.products
		})
	},

  // 是否含税
  havetaxrateChange: function (e) {
		const index = e.currentTarget.dataset.index
    this.data.products[index].havetaxrate = e.detail.value
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
				const supplyList = []
				await res.data.data.supply_type.forEach((item, index) => {
					supplyList.push({
						"value": index,
						"text": item
					})
				})
				await res.data.data.cangku.forEach((item) => {
					item.value = item.code
					item.text = item.name
				})
				this.setData({
					supplyList: supplyList,
					cangkuList: res.data.data.cangku,
				})
				console.log(this.data.supplyList);
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
			'slipAddForm.Customer_code': e.detail.value.value,
			'slipAddForm.Customer_name': e.detail.value.text
		})
	},

	// 备注
	beizhuInput: function (e) {
		this.setData({
			'slipAddForm.reason': e.detail.value
		})
	},

	// 确定提交
	quedingtijiao: async function () {
		let _this = this
		if (!this.data.slipAddForm.order_type) {
			wx.showToast({
				title: '请选择销货单类型',
				icon: 'none'
			});
			return
		}
		if (!this.data.slipAddForm.supplier_id) {
			wx.showToast({
				title: '请选择销售公司',
				icon: 'none'
			});
			return
		}
		if (!this.data.slipAddForm.TransVehicleInfo) {
			wx.showToast({
				title: '请输入车牌',
				icon: 'none'
			});
			return
		}
		if (!this.data.slipAddForm.TransDriverPhone) {
			wx.showToast({
				title: '请输入物流电话',
				icon: 'none'
			});
			return
		}
		if (!this.data.slipAddForm.warehouse_id) {
			wx.showToast({
				title: '请选择仓库',
				icon: 'none'
			});
			return
		}
		if (!this.data.slipAddForm.Trans_type) {
			wx.showToast({
				title: '请选择运输方式',
				icon: 'none'
			});
			return
		}
		if (!this.data.slipAddForm.Trans_fee) {
			wx.showToast({
				title: '请输入运费',
				icon: 'none'
			});
			return
		}
		if (!this.data.slipAddForm.pay_type) {
			wx.showToast({
				title: '请选择付款类型',
				icon: 'none'
			});
			return
		}
		if (!this.data.slipAddForm.Customer_code) {
			wx.showToast({
				title: '请选择采购客户',
				icon: 'none'
			});
			return
		}
		if (!this.data.slipAddForm.reason) {
			wx.showToast({
				title: '请输入备注',
				icon: 'none'
			});
			return
		}
		var isNext = true
		this.data.slipAddForm.products = this.data.products
		if (this.data.slipAddForm.products.length === 0) {
			wx.showToast({
				title: '请添加产品',
				icon: 'none'
			});
			return
		} else {
			await this.data.slipAddForm.products.forEach(item => {
				for (let key in item) {
					if (item[key] === '') {
						isNext = false
					}
				}
			})
		}
		if (!isNext) {
			wx.showToast({
				title: '请完善产品信息',
				icon: 'none'
			});
			return
		}
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
		wx.request({
			url: baseURL.baseURL + '/postSaleOrderDetails',
			method: 'POST',
			data: JSON.stringify(this.data.slipAddForm),
			header: {
				Authorization: `Bearer ${wx.getStorageSync('token')}`,
				'Content-Type': 'application/json'
			},
			success: function (res) {
				wx.showToast({
					title: '操作成功',
					icon: 'sunccess'
				})
				wx.hideLoading()
			},
			fail: function (err) {
				wx.showToast({
					title: '保存失败' + JSON.stringify(err),
					icon: 'none'
				})
				wx.hideLoading()
			},
		});
	},
})