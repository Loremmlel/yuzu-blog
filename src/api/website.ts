import http from "@/utils/request.ts";
import {GetWebsiteInfoRes, PRes} from "@/api/type.ts";

// 获取网站信息
export function getWebsiteInfo(): GetWebsiteInfoRes {
    return http({
        url: '/websiteInfo/front',
        method: 'get'
    })
}


// 查询banner列表
export async function backGetBanners(): PRes<[]> {
    return http({
        url: '/banners/list',
        method: 'get'
    })
}