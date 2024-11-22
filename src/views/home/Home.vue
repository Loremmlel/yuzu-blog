<script setup lang="ts">
import Images from "@/views/home/Images.vue";
import Brand from "@/views/home/Brand.vue";
import Main from './Main.vue'
</script>

<template>
  <div class="home-container">
    <Images></Images>
    <Brand></Brand>
    <div class="bg">
      <Main></Main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bg {
  transition: all 1s ease !important;
  background-color: var(--yuzu-background-color);
}

.home-container {
  width: 100%;
}
</style>