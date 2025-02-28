Component({
  properties: {
    pickerShow: {
      type: Boolean,
      value: false,
    },
    pickerTitle: {
      type: String,
      value: ''
    },
    dataList: {
      type: Array,
      value: []
    }
  },

  data: {},

  attached: function () {},

  ready: function () {},

  methods: {
    checkChange: function (event) {
      this.triggerEvent('changeItem', event.currentTarget.dataset.item.value)
    },
    // 取消按钮
    onCancel: function () {
      this.setData({
        pickerShow: false
      })
    },
    // 确定按钮
    onConfirm: function () {
      this.triggerEvent('confirmItem')
      this.onCancel()
    }
  }
})