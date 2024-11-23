import http from "@/utils/request.ts";
import {IsLikeRes, PRes} from "@/api/type.ts";
// 点赞
export function userLike(type: number, typeId: number): PRes<null> {
    return http.request({
        url: '/like/auth/like',
        method: "post",
        params: {
            type,
            typeId
        }
    });
}

// 取消点赞文章
export function cancelLike(type: number, typeId: string): PRes<null> {
    return http.request({
        url: '/like/auth/like',
        method: "delete",
        params: {
            type,
            typeId
        }
    });
}

// 是否点赞
export function isLike(type: number, typeId?: string): IsLikeRes {
    return http.request({
        url: '/like/whether/like',
        method: "get",
        params: {
            type,
            typeId
        }
    });
}
