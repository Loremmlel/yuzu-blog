<script setup lang="ts">
import {ArticleRecommend} from "@/api/type.ts";
import {Swiper, SwiperSlide} from 'swiper/vue'
import {Autoplay, Navigation, Pagination} from "swiper/modules";
import {getRecommendArticleList} from "@/api/home.ts";
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'


const recommendArticles: Ref<ArticleRecommend[]> = ref([])
const modules = ref([Navigation, Pagination, Autoplay])
const router = useRouter()

async function loadContent() {
  const res = await getRecommendArticleList()
  recommendArticles.value = res.data.map(element => {
    element.articleContent = element.articleContent.replace(/[*#>`~\-\\[\]()\s]|(\n\n)/g, '')
    element.articleContent = element.articleContent.substring(0, 25) + '...'
    return element
  })
}
</script>

<template>
  <div>
    <el-divider border-style="dashed" content-position="left">
      <div class="flex items-center">
        <SvgIcon name="recommend" color="#409eff" class="icon"></SvgIcon>
        <span class="ml-[5px]">推荐</span>
      </div>
    </el-divider>
  </div>
  <div v-view-request="{callback: loadContent}">
    <!--首页轮播图，以及文章加载滑动动画-->
    <Swiper class="h-[200px] recommend" loop navigation :pagination="{clickable: true}" :autoplay="{delay: true}"
            :modules="modules" v-if="recommendArticles.length > 0">
      <swiper-slide v-for="recommendArticle in recommendArticles" :key="recommendArticle.id"
                    @click="router.push(`/article/${recommendArticle.id}`)">
        <div class="item-text">
          <div style="font-size: 30px">
            {{ recommendArticle.articleTitle }}
          </div>
          <div style="font-size: 15px">
            {{ recommendArticle.createTime }}
          </div>
          <div style="font-size: 18px">
            {{ recommendArticle.articleContent }}
          </div>
        </div>
        <el-image :src="recommendArticle.articleCover"></el-image>
      </swiper-slide>
      <div class="swiper-pagination"></div>
    </Swiper>
  </div>
  <el-skeleton v-if="recommendArticles.length === 0" :rows="5" animated></el-skeleton>
</template>

<style scoped lang="scss">
.recommend {
  border-radius: $border-radius;

  .item-text {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    font-size: 20px;
    font-weight: bold;
    background-color: rgba(0, 0, 0, 0.1);
    padding: 0 20px;
    z-index: 1;
    line-height: 40px;
  }

  .el-image {
    @media screen and (min-width: 760px) {
      transform: translate(0, -20%);
    }
  }
}
</style>