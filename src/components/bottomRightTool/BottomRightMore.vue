<script setup lang="ts">

</script>

<template>
  <div>
    <el-tooltip effect="light" content="更多功能" placement="right">
      <div content="more-rotating">
        <svg-icon name="bottom_right_more" color="back-to-top"></svg-icon>
      </div>
    </el-tooltip>
  </div>
</template>

<style scoped lang="scss">
.back-to-top {
  height: 30px !important;
  width: 30px !important;
}

.more-rotating {
  animation: rotating 3s linear infinite;
}
</style>