<template>
  <PaginatedItems kind="book" :bookType="bookType" />
</template>

<script>
import PaginatedItems from '@/components/common/PaginatedItems'

export default {
  components: {
    PaginatedItems
  },
  data () {
    return {
      bookType: null
    }
  },
  async onLoad (option) {
    this.bookType = option.type
  },
}
</script>

<style>

</style>