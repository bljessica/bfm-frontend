<template>
  <view class="user-info-management-container" style="width: 95%;margin: 20rpx auto 0;">
    <view v-for="user in allUserInfo" :key="user._id" class="user-info-container">
      <image :src="user.avatarUrl || '/static/images/default_avatar.png'" style="width: 80rpx;height: 80rpx;border-radius: 50%;"></image>
      <span style="flex: 1;">{{user.nickName}}</span>
      <span class="user-info-container__action-button" @click="editUserInfo(user.openid)">编辑</span>
      <span class="user-info-container__action-button" @click="openDeleteUserDialog(user.openid)">删除</span>
    </view>
    <view v-if="!allUserInfo.length && !loading" style="font-size: 26rpx;text-align: center;color: #999;">暂无用户</view>
    <uni-load-more class="loading" v-if="loading" iconType="circle" status="loading"></uni-load-more>
    <uni-popup ref="deleteUserDialog" type="dialog">
      <uni-popup-dialog 
        mode="base" 
        :title="'确认删除此用户吗？'" 
        :before-close="true" 
        @close="cancelDeleteUser" 
        @confirm="deleteUser"
      />
    </uni-popup> 
  </view>
</template>

<script>
import { uniPopup } from '@dcloudio/uni-ui'
import uniPopupDialog from '@dcloudio/uni-ui/lib/uni-popup-dialog/uni-popup-dialog.vue'

export default {
  components: {
    uniPopup,
    uniPopupDialog
  },
  data () {
    return {
      allUserInfo: [],
      deleteUserOpenid: null,
      loading: false
    }
  },
  async onShow () {
    await this.getAllUserInfo()
  },
  methods: {
    async getAllUserInfo () {
      this.loading = true
      const res = await this.$api.getAllUserInfo()
      this.allUserInfo = res.data.data
      this.loading = false
    },
    openDeleteUserDialog (openid) {
      this.deleteUserOpenid = openid
      this.$refs.deleteUserDialog.open()
    },
    cancelDeleteUser (done) {
      done()
    },
    async deleteUser (done) {
      await this.$api.deleteUser({
        openid: this.deleteUserOpenid
      })
      done()
      this.deleteUserOpenid = null
      uni.showToast({
        title: '删除成功',
        icon: 'success'
      })
      await this.getAllUserInfo()
    },
    editUserInfo (openid) {
      uni.navigateTo({
        url: 'MyInfo?openid=' + openid
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.user-info-container {
  display: flex;
  align-items: center;
  height: 100rpx;
  &>span {
    margin-left: 6rpx;
  }
}
.user-info-container__action-button {
  padding: 6rpx;
  border-radius: 4rpx;
  border: 1px solid #ddd;
  font-size: 20rpx;
}
</style>