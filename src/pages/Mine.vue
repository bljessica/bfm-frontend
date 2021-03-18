<template>
  <view>
    <view class="user-info-container">
      <image :src="(userInfo && userInfo.avatarUrl) || '/static/images/default_avatar.png'" style="width: 150rpx;height: 150rpx;border-radius: 50%;border: 3px solid white;"></image>
      <view class="user-info-container__name" style="font-size: 34rpx;color: white;">
        {{(userInfo && userInfo.nickName) ? userInfo.nickName : '未登录'}}
      </view>
      <!-- 登出按钮 -->
      <view class="user-info-container__log-out-btn" @click="logOut" v-if="userInfo">
        <image src="/static/images/quit.png" style="width: 24rpx;height: 24rpx;margin-right: 6rpx;"></image>
        <span>退出</span>
      </view>
    </view>
    <button @click="logIn" v-if="!userInfo">授权登录</button>
    <uni-load-more v-if="loading" status="loading" :contentText="{contentrefresh: ''}"></uni-load-more>
  </view>
</template>

<script>
export default {
  data () {
    return {
      userInfo: null,
      loading: false
    }
  },
  methods: {
    logOut () {
      wx.setStorageSync('userInfo', null)
      wx.setStorageSync('openid', null)
      this.userInfo = null
      uni.showToast({
        icon: 'success',
        title: '登出成功'
      })
    },
    onLoad () {
      let userInfo = wx.getStorageSync('userInfo')
      if (userInfo) {
        this.userInfo = JSON.parse(userInfo)
      } 
    },
    logIn () {
      this.loading = true
      let that = this;
      uni.login({
        provider: 'weixin',
        success: function (loginRes) {
          // 获取用户信息
          uni.getUserInfo({
            provider: 'weixin',
            success: async (infoRes) => {
              console.log('用户信息', infoRes.userInfo)
              that.userInfo = infoRes.userInfo
              wx.setStorageSync('userInfo', JSON.stringify(infoRes.userInfo))
              await that.$api.addUser({
                ...infoRes.userInfo,
                openid: getApp().globalData.openid
              })
              uni.showToast({
                icon: 'success',
                title: '登录成功'
              })
            },
            fail () {
              uni.showToast({
                icon: 'none',
                title: '用户未授权'
              })
            },
            complete () {
              that.loading = false
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.user-info-container {
  background: url('/static/images/mine_background.png') 100% 100%;
  height: 340rpx;
  box-sizing: border-box;
  padding: 60rpx 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 32rpx;
  position: relative;
}
.user-info-container__log-out-btn {
  position: absolute;
  bottom: 40rpx;
  right: 40rpx;
  color: white;
  font-size: 24rpx;
  display: flex;
  align-items: center;
  padding: 6rpx;
  border: 1px solid white;
  border-radius: 6rpx;
}
</style>