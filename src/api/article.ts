import http from "@/utils/request.ts";
import {AddCommentReq, GetArticleDetailRes, GetCommentRes, GetTimelineRes, PRes, WhereArticleRes} from "@/api/type.ts";

// 获取文章详细
export const getArticleDetail: (id: string | string[]) => GetArticleDetailRes = (id) => {
    return http.request({
        url: `/article/detail/${id}`,
        method: "get"
    });
}

// 获取评论
export const getComment: (type: number, typeId: number, pageNum: string, pageSize: string) => GetCommentRes
    = (type, typeId, pageNum, pageSize) => {
    return http.request({
        url: '/comment/getComment',
        method: "get",
        params: {
            type,
            typeId,
            pageNum,
            pageSize
        }
    });
}

// 用户添加评论
export const addComment: (data: AddCommentReq) => PRes<null> = (data) => {
    return http.request({
        url: '/comment/auth/add/comment',
        method: "post",
        data
    });
}

// 时间轴
export const getTimeLine: () => GetTimelineRes = () => {
    return http.request({
        url: '/article/timeLine',
        method: "get"
    });
}

// 查询不同类型下的文章列表
export function whereArticleList(type: number, typeId: string): WhereArticleRes {
    return http.get(`/article/where/list/${typeId}`, {
        method: "get",
        params: {
            type
        }
    });
}

// 文章访问量+1
export function addArticleVisit(id: string): PRes<null> {
    return http.get(`/article/visit/${id}`, {
        method: "get"
    });
}