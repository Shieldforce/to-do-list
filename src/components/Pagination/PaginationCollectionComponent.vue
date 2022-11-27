<template>
  <div class="text-center">
    <v-pagination
        class="mt-2"
        :length="pages.length"
        circle
        v-model="page"
        @input="next"
    ></v-pagination>
  </div>
</template>

<script>
import { range } from "lodash";

export default {
  props: ['paginationItems', 'paginate', 'commitMutationList'],
  watch : {
    paginationItems() {
      this.lastPage = this.paginationItems.last_page;
      this.pages = range(1, this.lastPage+1);
    }
  },
  data() {
    return {
      pages : [],
      page : 1,
      lastPage : null
    }
  },
  methods: {
    next(page) {
      this.$store.commit(this.$props.commitMutationList, { paginate:this.$props.paginate, pageCurrent:page });
      this.$emit('sendEventPaginationNext', { currentPage:page });
    },
  }
}


</script>