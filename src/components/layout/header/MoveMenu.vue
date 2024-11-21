<script setup lang="ts">
import {
  Clock,
  DocumentCopy,
  Files,
  Fries,
  Headset,
  HomeFilled,
  IceCreamRound,
  Link,
  Postcard,
  PriceTag,
  UserFilled
} from '@element-plus/icons-vue'

const emits = defineEmits(['update:closeDrawer'])

function isClose() {
  emits("update:closeDrawer")
}

const env = import.meta.env
</script>

<template>
  <div>
    <el-menu router style="width: 100%; border: none" class="menu">
      <el-menu-item index="/" class="index" @click="isClose">
        <el-icon>
          <HomeFilled></HomeFilled>
        </el-icon>
        首页
      </el-menu-item>
      <el-sub-menu index="2">
        <template #title>
          <el-icon>
            <Files></Files>
          </el-icon>
          归档
        </template>
        <el-menu-item index="/timeline" @click="isClose">
          <el-icon><Clock></Clock></el-icon>时间轴
        </el-menu-item>
        <el-menu-item index="/category" @click="isClose">
          <el-icon>
            <DocumentCopy></DocumentCopy>
          </el-icon>
          分类
        </el-menu-item>
        <el-menu-item index="/tags" @click="isClose">
          <el-icon>
            <PriceTag></PriceTag>
          </el-icon>
          标签
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <el-icon>
            <IceCreamRound></IceCreamRound>
          </el-icon>
          其它
        </template>
        <el-menu-item index="/tree-hole" @click="isClose">
          <el-icon>
            <Fries></Fries>
          </el-icon>
          树洞
        </el-menu-item>
        <el-menu-item index="/message" @click="isClose">
          <el-icon>
            <Postcard></Postcard>
          </el-icon>
          留言板
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item index="/link" @click="isClose">
        <el-icon>
          <Link></Link>
        </el-icon>
        友链
      </el-menu-item>
      <template v-if="env.VITE_MUSIC_FRONTEND_URL">
        <el-menu-item index="/music">
          <el-icon>
            <Headset></Headset>
          </el-icon>
          音乐
        </el-menu-item>
      </template>
      <el-menu-item index="/about" @click="isClose">
        <el-icon>
          <UserFilled></UserFilled>
        </el-icon>
        关于
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped lang="scss">

</style>