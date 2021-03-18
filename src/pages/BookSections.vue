<template>
	<view class="books-container" style="background: #FEFEFE;">
    <view class="books-search-bar" style="background-color: #42BD56;width: 100%;height: 70rpx;">
      <input type="text" placeholder="搜索" style="border-radius: 10rpx;text-indent: 10rpx;font-size: 10px;width: 90%;background-color: white;margin: auto;">
    </view>
    <view class="book-sections-container" style="width: 90%;margin: 20rpx auto 0;">
      <BookSection v-for="item in bookSectionTitles" :key="item" :books="books[item]" :title="item"></BookSection>
    </view>
    <uni-load-more v-if="loading" status="loading"></uni-load-more>
	</view>
</template>

<script>
import BookSection from '@/components/book/BookSection'

export default {
  components: {
    BookSection
  },
  data() {
    return {
      bookSectionTitles: ['名著', '计算机图书', '小说'],
      books: {},
      loading: false
    }
  },
  mounted () {
    this.loading = true
    this.bookSectionTitles.forEach(async(title) => {
      const res = await this.$api.getAllBooksByType({ bookType: title, pageIdx: 1, pageSize: 4})
      this.$set(this.books, title, res.data.data)
    })
    this.loading = false
  }
}
</script>

<style>

</style>
