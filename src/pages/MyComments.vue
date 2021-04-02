<template>
  <view class="my-comments-wrapper" style="padding: 20rpx 30rpx;font-size: 20rpx;">
    <view class="my-comments-wrapper__title" style="margin-bottom: 20rpx;display: flex;justify-content: space-between;align-items: center;">
      <span style="font-weight: bold;font-size: 22rpx;">评论类型</span>
      <CommentTypeSelector 
        :commentsType="commentsType"
        :showCommentTypeOptions="showCommentTypeOptions"
        @changeCommentsType="changeCommentsType"
        @showCommentTypeOptionsChange="showCommentTypeOptions = !showCommentTypeOptions"
      />
    </view>
    <view class="my-comments-wrapper__contents-wrapper">
      <view class="my-comments-wrapper__contents-wrapper__content" v-for="content in comments" :key="content.name">
        <view style="color: #898989;padding-top: 15rpx;border-top: 1px solid #eeeeee;">{{dayjs(content.time).format('YYYY-MM-DD HH:mm:ss')}}</view>
        <TimeLineSectionContentItem :record="content" />
      </view>
      <view v-if="!comments.length" style="padding: 20rpx 0;color: #a1a1a1;border-top: 1px solid #eeeeee;">
        暂无评论，快去标记吧~
      </view>
    </view>
    <uni-load-more v-if="loading" iconType="circle" status="loading"></uni-load-more>
  </view>
</template>

<script>
import CommentTypeSelector from '@/components/comment/CommentTypeSelector.vue'
import TimeLineSectionContentItem from '@/components/mine/TimeLineSectionContentItem.vue'
import dayjs from 'dayjs'

export default {
  components: {
    CommentTypeSelector,
    TimeLineSectionContentItem
  },
  data () {
    return {
      commentsType: 'want',
      showCommentTypeOptions: false,
      comments: [],
      loading: false,
      dayjs
    }
  },
  watch: {
    commentsType: {
      async handler () {
        await this.getUserComments()
      },
      immediate: true
    }
  },
  async onShow () {
    await this.getUserComments()
  },
  methods: {
    async getUserComments () {
      this.loading = true
      const res = await this.$api.getUserComments({
        openid: getApp().globalData.openid,
        status: this.commentsType
      })
      this.comments = res.data.data
      this.loading = false
    },
    changeCommentsType (type) {
      this.commentsType = type
      this.showCommentTypeOptions = false
    }
  }
}
</script>

<style>

</style>