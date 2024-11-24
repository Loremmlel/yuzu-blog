import http from "@/utils/request.ts";
import {GetLeaveWordListRes, PRes} from "@/api/type.ts";

// 查询留言板列表
export function getLeaveWordList(id?: string): GetLeaveWordListRes {
    return http({
        url: '/leaveWord/list',
        method: 'get',
        params: {
            id
        }
    })
}

// 新增留言板
export function userLeaveWord(content: string): PRes<null> {
    return http.post('/leaveWord/auth/userLeaveWord',JSON.stringify(content))
}