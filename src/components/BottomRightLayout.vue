<script setup lang="ts">
import ReadingMode from "@/components/ReadingMode.vue";
import FullScreen from "@/components/FullScreen.vue";
import ToTop from "@/components/ToTop.vue";
import GoBottom from "@/components/GoBottom.vue";

interface Props {
  toTop?: boolean,
  scrollPercentage?: boolean,
  readingMode?: boolean,
  toComment?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  toTop: false,
  scrollPercentage: false,
  readingMode: false,
  toComment: false
})

const isContainerVisible = ref(false)
const emit = defineEmits(['readingMode'])

function toggleContainer() {
  isContainerVisible.value = !isContainerVisible.value
}
</script>

<template>
  <!--右下角工具栏-->
  <div class="container-div">
    <div class="hide" :class="{visible: isContainerVisible}">
      <div v-if="readingMode" @click="emit('readingMode', true)">
        <ReadingMode></ReadingMode>
      </div>
      <FullScreen></FullScreen>
    </div>
    <div class="my-4">
      <ToTop v-if="toTop"></ToTop>
    </div>
    <div class="mb-4" v-if="toComment">
      <GoBottom></GoBottom>
    </div>
    <div class="scroll_percentage" v-if="scrollPercentage">
      <slot name="scroll_percentage"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container-div {
  z-index: 9999;
  position: fixed;
  bottom: 4rem;
  right: 2rem;
  padding: 0.5rem;
  width: 60px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  .scroll_percentage {
    background: var(--yuzu-scroll-percentage-bg);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.9rem;
    font-weight: bold;

    @media screen and (max-width: 768px) {
      width: 40px;
      height: 40px;
    }
  }
}

.hide {
  opacity: 0;
  height: auto;
  transition: all 0.5s;
  transform: translate(90px, 0);
}

.visible {
  height: auto;
  opacity: 1;
  transform: translate(0, 0);
  transition: all 0.5s;
}
</style>