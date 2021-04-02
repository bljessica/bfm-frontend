<template>
  <view class="search-page-container" style="background: #FEFEFE;min-height: 100vh;">
    <!-- 搜索栏 -->
    <view class="books-search-bar-container" style="background-color: #42BD56;width: 100%;height: 70rpx;" >
      <view class="books-search-bar">
        <image src="/static/images/search/search.png" style="width: 24rpx;height: 24rpx;margin: 0 5rpx;"></image>
        <input focus v-model="searchText" type="text" style="flex: 1" placeholder="搜索"/>
      </view>
    </view>
    <uni-load-more v-if="loading" iconType="circle" status="loading"></uni-load-more>
    <!-- 搜索结果 -->
    <view class="search-results-container" v-if="searchResults.length" style="width: 90%;margin: 0 auto;">
      <SearchResultItem v-for="item in searchResults" :item="item" :key="item._id" />
    </view>
    <view v-if="!searchResults.length && !loading" style="color: #999;text-align: center;font-size: 26rpx;margin-top: 20rpx;">暂无搜索结果</view>
  </view>
</template>

<script>
import SearchResultItem from '@/components/search/SearchResultItem.vue'
import { debounce } from 'lodash'

export default {
  components: {
    SearchResultItem
  },
  data () {
    return {
      searchText: '',
      loading: false,
      searchResults: [],
      focus: false
    }
  },
  watch: {
    searchText: {
      handler: debounce(async function (val) {
        if (val) {
          this.loading = true
          const res = await this.$api.search({searchText: val})
          this.searchResults = res.data.data
          this.loading = false
        } else {
          this.searchResults = []
        }
      }, 200),
      immediate: true
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
  align-items: center;
  color: #999;
}
</style>