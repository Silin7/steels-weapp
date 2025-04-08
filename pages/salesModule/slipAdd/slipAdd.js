import esRequest from '../../../utils/esRequest';

Page({
  data: {
    departmentList: [],
    slipAddForm: {
      xiaohuodanleixing: '',
      xiaoshougongsi: '',
      chepai: '',
      wuliudianhua: '',
      cangku: '',
      yunshufangshi: '',
      yunfei: '',
    },
    chanpinliebiao: [{
      chanpinmingcheng: '',
      waijing: '',
      bihou: '',
      changdu: '',
      shuliang: '',
      zhishu: '',
    }]
  },

  onLoad: function () {
    // 获取部门列表
    esRequest('customers', {
			companycode: '04',
			customername: '陕西'
		}).then(async res => {
      console.log(res);
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

  // 新增产品
  chanpinAdd: function() {
    this.data.chanpinliebiao.push({
      chanpinmingcheng: '',
      waijing: '',
      bihou: '',
      changdu: '',
      shuliang: '',
      zhishu: '',
    })
    this.setData({
      chanpinliebiao: this.data.chanpinliebiao
    })
  },

  // 删除产品
  chanpinDel: function (e) {
    this.data.chanpinliebiao.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      chanpinliebiao: this.data.chanpinliebiao
    })
  },

  // 产品名称
  chanpinmingchengInput: function (e) {
    const index = e.currentTarget.dataset.index
    this.data.chanpinliebiao[index].chanpinmingcheng = e.detail.value
    this.setData({
      chanpinliebiao: this.data.chanpinliebiao
    })
  },

  // 外径
  waijingInput: function (e) {
    const index = e.currentTarget.dataset.index
    this.data.chanpinliebiao[index].waijing = e.detail.value
    this.setData({
      chanpinliebiao: this.data.chanpinliebiao
    })
  },

  // 壁厚
  bihouInput: function (e) {
    const index = e.currentTarget.dataset.index
    this.data.chanpinliebiao[index].bihou = e.detail.value
    this.setData({
      chanpinliebiao: this.data.chanpinliebiao
    })
  },

  // 长度
  changduInput: function (e) {
    const index = e.currentTarget.dataset.index
    this.data.chanpinliebiao[index].changdu = e.detail.value
    this.setData({
      chanpinliebiao: this.data.chanpinliebiao
    })
  },

  // 数量
  shuliangInput: function (e) {
    const index = e.currentTarget.dataset.index
    this.data.chanpinliebiao[index].shuliang = e.detail.value
    this.setData({
      chanpinliebiao: this.data.chanpinliebiao
    })
  },

  // 支数
  zhishuInput: function (e) {
    const index = e.currentTarget.dataset.index
    this.data.chanpinliebiao[index].zhishu = e.detail.value
    this.setData({
      chanpinliebiao: this.data.chanpinliebiao
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

  // 确定提交
  quedingtijiao: function () {
    console.log(this.data);
  }

})