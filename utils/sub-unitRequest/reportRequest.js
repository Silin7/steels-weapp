let reportRequest = {
  complains: {
    apiMethod: 'POST',
    apiName: '/weapp/complains',
    name: '企业提交投诉举报'
  },
  complainsList: {
    apiMethod: 'GET',
    apiName: '/weapp/complains',
    name: '企业投诉列表'
  },
}

module.exports = reportRequest