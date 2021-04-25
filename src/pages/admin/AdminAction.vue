<template>
  <view class="admin-action-page-container" style="min-height: 100vh;">
    <view class="item-info-li" v-for="item in ADD_ITEM_TEMPLATE[kind]" :key="item.value" :style="{height: item.value === 'coverSrc' ? '120rpx' : '80rpx'}">
      <view class="item-info-li__label">{{item.name}}</view>
      <input class="item-info-li__value" v-if="item.type" :type="item.type" v-model="itemInfo[item.value]" :placeholder="item.placeholder || ('请输入' + item.name)" />
      <image 
        v-else-if="item.value === 'coverSrc'"
        :src="itemInfo[item.value] || '/static/images/addItem/' + kind + '_default.png'" 
        @click="chooseAvatar" 
        style="width: 100rpx;height: 120rpx;" 
      />
      <view class="item-info-li__value" v-else @click="toggleAction(item.value)">{{itemInfo[item.value]}}</view>
      <view class="item-info-li__error-msg" v-if="errorMsg[item.value]">{{errorMsg[item.value]}}</view>
    </view>
    <view class="item-info-li" style="padding: 0 100rpx;">
      <button type="default" size="mini" @click="initItem">重置</button>
      <button type="primary" size="mini" @click="handleSubmit">提交</button>
    </view>
    <!-- 弹出层 -->
    <tki-tree ref="typeSelector" :multiple="true" :range="typeOptions" rangeKey="name" @confirm="selectType" confirmColor="#42BD56" />
  </view>
</template>

<script>
import { KIND_DETAILS } from '@/constants/constants.js'
import { ADD_ITEM_TEMPLATE } from '@/constants/addItemTemplate.js'
import { pathToBase64 } from 'image-tools'
import dayjs from 'dayjs'

export default {
  data () {
    return {
      kind: null,
      _id: null,
      actionType: null,
      ADD_ITEM_TEMPLATE,
      itemInfo: null,
      typeOptions: [],
      errorMsg: {}
    }
  },
  async onLoad (options) {
    this.kind = options.kind
    this._id = options._id
    this.actionType = options.actionType
    wx.setNavigationBarTitle({
      title: (this.actionType === 'add' ? '添加' : '修改') + KIND_DETAILS[this.kind].NAME
    })
    await this.initItem()
    this.initTypeOptions()
  },
  methods: {
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
            .then(base64 => {
              that.itemInfo.coverSrc = base64
            })
        }
      })
    },
    selectType (e) {
      this.itemInfo.type = e.map(item => item.name).join(' ')
    },
    initTypeOptions () {
      this.typeOptions = Object.keys(KIND_DETAILS[this.kind].TYPE_ICONS_URL).map(item => ({
        id: item,
        name: item
      }))
    },
    validateData () {
      let pass = true
      this.ADD_ITEM_TEMPLATE[this.kind].forEach(item => {
        if (item.required) {
          if (!this.itemInfo[item.value]) {
            this.$set(this.errorMsg, item.value, item.name + '不能为空')
            pass = false
          }
        }
        if (item.validator) {
          const res = item.validator(this.itemInfo[item.value])
          if (res !== true) {
            this.$set(this.errorMsg, item.value, res)
            pass = false
          } else if (item.value === 'publishTime') {
            this.itemInfo[item.value] = dayjs(Date.parse(this.itemInfo[item.value])).format('YYYY-MM-DD')
          }
        }
      })
      return pass
    },
    toggleAction (name) {
      if (name === 'type') {
        this.$refs.typeSelector._show()
      }
    },
    async handleSubmit () {
      this.errorMsg = {}
      if (this.validateData()) {
        let res = null
        if (this.actionType === 'add') {
          res = await this.$api.addItem({
            kind: this.kind,
            info: this.itemInfo
          })
        } else if (this.actionType === 'update') {
          res = await this.$api.updateItem({
            kind: this.kind,
            _id: this._id,
            info: this.itemInfo
          })
        }
        uni.showToast({
          title: res.data.msg,
          icon: 'none'
        })
        if (res.data.code === 0) {
          setTimeout(() => {
            uni.navigateBack()
          }, 1000)
        }
      }
    },
    async initItem () {
      if (this.actionType === 'add') {
        this.itemInfo = this.ADD_ITEM_TEMPLATE[this.kind].reduce((acc, cur) => {
          acc[cur.value] = cur.default
          return acc
        }, {})
      } else if (this.actionType === 'update') {
        const res = await this.$api.getDetail({
          kind: this.kind,
          _id: this._id
        })
        const data = res.data.data
        this.itemInfo = this.ADD_ITEM_TEMPLATE[this.kind].reduce((acc, cur) => {
          acc[cur.value] = data[cur.value] || cur.default
          return acc
        }, {})
      }
      this.errorMsg = {}
    }
  }
}
</script>

<style lang="scss" scoped>
.item-info-li {
  height: 80rpx;
  padding: 0 20rpx;
  margin: 20rpx 0;
  display: flex;
  align-items: center;
  font-size: 20rpx;
  position: relative;
}
.item-info-li__label {
  width: 150rpx;
}
.item-info-li__value {
  border: 1px solid #ddd;
  flex: 1;
  min-height: 45rpx;
  line-height: 45rpx;
  // text-indent: 6rpx;
  padding: 0 6rpx;
  box-sizing: border-box;
}
.item-info-li__error-msg {
  position: absolute;
  top: 70rpx;
  left: 170rpx;
  color: red;
  font-size: 16rpx;
}
</style>