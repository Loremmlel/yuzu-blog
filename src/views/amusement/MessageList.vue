<script setup lang="ts">
import {MdEditor, ToolbarNames, Footers} from "md-editor-v3";
import 'md-editor-v3/lib/style.css'
import {useColorMode} from "@vueuse/core";
import {LeaveWord} from "@/api/type.ts";
import {getLeaveWordList, userLeaveWord} from "@/api/leaveWord.ts";
import {ElMessage} from "element-plus";
import {ArrowRightBold} from "@element-plus/icons-vue";

const router = useRouter()
const mode = useColorMode()
const showDrawer = ref(false)
const text = ref('')
const leaveWords: Ref<LeaveWord[]> = ref([])

async function getLeaveWordsFun() {
  const res = await getLeaveWordList()
  leaveWords.value = res.data.map(element => {
    element.content = element.content.replace(/[*#>`~\-\\[\]()\s]|(\n\n)/g, '')
    if (element.content.length > 35) {
      element.content = element.content.substring(0, 35) + '...'
    }
    return element
  })
}

async function addLeaveWord() {
  if (text.value === '') {
    ElMessage.warning('请输入内容')
    return
  }
  const res = await userLeaveWord(text.value)
  if (res.code !== 200) {
    ElMessage.error(res.msg)
    return
  }
  ElMessage.success('留言成功')
  await getLeaveWordsFun()
  text.value = ''
  showDrawer.value = false
}

const toolbars = [
  'bold', 'underline', 'italic', 'title', 'strikeThrough', 'quote', 'unorderedList',
  'orderedList', 'task', 'codeRow', 'code', 'link', 'image', 'table', 'pageFullscreen',
  'preview', 'catalog'
]
// 将插槽中的组件下标放到对应的位置即可显示
const footers: (Footers | number)[] = [0, 1, '=', 'scrollSwitch']

const wordCount = ref(0)

function mdContent(content: string) {
  if (content.length > 2000) {
    content = content.substring(0, 2000)
    ElMessage.warning('字数超出限制，已截取前2000字')
  }
  text.value = content
  wordCount.value = content.length
}

onMounted(() => {
  getLeaveWordsFun()
})
</script>

<template>
  <div class="bg">
    <div class="occupancy-height"></div>
    <div>
      <div class="title">
        <div>留言板</div>
        <el-button type="primary" plain @click="showDrawer = true">留言</el-button>
      </div>
      <el-divider></el-divider>
      <div class="title-content">
        <span>欢迎访问留言板板块！</span>
        <span>留言板是一个方便与其他用户交流、分享观点和意见的平台。通过留言板，您可以：</span>
        <span>1、留下自己的留言：无论是对特定主题的讨论、对某篇文章的评论，还是向其他用户提问，您都可以在留言板上发表自己的留言。</span>
        <span>2、回复其他用户：看到其他用户的留言后，您可以进行回复和互动，分享自己的观点，提供帮助或者表达共鸣。</span>
        <span>3、进行在线交流：留言板不仅是一个留言的平台，还是一个与其他用户进行实时交流的地方。您可以通过留言板与他人进行私聊，分享更多的讨论和信息。</span>
        <span>支持：普通文档，markdown</span>
      </div>
      <div>
        <el-drawer size="45%" v-model="showDrawer" direction="rtl" :with-header="false">
          <div>
            <MdEditor :theme="mode" style="height: 90vh;" :footers="footers" v-model.trim="text"
                      :toolbars="toolbars" no-upload-img :preview="false" :on-change="mdContent">
              <template #defFooters>
                <div class="h-full flex items-center">
                  <span class="mx-4">字数: {{ wordCount }}</span>
                  <span>字数限制: 2000</span>
                </div>
              </template>
            </MdEditor>
            <div class="mt-4 float-right">
              <el-button type="primary" @click="addLeaveWord" plain>提交</el-button>
            </div>
            <div class="mt-4 mr-4 float-right" @click="showDrawer=false">
              <el-button type="warning" plain>关闭</el-button>
            </div>
          </div>
        </el-drawer>
      </div>
    </div>
    <div>
      <div class="title">留言列表</div>
      <div class="form">
        <template v-for="leaveWord in leaveWords">
          <el-card class="box-card" shadow="hover" v-slide-in>
            <template #header>
              <div class="card-header">
                <span>
                  <el-avatar :src="leaveWord.avatar"></el-avatar>
                </span>
                <span class="name">{{ leaveWord.nickname }}</span>
                <span class="time">{{ leaveWord.createTime }}</span>
              </div>
            </template>
            <div class="text">
              {{ leaveWord.content }}
            </div>
            <div class="bottom">
              <div class="count">
                <div>
                  <SvgIcon name="comments"></SvgIcon>
                  <span>{{ leaveWord.commentCount }}</span>
                </div>
                <div>
                  <SvgIcon name="like"></SvgIcon>
                  <span>{{ leaveWord.likeCount }}</span>
                </div>
                <div>
                  <SvgIcon name="collection"></SvgIcon>
                  <span>{{ leaveWord.favoriteCount }}</span>
                </div>
              </div>
              <div>
                <el-link type="primary" @click="router.push(`/message/detail/${leaveWord.id}`)">
                  <template #icon>
                    <el-icon>
                      <ArrowRightBold></ArrowRightBold>
                    </el-icon>
                  </template>
                  查看详情
                </el-link>
              </div>
            </div>
          </el-card>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.occupancy-height {
  margin: 2rem 0;
  @media screen and (min-width: 910px) {
    display: none;
  }
}

.bg {
  background: var(--el-bg-color);
}

:deep(.el-drawer) {
  @media (max-width: 1000px) {
    width: 70% !important;
  }
  @media (max-width: 600px) {
    width: 100% !important;
  }
}

:deep(.md-editor-toolbar-left) {
  flex-wrap: wrap;
}

:deep(.md-editor-toolbar-item) {
  width: 30px;
  height: 30px;

  svg {
    width: 100%;
    height: auto;
  }
}

.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}

.title-content {
  font-weight: bold;
  font-size: 0.8rem;
  color: #999;
  display: flex;
  flex-direction: column;
  background: var(--yuzu-bg-message);
  padding: 0.5rem;
  border-radius: $border-radius;
  margin-bottom: 1rem;

  span {
    margin-bottom: 1rem;
    line-height: 1rem;
  }
}

.box-card {
  margin-top: 1rem;
  font-size: 0.9rem;

  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    color: grey;

    .count {
      display: flex;
      margin-top: 0.5rem;

      div {
        display: flex;
        align-items: center;
        margin-right: 1rem;
      }

      span {
        margin-left: 0.2rem;
      }
    }
  }

  .text {
    margin-bottom: 1rem;

    .reply {
      margin-top: 3rem;

    }
  }

  .card-header {
    display: flex;
    align-items: center;

    .name {
      margin-left: 0.5rem;
      font-size: 1.3rem;
    }

    .time {
      // 右对齐
      flex: 1;
      text-align: right;
      margin-left: 1rem;
      font-size: 0.85rem;
      color: #999;
    }
  }
}
</style>