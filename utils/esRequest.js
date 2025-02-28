import baseURL from "./baseURL"
import executeRequest from "./sub-unitRequest/executeRequest"
import noticeRequest from "./sub-unitRequest/noticeRequest"
import reportRequest from "./sub-unitRequest/reportRequest"
import systemRequest from "./sub-unitRequest/systemRequest"
import upgradeModule from "./sub-unitRequest/upgradeModule"

export default (localObjects, parametersData, parameters) => {
  let globalObjects = Object.assign({}, executeRequest, noticeRequest, reportRequest, systemRequest, upgradeModule)
  let apiMethod = globalObjects[localObjects].apiMethod
  if (parameters) {
    var requestURL = baseURL.baseURL + globalObjects[localObjects].apiName + '/' + parameters
  } else {
    var requestURL = baseURL.baseURL + globalObjects[localObjects].apiName
  }
  return new Promise((resolve, reject) => {
    wx.request({
      method: apiMethod,
      url: requestURL,
      data: parametersData,
      header: {
        Authorization: `Bearer ${wx.getStorageSync('token')}`
      },
      success(res) {
        resolve(res)
      },
      fail(err) {
        console.warn('fail' + JSON.stringify(err))
        reject(err)
      }
    })
  })
}