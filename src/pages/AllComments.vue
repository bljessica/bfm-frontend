<template>
  <view class="all-comments-container" @click="showCommentTypeOptions = false" style="background: #F3F7F6;min-height: 100vh;overflow: hidden;">
    <!-- 分数 -->
    <DetailScore :score="score" :my-score="myScore"></DetailScore>
    <!-- 短评 -->
    <view class="brief-comments-container">
      <!-- 标题 -->
      <view class="brief-comments-container__title" style="display: flex;justify-content: space-between;align-items: center;">
        <span style="display: flex;align-items: center;font-weight: bold;">
          <span style="font-size: 26rpx;">短评</span> 
          <span style="font-size: 18rpx;color: #666;margin-left: 5rpx;">{{comments.length}}条</span>
        </span>
        <CommentTypeSelector 
          :commentsType="commentsType"
          :showCommentTypeOptions="showCommentTypeOptions"
          @changeCommentsType="changeCommentsType"
          @showCommentTypeOptionsChange="showCommentTypeOptions = !showCommentTypeOptions"
        />
      </view>
      <!-- 评论 -->
      <BriefComment :comment="comment" @getItemComments="getItemComments" v-for="comment in comments" :key="comment._id"></BriefComment>
      <view v-if="!comments.length && !loading" style="font-size: 26rpx;font-weight: bold;text-align: center;">暂无短评</view>
      <uni-load-more v-if="loading" iconType="circle" status="loading"></uni-load-more>
    </view>
  </view>
</template>

<script>
import DetailScore from '@/components/detail/DetailScore.vue'
import BriefComment from '@/components/comment/BriefComment.vue'
import CommentTypeSelector from '@/components/comment/CommentTypeSelector.vue'

export default {
  components: {
    DetailScore,
    BriefComment,
    CommentTypeSelector
  },
  data () {
    return {
      kind: null,
      name: null,
      score: null,
      myScore: null,
      commentsType: null,
      comments: [],
      showCommentTypeOptions: false,
      loading: false
    }
  },
  onLoad (options) {
    this.kind = options.kind
    this.name = options.name
    this.score = options.score
    this.myScore = options.myScore
    this.commentsType = options.commentsType
  },
  async onShow () {
    await this.getItemComments()
  },
  watch: {
    commentsType: {
      async handler () {
        await this.getItemComments()
      },
      immediate: true
    }
  },
  methods: {
    changeCommentsType (type) {
      this.commentsType = type
      this.showCommentTypeOptions = false
    },
    async getItemComments () {
      this.loading = true
      const res = await this.$api.getItemComments({
        status: this.commentsType,
        kind: this.kind,
        name: this.name,
        openid: getApp().globalData.openid
      })
      this.comments = res.data.data
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.brief-comments-container {
  font-size: 22rpx;
  width: 95%;
  margin: 30rpx auto;
  background: #fff;
  border-radius: 10rpx;
  box-sizing: border-box;
  padding: 20rpx;
  padding-bottom: 0;
  border-top: 1px solid #ddd;
  background: #F3F7F6;
}
</style>