<template>
  <view class="my-info-container">
    <!-- 用户信息显示 -->
    <view class="my-info__item" v-for="item in Object.keys(userInfo || {})" :key="item">
      <view>{{USER_INFOS[item]}}</view>
      <view>
        <view class="my-info__item__content" v-if="item === 'avatarUrl'" @click="chooseAvatar">
          <image :src="userInfo.avatarUrl || '/static/images/default_avatar.png'" style="width: 80rpx;height: 80rpx;border-radius: 50%;"></image>
        </view>
        <view 
          v-else
          class="my-info__item__content" 
          @click="showSelector(item + '')" 
        >
          {{item === 'gender' ? USER_GENDER[userInfo[item]] : userInfo[item]}}
        </view>
        <image src="/static/images/right_arrow.png" style="width: 26rpx;height: 26rpx;margin-left: 10rpx;"></image>
      </view>
    </view>
    <!-- 弹出层 -->
    <tki-tree ref="citySelector" :range="cityOptions" rangeKey="name" @confirm="selectCity" confirmColor="#42BD56" />
    <tki-tree ref="genderSelector" :range="genderOptions" rangeKey="name" @confirm="selectGender" confirmColor="#42BD56" />
    <uni-popup ref="editingNicknameDialog" type="dialog">
      <uni-popup-dialog 
        mode="input" 
        title="请输入昵称" 
        :before-close="true" 
        @close="cancelEditingNickname" 
        @confirm="editNickname"
      />
    </uni-popup>
    <!-- 加载图标 -->
    <uni-load-more v-if="!userInfo && loading" class="loading" iconType="circle" status="loading"></uni-load-more>
  </view>
</template>

<script>
import { USER_INFOS, USER_GENDER } from '@/constants/constants.js'
import { pathToBase64 } from 'image-tools'
import tkiTree from "@/components/tki-tree/tki-tree.vue"
import cityData from '@/constants/city.js'

export default {
  components: {
    tkiTree
  },
  data () {
    return {
      userInfo: null,
      USER_INFOS,
      USER_GENDER,
      genderOptions: [],
      cityOptions: [],
      loading: false
    }
  },
  onLoad () {
    this.initSelectorOptions()
  },
  async onShow () {
    await this.getUserInfo()
  },
  methods: {
    cancelEditingNickname (done) {
      done()
    },
    async editNickname (done, value) {
      await this.$api.updateUser({
        openid: getApp().globalData.openid,
        nickName: value
      })
      done()
      this.userInfo.nickName = value
      this.showUpdateSuccessfullyMsg()
    },
    initSelectorOptions () {
      this.genderOptions = Object.entries(USER_GENDER).map(item => ({
        name: item[1],
        id: item[0]
      }))
      this.cityOptions = Object.values(cityData).map(item => {
        if (item.length === 1) {
          return {
            name: item[0].province,
            id: item[0].id
          }
        } else {
          return {
            name: item[0].province,
            id: item[0].id,
            children: item.map((child, idx) => ({
              name: child.name,
              id: child.id
            }))
          }
        }
      })
    },
    async selectCity (e) {
      const val = e[0].name
      await this.$api.updateUser({
        openid: getApp().globalData.openid,
        city: val
      })
      this.userInfo.city = val
      this.showUpdateSuccessfullyMsg()
    },
    async selectGender (e) {
      const val = e[0].id
      await this.$api.updateUser({
        openid: getApp().globalData.openid,
        gender: val
      })
      this.userInfo.gender = val
      this.showUpdateSuccessfullyMsg()
    },
    showSelector (key) {
      if (key === 'gender') {
        this.$refs.genderSelector._show()
      } else if (key === 'city') {
        this.$refs.citySelector._show()
      } else if (key === 'nickName') {
        this.$refs.editingNicknameDialog.open()
      }
    },
    async getUserInfo () {
      this.loading = true
      const res = await this.$api.getUserInfo({
        openid: getApp().globalData.openid
      })
      const userInfo = res.data.data
      this.userInfo = Object.keys(USER_INFOS).reduce((acc, key) => {
        acc[key] = userInfo[key]
        return acc
      }, {})
      this.loading = false
    },
    showUpdateSuccessfullyMsg () {
      uni.showToast({
        title: '更新成功',
        icon: 'success'
      })
    },
    chooseAvatar() {
      let that = this
      uni.chooseImage({
        count: 1,
        sourceType: ['album'],
        sizeType: ['compressed'],
        success: (res) => {
            //验证图片格式
          let path = res.tempFilePaths[0];
          let formatImage = path.split(".")[(path.split(".")).length - 1];
          if (formatImage != "png" && formatImage != "jpg" && formatImage != "jpeg") {
            return uni.showToast({
              title: '只能上传.png、.jpg、.jpep 格式',
              icon: 'none'
            })
          }
          //限制图片大小
          let tempFilesSize = res.tempFiles[0].size;  //获取图片的大小，单位B
          if(tempFilesSize > 200 * 1024){
            return uni.showToast({
              title: '上传图片不能大于200KB',
              icon: 'none'
            })
          }
          //base64编码
          pathToBase64(res.tempFilePaths[0])
            .then(async (base64) => {
              await that.$api.updateUser({
                ...that.userInfo,
                avatarUrl: base64,
                openid: getApp().globalData.openid
              })
              that.showUpdateSuccessfullyMsg()
              await that.getUserInfo()
            })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.my-info-container {
  padding: 0 30rpx;
}
.my-info__item {
  padding: 20rpx 0;
  font-size: 26rpx;
  display: flex;
  align-items: center;
  &>view:last-of-type {
    flex: 1;
    text-align: right;
    image, span {
      vertical-align: middle;
    }
  }
}
.my-info__item__content {
  font-size: 22rpx;
  color: #818181;
  display: inline-block;
  width: calc(100% - 36rpx);
  text-align: right;
}
</style>