<template>
  <view>
    <view style="font-size: 18rpx;color: #999;margin: 20rpx auto;text-align: center;">点击星星评分</view>
    <uni-rate style="display: flex;justify-content: center;" :size="20" v-model="score"/>
    <textarea class="after-comment" placeholder="写几句评价吧" v-model="afterComment"></textarea>
    <button type="primary" style="width: 90%;" @click="addRecord">确定</button>
  </view>
</template>

<script>
import dayjs from 'dayjs'

export default {
  data () {
    return {
      afterComment: '',
      kind: '',
      name: '',
      score: 0
    }
  },
  onLoad(options) {
    this.kind = options.kind
    this.name = unescape(options.name)
  },
  methods: {
    async addRecord () {
      const res = await this.$api.addRecord({
        openid: getApp().globalData.openid,
        kind: this.kind,
        name: this.name,
        status: 'after',
        score: this.score * 2,
        comment: this.afterComment,
        commentTime: dayjs().format('YYYY年MM月DD日 HH:MM:ss')
      })
      if (res.data.code === 0) {
        uni.showToast({
          icon: 'success',
          title: '评论成功'
        })
        setTimeout(() => {
          uni.navigateBack()
        }, 1000)
      } else {
        uni.showToast({
          icon: 'none',
          title: '评论失败'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.after-comment {
  width: 90%;
  padding: 10rpx;
  box-sizing: border-box;
  margin: 20rpx auto;
  border: 1px solid #ccc;
  border-radius: 10rpx;
  font-size: 26rpx;
}
</style>