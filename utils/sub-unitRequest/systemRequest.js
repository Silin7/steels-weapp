let systemRequest = {
  authLogin: {
    apiMethod: 'POST',
    apiName: '/login',
    name: '登录授权'
	},
	getcompanyphonecode: {
    apiMethod: 'GET',
    apiName: '/getcompanyphonecode',
    name: '获取手机验证码'
	},
	clerkregister: {
    apiMethod: 'POST',
    apiName: '/clerkregister',
    name: '业务人员注册'
	},
}

module.exports = systemRequest