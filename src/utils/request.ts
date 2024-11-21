import axios, {AxiosError, AxiosInstance, InternalAxiosRequestConfig} from "axios";
import {RequestLoadingPath} from "@/utils/enum.ts";
import {useLoadingStore} from "@/store/loading.ts";
import * as nProgress from "nprogress";
import {getToken} from "@/utils/auth.ts";
import {JwtPrefix} from "@/utils/const.ts";
import {ElMessage, ElNotification} from "element-plus";


const env = import.meta.env
const http: AxiosInstance = axios.create({
    baseURL: env.VITE_APP_BASE_API ?? '/',
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
})

const pathRequestCount = new Map()
// 已请求过的路径
const firstRequestPaths = new Set()
let showLoading = false

http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const url = config?.url
    if (url?.startsWith(env.VITE_MUSIC_BASE_API)) {
        config.baseURL = ''
    }
    const matchingPath: string = RequestLoadingPath.find(path => url?.startsWith(path))
    if (!(url?.startsWith(env.VITE_YIYAN_API)) || matchingPath) {
        if (matchingPath && !firstRequestPaths.has(matchingPath)) {
            firstRequestPaths.add(matchingPath)
            pathRequestCount.set(matchingPath, (pathRequestCount.get(matchingPath) ?? 0) + 1)
            if (!showLoading) {
                showLoading = true
                const loadingStore = useLoadingStore()
                loadingStore.show()
                nProgress.start()
            }
        } else {
            nProgress.start()
        }
    }
    config.headers['X-Client-Type'] = 'Frontend'
    if (getToken() == null) return config
    config.headers['Authorization'] = JwtPrefix + getToken()
    return config
}, (error: any) => {
    return Promise.reject(error)
})

http.interceptors.response.use((response) => {
    const url = response.config?.url
    const matchingPath = RequestLoadingPath.find(path => url?.startsWith(path))
    if (matchingPath) {
        pathRequestCount.set(matchingPath, pathRequestCount.get(matchingPath) - 1)
        // 所有特定路径请求已经完成
        if (pathRequestCount.get(matchingPath) === 0) {
            showLoading = false
            const loadingStore = useLoadingStore()
            loadingStore.hide()
            pathRequestCount.clear()
            nProgress.done()
        }
    } else {
        nProgress.done()
    }
    if (response.data.code === 1012) {
        ElNotification({
            title: '账号已被封禁',
            message: response.data.msg,
            type: 'warning'
        })
    }
    return response.data
}, (error: AxiosError) => {
    let message = error.message
    if (message === "Network Error") {
        message = "后端接口连接异常"
    } else if (message.includes("timeout")) {
        message = "接口请求超时"
    } else if (message.includes("Request failed with status code")) {
        message = `接口${message.substring(message.length - 3)}异常`
    }
    if (!error?.config?.url?.startsWith("https://v1.hitokoto.cn")) {
        ElMessage.error(message)
    }
    return Promise.reject(error.response)
})

export default http