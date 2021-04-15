<template>
  <PaginatedItems 
    kind="film" 
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
      items: [],
      pagination: {
        pageIdx: 1,
        pageSize: 12,
      },
      totalPage: 0,
      loading: false
    }
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
  async onShow () {
    await this.getItems()
  },
  methods: {
    async getItems () {
      this.loading = true
      const res = await this.$api.getAllFilms(this.pagination)
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