import http from "@/utils/request.ts";
import {PRes} from "@/api/type.ts";

/**
 * 发送邮件
 */
export function sendEmail(email: string, type: string): PRes<null> {
    return http({
        url: '/public/ask-code',
        params: {
            email: email,
            type: type
        },
        method: 'get'
    })
}