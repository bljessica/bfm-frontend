<template>
  <view class="all-comments-container" @click="showCommentTypeOptions = false" style="background: #F3F7F6;min-height: 100vh;overflow: hidden;">
    <!-- 分数 -->
    <DetailScore :score="score" :my-score="myScore"></DetailScore>
    <!-- 短评 -->
    <view class="brief-comments-container">
      <!-- 标题 -->
      <view class="brief-comments-container__title" style="position: relative;display: flex;justify-content: space-between;align-items: center;">
        <span style="display: flex;align-items: center;font-weight: bold;">
          <span style="font-size: 26rpx;">短评</span> 
          <span style="font-size: 18rpx;color: #666;margin-left: 5rpx;">{{comments.length}}条</span>
        </span>
        <span style="font-size: 18rpx;color: #999;" @click.stop="showCommentTypeOptions = !showCommentTypeOptions">
          {{commentsType === 'want' ? '想看' : '看过'}}
          <image src="/static/images/up_arrow.png" 
            :style="{transform: showCommentTypeOptions ? 'rotate(0)' : 'rotate(180deg)'}"
            style="width: 18rpx;height: 18rpx;margin-left: 5rpx;position: relative;top: 2rpx;transition: all .2s;" />
        </span>
        <!-- 评论类型选择框 -->
        <view class="comment-type-options-container" v-show="showCommentTypeOptions">
          <view class="comment-type-options" :class="{'comment-type-options--active': commentsType === 'want'}" @click.stop="changeCommentsType('want')">想看</view>
          <view class="comment-type-options" :class="{'comment-type-options--active': commentsType === 'after'}" @click.stop="changeCommentsType('after')">看过</view>
        </view>
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
import BriefComment from '@/components/detail/BriefComment.vue'

export default {
  components: {
    DetailScore,
    BriefComment
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
.comment-type-options-container {
  position: absolute;
  top: 40rpx;
  right: 0;
  width: 120rpx;
  box-shadow: 1px 1px 1px 1px #ddd;
  text-align: center;
  .comment-type-options {
    width: 100%;
    height: 50rpx;
    line-height: 50rpx;
    color: #999;
    border: 1px solid #ddd;
    &.comment-type-options--active {
      color: #42BD56;
    }
  }
}
</style>