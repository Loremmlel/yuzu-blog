import http from "@/utils/request.ts";
import {GetTagListRes} from "@/api/type.ts";

// 所有标签
export function tagList(): GetTagListRes {
    return http.get("/tag/list", {
        method: "get"
    });
}