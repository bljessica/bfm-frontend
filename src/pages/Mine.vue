<template>
  <view>
    <view class="user-info-container">
      <image :src="(userInfo && userInfo.avatarUrl) || '/static/images/default_avatar.png'" style="width: 180rpx;height: 180rpx;border-radius: 50%;"></image>
      <view class="user-info-container__name" style="font-size: 40rpx;">
        {{(userInfo && userInfo.nickName) ? userInfo.nickName : '未登录'}}
      </view>
    </view>
    <!-- 需要使用 button 来授权登录 -->
    <button v-if="canIUse && !userInfo" open-type="getUserInfo" bindgetuserinfo="bindGetUserInfo">授权登录</button>
  </view>
</template>

<script>
export default {
  data () {
    return {
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      userInfo: null
    }
  },
  onLoad () {
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.userInfo = JSON.parse(userInfo)
    } else {
      let that = this;
      // 查看是否授权
      wx.getSetting({
        success (res){
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: function(res) {
                console.log('获取用户信息成功', res)
                that.userInfo = res.userInfo
                wx.setStorageSync('userInfo', JSON.stringify(res.userInfo))
              }
            })
          }else{
            console.log('获取用户信息失败')
          }
        }
      })
    }
    
  },
  methods: {
    bindGetUserInfo: function(e) {
      // console.log(e.detail.userInfo, 111)
    }
  }
}
</script>

<style scoped>
.user-info-container {
  background: url('/static/images/mine_background.png') 100% 100%;
  height: 340rpx;
  box-sizing: border-box;
  padding: 50rpx 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 32rpx;
}
</style>