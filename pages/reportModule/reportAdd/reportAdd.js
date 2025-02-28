import {
  baseURL
} from '../../../utils/baseURL';
import esRequest from '../../../utils/esRequest';

Page({
  data: {
    reportTypeShow: false,
    reportTypeList: ['执法乱作为', '意见建议', '其他'],
    companiesShow: false,
    reportAddForm: {
      is_realname: true,
      company_id: 0,
      company_name: '',
      type: '执法乱作为',
      target_name: '',
      message: '',
      attachments: [],
      need_reply: true,
      phone: '',
    },
  },

  onLoad: function () {
  },

  onShow: function () {
    if (wx.getStorageSync('reportAddForm')) {
      this.setData({
        reportAddForm: wx.getStorageSync('reportAddForm')
      })
    }
  },

  // 是否实名
  chooseShiming: function (e) {
    this.setData({
      'reportAddForm.is_realname': e.currentTarget.dataset.state,
    })
    if (!e.currentTarget.dataset.state) {
      this.setData({
        'reportAddForm.company_id': 0,
        'reportAddForm.company_name': '',
      })
    }
  },

  // 选择企业 - 弹框
  chooseCompanies: function () {
    this.setData({
      companiesShow: true
    })
  },

  // 选择企业 - 选中
  confirmCompanies: function (event) {
    this.setData({
      'reportAddForm.company_id': event.detail.value.id,
      'reportAddForm.company_name': event.detail.value.name,
    })
  },

  // 选择举报类型 - 弹框
  chooseReport: function () {
    this.setData({
      reportTypeShow: true
    })
  },

  // 选择举报类型 - 选中
  confirmReportType: function (event) {
    this.setData({
      'reportAddForm.type': event.detail.value,
    })
  },

  // 反映单位 - input
  reflectingUnitInput: function (e) {
    this.setData({
      'reportAddForm.target_name': e.detail.value,
    })
  },

  // 投诉举报问题详细描述 - input
  describeInput: function (e) {
    this.setData({
      'reportAddForm.message': e.detail.value,
    })
  },

  // 是否需要答复 - change
  isReplyChange: function (e) {
    this.setData({
      'reportAddForm.need_reply': e.detail
    });
    if (!e.detail) {
      this.setData({
        'reportAddForm.phone': '',
      })
    }
  },

  // 答复手机号 - input
  replyPhoneInput: function (e) {
    this.setData({
      'reportAddForm.phone': e.detail.value,
    })
  },

  // 选择文件
  chooseFiles: function () {
    let _this = this
    wx.chooseMedia({
      count: 9,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      maxDuration: 30, // 拍摄视频最长拍摄时间，单位秒。
      camera: 'back', // 仅在 sourceType 为 camera 时生效，使用前置或后置摄像头
      success(res) {
        _this.uploadFiles(res.tempFiles)
      }
    })
  },

  // 上传文件
  uploadFiles: async function (files) {
    files.forEach(async (item) => {
      try {
        let resImg = await this.blockingUploadFiles(item.tempFilePath)
        this.data.reportAddForm.attachments.push(resImg.data)
        this.setData({
          'reportAddForm.attachments': this.data.reportAddForm.attachments
        })
      } catch (error) {
        wx.showToast({
          title: '文件上传失败',
          icon: 'none',
          duration: 2000
        });
      }
    })
  },

  // 闭包上传
  blockingUploadFiles: function (tempFilePath) {
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: `${baseURL}/weapp/session/upload`,
        filePath: tempFilePath,
        name: 'file',
        header: {
          'Authorization': `Bearer ${wx.getStorageSync('token')}`
        },
        success(res) {
          const data = JSON.parse(res.data)
          if (data.status) {
            resolve(JSON.parse(res.data))
          } else {
            reject(new Error('upload failed'))
          }
        },
        fail() {
          reject(new Error('upload failed'))
        }
      })
    })
  },

  // 删除图片
  deleteImg: function (e) {
    let index = e.currentTarget.dataset.index
    this.data.reportAddForm.attachments.splice(index, 1)
    this.setData({
      'reportAddForm.attachments': this.data.reportAddForm.attachments
    })
  },

  // 图片预览
  previewImage: function (e) {
    let urls = []
    for (let i = 0; i < this.data.reportAddForm.attachments.length; i++) {
      urls.push(baseURL + this.data.reportAddForm.attachments[i].url)
    }
    wx.previewImage({
      current: baseURL + e.currentTarget.dataset.url,
      urls
    })
  },

  // 提交
  submitBtn: function () {
    let _this = this
    if (this.data.reportAddForm.is_realname && !this.data.reportAddForm.company_name) {
      wx.showToast({
        title: '请选择企业',
        icon: 'none',
        duration: 2000
      });
      return
    }
    if (this.data.reportAddForm.type === '执法乱作为' && !this.data.reportAddForm.target_name) {
      wx.showToast({
        title: '请填写反映单位',
        icon: 'none',
        duration: 2000
      });
      return
    }
    if (!this.data.reportAddForm.message) {
      wx.showToast({
        title: '请填写举报问题详细描述',
        icon: 'none',
        duration: 2000
      });
      return
    }
    if (this.data.reportAddForm.need_reply) {
      if (!this.data.reportAddForm.phone) {
        wx.showToast({
          title: '请填写答复手机号',
          icon: 'none',
          duration: 2000
        });
        return
      } else {
        if (!/^1[3456789]\d{9}$/.test(this.data.reportAddForm.phone)) {
          wx.showToast({
            title: '手机号格式错误',
            icon: 'none',
            duration: 2000
          });
          return
        }
      }
    }
    wx.showModal({
      title: '提交',
      content: '确定要提交保存数据吗？',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '加载中',
          })
          esRequest('complains', _this.data.reportAddForm).then(res2 => {
            if (res2 && res2.data.status) {
              wx.showToast({
                title: '操作成功',
                icon: 'none',
                duration: 2000
              })
              setTimeout(() => {
                wx.hideLoading();
                wx.navigateBack({
                  delta: 1
                })
              }, 500)
            } else {
              wx.hideLoading();
              wx.showToast({
                title: res2.data.message,
                icon: 'none',
                duration: 2000
              })
            }
          })
        }
      }
    })
  },

  // 页面隐藏 缓存数据
  onHide: function () {
    wx.setStorageSync('reportAddForm', this.data.reportAddForm)
  },

  // 页面卸载 缓存数据
  onUnload: function () {
    wx.setStorageSync('reportAddForm', this.data.reportAddForm)
  },
})