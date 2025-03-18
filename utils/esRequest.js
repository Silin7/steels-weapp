import baseURL from "./baseURL"
import homeModule from "./sub-unitRequest/homeModule"
import noticeRequest from "./sub-unitRequest/noticeRequest"
import systemRequest from "./sub-unitRequest/systemRequest"

export default (localObjects, parametersData, parameters) => {
  let globalObjects = Object.assign({}, homeModule, noticeRequest, systemRequest)
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