import baseURL from "./baseURL"
import examineRequest from "./sub-unitRequest/examineRequest"
import homeRequest from "./sub-unitRequest/homeRequest"
import inventoryRequest from "./sub-unitRequest/inventoryRequest"
import noticeRequest from "./sub-unitRequest/noticeRequest"
import salesRequest from "./sub-unitRequest/salesRequest"
import systemRequest from "./sub-unitRequest/systemRequest"

export default (localObjects, parametersData, parameters) => {
  let globalObjects = Object.assign({}, examineRequest, homeRequest, inventoryRequest, noticeRequest, salesRequest, systemRequest)
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