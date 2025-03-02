// import {
//   baseURL
// } from '../../../utils/baseURL';
// import esRequest from '../../../utils/esRequest';
Page({
  data: {
    // baseURL,
    noticeForm: {
      title: '钢管钢材标题测试',
      content: '下面我们会从不同维度来分析一下APP的社交分享功能设计，看看这里面有哪些值得探讨之处。作为用户和产品之间的桥梁，社交分享在产品的发展过程中扮演了重要的角色。分享时机，在不同的时机分析用户是否有分享的意愿，提供给他们合适的分享内容，能让分享的效果更好。为了借助社交产品的流量，让用户主动分享APP中的内容到社交平台来达到拉新和促活的目的，市场上绝大多数APP都有第三方分享的功能，它是内容分发的最有效途径，并且大大降低了企业的营销成本。在常用的社交分享组件中，微信（微信好友和朋友圈）、微博、QQ（QQ好友和QQ空间）是三大主要平台，而其中微信凭借高达9...',
      date: '2025-03-01 10:09',
    }
  },

  onLoad: function (option) {
    // esRequest('systemPosts', '', option.id).then(res => {
    //   if (res.data.data.pdf) {
    //     this.pdfViewFunction(baseURL + res.data.data.pdf)
    //   } else {
    //     this.data.noticeForm = res.data.data
    //     this.data.noticeForm.content = this.data.noticeForm.content.replace(/\<img/gi, '<img style="max-width:100%; height:auto"')
    //     this.setData({
    //       noticeForm: this.data.noticeForm
    //     })
    //   }
    // })
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