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
			xiaohuodanleixing: '',
			xiaoshougongsi_code: '',
			xiaoshougongsi_name: '',
			chepai: '',
			wuliudianhua: '',
			warehouse_code: '',
			warehouse_name: '',
			yunshufangshi: '',
			yunfei: '',
			fukuanleixing: '',
			jiage: '',
			caigoukehu_code: '',
			caigoukehu_name: '',
			reason: '',
		},
		chanpinliebiao: [{
			chanpinmingcheng: '',
			waijing: '',
			bihou: '',
			changdu: '',
			shuliang: '',
			zhishu: '',
			OrigTaxPrice: '',
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
			'slipAddForm.xiaohuodanleixing': e.detail.value
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
			'slipAddForm.xiaoshougongsi_code': e.detail.value.code,
			'slipAddForm.xiaoshougongsi_name': e.detail.value.name,
		})
	},

	// 车牌
	chepaiInput: function (e) {
		this.setData({
			'slipAddForm.chepai': e.detail.value
		})
	},

	// 物流电话
	wuliudianhuaInput: function (e) {
		this.setData({
			'slipAddForm.wuliudianhua': e.detail.value
		})
	},

	// 新增产品
	chanpinAdd: function () {
		this.data.chanpinliebiao.push({
			chanpinmingcheng: '',
			waijing: '',
			bihou: '',
			changdu: '',
			shuliang: '',
			zhishu: '',
			OrigTaxPrice: '',
		})
		this.setData({
			chanpinliebiao: this.data.chanpinliebiao
		})
	},

	// 删除产品
	chanpinDel: function (e) {
		this.data.chanpinliebiao.splice(e.currentTarget.dataset.index, 1)
		this.setData({
			chanpinliebiao: this.data.chanpinliebiao
		})
	},

	// 产品名称
	chanpinmingchengInput: function (e) {
		const index = e.currentTarget.dataset.index
		this.data.chanpinliebiao[index].chanpinmingcheng = e.detail.value
		this.setData({
			chanpinliebiao: this.data.chanpinliebiao
		})
	},

	// 外径
	waijingInput: function (e) {
		const index = e.currentTarget.dataset.index
		this.data.chanpinliebiao[index].waijing = e.detail.value
		this.setData({
			chanpinliebiao: this.data.chanpinliebiao
		})
	},

	// 壁厚
	bihouInput: function (e) {
		const index = e.currentTarget.dataset.index
		this.data.chanpinliebiao[index].bihou = e.detail.value
		this.setData({
			chanpinliebiao: this.data.chanpinliebiao
		})
	},

	// 长度
	changduInput: function (e) {
		const index = e.currentTarget.dataset.index
		this.data.chanpinliebiao[index].changdu = e.detail.value
		this.setData({
			chanpinliebiao: this.data.chanpinliebiao
		})
	},

	// 数量
	shuliangInput: function (e) {
		const index = e.currentTarget.dataset.index
		this.data.chanpinliebiao[index].shuliang = e.detail.value
		this.setData({
			chanpinliebiao: this.data.chanpinliebiao
		})
	},

	// 支数
	zhishuInput: function (e) {
		const index = e.currentTarget.dataset.index
		this.data.chanpinliebiao[index].zhishu = e.detail.value
		this.setData({
			chanpinliebiao: this.data.chanpinliebiao
		})
	},

	// 税前价格
	OrigTaxPriceInput: function (e) {
		const index = e.currentTarget.dataset.index
		this.data.chanpinliebiao[index].OrigTaxPrice = e.detail.value
		this.setData({
			chanpinliebiao: this.data.chanpinliebiao
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
			'slipAddForm.warehouse_code': e.detail.value.code,
			'slipAddForm.warehouse_name': e.detail.value.name,
		})
	},

	// 运输方式
	yunshufangshiChange: function (e) {
		this.setData({
			'slipAddForm.yunshufangshi': e.detail.value
		})
	},

	// 运费
	yunfeiInput: function (e) {
		this.setData({
			'slipAddForm.yunfei': e.detail.value
		})
	},

	// 付款类型
	fukuanleixingChange: function (e) {
		this.setData({
			'slipAddForm.fukuanleixing': e.detail.value
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

	// 产品库存 - 弹出
	inventoryShowFunction: function (e) {
		this.setData({
			inventoryShow: true
		})
	},

	// 产品库存 - 弹框确认
	inventoryConfirmFunction: function (e) {
		console.log('弹框确认', e.detail.value);
		this.setData({
			'slipAddForm.inventory_code': e.detail.value.value,
			'slipAddForm.inventory_name': e.detail.value.text
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
			'slipAddForm.caigoukehu_code': e.detail.value.value,
			'slipAddForm.caigoukehu_name': e.detail.value.text
		})
	},

	// 备注
	beizhuInput: function (e) {
		this.setData({
			'slipAddForm.beizhu': e.detail.value
		})
	},

	// 确定提交
	quedingtijiao: function () {
		console.log(this.data);
	}

})