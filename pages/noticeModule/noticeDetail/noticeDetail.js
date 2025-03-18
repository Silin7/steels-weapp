// import {
//   baseURL
// } from '../../../utils/baseURL';
import esRequest from '../../../utils/esRequest';
Page({
  data: {
    // baseURL,
    noticeForm: {}
  },

  onLoad: function (option) {
    esRequest('articledetail', '', option.id).then(res => {
      if (res && res.data.status) {
        this.data.noticeForm = res.data.data.data
        this.data.noticeForm.contents = this.data.noticeForm.contents.replace(/\<img/gi, '<img style="max-width:100%; height:auto"')
        this.setData({
          noticeForm: this.data.noticeForm
        })
      }
    })
  },

  // // 打开pdf
  // pdfViewFunction: function (pdfurl) {
  //   wx.showLoading({
  //     title: '加载中',
  //   })
  //   wx.downloadFile({
  //     url: pdfurl,
  //     success: function (res) {
  //       var Path = res.tempFilePath
  //       wx.openDocument({
  //         filePath: Path,
  //         success: function (res) {
  //           console.log("打开文档成功", res);
  //           wx.hideLoading()
  //           setTimeout(() => {
  //             wx.navigateBack({
  //               delta: 1
  //             })
  //           }, 500)
  //         },
  //         fail: function (err) {
  //           wx.hideLoading()
  //           wx.showToast({
  //             title: JSON.stringify(err),
  //             icon: 'none'
  //           })
  //         }
  //       })
  //     },
  //     fail: function (error) {
  //       wx.hideLoading()
  //       wx.showToast({
  //         title: JSON.stringify(error),
  //         icon: 'none'
  //       })
  //     }
  //   })
  // }
})