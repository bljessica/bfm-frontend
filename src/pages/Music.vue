<template>
  <view>
    <view class="music-cards-container" style="background: #FEFEFE;margin-bottom: 20rpx;">
      <CommonCard kind="music" v-for="music in musics" :key="music._id" :item="music" style="margin: auto;"></CommonCard>
    </view>
    <uni-pagination @change="pageChange" :pageSize="pagination.pageSize" show-icon="true" :total="totalPage" :current="pagination.pageIdx"></uni-pagination>
    <uni-load-more v-if="loading" status="loading"></uni-load-more>
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
      musics: [],
      pagination: {
        pageIdx: 1,
        pageSize: 12,
      },
      totalPage: 0,
      loading: false
    }
  },
  watch: {
    pagination: {
      async handler (val) {
        this.loading = true
        const res = await this.$api.getAllMusics(val)
        this.musics = res.data.data
        this.totalPage = res.data.total,
        this.loading = false
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    pageChange ({type}) {
      if (type === 'next') {
        this.pagination.pageIdx += 1
      } else if (type === 'prev') {
        this.pagination.pageIdx -= 1
      }
    }
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