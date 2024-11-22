<script setup lang="ts">
import {ArticleRecommend, ArticleRelated} from "@/api/type.ts";
import {getRandomArticle, getRelatedArticle} from "@/api/home.ts";

interface Props {
  title?: string,
  prefixIcon?: string,
  categoryId?: string,
  articleId?: string
}

const router = useRouter()
const props = withDefaults(defineProps<Props>(), {
  title: "随机文章",
  prefixIcon: "random_essay",
  categoryId: '',
  articleId: ''
})

const randomArticles: Ref<ArticleRecommend[]> = ref([])

watch(() => props.articleId, () => {

})

async function relatedRecommend(categoryId: string, articleId: string) {
  const res = await getRelatedArticle(categoryId, articleId)
  randomArticles.value = formatDate(res.data)
}

async function randomArticle() {
  const res = await getRandomArticle()
  randomArticles.value = formatDate(res.data)
}

function formatDate(date: []) {
  date.forEach(element => {
    element.createTime = element.createTime.split(' ')[0]
  })
  return date
}

function loadContent() {
  if (props.title === '随机文章') {
    randomArticle()
    return
  }
  if (props.title === '相关推荐') {
    relatedRecommend(props.categoryId, props.articleId)
  }
}
</script>

<template>
  <Card :title="title" :prefix-icon="prefixIcon" :suffix-icon="title === '相关推荐' ? '' : 'rotate'"
        :is-rotate="true" :is-scale="true" @invoke="randomArticle" v-view-request="{callback: loadContent}">
    <div class="random-container" v-for="randomArticle in randomArticles">
      <div class="random-image" @click="router.push(`/article/${randomArticle.id}`)">
        <img :data-src="randomArticle.articleCover" v-lazy="true" alt="随机文章封面">
      </div>
      <div class="random-text" :key="randomArticle.id">
        <div> {{ randomArticle.articleTitle }}</div>
        <div> {{ randomArticle.createTime }}</div>
      </div>
    </div>
  </Card>
</template>

<style scoped lang="scss">
.random-container {
  display: flex;
  align-items: center;
  margin: 10px;

  .random-image {
    width: 45%;
    height: 70px;
    overflow: hidden;
    cursor: pointer;
    border-radius: 0.5rem;

    img {
      width: 100%;
      height: 100%;
      transition: transform 0.3s linear;
      object-fit: cover;

      &:hover {
        transform: scale(1.1);
      }
    }
  }

  .random-text {
    width: 55%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 30px;

    :first-child {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-left: 1rem;
      font-size: 1em;
      color: $menuActiveText
    }

    :last-child {
      margin-left: 1rem;
      font-size: 0.8em;
    }
  }
}
</style>