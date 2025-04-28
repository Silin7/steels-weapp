let examineRequest = {
  voucherlist: {
    apiMethod: 'GET',
    apiName: '/voucher/list',
    name: '审核 获取本人销售订单列表'
  },
  voucherdetail: {
    apiMethod: 'GET',
    apiName: '/voucher/detail',
    name: '审核 销售订单详细'
	},
}

module.exports = examineRequest