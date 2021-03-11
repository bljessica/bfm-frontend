<template>
  <view>
    <view class="user-info-container">
      <image src="/static/images/default_avatar.png" style="width: 180rpx;height: 180rpx;"></image>
      <view class="user-info-container__name">deng</view>
    </view>
  </view>
</template>

<script>
export default {

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
}
</style>