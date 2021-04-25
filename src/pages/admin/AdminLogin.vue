<template>
  <view class="admin-login-page-container" style="margin: 300rpx auto;width: 440rpx;">
    <view>用户名：Admin</view>
    <view style="margin-top: 30rpx;display: flex;align-items: center;">
      <span>密码：</span>
      <input type="password" focus placeholder="请输入管理员密码" v-model="password" style="margin-left: 24rpx;width: 280rpx;display: inline-block;border: 1px solid #ddd;">
    </view>
    <button @click="logIn" style="margin-top: 30rpx;">登录</button>
  </view>
</template>

<script>
export default {
  data () {
    return {
      password: ''
    }
  },
  methods: {
    logIn () {
      if (this.password === '123') {
        uni.showToast({
          title: '登录成功',
          icon: 'success'
        })
        setTimeout(() => {
          uni.navigateTo({
            url: 'Admin'
          })
        }, 1000)
      } else {
        uni.showToast({
          title: '密码错误',
          icon: 'none'
        })
      }
    }
  }
}
</script>

<style>

</style>