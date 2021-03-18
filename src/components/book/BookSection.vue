<template>
  <view style="margin-bottom: 40rpx;">
    <view class="book-section-title" style="font-size: 24rpx;display: flex;justify-content: space-between;align-items: center;">
      <view style="font-weight: bold;">{{ title }}</view>
      <view style="color: #42BD56;" @click="goToBookType">
        查看更多
        <image src="/static/images/green-right-arrow.png" style="width: 20rpx;height: 20rpx;margin-left: 5rpx;"></image>
      </view>
    </view>
    <view class="book-cards-container" style="margin-top: 20rpx;display: flex;align-items: center;justify-content: space-between;">
      <CommonCard kind="book" v-for="item in books" :item="item" :key="item._id"></CommonCard>
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
    title: {
      type: String
    },
    books: {
      type: Array,
      default: []
    }
  },
  methods: {
    goToBookType () {
      uni.navigateTo({
        url: 'Books?type=' + this.title
      })
    }
  }
}
</script>

<style>

</style>