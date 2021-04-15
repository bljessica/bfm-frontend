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
        <view style="color: #898989;padding-top: 15rpx;border-top: 1px solid #eeeeee;">
          <span>{{dayjs(content.time).format('YYYY-MM-DD HH:mm:ss')}}</span>
          <span style="float: right;" @click="deleteComment(content._id)">
            <image src="/static/images/mine/delete.png" class="comment-action-icon"></image>
            <span>删除</span>
          </span>
          <span style="float: right;margin-right: 16rpx;" @click.stop="startEditComment(content._id)">
            <image src="/static/images/mine/edit.png" class="comment-action-icon"></image>
            <span>编辑</span>
          </span>
        </view>
        <TimeLineSectionContentItem :record="content" />
      </view>
      <view v-if="!comments.length" style="padding: 20rpx 0;color: #a1a1a1;border-top: 1px solid #eeeeee;">
        暂无评论，快去标记吧~
      </view>
    </view>
    <uni-load-more v-if="loading" class="loading" iconType="circle" status="loading"></uni-load-more>
    <uni-popup ref="editingCommentDialog" type="dialog">
      <uni-popup-dialog 
        mode="input" 
        title="请输入评论内容" 
        :before-close="true" 
        @close="cancelEditingComment" 
        @confirm="editComment"
      />
    </uni-popup>
  </view>
</template>

<script>
import CommentTypeSelector from '@/components/comment/CommentTypeSelector.vue'
import TimeLineSectionContentItem from '@/components/mine/TimeLineSectionContentItem.vue'
import dayjs from 'dayjs'
import { uniPopup } from '@dcloudio/uni-ui'
import uniPopupDialog from '@dcloudio/uni-ui/lib/uni-popup-dialog/uni-popup-dialog.vue'

export default {
  components: {
    CommentTypeSelector,
    TimeLineSectionContentItem,
    uniPopup,
    uniPopupDialog
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
    cancelEditingComment (done) {
      this.editingCommentId = null
      done()
    },
    startEditComment (_id) {
      this.editingCommentId = _id
      this.$refs.editingCommentDialog.open()
    },
    async editComment (done, value) {
      await this.$api.editComment({
        _id: this.editingCommentId,
        comment: value
      })
      done()
      uni.showToast({
        title: '修改成功',
        icon: 'success'
      })
      this.editingCommentId = null
      await this.getUserComments()
    },
    async deleteComment (_id) {
      await this.$api.deleteComment({
        _id
      })
      await this.getUserComments()
    },
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

<style lang="scss" scoped>
.comment-action-icon {
  width: 24rpx;
  height: 24rpx;
  vertical-align: middle;
  margin-right: 6rpx;
}
</style>