import {
  baseURL
} from '../../../utils/baseURL';
import esRequest from '../../../utils/esRequest';

Page({
  data: {
    id: '',
    executeUpdateForm: {
      result_type: '整改类',
      punish_types: '',
      punish_str: '',
      moneyShow: false,
      punish_money: '',
      result: '',
      attachments: [],
    },
    punishShow: false,
    punishList: [{
        checked: false,
        value: 1,
        text: '警告、通报批评'
      },
      {
        checked: false,
        value: 2,
        text: '罚款、没收违法所得、没收非法财物'
      },
      {
        checked: false,
        value: 3,
        text: '暂扣许可证件、降低资质等级、吊销许可证件'
      },
      {
        checked: false,
        value: 4,
        text: '限制开展生产经营活动、责令停产停业、责令关闭、限制从业'
      },
      {
        checked: false,
        value: 5,
        text: '行政拘留'
      },
      {
        checked: false,
        value: 6,
        text: '法律、行政法规规定的其他行政处罚'
      },
    ],
  },

  onLoad: function (option) {
    this.data.id = option.id
    // esRequest('executePage', '', option.id).then(res => {
    //   console.log(res);
    // })
  },

  // 检查结果上传 - change
  resultTagClick: function (e) {
    this.setData({
      'executeUpdateForm.result_type': e.currentTarget.dataset.tag,
    })
    if (e.currentTarget.dataset.tag !== '处罚类') {
      this.setData({
        'executeUpdateForm.punish_types': [],
        'executeUpdateForm.punish_str': '',
        'executeUpdateForm.moneyShow': false,
        'executeUpdateForm.punish_money': '',
      })
    }
    if (e.currentTarget.dataset.tag !== '其他') {
      this.setData({
        'executeUpdateForm.result': '',
      })
    }
  },

  // 检查结果上传 - input
  resultTextInput: function (e) {
    this.setData({
      'executeUpdateForm.result': e.detail.value,
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
        this.data.executeUpdateForm.attachments.push(resImg.data)
        this.setData({
          'executeUpdateForm.attachments': this.data.executeUpdateForm.attachments
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
    this.data.executeUpdateForm.attachments.splice(index, 1)
    this.setData({
      'executeUpdateForm.attachments': this.data.executeUpdateForm.attachments
    })
  },

  // 图片预览
  previewImage: function (e) {
    let urls = []
    for (let i = 0; i < this.data.executeUpdateForm.attachments.length; i++) {
      urls.push(baseURL + this.data.executeUpdateForm.attachments[i].url)
    }
    wx.previewImage({
      current: baseURL + e.currentTarget.dataset.url,
      urls
    })
  },

  // 处罚类 - 弹出
  choosePunish: function () {
    this.setData({
      punishShow: true
    })
  },

  checkPunish: function (event) {
    for (let i = 0; i < this.data.punishList.length; i++) {
      let item = this.data.punishList[i]
      if (item.value === event.detail) {
        item.checked = !item.checked
      }
    }
    this.setData({
      punishList: this.data.punishList
    })
  },

  // 处罚类 - 选中
  confirmPunish: function (e) {
    const punish_str = []
    this.data.executeUpdateForm.punish_types = []
    for (let i = 0; i < this.data.punishList.length; i++) {
      let item = this.data.punishList[i]
      if (item.checked) {
        this.data.executeUpdateForm.punish_types.push(item.value)
        punish_str.push(item.text)
      }
    }
    this.setData({
      'executeUpdateForm.punish_types': this.data.executeUpdateForm.punish_types,
      'executeUpdateForm.punish_str': punish_str.join(','),
    })
    if (!this.data.executeUpdateForm.punish_types.includes(2)) {
      this.setData({
        'executeUpdateForm.moneyShow': false,
        'executeUpdateForm.punish_money': '',
      })
    } else {
      this.setData({
        'executeUpdateForm.moneyShow': true,
      })
    }
  },

  // 罚款金额 - input
  moneyTextInput: function (e) {
    this.setData({
      'executeUpdateForm.punish_money': e.detail.value,
    })
  },

  // 提交
  submitBtn: function () {
    let _this = this
    if (this.data.executeUpdateForm.result_type === '处罚类' && this.data.executeUpdateForm.punish_types.length === 0) {
      wx.showToast({
        title: '请选择处罚类',
        icon: 'none',
        duration: 2000
      });
      return
    }
    if (this.data.executeUpdateForm.punish_types.includes(2) && !this.data.executeUpdateForm.punish_money) {
      wx.showToast({
        title: '请填写罚款金额',
        icon: 'none',
        duration: 2000
      });
      return
    }
    if (!this.data.executeUpdateForm.result) {
      wx.showToast({
        title: '请填写检查结果',
        icon: 'none',
        duration: 2000
      });
      return
    }
    wx.showModal({
      title: '提交',
      content: '确定要提交保存数据吗？',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '加载中',
          })
          esRequest('executeEvents', _this.data.executeUpdateForm, `${_this.data.id}/result`).then(res2 => {
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
    wx.setStorageSync('executeUpdateForm', JSON.stringify(this.data.executeUpdateForm))
  },

  // 页面卸载 缓存数据
  onUnload: function () {
    wx.setStorageSync('executeUpdateForm', JSON.stringify(this.data.executeUpdateForm))
  },
})