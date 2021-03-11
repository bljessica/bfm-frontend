<template>
  <view class="common-card" style="height: 240rpx;display: flex;flex-direction: column;font-size: 24rpx;align-items: center;justify-content: space-between;">
    <image :src="item.coverSrc || '/static/images/book.png'" style="width: 150rpx;height: 200rpx;"></image>
    <view class="common-card__name" style="text-align: center;width: 150rpx;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
      {{ item.musicName || item.bookName || item.chineseName }}
    </view>
  </view>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style>

</style>