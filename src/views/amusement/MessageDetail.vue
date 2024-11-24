<script setup lang="ts">
import {useColorMode} from "@vueuse/core";
import {LeaveWord} from "@/api/type.ts";
import {getLeaveWordList} from "@/api/leaveWord.ts";
import {cancelLike, isLike, userLike} from "@/api/like.ts";
import {ElMessage} from "element-plus";
import {isFavorite, userFavorite} from "@/api/favorite.ts";
import {ArrowLeftBold} from "@element-plus/icons-vue";
import {MdPreview} from "md-editor-v3";

const mode = useColorMode()
const route = useRoute()
const router = useRouter()
const leaveWord: Ref<LeaveWord> = ref({})
const loadingComment = ref(false)
const like = ref(false)
const favorite = ref(false)

onMounted(() => {
  getLeaveWord()
})

async function getLeaveWord() {
  const res = await getLeaveWordList(route.params.id)
  leaveWord.value = res.data[0]
  loadingComment.value = true
  await Promise.all([
    isLikeFun(),
    isFavoriteFun()
  ])
}

async function isLikeFun() {
  const res = await isLike(1, leaveWord.value.id)
  like.value = res.code === 200
}

async function onLikeClick() {
  if (like.value) {
    const res = await cancelLike(3, leaveWord.value.id)
    if (res.code !== 200) {
      like.value = true
      ElMessage.error(res.msg)
      return
    }
    leaveWord.value.likeCount--
    like.value = false
  } else {
    const res = await userLike(3, leaveWord.value.id)
    if (res.code !== 200) {
      like.value = false
      ElMessage.error(res.msg)
      return
    }
    leaveWord.value.likeCount++
    like.value = true
    ElMessage.success('点赞成功')
  }
}

async function isFavoriteFun() {
  const res = await isFavorite(2, leaveWord.value.id)
  favorite.value = res.data
}

async function onFavoriteClick() {
  if (favorite.value) {
    const res = await cancelLike(2, leaveWord.value.id)
    if (res.code !== 200) {
      favorite.value = true
      ElMessage.error(res.msg)
      return
    }
    leaveWord.value.favoriteCount--
    favorite.value = false
  } else {
    const res = await userFavorite(2, leaveWord.value.id)
    if (res.code !== 200) {
      favorite.value = false
      ElMessage.error(res.msg)
      return
    }
    leaveWord.value.favoriteCount++
    favorite.value = true
    ElMessage.success('收藏成功')
  }
}
</script>

<template>
  <div>
    <div>
      <el-link :icon="ArrowLeftBold" @click="router.push('/message')">回到留言列表</el-link>
      <el-divider></el-divider>
    </div>
    <div class="user">
      <span><el-avatar :src="leaveWord.avatar"></el-avatar></span>
      <div class="detail">
        <span class="name">{{ leaveWord.nickname }}</span>
        <span class="time">{{ leaveWord.createTime }}</span>
      </div>
    </div>
    <div class="content">
      <MdPreview :modelValue="leaveWord.content" :theme="mode"></MdPreview>
    </div>
    <div class="container">
      <div class="count">
        <div>
          <SvgIcon name="comments"></SvgIcon>
          <span>{{ leaveWord.commentCount }}</span>
        </div>
        <div @click="onLikeClick">
          <SvgIcon v-show="!like" name="like"></SvgIcon>
          <SvgIcon v-show="like" name="like-selected"></SvgIcon>
          <span>{{ leaveWord.likeCount }}</span>
        </div>
        <div @click="onFavoriteClick">
          <SvgIcon v-show="!favorite" name="collection"></SvgIcon>
          <SvgIcon v-show="favorite" name="collection-selected"></SvgIcon>
          <span>{{ leaveWord.favoriteCount }}</span>
        </div>
      </div>
    </div>
    <el-divider content-position="left"></el-divider>
    <Comment :type="2" :like-type="2" :author-id="leaveWord.userId" :type-id="leaveWord.id" is-show-header
             v-if="loadingComment"></Comment>
  </div>
</template>

<style scoped lang="scss">
.comments {
  border-radius: $border-radius;

  .comment {
    .comment-content {
      padding: 1rem;
      border-radius: $border-radius;
      font-size: 0.9em;

      .child_reply {
        margin-top: 1rem;
        background: white;
        padding: 1rem;
        border-radius: $border-radius;
        font-size: 0.9em;
      }
    }

    padding: 1rem 0;
  }
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
}

.content {
  margin: 1rem 0;
}

:deep(.md-editor-toolbar-left) {
  flex-wrap: wrap;
}

.count {
  display: flex;
  margin-top: 0.5rem;

  div {
    display: flex;
    align-items: center;
    margin-right: 1rem;
    color: grey;
  }

  span {
    margin-left: 0.2rem;
  }
}

.user {
  display: flex;
  align-items: center;
  justify-content: flex-start;

  .detail {
    display: flex;
    flex-direction: column;
    margin-left: 0.2rem;
  }

  .name {
    font-size: 1em;
    margin-bottom: 0.5em;
    color: #0072ff;
  }

  .time {
    font-size: 0.75em;
    color: grey;
  }
}
</style>