<template>
  <view style="margin-bottom: 20px;">
    <view class="book-section-title" style="font-size: 12px;display: flex;justify-content: space-between;align-items: center;">
      <view>{{ title }}</view>
      <view style="color: #42BD56;">查看更多</view>
    </view>
    <view class="book-cards-container" style="display: flex;align-items: center;justify-content: space-between;">
      <CommonCard v-for="i in 4" :key="i"></CommonCard>
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
  }
}
</script>

<style>

</style>