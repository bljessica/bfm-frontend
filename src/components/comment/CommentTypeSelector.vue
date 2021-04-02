<template>
  <view style="position: relative;text-align: center;width: 80rpx;">
    <view style="font-size: 18rpx;color: #999;padding: 10rpx 0;" @click.stop="$emit('showCommentTypeOptionsChange')">
      {{commentsType === 'want' ? '想看' : '看过'}}
      <image src="/static/images/up_arrow.png" 
        :style="{transform: showCommentTypeOptions ? 'rotate(0)' : 'rotate(180deg)'}"
        style="width: 18rpx;height: 18rpx;margin-left: 5rpx;position: relative;top: 2rpx;transition: all .2s;" />
    </view>
    <view class="comment-type-options-container" v-show="showCommentTypeOptions">
      <view class="comment-type-options" :class="{'comment-type-options--active': commentsType === 'want'}" @click.stop="$emit('changeCommentsType', 'want')">想看</view>
      <view class="comment-type-options" :class="{'comment-type-options--active': commentsType === 'after'}" @click.stop="$emit('changeCommentsType', 'after')">看过</view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    showCommentTypeOptions: {
      type: Boolean,
      required: true
    },
    commentsType: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-type-options-container {
  font-size: 22rpx;
  position: absolute;
  top: 40rpx;
  right: 8rpx;
  width: 100%;
  box-shadow: 1px 1px 1px 1px #ddd;
  text-align: center;
  z-index: 1;
  background: #fff;
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