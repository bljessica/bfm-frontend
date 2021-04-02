<template>
  <view class="time-line-section-content-item-wrapper">
    <SearchResultItem :item="record.detail" :kind="record.kind" :show-tag="false" :show-border="false" />
    <view 
      v-if="showRate || record.comment"
      style="background-color: #f7f7f7;padding: 16rpx;font-size: 20rpx;color: #a1a1a1;margin:  6rpx 0 30rpx 0;"
    >
      <uni-rate 
        v-if="showRate" 
        allow-half 
        :size="8" 
        :value="record.score / 2" 
        color="#7b7b7b" 
      />
      <view :style="{marginTop: showRate ? '10rpx' : 0}" style="display: flex;align-items: center;justify-content: space-between;">
        <view class="time-line-section-content-item-wrapper__content">{{record.comment}}</view>
        <image src="/static/images/detail/good.png" style="width: 20rpx;height: 20rpx;margin: 0 4rpx 0 10rpx;"></image>
        <span>{{record.commentLikedNum}}</span>
      </view>
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
  },
  computed: {
    showRate () {
      return this.record.status === 'after'
    }
  }
}
</script>

<style lang="scss" scoped>
.time-line-section-content-item-wrapper__content {
  flex: 1;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
