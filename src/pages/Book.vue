<template>
	<view class="books-container">
    <view class="books-search-bar" style="background-color: #42BD56;width: 100%;height: 30px;">
      <input type="text" placeholder="搜索" style="border-radius: 4px;text-indent: 5px;font-size: 10px;width: 90%;background-color: white;margin: auto;">
    </view>
    <view class="book-sections-container" style="width: 90%;margin: 10px auto 0;">
      <BookSection v-for="item in bookSectionTitles" :key="item" :title="item"></BookSection>
    </view>
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
      bookSectionTitles: ['名著', '计算机图书', '小说']
    }
  },
  onLoad() {

  },
  methods: {

  }
}
</script>

<style>

</style>
