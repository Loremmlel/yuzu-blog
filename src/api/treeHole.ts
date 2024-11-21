import http from "@/utils/request.ts";
import {GetTreeHoleListRes, PRes} from "@/api/type.ts";

// 添加树洞
export function addTreeHole(content: string): PRes<null> {
    return http.post("/treeHole/auth/addTreeHole", JSON.stringify({content}), {
        method: 'post'
    });
}

// 获取树洞列表
export function getTreeHoleList(): GetTreeHoleListRes {
    return http.get("/treeHole/getTreeHoleList", {
        method: 'get'
    });
}