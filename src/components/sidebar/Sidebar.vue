<script setup lang="ts">
import {useWebsiteStore} from "@/store/website.ts";
import {getSoup} from "@/api/thirdParty.ts";
import {ElMessageBox} from "element-plus";

const website = useWebsiteStore()
const differenceInDays = ref(0)

watch(() => website.webInfo?.startTime, () => {
  if (website.webInfo?.startTime) {
    getDifferenceInDays()
  }
})

function getDifferenceInDays() {
  const startTime = new Date(website.webInfo?.startTime)
  const now = new Date()
  const diffInMillis = now.getTime() - startTime.getTime()
  differenceInDays.value = Math.floor(diffInMillis / (1000 * 60 * 60 * 24))
}

const soup = ref('')

async function soupSub() {
  const res = await getSoup()
  soup.value = res.hitikoto
}

function announcement() {
  ElMessageBox.alert(`<pre>${website.webInfo?.sidebarAnnouncement}</pre>`, '公告', {
    confirmButtonText: '关闭',
    closeOnPressEscape: true,
    dangerouslyUseHTMLString: true
  })
}

onMounted(async () => {
  await soupSub()
})

;(() => {
  getDifferenceInDays()
})()
</script>

<template>
  <div>
    <div>
      <InfoCard></InfoCard>
    </div>
    <div>
      <Card title="公告" prefix-icon="announcement" suffix-icon="jt_y" :is-dithering="true" :is-arrow="true"
            @invoke="announcement">
        <pre class="pre-text">
          {{ website.webInfo?.sidebarAnnouncement }}
        </pre>
      </Card>
    </div>
    <div>
      <ElectronicClocks></ElectronicClocks>
    </div>
    <div>
      <RandomArticle></RandomArticle>
    </div>
    <div>
      <Card title="每日鸡汤" prefix-icon="edit" suffix-icon="rotate" :is-rotate="true" :is-scale="true"
            @invoke="soupSub">
        <p>{{ soup }}</p>
      </Card>
    </div>
    <div>
      <Card title="网站资讯" prefix-icon="statistics" :is-scale="true">
        <div class="statistics">
          <div>文章数目: <span>{{website.webInfo?.articleCount}}</span></div>
          <div>运行时长: <span>{{differenceInDays}}</span></div>
          <div>全站字数: <span>{{website.webInfo?.wordCount}}</span></div>
          <div>访问次数: <span>{{website.webInfo?.visitCount}}</span></div>
          <div>最后更新: <span>{{ website.webInfo?.lastUpdateTime}}</span></div>
        </div>
      </Card>
    </div>
  </div>
</template>

<style scoped lang="scss">
.statistics {
  display: flex;
  flex-direction: column;
  color: $menuActiveText;

  div {
    margin: 5px 20px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
  }
}

.pre-text {
  text-align: left;
  overflow: auto;
}
</style>