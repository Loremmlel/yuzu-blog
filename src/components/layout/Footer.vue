<script setup lang="ts">
import {useWebsiteStore} from "@/store/website.ts";

const website = useWebsiteStore()
</script>

<template>
  <div class="footer">
    <!-- 文章页脚 -->
    <div class="footer-container">
      <div class="footer-text">
        <div>&copy;{{ website.webInfo?.websiteName }}</div>
        <div>备案号：{{ website.webInfo?.recordInfo }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.footer {
  box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100px;
  // 渐变底部
  background: var(--yuzu-bg-footer);
}

.footer-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer-text {
  line-height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;
}
</style>