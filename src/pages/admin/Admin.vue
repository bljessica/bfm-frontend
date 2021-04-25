<template>
  <view class="admin-actions-container" style="min-height: 100vh;"> 
    <view 
      style="margin: 24rpx auto 0;width: 80%;"
      v-for="kind in Object.keys(ADMIN_ACTIONS)" 
      :key="kind"
      :style="{color: ADMIN_ACTIONS[kind].color}"
    >
      <view>{{kind}}</view>
      <view class="admin-actions-wrapper" :style="{borderColor: ADMIN_ACTIONS[kind].color}">
        <span v-for="item in ADMIN_ACTIONS[kind].actions" :key="item.name" @click="goToActionPage(item.url)">
          {{item.name}}
        </span>
      </view>
    </view>
  </view>
</template>

<script>
import { ADMIN_ACTIONS } from '@/constants/constants.js'

export default {
  data () {
    return {
      ADMIN_ACTIONS
    }
  },
  methods: {
    goToActionPage (url) {
      uni.navigateTo({url})
    }
  }
}
</script>

<style lang="scss" scoped>
.admin-actions-wrapper {
  height: 160rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4rpx;
  margin-top: 10rpx;
  &>span {
    padding: 16rpx;
    border: 1px solid #ddd;
    border-radius: 10rpx;
    border-color: inherit;
  }
}
</style>