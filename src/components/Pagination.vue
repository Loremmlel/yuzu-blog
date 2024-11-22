<script setup lang="ts">
import {usePaginationStore} from "@/store/pagination.ts";

const paginationStore = usePaginationStore()
</script>

<template>
  <div class="tag">
    <el-pagination background layout="prev, pager, next"
                   :total="paginationStore.total" :hide-on-single-page="true"
                   :page-size="paginationStore.pageSize"
                   @current-change="paginationStore.current = $event"></el-pagination>
  </div>
</template>

<style scoped lang="scss">
.pag {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>