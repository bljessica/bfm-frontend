<template>
  <view class="detail-score">
    <!-- 大众评分 -->
    <view>大众评分</view>
    <view style="display: flex;flex-direction: column;align-items: center;">
      <h3 style="font-size: 50rpx;">{{score}}</h3>
      <uni-rate :readonly="true" allow-half :size="8" :value="score / 2" />
    </view>
    <!-- 我的评分 -->
    <view style="color: #999;font-size: 16rpx;">我的评分</view>
    <view style="margin-left: 10rpx;color: #999;display: flex;align-items: center;margin: 0 auto;font-size: 16rpx;">
      <uni-rate :readonly="true" style="display: inline-block;margin-right: 8rpx;" allow-half :size="6" :value="myScore / 2" />
      <span>{{scoreDisplay}}</span>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    score: {
      type: Number,
      default: 0
    },
    myScore: {
      type: Number
    }
  },
  computed: {
    scoreDisplay () {
      return this.myScore < 0 ? '暂无' : this.myScore
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-score {
  background: white;
  border-radius: 10rpx;
  width: 95%;
  margin: 20rpx auto;
  height: 200rpx;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 150rpx 50rpx;
  gap: 0;
  text-align: center;
  align-items: center;
  font-size: 20rpx;
}
</style>