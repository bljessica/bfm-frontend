<template>
  <view class="film-cards-container">
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
.film-cards-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px 0;
}
</style>