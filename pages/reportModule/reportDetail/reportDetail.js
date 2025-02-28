import {
  baseURL
} from '../../../utils/baseURL';
import esRequest from '../../../utils/esRequest';

Page({
data: {
    reportForm: {}
  },

  onLoad: function (option) {
    esRequest('complainsList', '', option.id).then(res => {
      this.data.reportForm = res.data.data
      this.setData({
        reportForm: this.data.reportForm
      })
    })
  },

  // 图片预览
  previewImage: function (e) {
    let urls = []
    for (let i = 0; i < this.data.reportForm.attachments.length; i++) {
      urls.push(baseURL + this.data.reportForm.attachments[i].url)
    }
    wx.previewImage({
      current: baseURL + e.currentTarget.dataset.url,
      urls
    })
  },
})