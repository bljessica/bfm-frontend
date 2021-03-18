<template>
  <view class="detail-score">
      <view style="font-size: 20rpx;">大众评分</view>
      <view>
        <h3 style="font-size: 50rpx;">{{score}}</h3>
        <uni-rate allow-half :size="8" :value="score / 2" style="position: relative;left: -10rpx;"/>
      </view>
    </view>
</template>

<script>
export default {
  props: {
    score: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-score {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background: white;
  border-radius: 10rpx;
  width: 95%;
  height: 150rpx;
  margin: 20rpx auto;
}
</style>