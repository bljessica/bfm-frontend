<template>
  <view style="background-color: #f7f7f7;">
    <view class="user-info-container">
      <image src="/static/images/mine/mine_background.png" style="width: 100%;height: 100%;position: absolute;top: 0;"></image>
      <image :src="(userInfo && userInfo.avatarUrl) || '/static/images/default_avatar.png'" style="width: 150rpx;height: 150rpx;border-radius: 50%;border: 3px solid white;z-index: 1;"></image>
      <view class="user-info-container__name" style="font-size: 34rpx;color: white;">
        {{(userInfo && userInfo.nickName) ? userInfo.nickName : '未登录'}}
      </view>
      <!-- 登出按钮 -->
      <view class="user-info-container__log-out-btn" @click="logOut" v-if="userInfo">
        <image src="/static/images/mine/quit.png" style="width: 24rpx;height: 24rpx;margin-right: 6rpx;"></image>
        <span>退出</span>
      </view>
    </view>
    <button @click="logIn" v-if="!userInfo && !loading">授权登录</button>
    <uni-load-more v-if="loading" iconType="circle" status="loading" :contentText="{contentrefresh: ''}"></uni-load-more>
    <!-- 我的书影音 -->
    <view class="my-bfm-container" v-if="userInfo" style="width: 100%;box-sizing: border-box;padding: 0 5%;background-color: #fff;" @click="goToMyBFM">
      <view class="my-bfm-container__title my-actions__item">
        <span>我的书影音</span>
        <span>
          <span>全部</span>
          <image src="/static/images/right_arrow.png"></image>
        </span>
      </view>
      <!-- 观影分析 -->
      <view class="kind-analysis-container" @click="goToDoneAnalysis('film')">
        <image src="/static/images/mine/film_analysis.png" style="width: 30rpx;height: 30rpx;"></image>
        <view class="analysis-name">观影分析</view>
        <view class="done-num" style="color: #2284E7;"><span style="font-size: 30rpx;margin-right: 5rpx;">{{getAnalysisByKindAndStatus('film', 'after')}}</span>看过</view>
        <view class="type-analysis" v-html="filmTagAnalysis"></view>
        <image src="/static/images/right_arrow.png" style="width: 26rpx;height: 26rpx;"></image>
      </view>
      <!-- 读书分析 -->
      <view class="kind-analysis-container" @click="goToDoneAnalysis('book')">
        <image src="/static/images/mine/book_analysis.png" style="width: 30rpx;height: 30rpx;"></image>
        <view class="analysis-name">读书分析</view>
        <view class="done-num" style="color: #40BD55;"><span style="font-size: 30rpx;margin-right: 5rpx;">{{getAnalysisByKindAndStatus('book', 'after')}}</span>读过</view>
        <view class="marked-num">标记<span style="margin: 0 2rpx;">{{getAnalysisByKindAndStatus('book', 'all')}}</span>本书</view>
        <view class="start-analysis">开启读书分析</view>
        <view class="start-now">立即开始</view>
        <image src="/static/images/right_arrow.png" style="width: 26rpx;height: 26rpx;"></image>
      </view>
      <!-- 音乐分析 -->
      <view class="kind-analysis-container" @click="goToDoneAnalysis('music')">
        <image src="/static/images/mine/music_analysis.png" style="width: 30rpx;height: 30rpx;"></image>
        <view class="analysis-name">音乐分析</view>
        <view class="done-num" style="color: #FF8C56;"><span style="font-size: 30rpx;margin-right: 5rpx;">{{getAnalysisByKindAndStatus('music', 'after')}}</span>听过</view>
        <view class="marked-num">标记<span style="margin: 0 2rpx;">{{getAnalysisByKindAndStatus('music', 'all')}}</span>张唱片</view>
        <view class="start-analysis">开启音乐分析</view>
        <view class="start-now">立即开始</view>
        <image src="/static/images/right_arrow.png" style="width: 26rpx;height: 26rpx;"></image>
      </view>
    </view>
    <!-- 我的评论 -->
    <view class="my-actions__item my-actions__item--no-subitems" v-if="userInfo" @click="goToMyBFM">
      <span style="font-size: 28rpx;">我的评论</span>
      <span style="font-size: 24rpx;display: flex;align-items: center;color: #7B7B7B;">
        <span>全部</span>
        <image src="/static/images/right_arrow.png"></image>
      </span>
    </view>
    <!-- 我的评分 -->
    <view class="my-actions__item my-actions__item--no-subitems" v-if="userInfo" @click="goToMyBFM">
      <span style="font-size: 28rpx;">我的评分</span>
      <span style="font-size: 24rpx;display: flex;align-items: center;color: #7B7B7B;">
        <span>全部</span>
        <image src="/static/images/right_arrow.png"></image>
      </span>
    </view>
    <!-- 时间线 -->
    <view class="time-line-wrapper" v-if="userInfo && timeLineData">
      <view class="time-line-wrapper__line"></view>
      <view class="time-line-wrapper__section-wrapper" v-for="section in Object.keys(timeLineData)" :key="section">
        <!-- 标题 -->
        <view class="time-line-wrapper__section-title">{{timeLineData[section].name}}</view>
        <!-- 统计 -->
        <view class="time-line-wrapper__section-statistics time-line-wrapper__section-item">
          <div v-for="item in timeLineData[section].statistics" :key="item">
            <div>{{KIND_STATUS[item._id.kind + '-' + item._id.status]}}</div>
            <div style="font-weight: bold;color: #2786e5;">{{item.count}}</div>
          </div>
        </view>
        <!-- 内容 -->
        <view v-for="content in timeLineData[section].contents" :key="content.name" class="time-line-wrapper__section-item">
          <view class="time-line-wrapper__section-item-title">{{dayjs(content.time).format('YYYY-MM-DD') + '  ' + KIND_STATUS[content.kind + '-' + content.status]}}</view>
          <TimeLineSectionContentItem :record="content" class="time-line-wrapper__section-item-content" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { KIND_STATUS } from '@/constants/constants.js'
import TimeLineSectionContentItem from '@/components/mine/TimeLineSectionContentItem.vue'
import dayjs from 'dayjs'

export default {
  components: {
    TimeLineSectionContentItem
  },
  data () {
    return {
      userInfo: null,
      loading: false,
      userAnalysis: null,
      filmTags: null,
      timeLineData: null,
      KIND_STATUS,
      dayjs
    }
  },
  async onLoad () {
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.userInfo = JSON.parse(userInfo)
      await this.$api.addUser({
        ...userInfo,
        openid: getApp().globalData.openid
      })
    } 
  },
  async onShow () {
    if (getApp().globalData.openid) {
      await this.getUserAnalysis()
      await this.getFilmTagAnalysis()
      await this.getTimeLineData()
    }
  },
  computed: {
    filmTagAnalysis () {
      if (!this.filmTags) {
        return '暂无观影分析'
      }
      const total = Object.values(this.filmTags).reduce((acc, cur) => {
        return acc + cur
      }, 0)
      if (total === 0) {
        return '暂无观影分析'
      }
      let tags = []
      Object.keys(this.filmTags).forEach(item => {
        tags.push([item, (this.filmTags[item] / total * 100).toFixed(1)])
      })
      tags.sort((a, b) => {
        return b[1] - a[1]
      })
      if (tags.length > 3) {
        tags = tags.slice(0, 3)
      }
      if (tags.length > 2) {
        tags[2][0] = '<br />' + tags[2][0]
      }
      return tags.reduce((acc, cur) => {
        return acc + cur[0] + ' ' + cur[1] + '%  '
      }, '')
    }
  },
  methods: {
    async getTimeLineData () {
      const res = await this.$api.getTimeLineData({
        openid: getApp().globalData.openid
      })
      this.timeLineData = res.data.data
    },
    goToDoneAnalysis (kind) {
      uni.navigateTo({
        url: 'DoneAnalysis?kind=' + kind
      })
    },
    goToMyBFM () {
      uni.navigateTo({url: 'MyBFM'})
    },
    async getFilmTagAnalysis () {
      const res = await this.$api.getFilmTagAnalysis({
        openid: getApp().globalData.openid,
        status: 'after'
      })
      this.filmTags = res.data.data
    },
    getAnalysisByKindAndStatus (kind, status) {
      if (!this.userAnalysis) {
        return 0
      }
      if (status === 'all') {
        return this.userAnalysis.reduce((acc, item) => {
          if (item._id.kind === kind) {
            return acc + item.count
          } else {
            return acc
          }
        }, 0)
      }
      const analysis = this.userAnalysis.find(item => {
        return item._id.status === status && item._id.kind === kind
      })
      return (analysis && analysis.count) || 0
    },
    logOut () {
      wx.setStorageSync('userInfo', null)
      wx.setStorageSync('openid', null)
      getApp().globalData.openid = null
      this.userInfo = null
      uni.showToast({
        icon: 'success',
        title: '登出成功'
      })
    },
    async getUserAnalysis () {
      const res = await this.$api.getUserAnalysis({
        openid: getApp().globalData.openid
      })
      this.userAnalysis = res.data.data
    },
    getOpenid () {
      const openid = wx.getStorageSync('openid')
      if (openid) {
        getApp().globalData.openid = openid
      } else {
        return new Promise((resolve) => {
          wx.login({
            success (res) {
              if (res.code) {
                //发起网络请求
                wx.request({
                  url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxa1dbcf33cd13d747&secret=c064e88c0e80980d3762be30710428b2&js_code=' + 
                    res.code + '&grant_type=authorization_code',
                  data: {
                    code: res.code
                  },
                  success(res) {
                    //1.存用户信息到本地存储
                    wx.setStorageSync('openid', res.data.openid)
                    console.log('登录成功, openid' + res.data.openid)
                    //2.存用户信息到全局变量
                    getApp().globalData.openid = res.data.openid
                    resolve()
                  }
                })
              } else {
                console.log('登录失败！' + res.errMsg)
              }
            }
          })
        })
        
      }
    },
    async logIn () {
      this.loading = true
      await this.getOpenid()
      let that = this;
      uni.login({
        provider: 'weixin',
        success: function (loginRes) {
          // 获取用户信息
          uni.getUserInfo({
            provider: 'weixin',
            success: async (infoRes) => {
              console.log('用户信息', infoRes.userInfo)
              that.userInfo = infoRes.userInfo
              wx.setStorageSync('userInfo', JSON.stringify(infoRes.userInfo))
              await that.$api.addUser({
                ...infoRes.userInfo,
                openid: getApp().globalData.openid
              })
              await that.getUserAnalysis()
              await that.getFilmTagAnalysis()
              await that.getTimeLineData()
              uni.showToast({
                icon: 'success',
                title: '登录成功'
              })
            },
            fail () {
              uni.showToast({
                icon: 'none',
                title: '用户未授权'
              })
            },
            complete () {
              that.loading = false
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.user-info-container {
  height: 340rpx;
  box-sizing: border-box;
  padding: 60rpx 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 32rpx;
  position: relative;
}
.user-info-container__log-out-btn {
  position: absolute;
  bottom: 40rpx;
  right: 40rpx;
  color: white;
  font-size: 24rpx;
  display: flex;
  align-items: center;
  padding: 6rpx;
  border: 1px solid white;
  border-radius: 6rpx;
}
.kind-analysis-container {
  display: grid;
  grid-template-areas: 'a b c d e'
                       'a f g h e';
  grid-template-columns: 1fr 3fr 1.5fr 1.5fr 1fr;
  grid-template-rows: 2fr 3fr;
  height: 100rpx;
  width: 100%;
  align-items: center;
  padding: 10rpx 0;
  font-size: 20rpx;
  border-bottom: 1px solid #ddd;
  &:last-of-type {
    border: none;
  }
  &>image:first-of-type {
    grid-area: a;
    margin-left: 10rpx;
  }
  &>image:last-of-type {
    grid-area: e;
    justify-self: end;
  }
  .analysis-name {
    grid-area: b;
    align-self: end;
  }
  .done-num {
    grid-area: f;
    font-weight: bold;
  }
  .type-analysis {
    grid-area: c / c / h / h;
    color: #999;
    white-space: pre;
    line-height: 40rpx;
  }
  .marked-num {
    grid-area: c;
    color: #999;
    align-self: end;
  }
  .start-analysis {
    grid-area: g;
    color: #999;
  }
  .start-now {
    grid-area: d / d / h / h;
    padding: 6rpx 8rpx;
    height: 30rpx;
    text-align: center;
    line-height: 30rpx;
    background: rgb(245, 245, 245);
    border-radius: 6rpx;
    justify-self: end;
    font-weight: bold;
    color: #333;
  }
}
.my-actions__item {
  height: 70rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20rpx;
  background-color: #fff;
  &:first-of-type {
    margin-top: 0;
  }
  &.my-actions__item--no-subitems {
    width: 100%;
    box-sizing: border-box;
    padding: 0 5%;
  }
  &>span:first-of-type {
    font-size: 28rpx;
  }
  &>span:last-of-type {
    font-size: 24rpx;
    display: flex;
    align-items: center;
    color: #7B7B7B;
    image {
      width: 26rpx;
      height: 26rpx;
      margin-left: 8rpx;
    }
  }
}
.time-line-wrapper {
  position: relative;
  font-size: 20rpx;
}
.time-line-wrapper__line {
  width: 1px;
  height: 100%;
  position: absolute;
  left: 40rpx;
  top: 40rpx;
  background: #ebebeb;
  transform: translateX(-50%);
}
.time-line-wrapper__section-statistics {
  color: #858585;
  height: 110rpx;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  &>div {
    width: 16%;
    height: 60rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
}
.time-line-wrapper__section-title {
  font-size: 24rpx;
  font-weight: bold;
  background: #f7f7f7;
  height: 40rpx;
  line-height: 40rpx;
  padding: 10rpx 0;
  margin-left: 80rpx;
  position: relative;
  &::before {
    content: '';
    display: block;
    width: 20rpx;
    height: 20rpx;
    border-radius: 50%;
    border: 1px solid #d2d2d2;
    background-color: #efefef;
    box-sizing: border-box;
    position: absolute;
    left: -40rpx;
    top: 30rpx;
    transform: translateX(-50%) translateY(-50%);
  }
}
.time-line-wrapper__section-item {
  background-color: #fff;
  padding: 0 20rpx 0 80rpx;
  overflow: hidden;
}
.time-line-wrapper__section-item-title {
  color: #898989;
  padding-top: 20rpx;
  position: relative;
  height: 28rpx;
  line-height: 28rpx;
  &:first-of-type {
    border-top: 1px solid #eeeeee;
  }
  &::before {
    content: '';
    display: block;
    width: 12rpx;
    height: 12rpx;
    border-radius: 50%;
    background-color: #ebeaea;
    box-sizing: border-box;
    position: absolute;
    left: -40rpx;
    top: 34rpx;
    transform: translateX(-50%) translateY(-50%);
  }
}
</style>