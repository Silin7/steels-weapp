import esRequest from '../../../utils/esRequest';

Page({
  data: {
    webUrl: '',
  },

  onLoad: function (options) {
    this.setData({
      webUrl: options.webUrl,
    })
  },
})