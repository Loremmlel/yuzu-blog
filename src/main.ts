import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:svg-icons-register'
import router from "@/router";
import globalComponent from "@/components";
import '@/styles/index.scss'
import '@/styles/tailwind.css'
import 'element-plus/dist/index.css'
// 黑暗模式
import 'element-plus/theme-chalk/dark/css-vars.css'
// 全局指令
import vLazy from '@/directive/vLazy';
import vSlidIn from '@/directive/vSlidIn';
import vViewRequest from '@/directive/vViewRequest.ts'

const app = createApp(App)
const pinia = createPinia()
app.directive('lazy', vLazy)
app.directive('slide-in', vSlidIn)
app.directive('view-request', vViewRequest)
app.use(globalComponent)
app.use(router)
app.use(pinia)
app.mount('#app')


