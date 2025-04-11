import esRequest from '../../../utils/esRequest';

Page({

  data: {
		dataForm: {}
    // voucherCode: '',
  },

  onLoad: function () {
		this.setData({
			dataForm: wx.getStorageSync('slipDetail')
		})
    // this.setData({
    //   voucherCode: options.voucherCode || 'SO-2025-03-0008'
    // })
    // esRequest('getSaleOrderByVoucherCode', {
    //   voucherCode:this.data.voucherCode
    // }).then(res => {
    //   console.log(res);
    // })
  },

})