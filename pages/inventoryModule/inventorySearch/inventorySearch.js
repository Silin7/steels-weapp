import esRequest from '../../../utils/esRequest';

Page({
	data: {
		cangkuShow: false,
		cangkuList: [],
		inventory_update_time: '',
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
		// 选择仓库 - 列表
		esRequest('getdictionary').then(async res => {
			if (res && res.data.status) {
				await res.data.data.cangku.forEach((item) => {
					item.value = item.code
					item.text = item.name
				})
				this.setData({
					cangkuList: res.data.data.cangku,
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