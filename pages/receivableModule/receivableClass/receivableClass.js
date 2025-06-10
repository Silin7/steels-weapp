import esRequest from '../../../utils/esRequest';

Page({
  data: {
    banner: '',
		company: [],
		profile: {}
  },

  onShow: function () {
    if (!wx.getStorageSync('registered')) {
      wx.showModal({
        title: '未注册',
        content: '是否前往注册页面？',
        complete: (res) => {
          if (res.cancel) {
            wx.navigateBack({
              delta: 1
            })
          }
          if (res.confirm) {
            wx.redirectTo({
              url: '/pages/loginModule/loginPage',
            })
          }
        }
      })
      return
		}
		this.setData({
			profile: wx.getStorageSync('profile')
		})
    this.getDataList()
  },

  // 应收导航
  getDataList: function () {
    wx.showLoading({
      title: '加载中',
    })
    esRequest('allsupplier').then(res => {
      if (res && res.data.status) {
        this.setData({
          banner: res.data.data.banner,
          company: res.data.data.company,
        })
      } else {
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 2000
        })
      }
      setTimeout(() => {
        wx.hideLoading();
      }, 500)
    })
  },

  companyBtn: function (e) {
    const item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/receivableModule/myReceivable/myReceivable?url=${item.syn_url}`,
    })
  },

  // 信誉统计
  xytjBtn: function () {
    wx.navigateTo({
      url: `/pages/webModule/webView/webView?webUrl=https://gwapi.duoqixin.com/receivabletotal`
    })
  },

  // 博仕统计
  bstjBtn: function () {
    wx.navigateTo({
      url: `/pages/webModule/webView/webView?webUrl=https://boshi.guoweigt.com/receivabletotal`
    })
  }

})