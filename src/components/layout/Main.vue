<script setup lang="ts">
interface Props {
  // 内容是否只需要父容器
  onlyFatherContainer?: boolean,
  // 是否有侧边栏
  isSidebar?: boolean,
  marginTop?: string
}

const props = withDefaults(defineProps<Props>(), {
  onlyFatherContainer: false,
  isSidebar: false,
  marginTop: '0'
})
</script>

<template>
  <div class="header">
    <slot name="header"></slot>
  </div>
  <div v-if="onlyFatherContainer">
    <div>
      <slot name="banner"></slot>
    </div>
    <div class="is-banner-container" style="display:flex; justify-content: center;">
      <!--内容区-->
      <div class="content-container" style="width: 100%; max-width: 100rem">
        <slot name="content"></slot>
      </div>
      <div class="information-container" v-if="isSidebar">
        <slot name="information"></slot>
      </div>
    </div>
  </div>
  <div class="div-container" :style="{'margin-top': marginTop}" v-if="!onlyFatherContainer">
    <div class="content-container">
      <slot name="content"></slot>
    </div>
    <div class="information-container" v-if="isSidebar">
      <slot name="information"></slot>
    </div>
  </div>
  <div>
    <slot name="footer"></slot>
  </div>
</template>

<style scoped lang="scss">
.div-container {
  @media screen and (max-width: 1200px) {
    margin: 0;
  }
  transition: margin 0.5s;
  margin: 0;
  display: flex;
  justify-content: center;
  padding-bottom: 2rem;
  width: 100%;
}

.content-container {
  height: 100%;
  width: 60%;
  max-width: 70rem;
  transition: padding 0.5s;
  @media screen and (max-width: 910px) {
    width: 100%;
    padding: 0.2rem;
  }
  padding: 1rem;
  background-color: var(--el-bg-color);
  border-radius: 0.5em;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.information-container {
  width: 23%;
  min-height: 100%;
  max-width: 25rem;
  transition: width 0.5s;
  @media screen and (max-width: 910px) {
    display: none;
  }

  @media screen and (max-width: 1200px) {
    width: 30%;
  }
}

.father-container {
  width: 100%;
  margin-bottom: 7rem;
  padding: 0.2rem;
  background-color: white;
  border-radius: $border-radius;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.is-banner-container {
  margin: 0 10%;
  height: 100%;
  display: flex;
  padding-bottom: 2rem;
  transition: margin 0.5s;

  @media screen and (max-width: 1200px) {
    margin: 0 5%;
  }

  @media screen and (max-width: 650px){
    margin: 0 2%;
  }
}
</style>