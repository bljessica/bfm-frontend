<template>
  <view style="background: #F3F7F6;min-height: 100vh;">
    <!-- 信息 -->
    <view class="detail-title">
      <image :src="item.coverSrc" style="width: 180rpx;height: 240rpx;grid-area: a;"></image>
      <h3>{{item.name}}</h3>
      <view class="detail-title__introduction">{{briefIntroduction}}</view>
      <view class="detail-title__buttons" style="grid-area: d / d / e / e;display: flex;justify-content: space-between;">
        <view v-if="status !== 'after'" class="detail-title__button" :class="{'detail-title__button--on-status': status === 'want'}" @click="addRecord('want')">
          <image v-if="status !== 'want'" src="/static/images/want-read.png" style="width: 30rpx;height: 30rpx;margin-right: 6rpx;"></image>
          <view>{{status === 'want' ? '已' : ''}}想{{kind === 'music' ? '听' : '看'}}</view>
        </view>
        <view v-if="status !== 'after'" class="detail-title__button" :class="{'detail-title__button--on-status': status === 'doing'}" @click="addRecord('doing')">
          <image v-if="status !== 'doing'" src="/static/images/reading.png" style="width: 28rpx;height: 28rpx;margin-right: 10rpx;"></image>
          <view>{{status === 'doing' ? '已' : ''}}在{{kind === 'music' ? '听' : '看'}}</view>
        </view>
        <view class="detail-title__button detail-title__button-after" :class="{'detail-title__button--on-status': status === 'after'}" @click="addRecord(status === 'after' ? 'none' : 'after')">
          <image v-if="status !== 'after'" src="/static/images/have-read.png" style="width: 35rpx;height: 35rpx;margin-right: 4rpx;position: relative;top: -2rpx;"></image>
          <view>{{status === 'after' ? '已' : ''}}{{kind === 'music' ? '听' : '看'}}过</view>
        </view>
      </view>
    </view>
    <!-- 分数 -->
    <DetailScore :score="item.score"></DetailScore>
    <!-- 简介 -->
    <view style="width: 95%;margin: 60rpx auto;">
      <view style="font-size: 30rpx;font-weight: bold;margin-bottom: 20rpx;">简介</view>
      <view style="font-size: 22rpx;line-height: 40rpx;">{{item.introduction || '暂无'}}</view>
    </view>
    <!-- 影人 -->
    <view style="width: 95%;margin: 60rpx auto;" v-if="kind === 'film'">
      <view style="font-size: 30rpx;font-weight: bold;margin-bottom: 20rpx;">影人</view>
      <view style="font-size: 22rpx;line-height: 40rpx;">
        {{item.director}}<br />{{item.actors}}
      </view>
    </view>
    <!-- 短评 -->
    <view class="brief-comments-container" v-if="comments.length">
      <!-- 标题 -->
      <view class="brief-comments-container__title" style="display: flex;justify-content: space-between;align-items: center;">
        <span style="font-size: 26rpx;font-weight: bold;">短评</span>
        <span style="font-size: 20rpx;" @click="goToAllComments">全部 {{comments.length}}
          <image src="/static/images/right-arrow.png" style="width: 20rpx;height: 20rpx;margin-left: 5rpx;position: relative;top: 2rpx;"></image>
        </span>
      </view>
      <!-- 评论 -->
      <BriefComment :comment="comment" @getComments="getComments" v-for="comment in comments" :key="comment._id"></BriefComment>
      <uni-load-more v-if="loading" status="loading"></uni-load-more>
      <!-- 查看全部 -->
      <view style="display: flex;align-items: center;justify-content: space-between;height: 70rpx;" @click="goToAllComments">
        <view style="font-weight: bold;">查看全部短评</view>
        <image src="/static/images/right-arrow.png" style="width: 20rpx;height: 20rpx;"></image>
      </view>
    </view>
    <view v-if="!loading && !comments.length" class="brief-comments-container" style="font-size: 26rpx;font-weight: bold;text-align: center;padding-bottom: 20rpx;">暂无短评</view>
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
      item: null,
      kind: null,
      status: null,
      _id: null,
      commentsType: 'want',
      comments: [],
      loading: false
    }
  },
  async onLoad (options) {
    this.kind = options.kind
    this._id = options._id
  },
  async onShow () {
    await this.getDetail()
    await this.getComments()
  },
  computed: {
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
    goToAllComments () {
      uni.navigateTo({
        url: `AllComments?kind=${this.kind}&name=${this.item.name}&score=${this.item.score}`
      })
    },
    async getComments () {
      this.loading = true
      const res = await this.$api.getComments({
        status: this.commentsType,
        kind: this.kind,
        name: this.item.name,
        openid: getApp().globalData.openid
      })
      this.comments = res.data.data
      this.loading = false
    },
    async getDetail () {
      const res = await this.$api.getDetail({
        kind: this.kind,
        _id: this._id,
        openid: getApp().globalData.openid
      })
      if (!this.item) {
        this.item = res.data.data
      }
      this.status = res.data.status
    },
    async addRecord (status) {
      if (status === 'doing' || status === 'none') {
        await this.$api.addRecord({
          openid: getApp().globalData.openid,
          kind: this.kind,
          name: this.item.name,
          status
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
          url: pageName + '?kind=' + this.kind + '&name=' + escape(this.item.name)
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
</style>