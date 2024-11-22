<script setup lang="ts">
import {ArticleWhere, Tag} from "@/api/type.ts";
import {tagList} from "@/api/tag.ts";
import {whereArticleList} from "@/api/article.ts";
import {dayjs} from "element-plus";
import ArticleList from "@/views/pigeonhole/ArticleList.vue";
import Main from "@/components/layout/Main.vue"

const route = useRoute()
const router = useRouter()

const isQueryArticle = ref(false)
const tags: Ref<Tag[]> = ref([])
const articles: Ref<ArticleWhere[]> = ref([])
const title = ref('')


watch(() => route.params.id, (id: string) => {
  if (!id) {
    isQueryArticle.value = false
    title.value = ''
    return
  }
  isQueryArticle.value = true
  tags.value.forEach(element => {
    if (element.id === Number(route.params.id)) {
      title.value = element.tagName
    }
  })
  getArticle(id)
})

onMounted(async () => {
  const res = await tagList()
  if (res.code === 200) {
    tags.value = res.data
  }
  if (!route.params.id) {
    return
  }
  isQueryArticle.value = true
  tags.value.forEach(element => {
      if (element.id === Number(route.params.id)) {
        title.value = element.tagName
      }
    })
    await getArticle(route.params.id)
})

async function getArticle(id: string) {
  const res = await whereArticleList(2, id)
  if (res.code !== 200 || res.data == null) {
    articles.value = []
    return
  }
  res.data.forEach(element => {
    element.createTime = dayjs(element.createTime).format('YYYY-MM-DD')
  })
  articles.value = res.data
}
</script>

<template>
 <div>
    <Main only-father-container>
      <template #banner>
        <Banner title="标签页" subtitle="tags"/>
      </template>
      <template #content>
        <div class="tags-container">
          <div class="title" v-if="!isQueryArticle">
            标签 {{ title }}
          </div>
          <div class="title" v-if="isQueryArticle">
            标签 - {{ title }}
          </div>
          <template v-if="!isQueryArticle">
            <div class="item-container">
              <template v-for="tag in tags" :key="tag.id">
                <div v-slide-in class="item" @click="router.push(`/tags/${tag.id}`)">
                  <span @click="router.push(`/tags/${tag.id}`)"># {{ tag.tagName }}</span>
                  <span>{{ tag.articleCount }}</span></div>
              </template>
            </div>
          </template>
          <template v-if="isQueryArticle">
            <el-divider/>
            <ArticleList :article-list="articles"/>
          </template>
        </div>
      </template>
    </Main>
  </div>
</template>

<style scoped lang="scss">
.tags-container {
  display: flex;
  flex-direction: column;
  width: 100%;

  .title {
    font-size: 2rem;
    padding: 1rem 0 0 1rem;
  }

  .item-container {
    display: flex;
    flex-wrap: wrap;
    padding: 1rem;

    .item {
      display: flex;
      font-size: 1.2rem;
      margin: 0.5rem;
      padding: 0.5rem;
      border: 1px solid var(--el-border-color);
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.3s;
      color: #565352;

      & span:first-child {
        color: grey;
        margin-right: 0.4rem;
      }

      & span:last-child {
        display: flex;
        align-items: center;
        color: white;
        margin-left: 0.4rem;
        font-size: 0.6rem;
        background-color: #555555;
        padding: 0.1rem 0.5rem;
        border-radius: 0.7em;
      }

      &:hover {
        border: 1px solid #409EFF;
        transform: translateY(-0.2rem);
      }
    }
  }
}
</style>