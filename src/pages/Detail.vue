<template>
  <view style="background: #F3F7F6;">
    <view class="detail-title">
      <image :src="item.coverSrc" style="width: 180rpx;height: 240rpx;grid-area: a;"></image>
      <h3>{{item.name}}</h3>
      <view class="detail-title__introduction">简介：{{briefIntroduction}}</view>
      <button class="detail-title__button" style="grid-area: d;">想看</button>
      <button class="detail-title__button" style="grid-area: e;">看过</button>
    </view>
    <view class="detail-score">
      <view style="font-size: 20rpx;">豆瓣评分</view>
      <view>
        <h3 style="font-size: 50rpx;">{{item.score}}</h3>
        <uni-rate allow-half :size="8" :value="item.score / 2" style="position: relative;left: -10rpx;"/>
      </view>
    </view>
    <view style="font-size: 26rpx;line-height: 50rpx;width: 90%;margin: 40rpx auto;">
      {{item.introduction || '暂无'}}
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
  display: grid;
  height: 240rpx;
  padding: 20rpx 20rpx 40rpx 40rpx;
  gap: 20rpx;
  align-items: center;
  grid-template-areas: 'a b b' 
                       'a c c' 
                       'a d e';
  grid-template-columns: repeat(3, 1fr);
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
  width: 180rpx;
  height: 70rpx;
  line-height: 70rpx;
  font-size: 30rpx;
  margin: 0;
  background-color: #fff;
}
.detail-score {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background: white;
  border-radius: 10rpx;
  width: 90%;
  height: 150rpx;
  margin: 20rpx auto;
}
</style>