let executeRequest = {
  executePage: {
    apiMethod: 'GET',
    apiName: '/weapp/events',
    name: '执法记录列表'
  },
  executeEvents: {
    apiMethod: 'POST',
    apiName: '/weapp/events',
    name: '执法人员提交执法记录'
  },
  executeEventsCheck: {
    apiMethod: 'POST',
    apiName: '/weapp/events/check',
    name: '企业执法预检提示'
  },
}

module.exports = executeRequest