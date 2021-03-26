<template>
  <PaginatedItems :kind="kind" :status="status" />
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
      status: null
    }
  },
  onLoad (options) {
    this.kind = options.kind
    this.status = options.status
  }
}
</script>

<style>

</style>