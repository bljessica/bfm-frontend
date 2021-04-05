<template>
  <view class="my-info-container">
    <view class="my-info__item" v-if="userInfo" v-for="key in Object.keys(userInfo || {})" :key="key">
      <view>{{USER_INFOS[key]}}</view>
      <view>
        <image v-if="key === 'avatarUrl'" :src="userInfo.avatarUrl || '/static/images/default_avatar.png'" style="width: 80rpx;height: 80rpx;border-radius: 50%;"></image>
        <span class="my-info__item__content" v-else>{{key === 'gender' ? USER_GENDER[userInfo[key]] : userInfo[key]}}</span>
        <image src="/static/images/right_arrow.png" style="width: 26rpx;height: 26rpx;margin-left: 10rpx;"></image>
      </view>
    </view>
    <view v-else style="text-align: center;color: #eee;padding: 20rpx 0;">暂无用户信息</view>
  </view>
</template>

<script>
import { USER_INFOS, USER_GENDER } from '@/constants/constants'

export default {
  data () {
    return {
      userInfo: null,
      USER_INFOS,
      USER_GENDER
    }
  },
  onLoad () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      let userInfo = wx.getStorageSync('userInfo')
      if (userInfo) {
        userInfo = JSON.parse(userInfo)
        this.userInfo = Object.keys(USER_INFOS).reduce((acc, key) => {
          acc[key] = userInfo[key]
          return acc
        }, {})
      }
      
    }
  }
}
</script>

<style lang="scss" scoped>
.my-info-container {
  padding: 0 30rpx;
}
.my-info__item {
  padding: 20rpx 0;
  font-size: 26rpx;
  display: flex;
  align-items: center;
  &>view:last-of-type {
    flex: 1;
    text-align: right;
    image, span {
      vertical-align: middle;
    }
  }
}
.my-info__item__content {
  font-size: 22rpx;
  color: #818181;
}
</style>