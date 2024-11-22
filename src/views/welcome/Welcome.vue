<script setup lang="ts">

</script>

<template>
  <Header></Header>
  <div class="w-screen h-screen overflow-hidden flex">
    <div class="left-card">
      <el-image class="w-full h-full" fit="cover" src="/src/assets/images/crino.jpg"></el-image>
    </div>
    <div class="welcome-title">
      <div>欢迎来到我的个人博客</div>
      <div class="mt-2.5">在这里你可以看年彬恋爱记、随笔、技术文章以及如何拥有自己的个人网站</div>
    </div>
    <div class="right-card">
      <router-view v-slot="{Component}">
        <transition name="el-fade-in-linear" mode="out-in">
          <component :is="Component"></component>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style scoped lang="scss">
.left-card {
  flex: 1;
  background: black;
}

.right-card {
  width: 400px;
  z-index: 1;
  background-color: var(--el-bg-color);
}

@media screen and (max-width: 600px) {
  .left-card{
    display: none;
  }
  .right-card {
    width: 100vw;
  }
}

.welcome-title {
  position: absolute;
  bottom: 30px;
  left: 30px;
  color: white;
  text-shadow: 0 0 10px white;
}

.welcome-title div:first-child {
  font-size: 30px;
  font-weight: bold;
}
</style>