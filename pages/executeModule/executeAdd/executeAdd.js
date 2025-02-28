import {
  baseURL
} from '../../../utils/baseURL';
import esRequest from '../../../utils/esRequest';

Page({
  data: {
    tipsShow: false,
    tipsShowLag: false,
    highFrequency: {},
    companiesShow: false,
    departmentShow: false,
    departmentList: [],
    executeAddForm: {
      company_id: '',
      company_name: '',
      staffs: '',
      is_joined: false,
      joint_departments: [],
      staffs_count: null,
      reason: '',
      company_staffs: '',
      result_type: '整改类',
      punish_types: [],
      punish_str: '',
      moneyShow: false,
      punish_money: '',
      result: '',
      attachments: [],
    },
    departmentsIndex: 0,
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

  onLoad: function () {
    // 获取部门列表
    esRequest('departments').then(async (res) => {
      if (res && res.data.status) {
        await res.data.data.forEach((item) => {
          item.value = item.id
          item.text = item.name
        })
        this.setData({
          departmentList: res.data.data
        })
      }
    })
  },

  onShow: function () {
    if (wx.getStorageSync('executeAddForm')) {
      this.setData({
        executeAddForm: JSON.parse(wx.getStorageSync('executeAddForm'))
      })
      // 处罚类 - 多选 回显 - start
      if (this.data.executeAddForm.punish_types.length > 0) {
        for (let i = 0; i < this.data.punishList.length; i++) {
          let item = this.data.punishList[i]
          if (this.data.executeAddForm.punish_types.includes(item.value)) {
            item.checked = true
          } else {
            item.checked = false
          }
        }
        this.setData({
          punishList: this.data.punishList
        })
      }
      // 处罚类 - 多选 回显 - end
    }
    if (this.data.executeAddForm.company_id) {
      this.getExecuteEventsCheck()
    }
  },

  // 执法高频提醒
  getExecuteEventsCheck: function () {
    let _this = this
    esRequest('executeEventsCheck', {
      company_id: this.data.executeAddForm.company_id
    }).then((res) => {
      if (res && res.data.status) {
        for (let key in res.data.data) {
          if (res.data.data[key]) {
            _this.tipsPopupShow()
          }
        }
        this.setData({
          highFrequency: res.data.data
        })
      } else {
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  // 执法高频提醒弹框 - 弹出
  tipsPopupShow: function () {
    this.setData({
      tipsShow: true
    });
    setTimeout(() => {
      this.setData({
        tipsShowLag: true
      });
    }, 200)
  },

  // 执法高频提醒弹框 - 关闭
  tipsPopupClose: function () {
    this.setData({
      tipsShowLag: false,
      tipsShow: false
    });
  },

  // 执法高频提醒弹框 - 继续本次执法
  continueZf: function () {
    console.log('继续本次执法');
    this.tipsPopupClose()
  },

  // 执法高频提醒弹框 - 放弃此次执法
  giveupZf: function () {
    console.log('放弃此次执法');
    this.tipsPopupClose()
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
      'executeAddForm.company_id': event.detail.value.id,
      'executeAddForm.company_name': event.detail.value.name,
    })
    this.getExecuteEventsCheck()
  },

  // 牵头执法人员 - input
  staffsInput: function (e) {
    this.setData({
      'executeAddForm.staffs': e.detail.value,
    })
  },

  // 是否联合执法 - change
  isJointChange: function (e) {
    this.setData({
      'executeAddForm.is_joined': e.detail,
    });
    if (e.detail) {
      this.setData({
        'executeAddForm.joint_departments': [{
          id: '',
          name: '',
          staffs: ''
        }],
      });
    } else {
      this.setData({
        'executeAddForm.joint_departments': [],
      });
    }
  },

  // 是否联合执法 - 新增行
  departmentsAdd: function () {
    this.data.executeAddForm.joint_departments.push({
      id: '',
      name: '',
      staffs: ''
    })
    this.setData({
      'executeAddForm.joint_departments': this.data.executeAddForm.joint_departments
    });
  },

  // 是否联合执法 - 删除行
  departmentsDelete: function (e) {
    let index = e.currentTarget.dataset.index
    this.data.executeAddForm.joint_departments.splice(index, 1)
    this.setData({
      'executeAddForm.joint_departments': this.data.executeAddForm.joint_departments
    });
  },

  // 联合执法部门 - 弹出
  chooseDepartment: function (e) {
    this.data.departmentsIndex = e.currentTarget.dataset.index
    this.setData({
      departmentShow: true
    })
  },

  // 联合执法部门 - 选中
  confirmDepartment: function (e) {
    this.data.executeAddForm.joint_departments[this.data.departmentsIndex].id = e.detail.value.id
    this.data.executeAddForm.joint_departments[this.data.departmentsIndex].name = e.detail.value.name
    this.setData({
      'executeAddForm.joint_departments': this.data.executeAddForm.joint_departments
    })
  },

  // 执法人员 - input
  lawEnforcerInput: function (e) {
    this.data.departmentsIndex = e.currentTarget.dataset.index
    this.data.executeAddForm.joint_departments[this.data.departmentsIndex].staffs = e.detail.value
    this.setData({
      'executeAddForm.joint_departments': this.data.executeAddForm.joint_departments
    })
  },

  // 入企执法人数 - input
  peopleNumInput: function (e) {
    this.setData({
      'executeAddForm.staffs_count': Number(e.detail.value),
    })
  },

  // 入企事由 - input
  describeInput: function (e) {
    this.setData({
      'executeAddForm.reason': e.detail.value,
    })
  },

  // 企业陪同人员 - input
  entourageInput: function (e) {
    this.setData({
      'executeAddForm.company_staffs': e.detail.value,
    })
  },

  // 检查结果上传 - change
  resultTagClick: function (e) {
    this.setData({
      'executeAddForm.result_type': e.currentTarget.dataset.tag,
    })
    if (e.currentTarget.dataset.tag !== '处罚类') {
      this.setData({
        'executeAddForm.punish_types': [],
        'executeAddForm.punish_str': '',
        'executeAddForm.moneyShow': false,
        'executeAddForm.punish_money': '',
      })
    }
    if (e.currentTarget.dataset.tag !== '其他') {
      this.setData({
        'executeAddForm.result': '',
      })
    }
  },

  // 检查结果上传 - input
  resultTextInput: function (e) {
    this.setData({
      'executeAddForm.result': e.detail.value,
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
        this.data.executeAddForm.attachments.push(resImg.data)
        this.setData({
          'executeAddForm.attachments': this.data.executeAddForm.attachments
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
    this.data.executeAddForm.attachments.splice(index, 1)
    this.setData({
      'executeAddForm.attachments': this.data.executeAddForm.attachments
    })
  },

  // 图片预览
  previewImage: function (e) {
    let urls = []
    for (let i = 0; i < this.data.executeAddForm.attachments.length; i++) {
      urls.push(baseURL + this.data.executeAddForm.attachments[i].url)
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
    console.log(e);
    const punish_str = []
    this.data.executeAddForm.punish_types = []
    for (let i = 0; i < this.data.punishList.length; i++) {
      let item = this.data.punishList[i]
      if (item.checked) {
        this.data.executeAddForm.punish_types.push(item.value)
        punish_str.push(item.text)
      }
    }
    this.setData({
      'executeAddForm.punish_types': this.data.executeAddForm.punish_types,
      'executeAddForm.punish_str': punish_str.join(','),
    })
    if (!this.data.executeAddForm.punish_types.includes(2)) {
      this.setData({
        'executeAddForm.moneyShow': false,
        'executeAddForm.punish_money': '',
      })
    } else {
      this.setData({
        'executeAddForm.moneyShow': true,
      })
    }
  },

  // 罚款金额 - input
  moneyTextInput: function (e) {
    this.setData({
      'executeAddForm.punish_money': e.detail.value,
    })
  },

  // 提交
  submitBtn: function () {
    let _this = this
    if (!this.data.executeAddForm.company_id) {
      wx.showToast({
        title: '请选择企业',
        icon: 'none',
        duration: 2000
      });
      return
    }
    if (!this.data.executeAddForm.staffs) {
      wx.showToast({
        title: '请填写牵头执法人员',
        icon: 'none',
        duration: 2000
      });
      return
    }
    if (this.data.executeAddForm.is_joined && this.data.executeAddForm.joint_departments.length === 0) {
      wx.showToast({
        title: '请填写联合执法信息',
        icon: 'none',
        duration: 2000
      });
      return
    }
    if (!this.data.executeAddForm.staffs_count) {
      wx.showToast({
        title: '请填写入企执法人数',
        icon: 'none',
        duration: 2000
      });
      return
    }
    if (!this.data.executeAddForm.reason) {
      wx.showToast({
        title: '请填写入企事由',
        icon: 'none',
        duration: 2000
      });
      return
    }
    if (this.data.executeAddForm.result_type === '处罚类' && this.data.executeAddForm.punish_types.length === 0) {
      wx.showToast({
        title: '请选择处罚类',
        icon: 'none',
        duration: 2000
      });
      return
    }
    if (this.data.executeAddForm.punish_types.includes(2) && !this.data.executeAddForm.punish_money) {
      wx.showToast({
        title: '请填写罚款金额',
        icon: 'none',
        duration: 2000
      });
      return
    }
    if (this.data.executeAddForm.result_type !== '其他' && !this.data.executeAddForm.result) {
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
          esRequest('executeEvents', _this.data.executeAddForm).then(res2 => {
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
    wx.setStorageSync('executeAddForm', JSON.stringify(this.data.executeAddForm))
  },

  // 页面卸载 缓存数据
  onUnload: function () {
    wx.setStorageSync('executeAddForm', JSON.stringify(this.data.executeAddForm))
  },
})