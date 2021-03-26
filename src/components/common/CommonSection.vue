<template>
  <view style="margin-bottom: 40rpx;">
    <view class="common-section-title" style="font-size: 24rpx;display: flex;justify-content: space-between;align-items: center;">
      <view style="font-weight: bold;">{{ sectionTitle + (showNum ? '  ' + count : '')}}</view>
      <view style="color: #42BD56;" v-if="seekMore" @click="goToBookType">
        查看更多
        <image src="/static/images/green-right-arrow.png" style="width: 20rpx;height: 20rpx;margin-left: 5rpx;"></image>
      </view>
      <view style="color: #7B7B7B;" v-else @click="goToMyBFMStatus">
        全部
        <image src="/static/images/right-arrow.png" style="width: 20rpx;height: 20rpx;margin-left: 5rpx;"></image>
      </view>
    </view>
    <view class="common-cards-container">
      <CommonCard :kind="kind" v-for="item in items" :item="item" :key="item._id"></CommonCard>
    </view>
  </view>
</template>

<script>
import CommonCard from '@/components/common/CommonCard'

export default {
  components: {
    CommonCard
  },
  props: {
    seekMore: {
      type: Boolean,
      default: false
    },
    showNum: {
      type: Boolean,
      default: true
    },
    kind: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: ''
    },
    sectionTitle: {
      type: String
    },
    items: {
      type: Array,
      default: []
    },
    count: {
      type: Number
    }
  },
  methods: {
    goToBookType () {
      uni.navigateTo({
        url: 'Books?type=' + this.sectionTitle
      })
    },
    goToMyBFMStatus () {
      uni.navigateTo({url: 'MyBFMStatus?kind=' + this.kind + '&status=' + this.status})
    }
  }
}
</script>

<style lang="scss" scoped>
.common-cards-container {
  margin-top: 20rpx;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30rpx 0;
}
</style>