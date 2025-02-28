import esRequest from '../../../utils/esRequest';

Page({
  data: {
    roleShow: false,
    roleList: [{
      text: '执法部门',
      value: 4
    }, {
      text: '企业',
      value: 5
    }],
    role_id: '', // 4 执法用户 || 5 企业用户
    role_name: '',
    departmentShow: false,
    departmentList: [],
    department_id: '',
    department_name: '',
    nickName: '',
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
    const profile = wx.getStorageSync('profile')
    if (profile) {
      this.setData({
        role_id: profile.profile.role_id,
        role_name: profile.role_name,
        department_id: profile.profile.role_id,
        department_name: profile.department_name,
        nickName: profile.profile.name,
      })
    }
  },

  // 角色选择 - 弹出
  chooseRole: function () {
    this.setData({
      roleShow: true
    })
  },

  // 角色选择 - 选中
  confirmRole: function (e) {
    this.setData({
      role_id: e.detail.value.value,
      role_name: e.detail.value.text,
    })
  },

  // 部门选择 - 弹出
  chooseDepartment: function () {
    this.setData({
      departmentShow: true
    })
  },

  // 部门选择 - 选中
  confirmDepartment: function (e) {
    this.setData({
      department_id: e.detail.value.value,
      department_name: e.detail.value.text,
    })
  },

  // 昵称 - input change
  nickNameInput: function (e) {
    this.setData({
      nickName: e.detail.value
    })
  },

  // 点击授权登录
  authorizedLogin: function () {
    if (!this.data.role_id) {
      wx.showToast({
        title: '请选择角色',
        icon: 'none',
        duration: 2000
      });
      return
    }
    if (this.data.role_id === 5) {
      this.data.department_id = ''
      this.data.department_name = ''
    }
    if (this.data.role_id === 4 && !this.data.department_id) {
      wx.showToast({
        title: '请选择部门',
        icon: 'none',
        duration: 2000
      });
      return
    }
    if (!this.data.nickName) {
      wx.showToast({
        title: '请输入昵称',
        icon: 'none',
        duration: 2000
      });
      return
    }
    wx.showLoading({
      title: '加载中',
    })
    console.log({
      open_id: wx.getStorageSync('openid'),
      deparment_id: this.data.department_id,
      department_id: this.data.department_id,
      name: this.data.nickName,
    });
    esRequest('authRegister', {
      open_id: wx.getStorageSync('openid'),
      deparment_id: this.data.department_id,
      department_id: this.data.department_id,
      name: this.data.nickName,
    }).then(res => {
      if (res && res.data.status) {
        wx.showToast({
          title: '操作成功',
          icon: 'none',
          duration: 2000
        })
        wx.setStorageSync('token', res.data.data.token)
        wx.setStorageSync('has_registered', true)
        setTimeout(() => {
          wx.hideLoading();
          wx.navigateBack({
            delta: 1
          })
        }, 500)
      } else {
        wx.hideLoading();
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 2000
        })
      }
    }).catch((err) => {
      console.log(err);
    })
  }
})