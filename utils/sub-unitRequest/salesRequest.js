let salesRequest = {
  customers: {
    apiMethod: 'POST',
    apiName: '/customers',
    name: '获取采购客户资料'
	},
  allcompany: {
    apiMethod: 'GET',
    apiName: '/allcompany',
    name: '获取所有销售公司'
  },
  myvouchers: {
    apiMethod: 'GET',
    apiName: '/myvouchers',
    name: '获取本人销售订单列表'
  },
  getSaleOrderByVoucherCode: {
    apiMethod: 'POST',
    apiName: '/getSaleOrderByVoucherCode/1',
    name: '获取T+上的销售订单详细'
	},
  postSaleOrderDetails: {
    apiMethod: 'POST',
    apiName: '/postSaleOrderDetails',
    name: '提交销售订单'
	},
}

module.exports = salesRequest