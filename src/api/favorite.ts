import http from "@/utils/request.ts";
import {PRes} from "@/api/type.ts";

// 收藏
export function userFavorite(type: number, typeId: string): PRes<null> {
    return http.request({
        url: '/favorite/auth/favorite',
        method: "post",
        params: {
            type,
            typeId
        }
    });
}

// 取消收藏
export function cancelFavorite(type: number, typeId: string): PRes<null> {
    return http.request({
        url: '/favorite/auth/favorite',
        method: "delete",
        params: {
            type,
            typeId
        }
    });
}

// 是否收藏
export function isFavorite(type: number, typeId: string): PRes<boolean> {
    return http.request({
        url: '/favorite/whether/favorite',
        method: "get",
        params: {
            type,
            typeId
        }
    });
}
