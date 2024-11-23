<script setup lang="ts">
import {MdPreview} from "md-editor-v3";
import 'md-editor-v3/lib/preview.css'
import {Comment, Response, Like, AddCommentReq} from "@/api/type.ts";
import {useColorMode} from "@vueuse/core";
import {addComment, getComment} from "@/api/article.ts";
import {cancelLike, isLike, userLike} from "@/api/like.ts";
import {heo} from "@/utils/O.o/heo.ts";
import {ElMessage} from "element-plus";
import {emojis} from "@/utils/O.o/emoji.ts";

interface Props {
  authorId: number,
  typeId: number,
  isShowHeader?: boolean,
  type: number,
  likeType: number
}

export type DisplayComment = Comment & {
  isLike: boolean,
  replyText: string,
  showReplyBox: boolean
}

const props = defineProps<Props>()
const mode = useColorMode()
// 输入框显示内容
const textarea = ref('')
// 预览框显示内容
const preview = ref('')
const inputRef: Ref<HTMLInputElement> = ref()
const isLoading = ref(false)
const isShowEmojis = ref(false)

function addEmoji(emoji: string) {
  const start = inputRef.value.selectionStart
  const end = inputRef.value.selectionEnd
  textarea.value = textarea.value.substring(0, start) + emoji + textarea.value.substring(end, textarea.value.length)
  isShowEmojis.value = false
  inputRef.value.focus()
}

// 选中下标,默认第一个，即emoji
const optionsIndex = ref(0)
// 表情选项卡
const options: Ref<HTMLElement> = ref()
const comments: Ref<DisplayComment[]> = ref([])
const commentsCount = ref(0)
const isPreview = ref(false)
const emojiOptions = ref(['Emoji', 'Heo'])
const showAllChildComments = ref(false)
const pageSize = ref(2)

watch(() => textarea.value, (value) => {
  preview.value = parsingComments(value)
})

function parsingComments(value: string): string {
  const codeBlockRegex = /```[\s\S]*?```/g
  const codeBlocks = value.match(codeBlockRegex)
  let protectedValue = value
  // 保护代码块
  if (codeBlocks) {
    codeBlocks.forEach((block, index) => {
      protectedValue = protectedValue.replace(block, `{{CODE_BLOCK_${index})}}`)
    })
  }
  // 判断是否存在表情包
  const matches = protectedValue.match(/\[[^\]]+]/g)
  if (matches) {
    for (const match of matches) {
      if (heo[match]) {
        protectedValue = protectedValue.replace(match,
            `<span><img src="${heo[match]}" width="24" height="24" alt="柚子博客-${heo[match]}"></span>`)
      }
    }
  }

  // 恢复代码块
  if (codeBlocks) {
    codeBlocks.forEach((block, index) => {
      protectedValue = protectedValue.replace(`{{CODE_BLOCK_${index}}}`, block)
    })
  }
  return protectedValue
}

onMounted(() => {
  if (options.value !== undefined && options.value.children.length > 0) {
    options.value.children[optionsIndex.value].style.backgroundColor = '#7b5f69'
    options.value.children[optionsIndex.value].style.color = 'white'
  }
  getComments(props.typeId, '1', pageSize.value.toString())
})

watch(() => props.typeId, (value) => {
  getComments(value, '1', pageSize.value.toString())
})

function optionEmoji(index: number) {
  optionsIndex.value = index
  // 清除样式
  for (let i = 0; i < options.value.children.length; i++) {
    options.value.children[i].style.backgroundColor = 'white'
    options.value.children[i].style.color = '#4a4a4a'
  }
  // 给选中的添加样式
  options.value.children[index].style.backgroundColor = '#7b5f69'
  options.value.children[index].style.color = 'white'
}

async function getComments(typeId: number, pageNum: string, pageSize: string) {
  const res = await getComment(props.type, typeId, pageNum, pageSize)
  if (res.code !== 200) {
    return
  }
  isLoading.value = true
  comments.value = res.data.page
  commentsCount.value = res.data.total
  handleComments(comments.value)
  await isLikeFun()
}

function handleComments(comments: DisplayComment[]) {
  comments.forEach(comment => {
    comment.commentContent = parsingComments(comment.commentContent)
    if (comment.childComment && comment.childComment.length) {
      handleComments(comment.childComment)
    }
  })
}

async function addParentComment() {
  if (textarea.value === '') {
    ElMessage.error('评论内容不能为空')
    return
  }
  const data: AddCommentReq = {
    type: props.type,
    typeId: props.typeId,
    commentContent: textarea.value
  }
  const res = await addComment(data)
  if (res.code !== 200) {
    ElMessage.error(res.msg)
    return
  }
  ElMessage.success('评论成功')
  if (res.data) {
    ElNotification({
      title: '评论成功',
      duration: 4000,
      type: "warning",
      message: h('i', {style: 'color: teal'}, res.data)
    })
  }
  textarea.value = ''
  await getComments(props.typeId, '1', pageSize.value.toString())
}

async function moreComment() {
  await getComments(props.typeId, '1', (pageSize.value + 3).toString())
}

async function onLikeClick(comment: DisplayComment) {
  const res = await userLike(props.likeType, comment.id)
  if (res.code !== 200) {
    ElMessage.error(res.msg)
    return
  }
  comment.isLike = true
  comment.likeCount++
  ElMessage.success('点赞成功')
}

async function onCancelLikeClick(comment: DisplayComment) {
  const res = await cancelLike(props.likeType, comment.id)
  if (res.code !== 200) {
    ElMessage.error(res.msg)
    return
  }
  comment.isLike = false
  comment.likeCount--
  ElMessage.success('取消点赞')
}

async function isLikeFun() {
  const res = await isLike(props.likeType)
  if (res.code !== 200) {
    return
  }
  res.data.forEach((element: DisplayComment) => {
    comments.value.forEach(comment => {
      if (comment.id === element.typeId) {
        comment.isLike = true
      }
      if (comment.childComment && comment.childComment.length) {
        recursionChildComment(comment.childComment, res)
      }
    })
  })
}

function recursionChildComment(childComment: DisplayComment[], res: Response<Like[]>) {
  res.data.forEach(element => {
    childComment.forEach(child => {
      if (child.id === element.typeId) {
        child.isLike = true
      }
      if (child.childComment && child.childComment.length) {
        recursionChildComment(child.childComment, res)
      }
    })
  })
}

/**
 * 在对应评论项目显示回复框
 */
function replyFun(comments: DisplayComment[], id: number) {
  comments.forEach(comment => {
    if (comment.id === id) {
      comment.showReplyBox = !comment.showReplyBox
    }
    if (comment.childComment && comment.childComment.length) {
      recursionReplyBtn(comment.childComment, id)
    }
  })
}

function recursionReplyBtn(childComment: (Comment & { showReplyBox: boolean })[], id: number) {
  childComment.forEach(child => {
    if (child.id === id) {
      child.showReplyBox = !child.showReplyBox
    }
    if (child.childComment && child.childComment.length) {
      recursionReplyBtn(child.childComment, id)
    }
  })
}
</script>

<template>
  <div class="comments">
    <div v-if="isShowHeader">
      <div class="comments-title">
        <SvgIcon name="comment" width="1.5em" height="1.5em"></SvgIcon>
        <span>评论({{ commentsCount }})</span>
      </div>
      <div class="form-container">
        <textarea ref="inputRef" class="textarea" v-model="textarea"
                  placeholder="留下你的精彩评论吧ヾ(•ω•`)o"></textarea>
        <div class="btn">
          <div>
            <SvgIcon @click="isShowEmojis = !isShowEmojis" name="emojis" class="mr-3 cursor-pointer"></SvgIcon>
          </div>
          <div class="emojis-container" v-show="isShowEmojis">
            <el-scrollbar>
              <div class="OvO-emojis" v-show="optionsIndex === 0">
                <div v-for="(emoji, key) in emojis" :key="key" :title="key" @click="addEmoji(emoji)">
                  {{ emoji }}
                </div>
              </div>
              <div class="OvO-heo" v-show="optionsIndex === 1">
                <div>
                  <img v-for="(src, key) in heo" :key="key" :title="key" :src="src" @click="addEmoji(key)">
                </div>
              </div>
            </el-scrollbar>
            <div class="OvO-options">
              <div v-for="(emojiOption, index) in emojiOptions" class="item-emoji" @click="optionEmoji(index)">
                {{ emojiOption }}
              </div>
            </div>
          </div>
          <div>
            <el-button type="info" plain size="small" @click="isPreview = !isPreview">预览</el-button>
            <el-button type="success" plain size="small" @click="addParentComment">发布</el-button>
          </div>
        </div>
        <div class="preview" v-if="isPreview">
          <MdPreview :modelValue="preview" :theme="mode"></MdPreview>
        </div>
      </div>
    </div>
    <!--评论内容-->
    <div>
      <div class="flex mt-4 pt-4" style="border-top: 1px solid var(--el-border-color)" v-for="comment in comments">
        <el-avatar shape="square" :size="40" :src="comment.commentUserAvatar"></el-avatar>
        <div class="comment-content">
          <div class="comment-content-header">
            <div>
              <div>{{ comment.commentUserNickname }}</div>
              <div v-if="comment.commentUserId === authorId">
                <el-tag size="small">作者</el-tag>
              </div>
              <div>{{ comment.createTime }}</div>
            </div>
          </div>
          <div>
            <SvgIcon @click="onLikeClick(comment)" v-show="!comment.isLike" name="like"
                     class="cursor-pointer"></SvgIcon>
            <SvgIcon @click="onCancelLikeClick(comment)" v-show="comment.isLike" name="like-selected"
                     class="cursor-pointer"></SvgIcon>
            <span class="text-sm text-gray-400">{{ comment.childCommentCount }}</span>
          </div>
        </div>
        <div class="comment-content-body">
          <div>
            <MdPreview :modelValue="comment.commentContent"></MdPreview>
          </div>
        </div>
        <!--回复框-->
        <template v-if="isLoading">
          <ReplyBox :type="type" :comment="comment" :get-comments="getComments" :page-size="pageSize"></ReplyBox>
        </template>
        <!--子评论-->
        <template v-if="comment.childComment && comment.childComment.length">
          <ChildComment :reply-fun="replyFun" :like-fun="replyFun" :cancel-like-fun="cancelLike" :comment="comment"
                        :author-id="authorId" :show-all-child-comments="showAllChildComments"
                        :get-comments="getComments" :page-size="pageSize" :type="type"></ChildComment>
        </template>
        <!--查看更多-->
        <div class="flex justify-center mt-4" v-if="comment.childCommentCount >= 2">
          <el-button type="info" plain size="small" @click="showAllChildComments=true" v-if="!showAllChildComments">
            查看全部{{ comment.childCommentCount }}条回复
          </el-button>
          <el-button type="info" plain size="small" @click="showAllChildComments=false" v-if="showAllChildComments">
            收起回复
          </el-button>
        </div>
      </div>
    </div>
  </div>
  <div class="more" v-if="isLoading && comments[0]?.parentCommentCount >= pageSize">
    <el-button type="info" plain size="small" @click="moreComment">查看更多</el-button>
  </div>
</template>

<style scoped lang="scss">
@import "commentStyle";

.more {
  display: flex;
  justify-content: center;
  margin-top: 1rem;

  .el-button {
    width: 100%;
  }
}
</style>