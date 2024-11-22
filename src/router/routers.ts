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
                meta: {
                    title: 'Yuzu-blog'
                }
            }
        ]
    }
]