<script setup lang="ts">
import {DisplayComment} from "@/components/comment/Comment.vue";
import {MdPreview} from "md-editor-v3";
import 'md-editor-v3/lib/preview.css'

interface Props {
  comment: DisplayComment,
  authorId: number,
  showAllChildComments?: boolean,
  likeFun: Function,
  cancelLikeFun: Function,
  replyFun: Function,
  getComments: Function,
  pageSize: number,
  type: number
}

defineProps<Props>()
</script>

<template>
  <div v-for="(child, index) in comment.childComment">
    <div v-if="index < 1 || showAllChildComments">
      <div class="parent-container" :key="child.id">
        <el-avatar shape="square" :size="40" :src="child.commentUserAvatar"></el-avatar>
        <div class="comment-content">
          <div class="comment-content-header">
            <div>
              <div>{{child.commentUserNickname}}</div>
              <div v-if="child.commentUserId === authorId">
                <el-tag size="small">作者</el-tag>
              </div>
              <div>{{child.createTime}}</div>
            </div>
            <div>
              <SvgIcon @click="likeFun(child)" v-show="!child.isLike" name="like" style="cursor: pointer"/>
              <SvgIcon @click="cancelLikeFun(child)" v-show="child.isLike" name="like-selected"
                       style="cursor: pointer"/>
              <span style="font-size: 0.8em;color: grey">{{ child.likeCount }}</span>
              <svg-icon @click="replyFun(comment.childComment,child.id)" name="comment"
                        style="margin:0 0.2em 0 0.5rem;cursor: pointer"/>
              <span style="font-size: 0.8em;color: grey">{{ child.childCommentCount }}</span>
            </div>
          </div>
           <!-- 父评论 -->
          <div class="comment_content_body">
            <div style="margin: 0.5rem 0">
              <span style="font-weight: bold">回复</span>
              <span class="replyUserNickname"> @{{ child.replyUserNickname }}</span>：
            </div>
            <div>
              <MdPreview :modelValue="child.commentContent"></MdPreview>
            </div>
          </div>
          <ReplyBox :type="type" :comment="child" :get-comments="getComments" :page-size="pageSize"></ReplyBox>
        </div>
      </div>
      <div v-if="child.childComment && child.childComment.length">
        <ChildComment :comment="child" :author-id="authorId" :like-fun="likeFun" :cancel-like-fun="cancelLikeFun"
                      :reply-fun="replyFun" :get-comments="getComments" :page-size="pageSize" :type="type">
        </ChildComment>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "commentStyle";
.parent-container {
  display: flex;
  margin-top: 1rem;
  border-top: 1px solid var(--el-border-color);
  padding-top: 1rem;
}
.replyUserNickname{
  color: var(--mao-bg-reply);
  font-weight: bold
}
</style>