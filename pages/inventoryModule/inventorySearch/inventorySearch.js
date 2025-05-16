import esRequest from '../../../utils/esRequest';

Page({
	data: {
		allcompanyShow: false,
		allcompanyList: [],
		cangkuShow: false,
		cangkuList: [],
		inventory_update_time: '',
		supplier_name: '',
		searchForm: {
			warehouse_code: '',
			warehouse_name: '',
			inventory_name: '',
			outer_diameter: '',
			wall_thickness: '',
			length: '',
		}
	},

	onLoad: function () {
		this.getAllcompany()
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
					inventory_update_time: res.data.data.inventory_update_time
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
	confirmAllcompany: async function (e) {
		this.setData({
			'searchForm.warehouse_code': '',
			'searchForm.warehouse_name': '',
			cangkuList: []
		})
		// 带出仓库
		let cangkuList = e.detail.value.cangku
		await cangkuList.forEach((item) => {
			item.value = item.code
			item.text = item.name
		})
		this.setData({
			supplier_name: e.detail.value.name,
			cangkuList: cangkuList,
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
			'searchForm.warehouse_code': e.detail.value.code,
			'searchForm.warehouse_name': e.detail.value.name,
		})
	},

	// 存货
	cunhuoInput: function (e) {
		this.setData({
			'searchForm.inventory_name': e.detail.value
		})
	},

	// 外径
	waijingInput: function (e) {
		this.setData({
			'searchForm.outer_diameter': e.detail.value
		})
	},

	// 壁厚
	bihouInput: function (e) {
		this.setData({
			'searchForm.wall_thickness': e.detail.value
		})
	},

	// 长度
	changduInput: function (e) {
		this.setData({
			'searchForm.length': e.detail.value
		})
	},

	// 页面跳转
	goInventoryResult: function () {
		wx.setStorageSync('inventoryStorage', this.data.searchForm)
		wx.navigateTo({
			url: '/pages/inventoryModule/inventoryResult/inventoryResult',
		})
	}
})