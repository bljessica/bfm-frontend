<template>
  <view>
    <textarea class="want-comment" placeholder="记录一下想看的理由" v-model="wantComment"></textarea>
    <button type="primary" style="width: 90%;" @click="addOrUpdateRecord">确定</button>
  </view>
</template>

<script>
import dayjs from 'dayjs'

export default {
  data () {
    return {
      wantComment: '',
      kind: '',
      name: ''
    }
  },
  onLoad(options) {
    this.kind = options.kind
    this.name = unescape(options.name)
  },
  methods: {
    async addOrUpdateRecord () {
      const res = await this.$api.addOrUpdateRecord({
        openid: getApp().globalData.openid,
        kind: this.kind,
        name: this.name,
        status: 'want',
        wantComment: this.wantComment,
        wantCommentTime: dayjs().format('YYYY年MM月DD日')
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
.want-comment {
  width: 90%;
  padding: 10rpx;
  box-sizing: border-box;
  margin: 20rpx auto;
  border: 1px solid #ccc;
  border-radius: 10rpx;
  font-size: 26rpx;
}
</style>