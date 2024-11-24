<script setup lang="ts">

</script>

<template>
  <div>
    <Main margin-top="4%" is-sidebar>
      <template #information>
        <Sidebar></Sidebar>
      </template>
      <template #content>
        <router-view v-slot="{Component}">
          <transition name="el-fade-in-linear" mode="out-in">
            <component :is="Component"></component>
          </transition>
        </router-view>
      </template>
    </Main>
  </div>
</template>

<style scoped lang="scss">

</style>