<template>
  <view>
    <view class="section-container" style="width: 90%;margin: 20rpx auto 0;" v-for="kind in Object.keys(data)" :key="kind">
      <CommonSection 
        v-if="data[kind][status].length"
        v-for="status in Object.keys(data[kind]).slice(0, 4)" 
        :key="kind + status" 
        :items="data[kind][status]" 
        :sectionTitle="KIND_STATUS[kind + '-' + status]"
        :count="data[kind][status].length"
        :kind="kind"
        :status="status"
      />
    </view>
    <uni-load-more v-if="loading" class="loading" iconType="circle" status="loading"></uni-load-more>
  </view>
</template>

<script>
import CommonSection from '@/components/common/CommonSection'
import { KIND_STATUS } from '@/constants/constants'

export default {
  components: {
    CommonSection
  },
  data () {
    return {
      data: {},
      loading: false,
      KIND_STATUS
    }
  },
  async onShow () {
    this.loading = true
    const res = await this.$api.getUserAnalysisDetail({
      openid: getApp().globalData.openid
    })
    this.data = res.data.data
    this.loading = false
  }
}
</script>

<style>

</style>