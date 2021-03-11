<template>
  <view class="music-cards-container">
    <CommonCard v-for="i in 20" :key="i" style="margin: auto;"></CommonCard>
  </view>
</template>

<script>
import CommonCard from '@/components/common/CommonCard'

export default {
  components: {
    CommonCard
  }
}
</script>

<style scoped>
.music-cards-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px 0;
}
</style>