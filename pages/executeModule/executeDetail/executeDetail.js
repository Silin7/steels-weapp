Page({
  data: {
    executeForm: {},
    shareShow: false,
    shareShowLag: false,
    sharePassword: '3T8UY2',
  },

  onShow: function () {
    this.setData({
      executeForm: wx.getStorageSync('executeDetailStorage')
    })
  },

  // 分享弹框 - 弹出
  sharePopupShow: function () {
    this.setData({
      shareShow: true
    });
    setTimeout(() => {
      this.setData({
        shareShowLag: true
      });
    }, 200)
  },

  // 分享弹框 - 关闭
  sharePopupClose: function () {
    this.setData({
      shareShowLag: false,
      shareShow: false
    });
  },

  // 一键复制
  copyText: function () {
    wx.setClipboardData({ // 设置系统剪贴板的内容
      data: this.data.sharePassword,
      success(res) {
        console.log('设置系统剪贴板的内容', res);
        wx.getClipboardData({ // 获取系统剪贴板的内容
          success(res) {
            console.log('获取系统剪贴板的内容', res);
            wx.showToast({
              title: '复制成功',
            })
          }
        })
      }
    })
  }
})