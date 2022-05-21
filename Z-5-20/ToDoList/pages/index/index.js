// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    list: [],
    value: '',
    num1: 0,
    num2: 0
  },

  // 事件处理函数
  input(e) {
    console.log(e);
    if (e.detail.value == '') {
      alert("不能为空")
      return false
    }
    let arr = wx.getStorageSync('list') || []
    let index = arr.findIndex(item => item.name == e.detail.value)
    if (index == -1) {
      this.data.list.push({
        name: e.detail.value,
        flag: false,
        num: true
      })
      wx.setStorageSync('list', this.data.list)
      this.num()
      this.setData({
        list: this.data.list,
        value: ''
      })
    } else {
      this.setData({
        value: ''
      })
    }

  },
  onLoad() {
    this.setData({
      list: wx.getStorageSync('list')
    })
    this.num()
  },
  click(e) {
    console.log(e);
    let index = e.currentTarget.dataset.index
    this.data.list[index].flag = !this.data.list[index].flag
    console.log(this.data.list);
    wx.setStorageSync('list', this.data.list)

    this.num()
    this.setData({
      list: this.data.list
    })
    // this.data.list[ele.index] = ele.item
    // console.log(this.data.list, ele);
    // wx.setStorageSync('list', this.data.list)
    // this.setData({
    //   list: this.data.list
    // })
  },
  dbclick(e) {
    console.log(e.currentTarget.dataset.index);
    this.data.list[e.currentTarget.dataset.index].num = !this.data.list[e.currentTarget.dataset.index].num
    console.log(this.data.list);
    this.setData({
      list: this.data.list
    })
  },
  ok(e) {
    console.log(e);
    this.data.list[e.currentTarget.dataset.index].name = e.detail.value
    this.data.list[e.currentTarget.dataset.index].num = true
    this.setData({
      list: this.data.list
    })
    wx.setStorageSync('list', this.data.list)
  },
  num() {
    this.setData({
      list: this.data.list ? this.data.list : [],
      num1: this.data.list ? this.data.list.filter(item => item.flag).length : 0,
      num2: this.data.list ? this.data.list.filter(item => !item.flag).length : 0
    })
  },
  del(e) {
    this.data.list.splice(e.currentTarget.dataset.index, 1);
    wx.setStorageSync('list', this.data.list)
    this.setData({
      list: this.data.list
    })
    this.num()
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})