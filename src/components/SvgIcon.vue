<script setup lang="ts">
interface Props {
  name: string,
  prefix?: string,
  color?: string,
  width?: string,
  height?: string
}
const props = withDefaults(defineProps<Props>(), {
  prefix: '#icon-',
  color: '',
  width: '16px',
  height: '16px'
})
</script>

<template>
  <svg :style="{width, height}">
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<style scoped lang="scss">

</style>