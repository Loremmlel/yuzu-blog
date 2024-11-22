<script setup lang="ts">
import {usePaginationStore} from "@/store/pagination.ts";
import {useWindowSize} from "@vueuse/core";
import {getArticleList} from "@/api/home.ts";
import {ArticleList} from "@/api/type.ts";
import {ElMessage} from "element-plus";

const router = useRouter()
const articleList: Ref<ArticleList[]> = ref([])
const paginationStore = usePaginationStore()

watch(() => paginationStore.current, () => {
  getArticleListFun()
  window.scrollTo(0, 300)
})

const {width} = useWindowSize()

async function getArticleListFun() {
  const res = await getArticleList(paginationStore.current, paginationStore.pageSize)
  if (res.code === 200) {
    paginationStore.total = res.data.total
    res.data.page = res.data.page.map((element: ArticleList) => {
      element.articleContent = element.articleContent.replace(/[*#>`~\-\\[\]()\s]|(\n\n)/g, '')
      element.articleContent = element.articleContent.substring(0, 60) + '...'
      return element
    })
    articleList.value = res.data.page
  } else {
    ElMessage.error(res.msg)
  }
}

function loadContent() {
  getArticleListFun()
}

;(() => {
  getArticleListFun()
})()
</script>

<template>
  <div v-view-request="{callback: loadContent}" v-if="articleList.length > 0">
    <template v-for="(article, index) in articleList" :key="article.id">
      <div @click="router.push(`/article/${article.id}`)" class="h-92 md:h-60 mt-4 flex flex-col md:flex-row
          card overflow-hidden shadow-md mb-5 mx-2 dark:bg-[#1d1d1d]">
        <div class="w-full md:h-full md:w-1/2 h-40" v-if="index % 2 === 1 || width < 768">
          <div class="relative w-full h-full">
            <div class="relative img w-full h-full">
              <img class="w-full h-full object-cover hover:scale-110 ease-linear duration-300" v-lazy="true"
                   :data-src="article.articleCover" alt="文章封面">
            </div>
            <div class="classify text-white text-xs p-1.5 w-11 absolute top-0 left-0 rounded-br-lg">
              {{ article.categoryName }}
            </div>
          </div>
        </div>
        <div class="md:w-1/2 w-full m-1 px-2 flex flex-col pl-5 pt-2 leading-7">
          <div class="hover:text-[#409eff] transition-colors text-2xl font-bold w-fit">
            {{ article.articleTitle }}
          </div>
          <div class="flex text-xs mt-2 space-x-2">
            <div class="flex">
              <SvgIcon name="reading"></SvgIcon>
              <span class="ml-1">{{ article.visitCount }}</span>
            </div>
            <div class="flex">
              <SvgIcon name="comments"></SvgIcon>
              <span class="ml-1">{{ article.commentCOunt }}</span>
            </div>
            <div class="flex">
              <SvgIcon name="like"></SvgIcon>
              <span class="ml-1">{{ article.likeCount }}</span>
            </div>
            <div class="flex">
              <SvgIcon name="collection"></SvgIcon>
              <span class="ml-1">{{ article.favoriteCount }}</span>
            </div>
          </div>
          <p class="overflow-ellipsis overflow-hidden h-10 md:h-[3.9rem] loading-tight mt-2 text-[#475569]">
            {{ article.articleContent }}
          </p>
          <div class="flex space-x-2">
            <div class="tag">
              <span>标签: </span>
              <el-tag size="small" class="mr-2" v-for="tag in article.tags"> {{ tag }}</el-tag>
            </div>
          </div>
          <div class="text-xs mt-4 flex">
            <p class="mr-4 mb-1">发布于: {{ article.createTime }}</p>
            <p>更新于: {{ article.updateTime }}</p>
          </div>
        </div>
        <div class="w-full md:h-full md:w-1/2 h-40" v-if="index % 2 === 0 && width > 768">
          <div class="relative w-full h-full">
            <div class="relative img w-full h-full">
              <img class="w-full h-full object-cover" v-lazy="true" :data-src="article.articleCover" alt="文章封面">
            </div>
            <div class="classify text-white text-xs p-1.5 w-11 absolute top-0 left-0 rounded-br-lg">
              {{ article.categoryName }}
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
  <template v-if="articleList.length === 0">
    <el-skeleton :rows="8" animated></el-skeleton>
  </template>
</template>

<style scoped lang="scss">
.card {
  border-radius: $border-radius;

  &:hover img {
    transform: scale(1.1);
  }

  .img {
    position: relative;
    overflow: hidden;

    img {
      transition: transform 0.3s linear;
    }
  }
}

.classify {
  z-index: 1;
  position: absolute;
  top: 0;
  color: white;
  padding: 10px;
  backdrop-filter: blur(5px);
}
</style>