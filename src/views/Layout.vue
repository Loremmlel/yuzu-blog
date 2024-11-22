<script setup lang="ts">
import BottomRightLayout from "@/components/BottomRightLayout.vue";

const noDisplayComponent = computed(() => {
  return useRoute().path !== '/tree-hole'
})
</script>

<template>
  <Header></Header>
  <div style="min-height: 100vh">
    <router-view v-slot="{Component}">
      <transition name="el-fade-in-linear" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </div>
  <template v-if="noDisplayComponent">
    <Footer></Footer>
  </template>
  <BottomRightLayout></BottomRightLayout>
</template>

<style scoped lang="scss">

</style>