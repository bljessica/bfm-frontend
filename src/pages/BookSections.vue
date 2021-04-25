<template>
	<view class="books-container" style="background: #FEFEFE;">
    <view class="books-search-bar-container" style="background-color: #42BD56;width: 100%;height: 70rpx;" >
      <view class="books-search-bar" @click="goToSearch">
        <image src="/static/images/search/search.png" style="width: 24rpx;height: 24rpx;margin-right: 5rpx;"></image>
        <span>搜索</span>
      </view>
    </view>
    <view class="book-sections-container" style="width: 90%;margin: 20rpx auto 0;">
      <CommonSection v-for="item in bookSectionTitles" :showNum="false" :seekMore="true" :key="item" :items="books[item]" kind="book" :sectionTitle="item"></CommonSection>
    </view>
    <uni-load-more v-if="loading" class="loading" iconType="circle" status="loading"></uni-load-more>
	</view>
</template>

<script>
import CommonSection from '@/components/common/CommonSection'

export default {
  components: {
    CommonSection
  },
  data() {
    return {
      bookSectionTitles: ['名著', '计算机图书', '小说'],
      books: {},
      loading: false
    }
  },
  onShow () {
    this.loading = true
    this.bookSectionTitles.forEach(async(title) => {
      const res = await this.$api.getAllBooksByType({ type: title, pageIdx: 1, pageSize: 4})
      this.$set(this.books, title, res.data.data)
    })
    this.loading = false
  },
  methods: {
    goToSearch () {
      uni.navigateTo({
        url: '/pages/Search'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.books-search-bar {
  border-radius: 10rpx;
  font-size: 20rpx;
  width: 90%;
  background-color: white;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
  padding: 10rpx 0;
}
</style>
