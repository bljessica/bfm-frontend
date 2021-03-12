<template>
  <view class="music-cards-container">
    <CommonCard kind="music" v-for="music in musics" :key="musics._id" :item="music" style="margin: auto;"></CommonCard>
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
      musics: []
    }
  },
  async mounted () {
    const res = await this.$api.getAllMusics({
      pageIdx: 1,
      pageSize: 12
    })
    this.musics = res.data.data
  }
}
</script>

<style scoped>
.music-cards-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30rpx 0;
  margin-top: 20rpx;
}
</style>