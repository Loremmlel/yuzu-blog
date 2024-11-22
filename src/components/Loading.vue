<script setup lang="ts">
import {useLoadingStore} from "@/store/loading.ts";

const loading = useLoadingStore()
</script>

<template>
  <div class="loading loading-active" v-show="loading.isLoading">
    <div class="loading-box">
      <img class="loading-image" src="@/assets/images/loading_gif.gif" alt="加载图片">
    </div>
  </div>
</template>

<style scoped lang="scss">
.loading {
  width: 100%;
  height: 100%;
  position: fixed;
  background: var(--el-bg-color);
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  .loading-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .loading-image {
      user-select: none;
      -webkit-user-drag: none;
      -moz-user-select: none;
    }

    span {
      margin-top: 1rem;
      font-size: 1rem;
      font-weight: bold;
    }
  }
}
</style>