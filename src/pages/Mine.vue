<template>
  <view>
    <view class="user-info-container">
      <image :src="(userInfo && userInfo.avatarUrl) || '/static/images/default_avatar.png'" style="width: 150rpx;height: 150rpx;border-radius: 50%;border: 3px solid white;"></image>
      <view class="user-info-container__name" style="font-size: 34rpx;color: white;">
        {{(userInfo && userInfo.nickName) ? userInfo.nickName : '未登录'}}
      </view>
      <!-- 登出按钮 -->
      <view class="user-info-container__log-out-btn" @click="logOut" v-if="userInfo">
        <image src="/static/images/quit.png" style="width: 24rpx;height: 24rpx;margin-right: 6rpx;"></image>
        <span>退出</span>
      </view>
    </view>
    <button @click="logIn" v-if="!userInfo">授权登录</button>
    <uni-load-more v-if="loading" iconType="circle" status="loading" :contentText="{contentrefresh: ''}"></uni-load-more>
    <!-- 我的书影音 -->
    <view class="my-bfm-container" v-if="userInfo" style="width: 90%;margin: 0 auto;">
      <view class="my-bfm-container__title" style="height: 70rpx;display: flex;align-items: center;justify-content: space-between;">
        <span style="font-size: 28rpx;">我的书影音</span>
        <span style="font-size: 24rpx;display: flex;align-items: center;color: #7B7B7B;">
          <span @click="goToMyBFM">全部</span>
          <image src="/static/images/right-arrow.png" style="width: 26rpx;height: 26rpx;margin-left: 8rpx;"></image>
        </span>
      </view>
      <!-- 观影分析 -->
      <view class="kind-analysis-container" @click="goToDoneAnalysis('film')">
        <image src="/static/images/film-analysis.png" style="width: 30rpx;height: 30rpx;"></image>
        <view class="analysis-name">观影分析</view>
        <view class="done-num" style="color: #2284E7;"><span style="font-size: 30rpx;margin-right: 5rpx;">{{getAnalysisByKindAndStatus('film', 'after')}}</span>看过</view>
        <view class="type-analysis" v-html="filmTagAnalysis"></view>
        <image src="/static/images/right-arrow.png" style="width: 26rpx;height: 26rpx;"></image>
      </view>
      <!-- 读书分析 -->
      <view class="kind-analysis-container" @click="goToDoneAnalysis('book')">
        <image src="/static/images/book-analysis.png" style="width: 30rpx;height: 30rpx;"></image>
        <view class="analysis-name">读书分析</view>
        <view class="done-num" style="color: #40BD55;"><span style="font-size: 30rpx;margin-right: 5rpx;">{{getAnalysisByKindAndStatus('book', 'after')}}</span>读过</view>
        <view class="marked-num">标记<span style="margin: 0 2rpx;">{{getAnalysisByKindAndStatus('book', 'all')}}</span>本书</view>
        <view class="start-analysis">开启读书分析</view>
        <view class="start-now">立即开始</view>
        <image src="/static/images/right-arrow.png" style="width: 26rpx;height: 26rpx;"></image>
      </view>
      <!-- 音乐分析 -->
      <view class="kind-analysis-container" @click="goToDoneAnalysis('music')">
        <image src="/static/images/music-analysis.png" style="width: 30rpx;height: 30rpx;"></image>
        <view class="analysis-name">音乐分析</view>
        <view class="done-num" style="color: #FF8C56;"><span style="font-size: 30rpx;margin-right: 5rpx;">{{getAnalysisByKindAndStatus('music', 'after')}}</span>听过</view>
        <view class="marked-num">标记<span style="margin: 0 2rpx;">{{getAnalysisByKindAndStatus('music', 'all')}}</span>张唱片</view>
        <view class="start-analysis">开启音乐分析</view>
        <view class="start-now">立即开始</view>
        <image src="/static/images/right-arrow.png" style="width: 26rpx;height: 26rpx;"></image>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      userInfo: null,
      loading: false,
      userAnalysis: null,
      filmTags: null
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
    await this.getUserAnalysis()
    await this.getFilmTagAnalysis()
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
    logIn () {
      this.loading = true
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
  background: url('/static/images/mine_background.png') 100% 100%;
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
</style>