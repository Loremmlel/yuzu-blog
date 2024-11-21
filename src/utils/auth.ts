import {TokenKey} from "@/utils/const.ts";
import {ElMessage} from "element-plus";
import {useUserStore} from "@/store/user.ts";

/**
 * 获取token
 */
export function getToken() {
    const str = localStorage.getItem(TokenKey) || sessionStorage.getItem(TokenKey)
    if (!str) return null
    const authObj = JSON.parse(str)
    // 判断是否过期
    if (new Date(authObj.expire) <= new Date()) {
        removeToken()
        ElMessage.warning('登录状态已过期，请重新登录')
        return null
    }
    return authObj.token
}

export function setToken(token: string, expire: string, remember: boolean) {
    const userStore = useUserStore()
    const authObj = {token, expire}
    const str = JSON.stringify(authObj)
    remember ? localStorage.setItem(TokenKey, str) : sessionStorage.setItem(TokenKey, str)
    userStore.setToken(token)
}

export function removeToken() {
    localStorage.removeItem(TokenKey)
    sessionStorage.removeItem(TokenKey)
}