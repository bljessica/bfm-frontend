<template>
  <view class="common-card" @click="goToDetail" style="width: 150rpx;height: 240rpx;display: flex;flex-direction: column;font-size: 24rpx;align-items: start;justify-content: space-between;">
    <image :src="item.coverSrc || '/static/images/addItem/' + kind + '_default.png'" style="width: 150rpx;height: 200rpx;"></image>
    <view class="common-card__name" style="font-weight: bold;font-size: 20rpx;margin: 10rpx 0;width: 150rpx;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
      {{ item.name }}
    </view>
    <view style="display: flex;align-items: center;">
      <uni-rate allow-half :size="8" :value="item.score / 2"/>
      <span style="font-size: 18rpx;color: #999;margin-left: 10rpx;">{{item.score}}</span>
    </view>
  </view>
</template>

<script>
import { uniRate } from '@dcloudio/uni-ui'

export default {
  components: {
    uniRate
  },
  props: {
    kind: {
      type: String,
      required: true
    },
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    goToDetail () {
      uni.navigateTo({
        url: 'Detail?_id=' + this.item._id + '&kind=' + this.kind
      })
    }
  }
}
</script>

<style>

</style>