Page({
	data: {
		searchForm: {
			cunhuo: '',
			waijing: '',
			bihou: '',
			changdu: '',
		}
	},

	onShow: function () {

	},

  // 存货
  cunhuoInput: function (e) {
    this.setData({
      'slipAddForm.cunhuo': e.detail.value
    })
  },

  // 外径
  waijingInput: function (e) {
    this.setData({
      'slipAddForm.waijing': e.detail.value
    })
  },

  // 壁厚
  bihouInput: function (e) {
    this.setData({
      'slipAddForm.bihou': e.detail.value
    })
  },

  // 长度
  changduInput: function (e) {
    this.setData({
      'slipAddForm.changdu': e.detail.value
    })
	},
	
	// 页面跳转
	goInventoryResult: function () {
		wx.navigateTo({
			url: '/pages/inventoryModule/inventoryResult/inventoryResult',
		})
	}

})