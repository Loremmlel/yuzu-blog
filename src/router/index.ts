import {createRouter, createWebHistory} from "vue-router";
import {constantRouter} from "@/router/routers.ts";
import {getToken} from "@/utils/auth.ts";

const router = createRouter({
    history: createWebHistory(),
    routes: constantRouter
})

router.beforeEach((to, from, next) => {
    const isLogin = getToken()
    // 查看文章详情页时，滚动条回到顶部
    if (to.name === 'article' || to.name === 'messageDetail') {
        router.afterEach(() => {
            window.scrollTo(0, 0)
        })
    }
    window.document.title = to.meta.title as string
    if (to.name?.startsWith(('welcome-')) && isLogin) {
        next('/')
    } else {
        next()
    }
})

export default router