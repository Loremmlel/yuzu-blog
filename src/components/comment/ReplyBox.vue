<script setup lang="ts">
import {AddCommentReq, Comment} from '@/api/type.ts'
import {ElMessage} from "element-plus";
import {DisplayComment} from "@/components/comment/Comment.vue";
import {addComment} from "@/api/article.ts";
import {heo} from "@/utils/O.o/heo.ts";
import {emojis} from "@/utils/O.o/emoji.ts";

interface Props {
  comment: DisplayComment,
  getComments: (typeId: number, pageNum: string, pageSize: string) => void,
  pageSize: number,
  type: number
}

const route = useRoute()
const props = defineProps<Props>()
const emojiOptions = ref(['Emoji', 'Heo'])
const options: Ref<HTMLElement> = ref()
const optionIndex = ref(0)
const emojiBtn: Ref<HTMLElement> = ref()
const inputRef: Ref<HTMLInputElement> = ref()

onMounted(() => {

})

function optionEmoji(index: number) {
  optionIndex.value = index
  for (let i = 0; i < options.value.children.length; i++) {
    options.value.children[i].style.backgroundColor = 'white'
    options.value.children[i].style.color = '#4a4a4a'
  }
  options.value.children[index].style.backgroundColor = '#7b5f69'
  options.value.children[index].style.color = 'white'
}

function showEmojis() {
  inputRef.value.focus()
}

function addEmoji(emoji: string, comment: object) {
  if (inputRef.value.selectionStart || inputRef.value.selectionStart === 0) {
    const start = inputRef.value.selectionStart
    const end = inputRef.value.selectionEnd
    const restoreTop = inputRef.value.scrollTop
    const inputValue = inputRef.value.value
    inputRef.value.value = inputValue.substring(0, start) + emoji + inputValue.substring(end, inputValue.length)
    if (restoreTop > 0) {
      inputRef.value.scrollTop = restoreTop
    }
    inputRef.value.focus()
    inputRef.value.selectionStart = start + emoji.length
    inputRef.value.selectionEnd = start + emoji.length
  } else {
    inputRef.value.value += emoji
    inputRef.value.focus()
  }
  comment.replyText = inputRef.value.value
}

async function addChildComment(comment: DisplayComment) {
  if (comment.replyText === '' || comment.replyText === undefined) {
    ElMessage.warning('评论内容不能为空')
    return
  }
  const data: AddCommentReq = {
    type: props.type,
    typeId: comment.typeId,
    commentContent: comment.replyText,
    parentId: comment.parentId == null ? comment.id : comment.parentId,
    replyId: comment.id,
    replyUserId: comment.commentUserId
  }
  const res = await addComment(data)
  if (res.code !== 200) {
    ElMessage.error(res.msg)
    return
  }
  ElMessage.success('回复成功')
  if (res.data) {
    ElNotification({
      title: '回复成功',
      duration: 4000,
      type: 'warning',
      message: h('i', {style: 'color:teal'}, res.data)
    })
    comment.replyText = ''
    await props.getComments(route.params.id, '1', props.pageSize)
  }
}
</script>

<template>
  <transition name="el-zoom-in-top">
    <div class="reply" v-show="comment.showReplyBox">
      <textarea ref="inputRef" v-model="comment.replyText" :placeholder="'@'+comment.commentUserNickname"></textarea>
      <div>
        <div ref="emojiBtn">
          <el-popover placement="bottom-end" :width="510" trigger="click" @before-enter="showEmojis">
            <template #reference>
              <SvgIcon name="emojis" width="1.5em" height="1.5em" class="mr-3 cursor-pointer"></SvgIcon>
            </template>
            <div class="emojis-container">
              <el-scrollbar>
                <div class="OvO-emojis" v-show="optionIndex === 0">
                  <div @click="addEmoji(emoji, comment)" v-for="(emoji, key) in emojis" :key="key" :title="key">
                    {{ emoji }}
                  </div>
                </div>
                <div class="OvO-heo" v-show="optionIndex === 1">
                  <div>
                    <img @click="addEmoji(key, comment)" v-for="(src, key) in heo" :key="key" :title="key" :src="src"
                         :alt="key">
                  </div>
                </div>
                <div class="OvO-options" ref="options">
                  <div class="item-emoji" v-for="(emojiOption, index) in emojiOptions"
                       @click="optionEmoji(index)">
                    {{ emojiOption }}
                  </div>
                </div>
              </el-scrollbar>
            </div>
          </el-popover>
        </div>
        <el-button type="danger" plain size="small" @click="addChildComment(comment)">发布</el-button>
      </div>
    </div>
  </transition>
</template>

<style scoped lang="scss">
.reply {

  .active {
    height: 4rem;
    background: white;
    border: 1px solid #d09aae;
  }

  textarea {
    width: 100%;
    height: 2.2rem;
    transition: height 0.5s;
    border: 1px solid #ebebeb;
    border-radius: 0.5rem;
    padding: 0.5rem;
    resize: none;
    outline: none;
    font-size: 0.8rem;
    margin-top: 1rem;
    background: #f8f8f8;

    &::-webkit-input-placeholder {
      font-size: 0.8rem;
      font-weight: bold;
      color: #7B5F69;
    }
  }

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.5rem;
  }
}

.emojis-container {
  height: 20em;
  width: 100%;

  .OvO-heo {

    div {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      height: 100%;
      cursor: pointer;

      img {
        width: 3em;
        height: 3em;

        &:hover {
          background-color: #F1F1F2FF;
        }
      }

    }
  }

  .OvO-emojis {
    display: flex;
    flex-wrap: wrap;

    div {
      font-size: 1.8rem;
      width: 1.5em;
      height: 1.8em;
      color: #4A4A4A;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      &:hover {
        background-color: #F1F1F2FF;
      }
    }
  }

  .OvO-options {
    // 选项卡固定到底部
    position: sticky;
    bottom: 0;
    background-color: white;
    display: flex;
    flex-wrap: wrap;
    border-top: 1px solid #ebebeb;
    justify-content: flex-start;
    width: 100%;


    .item-emoji {
      width: 4em;
      height: 2em;
      color: #4A4A4A;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 0.26rem;
      cursor: pointer;

      &:first-child {
        background-color: #7B5F69;
        color: white;
      }

      &:hover {
        background-color: #F1F1F2FF;
      }

    }
  }
}
</style>