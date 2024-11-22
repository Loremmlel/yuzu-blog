<script setup lang="ts">
import {ArticleWhere, Category} from "@/api/type.ts";
import {categoryList} from "@/api/category.ts";
import {whereArticleList} from "@/api/article.ts";
import {dayjs} from "element-plus";
import ArticleList from "@/views/pigeonhole/ArticleList.vue";

const route = useRoute()
const router = useRouter()
const categories: Ref<(Category & { isActive: boolean })[]> = ref([])
const articles: Ref<ArticleWhere[]> = ref([])
const isQueryArticle = ref(false)

const title = ref('')

watch(() => route.params.id, (id: string) => {
  if (!id) {
    isQueryArticle.value = false
    return
  }
  isQueryArticle.value = true
  categories.value.forEach(element => {
    if (element.id !== Number(route.params.id)) {
      element.isActive = false
      return
    }
    element.isActive = true
    title.value = element.categoryName
  })
  getArticle(id)
})

onMounted(async () => {
  const res = await categoryList()
  if (res.code === 200) {
    categories.value = res.data
  }
  if (!route.params.id) {
    return
  }
  isQueryArticle.value = true
  categories.value.forEach(element => {
    if (element.id === Number(route.params.id)) {
      element.isActive = true
      title.value = element.categoryName
    } else {
      element.isActive = false
    }
  })
  await getArticle(route.params.id)
})

async function getArticle(id: string) {
  const res = await whereArticleList(1, id)
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
        <Banner title="分类" subtitle="category">
        </Banner>
      </template>
      <template #content>
        <template v-if="!isQueryArticle">
          <div class="category-container">
            <div content="title">
              文章分类
            </div>
            <div class="item-container">
              <template v-for="category in categories" :key="category.id">
                <div v-slide-in class="item" @click="router.push(`/category/${category.id}`)">
                  <div>{{ category.categoryName }}</div>
                  <div><span>{{ category.articleCount }}</span></div>
                </div>
              </template>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="category-container">
            <div class="title">
              {{title}}
            </div>
            <div>
              <el-scrollbar>
                <div class="scrollbar-flex-content">
                  <template v-for="category in categories" :key="category.id">
                    <p @click="router.push(`/category/${category.id}`)" class="scrollbar-item"
                    :class="category.isActive ? 'active' : ''">
                      {{category.categoryName}}
                    </p>
                  </template>
                </div>
              </el-scrollbar>
            </div>
            <el-divider></el-divider>
            <ArticleList :article-list="articles"></ArticleList>
          </div>
        </template>
      </template>
    </Main>
  </div>
</template>

<style scoped lang="scss">
.category-container {
  display: flex;
  flex-direction: column;
  width: 100%;

  .scrollbar-flex-content {
    display: flex;
    white-space: nowrap;

    .active {
      color: gray !important;
      background: var(--el-color-danger-light-7) !important;
    }

    .scrollbar-item {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 3em;
      margin: 0 1em;
      padding: 0.5rem 1rem;
      text-align: center;
      border-radius: 0.6em;
      border: 1px solid var(--el-color-danger-light-7);
      background: var(--el-color-danger-light-9);
      color: var(--el-color-danger);

      &:hover {
        cursor: pointer;
        color: gray;
        background: var(--el-color-danger-light-7);
      }
    }
  }

  .title {
    font-size: 1.72rem;
    padding: 1rem;
  }

  .item-container {
    display: flex;
    flex-wrap: wrap;

    .item {
      display: flex;
      flex-direction: column;
      width: calc(100% / 3 - 2em);
      height: 7em;
      background: var(--yuzu-bg-category);
      opacity: 0.8;
      margin: 1em;
      border-radius: $border-radius;
      padding: 1.3rem;
      transition: all 0.3s;

      @media screen and (max-width: 1200px) {
        width: calc(100% / 2 - 2em);
      }

      @media screen and (max-width: 1000px){
        width: calc(100% - 2em);
      }

      &:hover {
        opacity: 1;
        box-shadow: 0 0 0.5rem 0.1rem #ccc;
        cursor: pointer;
      }

      & div:first-child {
        font-size: 1.33rem;
        font-weight: bold;
        border-left: 0.15rem solid black;
        padding-left: 1rem;
        position: relative;

        // 标题下方的横线，鼠标移动上去会变长。
        &::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -1rem;
          width: 0;
          height: 0.2em;
          border-radius: 0.1em;
          background: white;
          transition: width 0.8s ease;
        }

        &:hover::after {
          width: 100%;
        }
      }
      & div:last-child {
        margin-top: 1.5rem;
        font-size: 1.3rem;
        color: gray;
      }
    }
  }
}
</style>