let systemRequest = {
  authLogin: {
    apiMethod: 'GET',
    apiName: '/login',
    name: '登录授权'
  },
  authRegister: {
    apiMethod: 'POST',
    apiName: '/weapp/auth/register',
    name: '注册'
  },
  profile: {
    apiMethod: 'GET',
    apiName: '/weapp/session/profile',
    name: '获取已登录账号信息'
  },
  departments: {
    apiMethod: 'GET',
    apiName: '/weapp/system/departments',
    name: '部门列表'
  },
  companies: {
    apiMethod: 'GET',
    apiName: '/weapp/system/companies',
    name: '企业列表'
  },
}

module.exports = systemRequest