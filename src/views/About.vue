<script setup lang="ts">
import JSConfetti from "js-confetti";
import {useWebsiteStore} from "@/store/website.ts";

const jsConfetti = new JSConfetti()
jsConfetti.addConfetti()
const websiteStore = useWebsiteStore()
</script>

<template>
  <div class="flex justify-center items-center h-full w-[99%]">
    <div class="flex justify-center items-center max-lg:flex-col h-full w-full xl:w-[90%]">
      <div class="w-[40%] max-lg:w-full h-full flex flex-col justify-center items-center">
        <div class="h-[20rem] w-[20rem] rounded-full overflow-hidden mt-[5rem] drop-shadow-lg">
          <div class="bg-cover bg-no-repeat bg-center w-full h-full"
               :style="{'background-image': `url('${websiteStore.webInfo?.webmasterAvatar}')`}"></div>
        </div>
        <div>
          <h1 :data-shadow="websiteStore.webInfo?.webmasterName">{{ websiteStore.webInfo?.webmasterName }}</h1>
        </div>
        <div class="text-gray-600 w-full font-bold dark:text-gray-300 text-center">
          箴言
        </div>
      </div>
      <div class="flex flex-col justify-center items-center xl:w-[40%] lg:w-[60%] h-full">
        <div class="w-full h-[60vh] flex flex-col justify-center items-center">
          <div
              class="w-full text-[3rem] text-center text-gray-600 dark:text-gray-300 max-lg:text-[2rem] max-lg:pb-6">
            摆烂fw，躺平神选(?)
          </div>
          <div class="mt-4 text-center text-gray-500 dark:text-gray-300 max-lg:px-3">
            简介
          </div>
        </div>
        <div class="w-full h-[40vh] flex flex-col justify-center items-center">
          <div class="text-gray-600 dark:text-gray-300">
            --------------------我的个人导航--------------------
          </div>
          <div class="flex justify-center items-center h-full">
            <a href="https://github.com/loremmlel" target="_blank">
              <div
                  class="bg-white dark:bg-slate-800 w-[120px] h-[120px]
                  flex justify-center items-center rounded-2xl drop-shadow-lg">
                <SvgIcon name="github_icon" width="100px" height="100px"></SvgIcon>
              </div>
            </a>
            <a href="https://gitee.com/HinanawiTS" target="_blank" class="mx-10 max-lg:mx-4">
              <div
                  class="bg-white dark:bg-slate-800 w-[120px] h-[120px]
                  flex justify-center items-center rounded-2xl drop-shadow-lg">
                <SvgIcon name="gitee_icon" width="100px" height="100px"></SvgIcon>
              </div>
            </a>
            <a href="https://space.bilibili.com/13976138" target="_blank">
              <div
                  class="bg-white dark:bg-slate-800 w-[120px] h-[120px]
                  flex justify-center items-center rounded-2xl drop-shadow-lg">
                <SvgIcon name="bilibili_icon" width="100px" height="100px"></SvgIcon>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
*, *:before, *:after {
  box-sizing: border-box;
  position: relative;
}

h1 {
  display: inline-block;
  color: white;
  font-family: 'Righteous', 'JetBrains Mono', 'Microsoft YaHei',serif;
  font-size: 5em;
  text-shadow: 0.03em 0.03em 0 hsla(230, 40%, 50%, 1);
}

h1:after {
  content: attr(data-shadow);
  position: absolute;
  top: 0.06em;
  left: 0.06em;
  z-index: -1;
  text-shadow: none;
  background-image: linear-gradient(
          45deg,
          transparent 45%,
          hsla(48, 20%, 90%, 1) 45%,
          hsla(48, 20%, 90%, 1) 55%,
          transparent 0
  );
  background-size: .05em .05em;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shad-anim 15s linear infinite;
}

@keyframes shad-anim {
  0% {
    background-position: 0 0
  }
  100% {
    background-position: 100% -100%
  }
}
</style>