<template>
  <view>
    <view class="film-cards-container" style="background: #FEFEFE;margin-bottom: 20rpx;">
      <CommonCard kind="film" v-for="film in films" style="margin: auto;" :key="film._id" :item="film"></CommonCard>
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
      films: [],
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
        const res = await this.$api.getAllFilms(val)
        this.films = res.data.data
        this.totalPage = res.data.total
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
.film-cards-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30rpx 0;
  margin-top: 20rpx;
}
.uni-pagination{ 
  width: 100%; 
} 
</style>