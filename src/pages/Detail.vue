<template>
  <view style="background: #F3F7F6;">
    <!-- 信息 -->
    <view class="detail-title">
      <image :src="item.coverSrc" style="width: 180rpx;height: 240rpx;grid-area: a;"></image>
      <h3>{{item.name}}</h3>
      <view class="detail-title__introduction">{{briefIntroduction}}</view>
      <view class="detail-title__buttons" style="grid-area: d / d / e / e;display: flex;justify-content: space-between;">
        <view class="detail-title__button">
          <image src="/static/images/want-read.png" style="width: 30rpx;height: 30rpx;"></image>
          <view>想看</view>
        </view>
        <view class="detail-title__button">
          <image src="/static/images/reading.png" style="width: 28rpx;height: 28rpx;"></image>
          <view>在看</view>
        </view>
        <view class="detail-title__button">
          <image src="/static/images/have-read.png" style="width: 35rpx;height: 35rpx;position: relative;top: -2rpx;"></image>
          <view>看过</view>
        </view>
      </view>
    </view>
    <!-- 分数 -->
    <view class="detail-score">
      <view style="font-size: 20rpx;">豆瓣评分</view>
      <view>
        <h3 style="font-size: 50rpx;">{{item.score}}</h3>
        <uni-rate allow-half :size="8" :value="item.score / 2" style="position: relative;left: -10rpx;"/>
      </view>
    </view>
    <!-- 简介 -->
    <view style="width: 95%;margin: 60rpx auto;">
      <view style="font-size: 30rpx;font-weight: bold;margin-bottom: 20rpx;">简介</view>
      <view style="font-size: 22rpx;line-height: 40rpx;">{{item.introduction || '暂无'}}</view>
    </view>
    <!-- 短评 -->
    <view class="brief-comments-container">
      <view class="brief-comments-container__title" style="display: flex;justify-content: space-between;align-items: center;">
        <span style="font-size: 30rpx;font-weight: bold;">短评</span>
        <span style="font-size: 20rpx;">全部 100
          <image src="/static/images/right-arrow.png" style="width: 20rpx;height: 20rpx;margin-left: 5rpx;position: relative;top: 2rpx;"></image>
        </span>
      </view>
    </view>
  </view>
</template>

<script>
import { uniRate } from '@dcloudio/uni-ui'

export default {
  components: {
    uniRate
  },
  data () {
    return {
      item: null,
      kind: null
    }
  },
  async onLoad (option) {
    const res = await this.$api.getDetailById(option)
    this.item = res.data.data
    this.kind = option.kind
  },
  computed: {
    briefIntroduction() {
      if (this.kind === 'book') {
        return this.item.author || '暂无'
      } else if (this.kind === 'film') {
        return this.item.relatedInfo || '暂无'
      } else if (this.kind === 'music') {
        return ('[歌手]' + this.item.singer) || '暂无'
      }
      return '暂无'
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
  grid-template-columns: 1fr 1.5fr 1.5fr;
  grid-template-rows: repeat(3, 1fr);
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
  grid-area:c;
  font-size: 20rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.detail-title__button {
  font-weight: bold;
  box-sizing: border-box;
  padding: 20rpx;
  width: 120rpx;
  height: 50rpx;
  line-height: 50rpx;
  font-size: 20rpx;
  margin: 0;
  background-color: #fff;
  border-radius: 10rpx;
  border-bottom: 1px solid #ccc;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.detail-score {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background: white;
  border-radius: 10rpx;
  width: 95%;
  height: 150rpx;
  margin: 20rpx auto;
}
.brief-comments-container {
  font-size: 22rpx;
  width: 95%;
  margin: 60rpx auto;
  background: #fff;
  border-radius: 10rpx;
  box-sizing: border-box;
  padding: 20rpx;
}
</style>