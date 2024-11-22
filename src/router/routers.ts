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
            }
        ]
    }
]