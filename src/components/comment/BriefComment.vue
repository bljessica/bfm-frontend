<template>
  <view class="brief-comments-container__content" style="padding-bottom: 20rpx;border-bottom: 1px solid #ddd;">
    <view class="comment-user-info">
      <image style="grid-area: a;width: 50rpx;height: 50rpx;border-radius: 50%;" :src="comment.user.avatarUrl || '/static/images/default_avatar.png'"></image>
      <view style="grid-area: b;font-weight: bold;">{{comment.user.nickName}}</view>
      <view style="grid-area: c;display: flex;align-items: center;">
        <uni-rate v-if="comment.score !== null && comment.score !== undefined" :readonly="true" style="margin-right: 10rpx;" allow-half :size="8" :value="comment.score / 2"/>
        <span style="font-size: 18rpx;color: #999;">{{formatedCommentTime}}</span>
      </view>
    </view>
    <view class="comment-content" style="margin: 20rpx 0 10rpx 0;word-break: break-all;word-wrap: break-word;">{{comment.comment}}</view>
    <view class="comment-liked-num" style="font-size: 18rpx;color: #999;">
      <image @click="likeOrUnlikeComment(comment._id)" v-if="!comment.liked" src="/static/images/detail/good.png" style="width: 20rpx;height: 20rpx;margin-right: 5rpx;position: relative;top: 5rpx;"></image>
      <image @click="likeOrUnlikeComment(comment._id)" v-else src="/static/images/detail/good_on.png" style="width: 20rpx;height: 20rpx;margin-right: 5rpx;position: relative;top: 5rpx;"></image>
      {{comment.commentLikedNum}}
    </view>
  </view>
</template>

<script>
import dayjs from 'dayjs'

export default {
  props: {
    comment: {
      type: Object,
      default: {}
    }
  },
  computed: {
    formatedCommentTime () {
      if (this.comment.commentTime.substring(0, 4) === dayjs().format('YYYY')) {
        return this.comment.commentTime.substring(5, 11)
      }
      return this.comment.commentTime.substring(0, 11)
    }
  },
  methods: {
    async likeOrUnlikeComment(_id) {
      await this.$api.likeOrUnlikeComment({
        recordId: _id,
        openid: getApp().globalData.openid
      })
      this.$emit('getItemComments')
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-user-info {
  margin-top: 20rpx;
  height: 50rpx;
  display: grid;
  grid-template-areas: 'a b'
                       'a c';
  grid-template-columns: 50rpx 1fr;
  grid-template-rows: 1.5fr 1fr;
  gap: 5rpx 10rpx;
}
</style>