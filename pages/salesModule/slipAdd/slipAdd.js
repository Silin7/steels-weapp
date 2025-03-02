import esRequest from '../../../utils/esRequest';

Page({
  data: {
    departmentList: [],
    slipAddForm: {
      xiaohuodanleixing: '',
      xiaoshougongsi: '',
      chepai: '',
      wuliudianhua: '',
      chanpinmingcheng: '',
      waijing: '',
      bihou: '',
      changdu: '',
      shuliang: '',
      zhishu: '',
      cangku: '',
      yunshufangshi: '',
      yunfei: '',
    }
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

  // 销货单类型
  xiaohuodanleixingChange: function (e) {
    this.setData({
      'slipAddForm.xiaohuodanleixing': e.detail.value
    })
  },

  // 车牌
  chepaiInput: function (e) {
    this.setData({
      'slipAddForm.chepai': e.detail.value
    })
  },

  // 物流电话
  wuliudianhuaInput: function (e) {
    this.setData({
      'slipAddForm.wuliudianhua': e.detail.value
    })
  },

  // 产品名称
  chanpinmingchengInput: function (e) {
    this.setData({
      'slipAddForm.chanpinmingcheng': e.detail.value
    })
  },

  // 外径
  waijingInput: function (e) {
    this.setData({
      'slipAddForm.waijing': e.detail.value
    })
  },

  // 壁厚
  bihouInput: function (e) {
    this.setData({
      'slipAddForm.bihou': e.detail.value
    })
  },

  // 长度
  changduInput: function (e) {
    this.setData({
      'slipAddForm.changdu': e.detail.value
    })
  },

  // 数量
  shuliangInput: function (e) {
    this.setData({
      'slipAddForm.shuliang': e.detail.value
    })
  },

  // 支数
  zhishuInput: function (e) {
    this.setData({
      'slipAddForm.zhishu': e.detail.value
    })
  },

  // 仓库
  cangkuInput: function (e) {
    this.setData({
      'slipAddForm.cangku': e.detail.value
    })
  },

  // 运输方式
  yunshufangshiChange: function (e) {
    this.setData({
      'slipAddForm.yunshufangshi': e.detail.value
    })
  },

  // 运费
  yunfeiInput: function (e) {
    this.setData({
      'slipAddForm.yunfei': e.detail.value
    })
  },

  // 付款类型
  fukuanleixingChange: function (e) {
    this.setData({
      'slipAddForm.fukuanleixing': e.detail.value
    })
  },

  // 价格
  jiageInput: function (e) {
    this.setData({
      'slipAddForm.jiage': e.detail.value
    })
  },

  // 采购客户
  caigoukehuInput: function (e) {
    this.setData({
      'slipAddForm.caigoukehu': e.detail.value
    })
  },

  // 备注
  beizhuInput: function (e) {
    this.setData({
      'slipAddForm.beizhu': e.detail.value
    })
  },


})