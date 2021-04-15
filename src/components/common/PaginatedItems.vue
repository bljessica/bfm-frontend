<template>
  <view class="paginated-items-container">
    <view class="paginated-cards-container" style="background: #FEFEFE;margin-bottom: 20rpx;">
      <CommonCard :kind="kind" v-for="item in items" style="margin: auto;" :key="item._id" :item="item"></CommonCard>
    </view>
    <uni-pagination v-if="pagination" @change="pageChange" :pageSize="pagination.pageSize" show-icon="true" :total="totalPage" :current="pagination.pageIdx"></uni-pagination>
    <uni-load-more class="loading" v-if="loading" iconType="circle" status="loading"></uni-load-more>
  </view>
</template>

<script>
import CommonCard from '@/components/common/CommonCard'

export default {
  props: {
    kind: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      default: () => []
    },
    pagination: {
      type: Object,
      default: () => {}
    },
    totalPage: {
      type: Number,
      default: 0
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  components: {
    CommonCard
  },
  methods: {
    pageChange ({type}) {
      if (type === 'next') {
        this.$emit('pageChange', 1)
      } else if (type === 'prev') {
        this.$emit('pageChange', -1)
      }
    }
  }
}
</script>

<style scoped>
.paginated-cards-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30rpx 0;
  margin-top: 20rpx;
}
.uni-pagination{ 
  width: 100%; 
} 
</style>