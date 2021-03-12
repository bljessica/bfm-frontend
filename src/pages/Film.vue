<template>
  <view class="film-cards-container">
    <CommonCard kind="film" v-for="film in films" :key="films._id" :item="film" style="margin: auto;"></CommonCard>
  </view>
</template>

<script>
import CommonCard from '@/components/common/CommonCard'

export default {
  components: {
    CommonCard
  },
  data () {
    return {
      films: []
    }
  },
  async mounted () {
    const res = await this.$api.getAllFilms({
      pageIdx: 1,
      pageSize: 12
    })
    this.films = res.data.data
  }
}
</script>

<style scoped>
.film-cards-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30rpx 0;
  margin-top: 20rpx;
}
</style>