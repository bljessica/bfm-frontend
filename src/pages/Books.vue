<template>
  <view>
    <view class="book-cards-container" style="background: #FEFEFE;margin-bottom: 20rpx;">
      <CommonCard kind="book" v-for="book in books" :key="book._id" :item="book" style="margin: auto;"></CommonCard>
    </view>
    <uni-pagination @change="pageChange" :pageSize="pagination.pageSize" show-icon="true" :total="totalPage" :current="pagination.pageIdx"></uni-pagination>
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
      books: [],
      pagination: {
        pageIdx: 1,
        pageSize: 12,
      },
      totalPage: 0,
      type: ''
    }
  },
  watch: {
    pagination: {
      async handler () {
        await this.getBooks()
      },
      deep: true,
      immediate: true
    }
  },
  async onLoad (option) {
    this.type = option.type
    await this.getBooks()
  },
  methods: {
    pageChange ({type}) {
      if (type === 'next') {
        this.pagination.pageIdx += 1
      } else if (type === 'prev') {
        this.pagination.pageIdx -= 1
      }
    },
    async getBooks () {
      const res = await this.$api.getAllBooksByType({
          ...this.pagination,
          type: this.type
        })
        this.books = res.data.data
        this.totalPage = res.data.total
    }
  }
}
</script>

<style scoped>
.book-cards-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30rpx 0;
  margin-top: 20rpx;
}
</style>