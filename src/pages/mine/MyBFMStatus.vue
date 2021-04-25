<template>
  <PaginatedItems :kind="kind" :items="items" :loading="loading" />
</template>

<script>
import PaginatedItems from '@/components/common/PaginatedItems'

export default {
  components: {
    PaginatedItems
  },
  data () {
    return {
      kind: null,
      status: null,
      items: [],
      loading: false
    }
  },
  onLoad (options) {
    this.kind = options.kind
    this.status = options.status
  },
  async onShow () {
    await this.getItems()
  },
  methods: {
    async getItems () {
      this.loading = true
      const res = await this.$api.getUserAnalysisSectionItems({
        openid: getApp().globalData.openid,
        kind: this.kind,
        status: this.status
      })
      this.items = res.data.data
      this.loading = false
    }
  }
}
</script>

<style>

</style>