<template>
  <view style="background: #F3F7F6;min-height: 100vh;">
    <!-- 信息 -->
    <view class="detail-title">
      <image :src="item.coverSrc || '/static/images/addItem/' + kind + '_default.png'" style="width: 180rpx;height: 240rpx;grid-area: a;"></image>
      <h3>{{item.name}}</h3>
      <view class="detail-title__introduction">{{briefIntroduction}}</view>
      <view class="detail-title__buttons" style="grid-area: d / d / e / e;display: flex;justify-content: space-between;">
        <view v-if="status !== 'after'" class="detail-title__button" :class="{'detail-title__button--on-status': status === 'want'}" @click="addRecord('want')">
          <image v-if="status !== 'want'" src="/static/images/detail/want_read.png" style="width: 30rpx;height: 30rpx;margin-right: 6rpx;"></image>
          <view>{{status === 'want' ? '已' : ''}}想{{KIND_DETAILS[kind].STATUS_NAME}}</view>
        </view>
        <view v-if="status !== 'after'" class="detail-title__button" :class="{'detail-title__button--on-status': status === 'doing'}" @click="addRecord('doing')">
          <image v-if="status !== 'doing'" src="/static/images/detail/reading.png" style="width: 28rpx;height: 28rpx;margin-right: 10rpx;"></image>
          <view>{{status === 'doing' ? '已' : ''}}在{{KIND_DETAILS[kind].STATUS_NAME}}</view>
        </view>
        <view class="detail-title__button detail-title__button-after" :class="{'detail-title__button--on-status': status === 'after'}" @click="addRecord(status === 'after' ? 'none' : 'after')">
          <image v-if="status !== 'after'" src="/static/images/detail/have_read.png" style="width: 35rpx;height: 35rpx;margin-right: 4rpx;position: relative;top: -2rpx;"></image>
          <view>{{status === 'after' ? '已' : ''}}{{KIND_DETAILS[kind].STATUS_NAME}}过</view>
        </view>
      </view>
    </view>
    <!-- 分数 -->
    <DetailScore :score="item.score" :my-score="myScore"></DetailScore>
    <!-- 简介 -->
    <view style="width: 95%;margin: 60rpx auto;" v-if="actionType !== 'admin'">
      <view style="font-size: 30rpx;font-weight: bold;margin-bottom: 20rpx;">简介</view>
      <view style="font-size: 22rpx;line-height: 40rpx;">{{item.introduction || '暂无'}}</view>
    </view>
    <!-- 影人 -->
    <view style="width: 95%;margin: 60rpx auto;" v-if="kind === 'film' && actionType !== 'admin'">
      <view style="font-size: 30rpx;font-weight: bold;margin-bottom: 20rpx;">影人</view>
      <view style="font-size: 22rpx;line-height: 40rpx;">
        {{item.director}}<br />{{item.actors}}
      </view>
    </view>
    <!-- 短评 -->
    <view class="brief-comments-container" v-if="comments.length && actionType !== 'admin'">
      <!-- 标题 -->
      <view class="brief-comments-container__title" @click="goToAllComments" style="display: flex;justify-content: space-between;align-items: center;">
        <span style="font-size: 26rpx;font-weight: bold;">短评</span>
        <span style="font-size: 20rpx;">全部 {{comments.length}}
          <image src="/static/images/right_arrow.png" style="width: 20rpx;height: 20rpx;margin-left: 5rpx;position: relative;top: 2rpx;"></image>
        </span>
      </view>
      <!-- 评论 -->
      <BriefComment :comment="comment" @getItemComments="getItemComments" v-for="comment in comments" :key="comment._id"></BriefComment>
      <uni-load-more v-if="loading" class="loading" iconType="circle" status="loading"></uni-load-more>
      <!-- 查看全部 -->
      <view style="display: flex;align-items: center;justify-content: space-between;height: 70rpx;" @click="goToAllComments">
        <view style="font-weight: bold;">查看全部短评</view>
        <image src="/static/images/right_arrow.png" style="width: 20rpx;height: 20rpx;"></image>
      </view>
    </view>
    <view v-if="!loading && !comments.length && actionType !== 'admin'" class="brief-comments-container" style="font-size: 26rpx;font-weight: bold;text-align: center;padding-bottom: 20rpx;">
      暂无短评
    </view>
    <view class="admin-actions-wrapper" v-if="actionType === 'admin'">
      <span @click="performAdminAction('update')" style="background-color: #40bd55;">修改{{kindName}}</span>
      <span @click="performAdminAction('delete')" style="background-color: #d9230b;">删除{{kindName}}</span>
    </view>
    <uni-popup v-if="kind" ref="deleteItemDialog" type="dialog">
      <uni-popup-dialog 
        mode="base" 
        :title="'确认删除此' + KIND_DETAILS[kind].NAME + '吗？'" 
        :before-close="true" 
        @close="cancelDeleteItem" 
        @confirm="deleteItem"
      />
    </uni-popup>
  </view>
</template>

<script>
import DetailScore from '@/components/detail/DetailScore.vue'
import BriefComment from '@/components/comment/BriefComment.vue'
import { KIND_DETAILS } from '@/constants/constants'
import { uniPopup } from '@dcloudio/uni-ui'
import uniPopupDialog from '@dcloudio/uni-ui/lib/uni-popup-dialog/uni-popup-dialog.vue'

export default {
  components: {
    DetailScore,
    BriefComment,
    uniPopup,
    uniPopupDialog
  },
  data () {
    return {
      item: null,
      kind: null,
      status: null,
      myScore: null,
      _id: null,
      commentsType: 'want',
      comments: [],
      loading: false,
      KIND_DETAILS,
      userInfo: null,
      actionType: null
    }
  },
  async onLoad (options) {
    this.kind = options.kind
    this._id = options._id
    this.actionType = options.actionType
  },
  async onShow () {
    await this.getDetail()
    await this.getItemComments()
    await this.getUserInfo()
  },
  computed: {
    kindName () {
      return this.kind && this.KIND_DETAILS[this.kind].NAME
    },
    briefIntroduction() {
      if (!this.item) {
        return '暂无'
      }
      if (this.kind === 'book') {
        return `${this.item.author} / ${this.item.publisher} / 出版时间：${this.item.publishTime}` || '暂无'
      } else if (this.kind === 'film') {
        return `${this.item.type} / ${this.item.country}` || '暂无'
      } else if (this.kind === 'music') {
        return `${this.item.type} / 表演者：${this.item.singer} / 发行时间：${this.item.publishTime}` || '暂无'
      }
      return '暂无'
    }
  },
  methods: {
    cancelDeleteItem (done) {
      done()
    },
    async deleteItem (done) {
      const res = await this.$api.deleteItem({
        kind: this.kind,
        _id: this._id,
        name: this.item.name
      })
      if (!res.data.code) {
        done()
        uni.showToast({
          title: '删除成功',
          icon: 'success'
        })
        uni.navigateBack()
      } else {
        done()
        uni.showToast({
          title: '删除失败',
          icon: 'none'
        })
      }
    },
    async getUserInfo () {
      const openid = getApp().globalData.openid
      if (openid) {
        const res = await this.$api.getUserInfo({
          openid
        })
        this.userInfo = res.data.data
      }
    },
    performAdminAction (actionType) {
      if (actionType === 'delete') {
        this.$refs.deleteItemDialog.open()
      } else {
        uni.navigateTo({
          url: `/pages/admin/AdminAction?kind=${this.kind}&_id=${this._id}&actionType=${actionType}`
        })
      }
    },
    goToAllComments () {
      uni.navigateTo({
        url: `/pages/comment/AllComments?kind=${this.kind}&name=${this.item.name}&score=${this.item.score}&myScore=${this.myScore}&commentsType=${this.commentsType}`
      })
    },
    async getItemComments () {
      this.loading = true
      let res = await this.$api.getItemComments({
        status: this.commentsType,
        kind: this.kind,
        name: this.item.name,
        openid: getApp().globalData.openid
      })
      if (!res.data.data.length) {
        this.commentsType = this.commentsType === 'after' ? 'want' : 'after'
        res = await this.$api.getItemComments({
          status: this.commentsType,
          kind: this.kind,
          name: this.item.name,
          openid: getApp().globalData.openid
        })
      }
      this.comments = res.data.data
      this.loading = false
    },
    async getDetail () {
      const res = await this.$api.getDetail({
        kind: this.kind,
        _id: this._id,
        openid: getApp().globalData.openid
      })
      this.item = res.data.data
      this.status = res.data.status
      this.myScore = (res.data.myScore === null || res.data.myScore === undefined) ? -1 : res.data.myScore
    },
    async addRecord (status) {
      if (!getApp().globalData.openid) {
        uni.switchTab({
          url: '/pages/mine/Mine'
        })
        uni.showToast({
          icon: 'none',
          title: '请先登录'
        })
        return
      }
      if (status === 'doing' || status === 'none') {
        await this.$api.addRecord({
          openid: getApp().globalData.openid,
          kind: this.kind,
          name: this.item.name,
          status,
          time: Date.now()
        })
        await this.getDetail()
      } else {
        let pageName = ''
        if (status === 'want') {
          pageName = 'WantComment'
        } else {
          pageName = 'AfterComment'
        }
        uni.navigateTo({
          url: '/pages/comment/' + pageName + '?kind=' + this.kind + '&name=' + escape(this.item.name)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-title {
  margin: 0 auto;
  width: 95%;
  display: grid;
  height: 240rpx;
  gap: 20rpx;
  align-items: center;
  grid-template-areas: 'a b b' 
                       'a c c' 
                       'a d e';
  grid-template-columns: 1.2fr 1.5fr 1.5fr;
  grid-template-rows: 1fr 1fr 2fr;
  &>h3 {
    grid-area:b;
    font-size: 40rpx;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.detail-title__introduction {
  height: 100%;
  grid-area:c;
  font-size: 18rpx;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.detail-title__button {
  font-weight: bold;
  box-sizing: border-box;
  width: 120rpx;
  height: 50rpx;
  line-height: 50rpx;
  font-size: 20rpx;
  margin: 0;
  background-color: #fff;
  border-radius: 10rpx;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  &.detail-title__button--on-status {
    background-color: rgb(224, 224, 224);
    color: rgb(177, 176, 176);
    &.detail-title__button-after {
      width: 100%;
    }
  }
}
.brief-comments-container {
  font-size: 22rpx;
  width: 95%;
  margin: 60rpx auto;
  background: #fff;
  border-radius: 10rpx;
  box-sizing: border-box;
  padding: 20rpx;
  padding-bottom: 0;
}
.admin-actions-wrapper {
  margin: 20rpx auto 0;
  height: 100rpx;
  width: 95%;
  box-sizing: border-box;
  padding: 0 20rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-radius: 10rpx;
  &>span {
    padding: 10rpx;
    border-radius: 10rpx;
    font-size: 22rpx;
    background-color: #42BD56;
    color: #fff;
    margin: 0 10rpx;
  }
}
</style>