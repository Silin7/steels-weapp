import esRequest from '../../../utils/esRequest';

Component({
  properties: {
    pickerShow: {
      type: Boolean,
      value: false,
    },
    defaultValue: {
      type: String,
      value: '',
    }
  },

  data: {
    companyName: '',
    reachTimer: null,
    companiesList: [],
  },

  attached: function () {},

  ready: function () {
    // this.setData({
    //   companyName: this.properties.defaultValue,
    // })
    this.getDataList()
  },


  methods: {
    getDataList: function () {
      esRequest('customers', {
        customername: this.data.companyName
      }).then(async res => {
        if (res && res.data.status) {
          await res.data.data.forEach((item) => {
            item.value = item.id
            item.text = item.name
          })
          this.setData({
            companiesList: res.data.data
          })
        }
      })
    },

    // 模糊查询
    onChange: function (e) {
      let _this = this
      this.setData({
        companyName: e.detail
      })
      clearTimeout(this.data.reachTimer)
      this.data.reachTimer = setTimeout(function () {
        _this.getDataList()
      }, 1000)
    },
    // 取消按钮
    onCancel: function () {
      this.setData({
        pickerShow: false
      })
    },
    // 确定按钮
    onConfirm: function (event) {
      const {
        picker,
        value,
        index
      } = event.detail;
      console.log(picker, value, index);
      this.triggerEvent('confirmItem', event.detail)
      this.onCancel()
    }
  }
})