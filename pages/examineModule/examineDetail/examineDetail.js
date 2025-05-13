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
      } else {
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },


  // 单价
  OrigTaxPriceInput: function (e) {
    const index = e.currentTarget.dataset.index
    this.data.dataForm.OrderDetails[index].OrigTaxPrice = e.detail.value
    this.setData({
      dataForm: this.data.dataForm
    })
  },

  csvUploaddataFunction: function () {
    esRequest('csvUploaddata', {
      orderId: this.data.voucherId
    }, null, this.data.dataForm.supplier.syn_url || null).then(res => {
      // status  ===  字符串false
      console.log(res.data.status);
      if (res && res.data.status) {
        wx.showToast({
          title: '操作成功',
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      } else {
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 2000
        })
      }
    })
	},
	
	csvSaveNewPricesFunction: function () {
		const newPrices = []
		for (let i = 0; i < this.data.dataForm.OrderDetails.length; i++) {
			newPrices.push(Number(this.data.dataForm.OrderDetails[i].OrigTaxPrice))
		}
    esRequest('csvSaveNewPrices', {
			orderId: this.data.voucherId,
			newPrices,
    }, null, this.data.dataForm.supplier.syn_url || null).then(res => {
      if (res && res.data.status) {
        wx.showToast({
          title: '操作成功',
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      } else {
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 2000
        })
      }
    })
	},

})