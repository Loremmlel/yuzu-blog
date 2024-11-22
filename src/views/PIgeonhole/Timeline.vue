<script setup lang="ts">
import Main from '@/components/layout/Main.vue'
import {ArticleTimeline} from "@/api/type.ts";
import {getTimeLine} from "@/api/article.ts";

const router = useRouter()

function handleData(data: ArticleTimeline[]) {
  data = data.map(element => {
    element.articleContent = element.articleContent.replace(/[*#>`~\-\\[\]()\s]|(\n\n)/g, '')
    element.articleContent = element.articleContent.substring(0, 60) + '...'
    // 去除时分秒
    element.createTime = element.createTime.substring(0, 10)
    return element
  })
  const groupedArticles = computed(() => {
    return data.reduce((groups, article) => {
      const year = new Date(article.createTime).getFullYear()
      if (!groups[year]) {
        groups[year] = []
      }
      groups[year].push(article)
      return groups
    }, {})
  })
  return groupedArticles.value
}

const shellRef: Ref<HTMLElement> = ref(null)
const items = ref([])

onMounted(async () => {
  const res = await getTimeLine()
  items.value = handleData(res.data)
  await nextTick(() => {
    const shell = shellRef.value
    const itemElements = shell.querySelectorAll('.item')
    const itemsArray = Array.from(itemElements)

    // 将第一个时间轴项目激活，设置时间轴背景图片为第一个文章图片
    itemsArray[0].classList.add('item--active')
    shell.style.backgroundImage = `url(${itemsArray[0].querySelector('.img').src})`

    // 当页面滚动时，触发事件
    window.addEventListener('scroll', () => {
      const pos = window.scrollY
      itemsArray.forEach((item, index) => {
        const min = item.offsetTop
        const max = item.offsetHeight + min
        // 如果滚动到最后一个项目，且超过了当前项目高度一半，则将最后一个项目设置为激活状态，设置背景图片为最后一个项目文章的图片
        if (index === itemsArray.length - 2 && pos > min + item.offsetHeight / 2) {
          itemsArray.forEach(item => item.classList.remove('item--active'))
          shell.style.backgroundImage = `url(${itemsArray[itemsArray.length - 1].querySelector('.img').src})`
          itemsArray[itemsArray.length - 1].classList.add('item--active')
        } else if (pos <= max - 10 && pos >= min) {    // 如果当前滚动位置位于当前项目最小和最大高度之间，则设置当前项目为激活状态
          shell.style.backgroundImage = `url(${item.querySelector('.img').src})`
          itemsArray.forEach(item => item.classList.remove('item--active'))
          item.classList.add('item--active')
        }
      })
    })
  })
})
</script>
<template>
  <div>
    <Main only-father-container>
      <template #banner>
        <Banner title="时间轴" subtitle="Timeline"></Banner>
      </template>
      <template #content>
        <div class="shell" ref="shellRef">
          <div class="timeline">
            <template v-for="(item, year) in items" :key="item.id">
              <div class="year">--{{ year }}--</div>
              <div class="item" @click="router.push(`/article/${i.id}`)" :data-text="i.createTime"
                   v-for="i in item">
                <div class="content">
                  <img class="img" :src="i.articleCover" alt="文章封面">
                  <h2 class="content-title">{{ i.articleTitle }}</h2>
                  <p class="content-desc">{{ i.articleContent }}</p>
                </div>
              </div>
            </template>
          </div>
        </div>
      </template>
    </Main>
  </div>
</template>

<style scoped lang="scss">
* {
  padding: 0;
  margin: 0;
}

.year {
  background-color: white;
  position: sticky;
  top: 5rem;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  margin: 1rem 0;
  color: grey;
  border-radius: $border-radius;
  opacity: 0.8;
}

.shell {
  width: 100%;
  position: relative;
  padding: 80px 0;
  background-attachment: fixed;
  background-size: cover;
}

.shell:before {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(99, 99, 99, 0.8);
  content: "";
}

.timeline {
  display: flex;
  margin: 0 auto;
  flex-wrap: wrap;
  flex-direction: column;
  max-width: 700px;
  position: relative;
}

.content-title {
  font-weight: normal;
  font-size: 2em;
  margin: -10px 0 0 0;
  transition: 0.4s;
  padding: 0 10px;
  box-sizing: border-box;
  color: #fff;
}

.content-desc {
  margin: 0;
  font-size: 15px;
  box-sizing: border-box;
  color: rgba(255, 255, 255, 0.7);
  line-height: 25px;
}

.timeline:before {
  position: absolute;
  left: 50%;
  width: 2px;
  height: 100%;
  margin-left: -1px;
  content: "";
  background: rgba(255, 255, 255, 0.07);
}

.item {
  padding: 40px 0;
  opacity: 0.3;
  filter: blur(2px);
  transition: 0.5s;
  box-sizing: border-box;
  width: calc(50% - 2rem);
  display: flex;
  position: relative;
  transform: translateY(-80px);
  cursor: pointer;
}

.item:before {
  /* 设置在伪元素before中的内容  */
  content: attr(data-text);
  letter-spacing: 3px;
  width: 100%;
  position: absolute;
  color: rgba(255, 255, 255, 0.5);
  border-left: 0.1em solid rgba(255, 255, 255, 0.5);
  top: 70%;
  margin-top: -3rem;
  padding-left: 0.5rem;
  opacity: 0;
  right: calc(-100% - 56px);
  font: 900 1.5em '';
}

.item:nth-child(even) {
  align-self: flex-end;
}

.item:nth-child(even):before {
  right: auto;
  text-align: right;
  left: calc(-100% - 56px);
  padding-left: 0;
  border-left: none;
  border-right: 2px solid rgba(255, 255, 255, 0.5);
  padding-right: 15px;
}

.item--active {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0px);
}

.item--active:before {
  top: 50%;
  transition: 0.3s all 0.2s;
  opacity: 1;
}

.item--active .content-title {
  margin: -50px 0 20px 0;
}

.img {
  max-width: 100%;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.4);
}

.footer {
  padding: 95px 0;
  text-align: center;
}

.footer a {
  color: #999;
  display: inline-block;
}

@media only screen and (max-width: 767px) {
  .item {
    align-self: baseline !important;
    width: 100%;
    padding: 0 30px 150px 80px;
  }

  .item:before {
    left: 10px !important;
    padding: 0 !important;
    top: 50px;
    text-align: center !important;
    width: 60px;
    border: none !important;
  }

  .item:last-child {
    padding-bottom: 40px;
  }
}

@media only screen and (max-width: 767px) {
  .timeline:before {
    left: 40px;
  }
}
</style>