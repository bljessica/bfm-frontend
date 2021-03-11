<template>
  <view style="margin-bottom: 40rpx;">
    <view class="book-section-title" style="font-size: 30rpx;display: flex;justify-content: space-between;align-items: center;">
      <view>{{ title }}</view>
      <view style="color: #42BD56;">查看更多</view>
    </view>
    <view class="book-cards-container" style="margin-top: 20rpx;display: flex;align-items: center;justify-content: space-between;">
      <CommonCard v-for="item in books" :item="item" :key="item._id"></CommonCard>
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
  }
}
</script>

<style>

</style>