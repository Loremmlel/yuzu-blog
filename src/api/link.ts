import http from "@/utils/request.ts";
import {ApplyLinkReq, LinkListRes, PRes} from "@/api/type.ts";

// 申请友链
export function applyLink(data: ApplyLinkReq): PRes<null> {
    return http({
        url: '/link/auth/apply',
        method: 'post',
        data: data
    })
}

// 查询友链列表
export function linkList(): LinkListRes {
    return http({
        url: '/link/list',
        method: 'get'
    })
}
