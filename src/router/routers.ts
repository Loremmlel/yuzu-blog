import {RouteRecordRaw} from "vue-router";

export const constantRouter: Readonly<RouteRecordRaw[]> = [
    {
        path: '/',
        name: 'layout',
        component: () => import('@/views/layout/index.vue'),
        children: [

        ]
    }
]