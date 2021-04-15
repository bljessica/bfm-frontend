<template>
  <PaginatedItems 
    kind="book" 
    :items="items" 
    :pagination="pagination" 
    :totalPage="totalPage" 
    :loading="loading" 
    @pageChange="pageChange"
  />
</template>

<script>
import PaginatedItems from '@/components/common/PaginatedItems'

export default {
  components: {
    PaginatedItems
  },
  data () {
    return {
      bookType: null,
      items: [],
      pagination: {
        pageIdx: 1,
        pageSize: 12,
      },
      totalPage: 0,
      loading: false
    }
  },
  async onLoad (option) {
    this.bookType = option.type
  },
  async onShow () {
    await this.getItems()
  },
  watch: {
    pagination: {
      async handler () {
        await this.getItems()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    async getItems () {
      this.loading = true
      const res = await this.$api.getAllBooksByType({
        ...this.pagination,
        type: this.bookType
      })
      this.items = res.data.data
      this.totalPage = res.data.total
      this.loading = false
    },
    pageChange (e) {
      this.pagination.pageIdx += e
    }
  }
}
</script>

<style>

</style>