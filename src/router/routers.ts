import {RouteRecordRaw} from "vue-router";

export const constantRouter: Readonly<RouteRecordRaw[]> = [
    {
        path: '/',
        name: 'layout',
        component: () => import('@/views/layout.vue'),
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('@/views/home/Home.vue'),
                meta: {
                    title: '柚子博客'
                }
            },
            {
                path: '/timeline',
                name: 'timeline',
                component: () => import('@/views/pigeonhole/Timeline.vue'),
                meta: {
                    title: '时间轴'
                }
            },
            {
                path: '/category/:id?',
                component: () => import('@/views/pigeonhole/Category.vue'),
                name: 'category',
                meta: {
                    title: '文章分类'
                }
            },
            {
                path: '/tags/:id?',
                component: () => import('@/views/pigeonhole/Tags.vue'),
                name: 'tags',
                meta: {
                    title: '文章标签'
                }
            },
            {
                path: '/tree-hole',
                component: () => import('@/views/amusement/TreeHole.vue'),
                name: 'treeHole',
                meta: {
                    title: '树洞'
                }
            },
            {
                path: '/about',
                component: () => import('@/views/About.vue'),
                name: 'about',
                meta: {
                    title: '关于本站'
                }
            }
        ]
    },
    {
        path: '/welcome',
        name: 'welcome',
        component: () => import('@/views/welcome/Welcome.vue'),
        redirect: '/login',
        children: [
            {
                path: '/login',
                name: 'welcome-login',
                component: () => import('@/views/welcome/Login.vue'),
                meta: {
                    title: '登录'
                }
            },
            {
                path: '/register',
                name: 'welcome-register',
                component: () => import('@/views/welcome/Register.vue'),
                meta: {
                    title: '注册'
                }
            },
            {
                path: '/reset',
                name: 'welcome-reset',
                component: () => import('@/views/welcome/ResetPassword.vue'),
                meta: {
                    title: '重置密码'
                }
            }
        ]
    },
    {
        path: '/article/:id',
        name: 'article',
        component: () => import('@/views/article/Article.vue'),
        meta: {
            title: '文章详情'
        }
    },
    {
        path: '/setting',
        name: 'setting',
        component: () => import('@/views/Setting.vue'),
        meta: {
            title: '用户设置'
        }
    },
    // 访问其它任何不存在的路由，重定向到首页
    {
        path: '/:pathMatch(.*)*',
        redirect: '/',
        name: 'any'
    }
]