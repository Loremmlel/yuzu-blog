import http from "@/utils/request.ts";
import {GetCategoryListRes} from "@/api/type.ts";

// 查询分类列表
export function categoryList(): GetCategoryListRes {
    return http.get("/category/list", {
        method: "get"
    });
}