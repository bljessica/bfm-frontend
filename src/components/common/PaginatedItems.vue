<template>
  <view class="paginated-items-container">
    <view class="paginated-cards-container" style="background: #FEFEFE;margin-bottom: 20rpx;">
      <CommonCard :kind="kind" v-for="item in items" style="margin: auto;" :key="item._id" :item="item"></CommonCard>
    </view>
    <uni-pagination @change="pageChange" :pageSize="pagination.pageSize" show-icon="true" :total="totalPage" :current="pagination.pageIdx"></uni-pagination>
    <uni-load-more v-if="loading" iconType="circle" status="loading"></uni-load-more>
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
    bookType: { // 书类型
      type: String
    }
  },
  components: {
    CommonCard
  },
  data () {
    return {
      items: [],
      pagination: {
        pageIdx: 1,
        pageSize: 12,
      },
      totalPage: 0,
      loading: false
    }
  },
  computed: {
    getItemsFunc () {
      if (this.kind === 'film') {
        return this.$api.getAllFilms
      } else if (this.kind === 'music') {
        return this.$api.getAllMusics
      } else if (this.kind === 'book') {
        return this.$api.getAllBooksByType
      }
      return () => {}
    }
  },
  watch: {
    pagination: {
      async handler (val) {
        this.loading = true
        let res = null
        if (this.kind === 'book') {
          res = await this.getItemsFunc({
            ...val,
            type: this.bookType  
          })
        } else {
          res = await this.getItemsFunc(val)
        }
        this.items = res.data.data
        this.totalPage = res.data.total
        this.loading = false
      },
      deep: true,
      immediate: true
    },
    bookType: {
      async handler () {
        const res = await this.getItemsFunc({
          ...this.pagination,
          type: this.bookType  
        })
        this.items = res.data.data
        this.totalPage = res.data.total
        this.loading = false
      },
      immediate: true
    }
  },
  methods: {
    pageChange ({type}) {
      if (type === 'next') {
        this.pagination.pageIdx += 1
      } else if (type === 'prev') {
        this.pagination.pageIdx -= 1
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