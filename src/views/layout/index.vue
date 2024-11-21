<script setup lang="ts">
const noDisplayComponent = computed(() => {
  // 树洞不显示底部
  return useRoute().path !== '/tree-hole'
})
</script>

<template>
  <Header></Header>
  <div style="min-height: 100vh">
    <router-view name="el-fade-in-linear" mode="out-in">
      <comment :is="Component"></comment>
    </router-view>
  </div>
  <template v-if="noDisplayComponent">
    <Footer></Footer>
  </template>
  <BottomRightLayout to-top></BottomRightLayout>
</template>

<style scoped lang="scss">

</style>