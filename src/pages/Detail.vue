<template>
  <view>
    <view class="detail__title">
      <image :src="item.coverSrc" style="width: 180rpx;height: 240rpx;grid-area: a;"></image>
      <h3 style="grid-area:b;font-size: 40rpx;font-weight: bold;">{{item.bookName || item.musicName || item.chineseName}}</h3>
      <view style="grid-area:c;font-size: 20rpx;">简介</view>
      <button class="detail__title__button" style="grid-area: d;">想看</button>
      <button class="detail__title__button" style="grid-area: e;">看过</button>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      item: null
    }
  },
  async onLoad (option) {
    const res = await this.$api.getDetailById(option)
    this.item = res.data.data
  }
}
</script>

<style>
.detail__title {
  display: grid;
  height: 240rpx;
  padding: 20rpx 20rpx 40rpx 40rpx;
  gap: 20rpx;
  align-items: center;
  grid-template-areas: 'a b b' 
                       'a c c' 
                       'a d e';
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
}
.detail__title__button {
  width: 180rpx;
  height: 70rpx;
  line-height: 70rpx;
  font-size: 30rpx;
  margin: 0;
}
</style>