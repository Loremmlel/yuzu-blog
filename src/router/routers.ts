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
                component: () => import('@/views/Pigeonhole/Timeline.vue'),
                meta: {
                    title: '时间轴'
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
    }
]