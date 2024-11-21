import http from "@/utils/request.ts";
import {GetArticleListRes, GetArticleRecommendRes, GetArticleRelatedRes} from "@/api/type.ts";

// 获取首页文章列表
export function getArticleList(pageNum: number, pageSize: number): GetArticleListRes {
    return http({
        url: '/article/list',
        method: 'get',
        params: {
            pageNum,
            pageSize
        }
    })
}

// 获取推荐文章列表
export function getRecommendArticleList(): GetArticleRecommendRes {
    return http({
        url: '/article/recommend',
        method: 'get'
    })
}

// 获取随机文章
export function getRandomArticle(): GetArticleRecommendRes {
    return http({
        url: '/article/random',
        method: 'get'
    })
}

// 相关推荐(按照分类)
export function getRelatedArticle(categoryId: string, articleId: string): GetArticleRelatedRes {
    return http({
        url: `/article/related/${categoryId}/${articleId}`,
        method: 'get'
    })
}