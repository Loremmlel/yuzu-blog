<script setup lang="ts">
interface Props {
  prefixIcon?: string,
  suffixIcon?: string,
  isDithering?: boolean,
  isArrow?: boolean,
  isRotate?: boolean,
  isScale?: boolean,
  title: string,
  // 是否是目录
  isCatalog?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  prefixIcon: '',
  suffixIcon: '',
  isDithering: false,
  isArrow: false,
  isRotate: false,
  isScale: false,
  isCatalog: false
})
const emits = defineEmits(['invoke'])

function invoke() {
  emits('invoke')
}
</script>

<template>
  <div v-slide-in class="card" :style="isCatalog ? 'position: relative; z-index: 9;' : ''">
    <div class="title" :style="isCatalog ? 'position: sticky;top:0' : ''">
      <div class="title-text">
        <SvgIcon :class="isDithering ? 'dithering' : '' || isScale ? 'scale' : ''" :name="prefixIcon"
                 width="30px" height="30px"></SvgIcon>
        <span style="margin-left: 10px;">{{ title }}</span>
      </div>
      <el-tooltip class="box-item" effect="light" content="刷新" placement="top"
                  v-if="suffixIcon === 'rotate'">
        <div :class="{'arrow': isArrow, 'rotate': isRotate}"
             :style="suffixIcon === 'rotate' ? 'cursor: pointer' : ''" @click="invoke">
          <SvgIcon :name="suffixIcon" width="30px" height="30px"></SvgIcon>
        </div>
      </el-tooltip>
      <div v-else :class="{'arrow': isArrow, 'rotate': isRotate}"
           :style="suffixIcon === 'rotate' ? 'cursor: pointer' : ''" @click="invoke">
        <SvgIcon :name="suffixIcon" width="30px" height="30px"></SvgIcon>
      </div>
    </div>
    <div content="content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  background-color: var(--el-bg-color);
  width: $card-width;
  border: 1px solid var(--el-border-color);
  border-radius: $border-radius;
  margin: 1.5em $card-margin $card-margin;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;

  .title {
    border-radius: $border-radius $border-radius 0 0;
    background-color: var(--el-bg-color);
    z-index: 2;
    display: flex;
    padding: 10px;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;

    .title-text {
      display: flex;
      align-items: center;

      .dithering {
        animation: shake 0.2s infinite;
        transform-origin: center;

        @keyframes shake {
          0% {
            transform: rotate(0deg);
          }

          25% {
            transform: rotate(-10deg);
          }

          50% {
            transform: rotate(0deg);
          }

          75% {
            transform: rotate(10deg);
          }

          100% {
            transform: rotate(0deg);
          }
        }
      }

      .scale {
        animation: scale 1s infinite;
        transform-origin: center;

        @keyframes scale {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
      }
    }

    .arrow:hover {
      animation: move 1s infinite;
      @keyframes move {
        0% {
          transform: translateX(0);
        }
        50% {
          transform: translateX(5px);
        }
        100% {
          transform: translateX(0);
        }
      }
    }

    .rotate:hover {
      animation: rotate 1s infinite linear;

      @keyframes rotate {
        0% {
          transform: rotate(0deg);
        }

        100% {
          transform: rotate(360deg);
        }
      }
    }
  }

  .content {
    min-height: 5em;
    text-align: center;
    line-height: 22px;
    padding: 10px;
    color: gray;
  }
}
</style>