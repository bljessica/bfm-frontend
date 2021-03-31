<template>
  <view class="time-line-section-content-item-wrapper">
    <SearchResultItem :item="record.detail" :show-tag="false" :show-border="false" />
    <view style="background-color: #f7f7f7;padding: 16rpx;font-size: 20rpx;color: #a1a1a1;margin:  6rpx 0 30rpx 0;">
      <uni-rate allow-half :size="8" :value="record.score / 2" color="#7b7b7b" />
      <div style="margin-top: 10rpx;">{{record.comment}}</div>
    </view>
  </view>
</template>

<script>
import SearchResultItem from '@/components/search/SearchResultItem.vue'

export default {
  components: {
    SearchResultItem
  },
  props: {
    record: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
