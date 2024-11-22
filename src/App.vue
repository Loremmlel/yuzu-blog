<script setup lang="ts">
import Loading from "@/components/Loading.vue";
import {useWebsiteStore} from "@/store/website.ts";
import {useDark, useToggle} from "@vueuse/core";

const website = useWebsiteStore()

onMounted(() => {
  website.getInfo()
})
useDark({
  selector: 'html',
  attribute: 'class',
  valueLight: 'light',
  valueDark: 'dark'
})

useDark({
  onChanged(dark: boolean) {
    useToggle(dark)
  }
})
</script>

<template>
  <div>
    <router-view></router-view>
  </div>
  <Loading></Loading>
</template>

<style scoped>

</style>
