<template>
  <view class="search-result-item-container" @click="goToDetail">
    <image :src="item.coverSrc || '/static/images/addItem/' + itemKind + '_default.png'" style="width: 100rpx;height: 130rpx;"></image>
    <view class="search-result-item__info"
      :style="{borderBottom: showBorder ? '1px solid #ccc' : 'none'}">
      <view style="font-size: 20rpx;display: flex;align-items: center;">
        <image v-if="item.kind === 'film'" src="/static/images/search/play.png" style="width: 24rpx;height: 24rpx;margin-right: 5rpx;"></image>
        <span>
          {{item.name}}
          <span style="color: #ccc;">{{item.kind === 'film' ? '（' + item.publishTime.substring(0, 4) + '）': ''}}</span>
        </span>
      </view>
      <view class="search-result-item__rate" v-if="item.score">
        <uni-rate allow-half :size="8" :value="item.score / 2"/>
        {{item.score}}
      </view>
      <view class="search-result-item__rate" v-else>暂无评分</view>
      <view style="font-size: 14rpx;color: #ccc;">
        <span v-if="showTag" style="margin-right: 5rpx;color: black;display: inline-block;padding: 4rpx;background-color: #ddd;border-radius: 6rpx;">{{KIND_DETAILS[item.kind].NAME}}</span>
        <span>{{introduction}}</span>
      </view>
    </view>
  </view>
</template>

<script>
import { KIND_DETAILS } from '@/constants/constants.js'

export default {
  props: {
    item: {
      type: Object,
      default: {}
    },
    showTag: {
      type: Boolean,
      default: true
    },
    showBorder: {
      type: Boolean,
      default: true
    },
    kind: {
      type: String
    },
    actionType: {
      type: String
    }
  },
  data () {
    return {
      KIND_DETAILS
    }
  },
  computed: {
    itemKind () {
      return this.item.kind || this.kind
    },
    introduction () {
      if (this.itemKind === 'film') {
        return `${this.item.score || '暂无评'}分 / ${this.item.publishTime.substring(0, 4)} / 
          ${this.item.country} / ${this.item.type} / ${this.item.director} / ${this.item.actors}`
      } else if (this.itemKind === 'music') {
        return `${this.item.score || '暂无评'}分 / ${this.item.singer} / ${this.item.publishTime.substring(0, 4)}`
      } else if (this.itemKind === 'book') {
        return `${this.item.score || '暂无评'}分 / ${this.item.author} / ${this.item.publishTime.substring(0, 4)} / 
          ${this.item.publisher}`
      }
      return '暂无简介'
    }
  },
  methods: {
    goToDetail () {
      uni.navigateTo({
        url: '/pages/Detail?_id=' + this.item._id + '&kind=' + this.itemKind +'&actionType=' + this.actionType
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.search-result-item-container {
  width: 100%;
  display: flex;
  align-items: center;
}
.search-result-item__info {
  flex: 1;
  margin-left: 20rpx;
  height: 100rpx;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  padding: 30rpx 0;
}
.search-result-item__rate {
  margin: 10rpx 0;
  font-size: 14rpx;
  color: #ccc;
  display: flex;
  align-items: center;
}
</style>