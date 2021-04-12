<template>
  <view class="admin-actions-container" style="min-height: 100vh;"> 
    <view class="admin-actions-wrapper" 
      v-for="kind in Object.keys(KIND_DETAILS)" 
      :key="kind"
      :style="{border}"
    >
      <span>添加{{KIND_DETAILS[kind].NAME}}</span>
      <span>修改{{KIND_DETAILS[kind].NAME}}</span>
      <span>删除{{KIND_DETAILS[kind].NAME}}</span>
    </view>
  </view>
</template>

<script>
import { KIND_DETAILS } from '@/constants/constants.js'
export default {
  data () {
    return {
      KIND_DETAILS
    }
  }
}
</script>

<style lang="scss" scoped>
.admin-actions-wrapper {
  margin: 20rpx auto 0;
  height: 160rpx;
  width: 80%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4rpx;
  &>span {
    padding: 16rpx;
    border: 1px solid #ddd;
    border-radius: 10rpx;
  }
}
</style>