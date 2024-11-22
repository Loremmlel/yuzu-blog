<script setup lang="ts">
import {useWebsiteStore} from "@/store/website.ts";
import Main from "@/components/layout/Main.vue"
import RecommendArticle from "@/views/home/RecommendArticle.vue";

const website = useWebsiteStore()
</script>

<template>
  <Main>
    <template #content>
      <div class="announcement">
        <SvgIcon name="notice" color="#409eff"></SvgIcon>
        <span style="margin-left: 15px;">{{ website.webInfo?.headerNotification }}</span>
      </div>
      <RecommendArticle></RecommendArticle>
      <div class="essay-title">
        <el-divider border-style="dashed" content-position="left">
          <div>
            <SvgIcon name="essay_icon" color="#409eff" class="icon"></SvgIcon>
            <span>文章</span>
          </div>
        </el-divider>
      </div>
      <div>
        <EssayCard></EssayCard>
      </div>
      <div>
        <Pagination></Pagination>
      </div>
      <div>
        <el-divider border-style="dashed" content-position="center">
          <div style="font-weight: bold">~到达底部啦~</div>
        </el-divider>
      </div>
    </template>
    <template #information>
      <Sidebar></Sidebar>
    </template>
  </Main>
</template>

<style scoped lang="scss">
.announcement {
  height: 50px;
  margin-top: 10px;
  line-height: 50px;
  text-align: center;
  border: 1px dotted #ccc;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.information-container {
  width: 30%;
  height: 100%;
}

.essay-title {
  div {
    display: flex;

    span {
      margin-left: 5px;
    }
  }

  .icon {
    color: #409eff;
  }
}
</style>