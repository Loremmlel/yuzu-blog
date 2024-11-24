<script setup lang="ts">
import vueDanmaku from 'vue3-danmaku'
import {TreeHole} from "@/api/type.ts";
import {ElMessage} from "element-plus";
import {addTreeHole, getTreeHoleList} from "@/api/treeHole.ts";

const treeHoleList: Ref<TreeHole[]> = ref([])
const showSubmitBtn = ref(false)
const content = ref('')

onMounted(() => {
  getTreeHole()
})

async function addTreeHoleFun() {
  if (content.value === '') {
    ElMessage.warning('请输入内容')
    return
  }
  const res = await addTreeHole(content.value)
  if (res.code !== 200) {
    ElMessage.error(res.msg)
    return
  }
  ElMessage.success('添加成功')
  await getTreeHole()
  content.value = ''
}

async function getTreeHole() {
  const res = await getTreeHoleList()
  if (res.code === 200) {
    treeHoleList.value = res.data
  }
}
</script>

<template>
  <div class="container">
    <div class="content-container">
      <div>树洞</div>
      <div>
        <input v-model="content" @focus="showSubmitBtn = true" type="text" placeholder="在这里留下自己的足迹吧...">
        <button v-show="showSubmitBtn" @click="addTreeHoleFun">
          <span class="text-gray-400 italic font-bold">提交</span>
        </button>
      </div>
    </div>
    <!--居然不能用VueDanmaku，而必须是vue-danmaku-->
    <vue-danmaku :debounce="2000" random-channel :speeds="100" :channels="5" is-suspend v-model:danmus="treeHoleList"
                use-slot loop class="h-screen w-screen">
      <template v-slot:dm="{danmu}">
        <div class="barrage-container">
          <div>
            <el-avatar :src="danmu.avatar"></el-avatar>
          </div>
          <div class="danmaku">
            <span class="danmaku-nickname">{{ danmu.nickname }}: </span>
            <span class="danmaku-content">{{ danmu.content }}</span>
          </div>
        </div>
      </template>
    </vue-danmaku>
  </div>
</template>

<style scoped lang="scss">
.container {
  background-image: url('/src/assets/images/tree_hole_bg.webp');
  background-size: cover;
  background-position: center;
  min-width: 100vw;
  height: 100vh;

  .content-container {
    position: absolute;
    top: 40%;
    left: 50%;
    z-index: 2;
    transform: translate(-50%, -50%);

    & div:first-child {
      color: white;
      font-size: 2rem;
      font-weight: bold;
      text-shadow: 0 0 10px black;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 0.2rem;
    }

    & div:last-child {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 1rem;

      & input {
        width: 16rem;
        height: 2rem;
        border: #409EFF solid 1px;
        border-radius: 1rem;
        outline: none;
        padding: 0 1rem;
        font-size: 1rem;
        background-color: rgba(255, 255, 255, 0.2);
      }

      & input::placeholder {
        color: white;
        font-style: italic;
      }

      & button {
        width: 5rem;
        height: 2rem;
        border-radius: 1rem;
        outline: none;
        margin-left: 0.5rem;
        background-color: rgba(255, 255, 255, 0.2);
        border: #409EFF solid 1px;
        color: white;
        font-size: 1rem;

        &:hover {
          background-color: rgba(255, 255, 255, 0.5);
          cursor: pointer;
        }
      }
    }
  }

  .barrage-container {
    display: flex;
    align-items: center;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 0;
      height: 0.2em;
      border-radius: 0.1em;
      background: linear-gradient(to right, #00c6ff, #0072ff);
      transition: width 0.3s ease;
    }

    &:hover::after {
      width: 100%;
    }

    .danmaku {
      border-bottom: 1px solid #ebebeb;
      padding: 0.5rem;
      margin-left: 0.5rem;
      border-radius: $border-radius;
      background-color: rgba(255, 255, 255, 0.2);

      &-nickname {
        margin-left: 0.5rem;
        color: white;
        font-weight: bold;
      }

      &-content {
        font-size: 1.2rem;
      }
    }
  }
}
</style>